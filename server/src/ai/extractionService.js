const SourceDocument = require('../models/SourceDocument');
const ProgressEvent = require('../models/ProgressEvent');
const AuditLog = require('../models/AuditLog');
const llmClient = require('./llmClient');
const { progressExtractionSchema } = require('./extractionSchema');
const { parseDate } = require('../parsers/scheduleParser');

/**
 * Service to coordinate LLM extraction, Zod validation, and ProgressEvent persistence.
 */
const extractEventsFromSourceDocument = async ({ sourceDocumentId, projectId = 'default-project' }) => {
  const sourceDoc = await SourceDocument.findById(sourceDocumentId);
  if (!sourceDoc) {
    throw new Error(`Source document '${sourceDocumentId}' not found.`);
  }

  // Update status to processing
  sourceDoc.status = 'PROCESSING';
  await sourceDoc.save();

  try {
    // 1. Invoke LLM client
    const rawLlmResult = await llmClient.extractStructuredEvents(sourceDoc.rawContent);

    // 2. Validate response against Zod schema
    const validatedData = progressExtractionSchema.parse(rawLlmResult);

    // 3. Transform and persist ProgressEvent database records
    const createdEvents = [];

    for (const item of validatedData.events) {
      const parsedStart = parseDate(item.reportedStartDate);
      const parsedFinish = parseDate(item.reportedFinishDate);

      const evt = await ProgressEvent.create({
        projectId: sourceDoc.projectId || projectId,
        sourceDocumentId: sourceDoc._id,
        sourceFile: sourceDoc.originalFileName,
        sourceType: sourceDoc.sourceType,
        rawText: item.evidenceText || sourceDoc.rawContent,
        extractedActivityName: item.extractedActivityName.trim(),
        discipline: item.discipline || 'General',
        location: item.location ? item.location.trim() : null,
        reportedStartDate: parsedStart,
        reportedFinishDate: parsedFinish,
        reportedProgressPercentage: item.reportedProgressPercentage !== undefined ? item.reportedProgressPercentage : null,
        extractionConfidence: 0.85,
        uncertainties: item.uncertainties || [],
        status: 'EXTRACTED',
      });

      createdEvents.push(evt);
    }

    // 4. Update SourceDocument status to PARSED
    sourceDoc.status = 'PARSED';
    await sourceDoc.save();

    // 5. Record AuditLog
    await AuditLog.create({
      projectId: sourceDoc.projectId || projectId,
      entityType: 'ProgressEvent',
      entityId: sourceDoc._id,
      action: 'EXTRACTED',
      newValue: {
        eventsCount: createdEvents.length,
        sourceDocumentId: sourceDoc._id,
      },
      actor: 'AI_EXTRACTION_SERVICE',
      sourceReference: sourceDoc.originalFileName,
    });

    return {
      sourceDocumentId: sourceDoc._id,
      projectId: sourceDoc.projectId,
      totalExtractedCount: createdEvents.length,
      events: createdEvents,
    };
  } catch (err) {
    sourceDoc.status = 'FAILED';
    await sourceDoc.save();
    throw new Error(`LLM Progress Extraction Failed: ${err.message}`);
  }
};

/**
 * Service to ingest text, create source document, and run extraction in one step
 */
const extractEventsFromText = async ({ reportText, projectId = 'default-project', reporter = 'Site Supervisor' }) => {
  if (!reportText || typeof reportText !== 'string' || !reportText.trim()) {
    throw new Error('Report text cannot be empty.');
  }

  const cleanText = reportText.trim();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  const sourceDoc = await SourceDocument.create({
    projectId,
    originalFileName: `dpr_text_${timestamp}.txt`,
    mimeType: 'text/plain',
    sourceType: 'DPR_TEXT',
    rawContent: cleanText,
    fileSize: Buffer.byteLength(cleanText, 'utf-8'),
    metadata: { reporter },
    status: 'RECEIVED',
  });

  return await extractEventsFromSourceDocument({
    sourceDocumentId: sourceDoc._id,
    projectId,
  });
};

module.exports = {
  extractEventsFromSourceDocument,
  extractEventsFromText,
};

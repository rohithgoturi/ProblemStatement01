const SourceDocument = require('../models/SourceDocument');
const ProgressEvent = require('../models/ProgressEvent');
const { parseProgressSpreadsheetBuffer } = require('../parsers/progressParser');
const path = require('path');

/**
 * Service to process and store free-text progress reports
 */
const submitTextProgress = async ({ projectId = 'default-project', reportText, reporter = 'Site Supervisor' }) => {
  if (!reportText || typeof reportText !== 'string' || !reportText.trim()) {
    throw new Error('Progress report text is required and cannot be empty.');
  }

  const cleanText = reportText.trim();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `dpr_text_${timestamp}.txt`;

  const sourceDoc = await SourceDocument.create({
    projectId,
    originalFileName: fileName,
    mimeType: 'text/plain',
    sourceType: 'DPR_TEXT',
    rawContent: cleanText,
    fileSize: Buffer.byteLength(cleanText, 'utf-8'),
    metadata: {
      reporter,
      wordCount: cleanText.split(/\s+/).length.toString(),
    },
    status: 'RECEIVED',
  });

  return {
    sourceDocumentId: sourceDoc._id,
    projectId: sourceDoc.projectId,
    originalFileName: sourceDoc.originalFileName,
    sourceType: sourceDoc.sourceType,
    fileSize: sourceDoc.fileSize,
    rawContentPreview: cleanText.length > 200 ? cleanText.substring(0, 200) + '...' : cleanText,
    status: sourceDoc.status,
    createdAt: sourceDoc.createdAt,
  };
  
};

/**
 * Service to process and store uploaded progress files (TXT, CSV, XLSX)
 */
const uploadProgressFile = async ({ projectId = 'default-project', fileBuffer, fileName, mimeType }) => {
  if (!fileBuffer || fileBuffer.length === 0) {
    throw new Error('Uploaded file is empty.');
  }

  const ext = path.extname(fileName).toLowerCase();
  let sourceType = 'FILE_UPLOAD';
  let rawContentStr = '';
  let parsedEvents = [];

  if (ext === '.txt') {
    sourceType = 'FILE_UPLOAD';
    rawContentStr = fileBuffer.toString('utf-8');
  } else if (['.csv', '.xlsx', '.xls'].includes(ext)) {
    sourceType = 'SPREADSHEET';

    // Parse spreadsheet rows
    const rows = parseProgressSpreadsheetBuffer(fileBuffer, fileName);
    rawContentStr = JSON.stringify(rows, null, 2);

    // Create raw ProgressEvents for spreadsheet rows that contain activity names
    parsedEvents = rows.filter((r) => r.extractedActivityName);
  } else {
    throw new Error(`Unsupported file type '${ext}'. Please upload TXT, CSV, or XLSX.`);
  }

  // 1. Save SourceDocument
  const sourceDoc = await SourceDocument.create({
    projectId,
    originalFileName: fileName,
    mimeType: mimeType || 'application/octet-stream',
    sourceType,
    rawContent: rawContentStr,
    fileSize: fileBuffer.length,
    status: 'RECEIVED',
  });

  // 2. If spreadsheet rows produced valid events, create ProgressEvent records
  const createdEvents = [];
  if (parsedEvents.length > 0) {
    for (const evt of parsedEvents) {
      const created = await ProgressEvent.create({
        projectId,
        sourceFile: fileName,
        sourceType,
        rawText: evt.rawText || `Row entry for ${evt.extractedActivityName}`,
        extractedActivityName: evt.extractedActivityName,
        discipline: evt.discipline || 'General',
        location: evt.location || null,
        reportedStartDate: evt.reportedStartDate || null,
        reportedFinishDate: evt.reportedFinishDate || null,
        reportedProgressPercentage: evt.reportedProgressPercentage,
        extractionConfidence: 1.0, // Explicit spreadsheet entry
        status: 'EXTRACTED',
      });
      createdEvents.push(created);
    }
  }

  return {
    sourceDocumentId: sourceDoc._id,
    projectId: sourceDoc.projectId,
    originalFileName: sourceDoc.originalFileName,
    sourceType: sourceDoc.sourceType,
    fileSize: sourceDoc.fileSize,
    eventsExtractedCount: createdEvents.length,
    events: createdEvents,
    createdAt: sourceDoc.createdAt,
  };
};

/**
 * Service to list submitted source documents
 */
const getSourceDocuments = async ({ projectId = 'default-project', sourceType, page = 1, limit = 20 }) => {
  const query = { projectId };
  if (sourceType) {
    query.sourceType = sourceType;
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
  const skip = (pageNum - 1) * limitNum;

  const [documents, total] = await Promise.all([
    SourceDocument.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    SourceDocument.countDocuments(query),
  ]);

  return {
    projectId,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
    count: documents.length,
    documents,
  };
};

/**
 * Service to get single source document by ID
 */
const getSourceDocumentById = async (id) => {
  return await SourceDocument.findById(id);
};

/**
 * Service to list progress events
 */
const getProgressEvents = async ({ projectId = 'default-project', status, discipline, page = 1, limit = 50 }) => {
  const query = { projectId };
  if (status) query.status = status.toUpperCase();
  if (discipline) query.discipline = discipline;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(200, Math.max(1, parseInt(limit, 10) || 50));
  const skip = (pageNum - 1) * limitNum;

  const [events, total] = await Promise.all([
    ProgressEvent.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    ProgressEvent.countDocuments(query),
  ]);

  return {
    projectId,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
    count: events.length,
    events,
  };
};

module.exports = {
  submitTextProgress,
  uploadProgressFile,
  getSourceDocuments,
  getSourceDocumentById,
  getProgressEvents,
};

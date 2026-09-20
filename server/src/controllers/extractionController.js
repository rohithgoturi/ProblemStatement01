const extractionService = require('../ai/extractionService');
const ProgressEvent = require('../models/ProgressEvent');

/**
 * Controller to extract progress events from an existing stored SourceDocument
 */
const extractProgressFromSource = async (req, res, next) => {
  try {
    const { sourceId } = req.params;
    const projectId = req.body.projectId || req.query.projectId || 'default-project';

    const data = await extractionService.extractEventsFromSourceDocument({
      sourceDocumentId: sourceId,
      projectId,
    });

    return res.status(200).json({
      success: true,
      message: `Extracted ${data.totalExtractedCount} progress events from source document`,
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to submit text report and immediately extract structured progress events
 */
const extractProgressFromText = async (req, res, next) => {
  try {
    const projectId = req.body.projectId || 'default-project';
    const { reportText, text, report, reporter } = req.body;

    const contentToExtract = reportText || text || report;

    if (!contentToExtract) {
      return res.status(400).json({
        success: false,
        message: 'Missing progress text. Please provide "reportText" in request body.',
      });
    }

    const data = await extractionService.extractEventsFromText({
      reportText: contentToExtract,
      projectId,
      reporter,
    });

    return res.status(201).json({
      success: true,
      message: `Extracted ${data.totalExtractedCount} progress events from text report`,
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to retrieve extracted progress events for a specific source document
 */
const getExtractedEventsForSource = async (req, res, next) => {
  try {
    const { sourceId } = req.params;

    const events = await ProgressEvent.find({ sourceDocumentId: sourceId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Extracted progress events retrieved successfully',
      data: {
        sourceDocumentId: sourceId,
        count: events.length,
        events,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  extractProgressFromSource,
  extractProgressFromText,
  getExtractedEventsForSource,
};

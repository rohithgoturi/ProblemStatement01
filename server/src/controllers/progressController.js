const progressInputService = require('../services/progressInputService');

/**
 * Controller to submit free-text progress report
 */
const submitTextProgress = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.body.projectId || 'default-project';
    const { reportText, text, report, reporter } = req.body;

    const contentToSave = reportText || text || report;

    if (!contentToSave) {
      return res.status(400).json({
        success: false,
        message: 'Missing progress text. Please provide "reportText" in the request body.',
      });
    }

    const data = await progressInputService.submitTextProgress({
      projectId,
      reportText: contentToSave,
      reporter,
    });

    return res.status(201).json({
      success: true,
      message: 'Progress text report received and preserved successfully',
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to upload progress report file (TXT, CSV, XLSX)
 */
const uploadProgressFile = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.body.projectId || 'default-project';

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Please send a file in the "file" form-data field.',
      });
    }

    const data = await progressInputService.uploadProgressFile({
      projectId,
      fileBuffer: req.file.buffer,
      fileName: req.file.originalname,
      mimeType: req.file.mimetype,
    });

    return res.status(201).json({
      success: true,
      message: `Progress source file '${req.file.originalname}' uploaded and stored successfully`,
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to list submitted source documents
 */
const getSourceDocuments = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.query.projectId || 'default-project';
    const { sourceType, page, limit } = req.query;

    const data = await progressInputService.getSourceDocuments({
      projectId,
      sourceType,
      page,
      limit,
    });

    return res.status(200).json({
      success: true,
      message: 'Source documents retrieved successfully',
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to get single source document by ID
 */
const getSourceDocumentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const document = await progressInputService.getSourceDocumentById(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: `Source document '${id}' not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Source document retrieved successfully',
      data: document,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to list progress events
 */
const getProgressEvents = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.query.projectId || 'default-project';
    const { status, discipline, page, limit } = req.query;

    const data = await progressInputService.getProgressEvents({
      projectId,
      status,
      discipline,
      page,
      limit,
    });

    return res.status(200).json({
      success: true,
      message: 'Progress events retrieved successfully',
      data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  submitTextProgress,
  uploadProgressFile,
  getSourceDocuments,
  getSourceDocumentById,
  getProgressEvents,
};

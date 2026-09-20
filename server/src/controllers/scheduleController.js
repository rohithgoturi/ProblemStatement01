const scheduleService = require('../services/scheduleService');
const { parseSpreadsheetBuffer, parseJsonContent } = require('../parsers/scheduleParser');
const path = require('path');

/**
 * Controller to handle schedule file upload or JSON payload import
 */
const importSchedule = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.body.projectId || 'default-project';
    let records = [];

    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();

      if (ext === '.json') {
        const jsonStr = req.file.buffer.toString('utf-8');
        records = parseJsonContent(jsonStr);
      } else if (['.csv', '.xlsx', '.xls'].includes(ext)) {
        records = parseSpreadsheetBuffer(req.file.buffer, req.file.originalname);
      } else {
        return res.status(400).json({
          success: false,
          message: `Unsupported file type '${ext}'. Please upload CSV, XLSX, or JSON.`,
        });
      }
    } else if (req.body && (Array.isArray(req.body) || req.body.activities)) {
      records = parseJsonContent(req.body);
    } else {
      return res.status(400).json({
        success: false,
        message: 'No schedule data provided. Upload a CSV/XLSX/JSON file or send JSON payload in request body.',
      });
    }

    const result = await scheduleService.importScheduleData({ projectId, records });

    return res.status(201).json({
      success: true,
      message: `Schedule import processed for project '${projectId}'`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to list schedule activities
 */
const getScheduleActivities = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.query.projectId || 'default-project';
    const { discipline, status, search, page, limit } = req.query;

    const data = await scheduleService.getScheduleActivities({
      projectId,
      discipline,
      status,
      search,
      page,
      limit,
    });

    return res.status(200).json({
      success: true,
      message: 'Schedule activities retrieved successfully',
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to get a single schedule activity by ID
 */
const getScheduleActivityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const projectId = req.query.projectId || 'default-project';

    const activity = await scheduleService.getScheduleActivityById(id, projectId);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: `Schedule activity '${id}' not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Schedule activity retrieved successfully',
      data: activity,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to clear schedule activities for a project
 */
const clearSchedule = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.body.projectId || 'default-project';
    const result = await scheduleService.deleteProjectSchedule(projectId);

    return res.status(200).json({
      success: true,
      message: `Cleared schedule activities for project '${projectId}'`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  importSchedule,
  getScheduleActivities,
  getScheduleActivityById,
  clearSchedule,
};

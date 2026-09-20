const ScheduleActivity = require('../models/ScheduleActivity');
const { parseDate, normalizeDiscipline } = require('../parsers/scheduleParser');

/**
 * Service to process, validate, and store schedule activities into MongoDB.
 */
const importScheduleData = async ({ projectId = 'default-project', records = [] }) => {
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error('No schedule records found to import.');
  }

  const validBulkOps = [];
  const errors = [];
  let rowIndex = 0;

  for (const row of records) {
    rowIndex++;

    // Validation 1: Required fields
    if (!row.activityId || !row.activityId.toString().trim()) {
      errors.push({
        row: rowIndex,
        error: 'Missing required field: activityId',
        data: row,
      });
      continue;
    }

    if (!row.activityName || !row.activityName.toString().trim()) {
      errors.push({
        row: rowIndex,
        error: 'Missing required field: activityName',
        data: row,
      });
      continue;
    }

    const activityIdStr = row.activityId.toString().trim();
    const activityNameStr = row.activityName.toString().trim();

    // Parse and normalize fields
    const disciplineNorm = normalizeDiscipline(row.discipline);
    const plannedStart = parseDate(row.plannedStartDate);
    const plannedFinish = parseDate(row.plannedFinishDate);
    const actualStart = parseDate(row.actualStartDate);
    const actualFinish = parseDate(row.actualFinishDate);

    let level = parseInt(row.hierarchyLevel, 10);
    if (isNaN(level) || level < 1 || level > 6) {
      level = 5; // Default L5 activity
    }

    let pct = parseFloat(row.progressPercentage);
    if (isNaN(pct) || pct < 0 || pct > 100) {
      pct = 0;
    }

    const allowedStatuses = ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'DELAYED'];
    let statusStr = row.status ? row.status.toString().toUpperCase() : 'PLANNED';
    if (!allowedStatuses.includes(statusStr)) {
      statusStr = 'PLANNED';
    }

    const updateDoc = {
      projectId,
      activityId: activityIdStr,
      activityName: activityNameStr,
      wbsCode: row.wbsCode ? row.wbsCode.toString().trim() : null,
      parentActivityId: row.parentActivityId ? row.parentActivityId.toString().trim() : null,
      hierarchyLevel: level,
      discipline: disciplineNorm,
      location: row.location ? row.location.toString().trim() : null,
      plannedStartDate: plannedStart,
      plannedFinishDate: plannedFinish,
      actualStartDate: actualStart,
      actualFinishDate: actualFinish,
      progressPercentage: pct,
      status: statusStr,
      metadata: row.metadata || {},
    };

    validBulkOps.push({
      updateOne: {
        filter: { projectId, activityId: activityIdStr },
        update: { $set: updateDoc },
        upsert: true,
      },
    });
  }

  let importedCount = 0;
  if (validBulkOps.length > 0) {
    const result = await ScheduleActivity.bulkWrite(validBulkOps);
    importedCount = (result.upsertedCount || 0) + (result.modifiedCount || 0) + (result.matchedCount || 0);
  }

  return {
    projectId,
    totalRecords: records.length,
    importedCount,
    failedCount: errors.length,
    errors,
  };
};

/**
 * Service to retrieve schedule activities with optional filters and pagination.
 */
const getScheduleActivities = async ({ projectId = 'default-project', discipline, status, search, page = 1, limit = 50 }) => {
  const query = { projectId };

  if (discipline) {
    query.discipline = discipline;
  }

  if (status) {
    query.status = status.toUpperCase();
  }

  if (search) {
    query.$or = [
      { activityId: { $regex: search, $options: 'i' } },
      { activityName: { $regex: search, $options: 'i' } },
      { wbsCode: { $regex: search, $options: 'i' } },
    ];
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(200, Math.max(1, parseInt(limit, 10) || 50));
  const skip = (pageNum - 1) * limitNum;

  const [activities, total] = await Promise.all([
    ScheduleActivity.find(query).sort({ wbsCode: 1, activityId: 1 }).skip(skip).limit(limitNum),
    ScheduleActivity.countDocuments(query),
  ]);

  return {
    projectId,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
    count: activities.length,
    activities,
  };
};

/**
 * Service to get single schedule activity by ID (MongoDB _id or activityId)
 */
const getScheduleActivityById = async (id, projectId = 'default-project') => {
  let activity = null;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    activity = await ScheduleActivity.findById(id);
  }

  if (!activity) {
    activity = await ScheduleActivity.findOne({ projectId, activityId: id });
  }

  return activity;
};

/**
 * Service to clear existing schedule for a project
 */
const deleteProjectSchedule = async (projectId = 'default-project') => {
  const result = await ScheduleActivity.deleteMany({ projectId });
  return {
    projectId,
    deletedCount: result.deletedCount,
  };
};

module.exports = {
  importScheduleData,
  getScheduleActivities,
  getScheduleActivityById,
  deleteProjectSchedule,
};

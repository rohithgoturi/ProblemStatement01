const ProgressEvent = require('../models/ProgressEvent');
const ScheduleActivity = require('../models/ScheduleActivity');
const MatchResult = require('../models/MatchResult');
const ReviewDecision = require('../models/ReviewDecision');
const AuditLog = require('../models/AuditLog');

/**
 * Service to approve a progress event match and safely update schedule actuals.
 */
const approveProgressEvent = async ({
  eventId,
  scheduleActivityId = null,
  reviewerId = 'planner-1',
  reviewerNotes = '',
  actualStartDate = null,
  actualFinishDate = null,
  progressPercentage = null,
  isEditMode = false,
}) => {
  const event = await ProgressEvent.findById(eventId);
  if (!event) {
    throw new Error(`Progress event '${eventId}' not found.`);
  }

  // Business Rule: Prevent duplicate or repeated approvals
  if (event.status === 'APPROVED') {
    throw new Error('This progress event has already been approved and committed.');
  }

  if (event.status === 'REJECTED') {
    throw new Error('Cannot approve a progress event that was previously rejected.');
  }

  // Determine target ScheduleActivity
  let targetActivityId = scheduleActivityId;

  if (!targetActivityId && event.matchedActivityId) {
    targetActivityId = event.matchedActivityId;
  }

  if (!targetActivityId) {
    const topCandidate = await MatchResult.findOne({
      progressEventId: event._id,
      isTopRecommendation: true,
    });
    if (topCandidate) {
      targetActivityId = topCandidate.candidateActivityId;
    }
  }

  if (!targetActivityId) {
    throw new Error('No schedule activity specified or candidate match available to approve.');
  }

  const activity = await ScheduleActivity.findById(targetActivityId);
  if (!activity) {
    throw new Error(`Target schedule activity '${targetActivityId}' not found.`);
  }

  // Capture BEFORE schedule state for audit logging
  const prevScheduleState = {
    actualStartDate: activity.actualStartDate,
    actualFinishDate: activity.actualFinishDate,
    progressPercentage: activity.progressPercentage,
    status: activity.status,
  };

  // Determine values to apply to schedule
  const newActualStart = actualStartDate
    ? new Date(actualStartDate)
    : event.reportedStartDate || activity.actualStartDate || activity.plannedStartDate || new Date();

  const newActualFinish = actualFinishDate
    ? new Date(actualFinishDate)
    : event.reportedFinishDate || activity.actualFinishDate;

  let newProgressPct = progressPercentage !== null && progressPercentage !== undefined
    ? Number(progressPercentage)
    : event.reportedProgressPercentage !== null && event.reportedProgressPercentage !== undefined
    ? Number(event.reportedProgressPercentage)
    : 100;

  if (isNaN(newProgressPct) || newProgressPct < 0 || newProgressPct > 100) {
    newProgressPct = 100;
  }

  const newStatus = newProgressPct === 100 ? 'COMPLETED' : 'IN_PROGRESS';

  // Apply updates to ScheduleActivity
  activity.actualStartDate = newActualStart;
  activity.actualFinishDate = newActualFinish;
  activity.progressPercentage = newProgressPct;
  activity.status = newStatus;
  await activity.save();

  // Capture AFTER schedule state
  const newScheduleState = {
    actualStartDate: activity.actualStartDate,
    actualFinishDate: activity.actualFinishDate,
    progressPercentage: activity.progressPercentage,
    status: activity.status,
  };

  // Update ProgressEvent
  event.matchedActivityId = activity._id;
  event.status = 'APPROVED';
  await event.save();

  // Update MatchResult statuses
  await MatchResult.updateMany(
    { progressEventId: event._id },
    { $set: { status: 'DISCARDED' } }
  );
  await MatchResult.updateOne(
    { progressEventId: event._id, candidateActivityId: activity._id },
    { $set: { status: 'SELECTED_BY_PLANNER' } }
  );

  // Record ReviewDecision
  const decisionType = isEditMode ? 'EDITED_AND_APPROVED' : 'APPROVED';

  const reviewDecision = await ReviewDecision.create({
    progressEventId: event._id,
    decision: decisionType,
    selectedScheduleActivityId: activity._id,
    reviewerId: reviewerId || 'planner-1',
    reviewerNotes: reviewerNotes || '',
    appliedChanges: {
      actualStartDate: newActualStart,
      actualFinishDate: newActualFinish,
      progressPercentage: newProgressPct,
    },
    reviewedAt: new Date(),
  });

  // Record AuditLog
  await AuditLog.create({
    projectId: event.projectId,
    entityType: 'ScheduleActivity',
    entityId: activity._id,
    action: 'SCHEDULE_UPDATED',
    previousValue: prevScheduleState,
    newValue: newScheduleState,
    actor: reviewerId || 'planner-1',
    sourceReference: event.sourceFile,
  });

  await AuditLog.create({
    projectId: event.projectId,
    entityType: 'ProgressEvent',
    entityId: event._id,
    action: decisionType,
    previousValue: { status: 'MATCH_SUGGESTED' },
    newValue: { status: 'APPROVED', matchedActivityId: activity.activityId },
    actor: reviewerId || 'planner-1',
    sourceReference: event.sourceFile,
  });

  return {
    eventId: event._id,
    status: 'APPROVED',
    reviewDecisionId: reviewDecision._id,
    updatedScheduleActivity: {
      activityId: activity.activityId,
      activityName: activity.activityName,
      actualStartDate: activity.actualStartDate,
      actualFinishDate: activity.actualFinishDate,
      progressPercentage: activity.progressPercentage,
      status: activity.status,
    },
    previousScheduleState: prevScheduleState,
  };
};

/**
 * Service to edit extracted details or link a different schedule activity, then approve.
 */
const editAndApproveProgressEvent = async ({
  eventId,
  scheduleActivityId = null,
  extractedActivityName = null,
  discipline = null,
  location = null,
  reviewerId = 'planner-1',
  reviewerNotes = '',
  actualStartDate = null,
  actualFinishDate = null,
  progressPercentage = null,
}) => {
  const event = await ProgressEvent.findById(eventId);
  if (!event) {
    throw new Error(`Progress event '${eventId}' not found.`);
  }

  // Update extracted fields if provided (preserving raw text)
  if (extractedActivityName) event.extractedActivityName = extractedActivityName.trim();
  if (discipline) event.discipline = discipline;
  if (location !== undefined) event.location = location ? location.trim() : null;
  await event.save();

  return await approveProgressEvent({
    eventId,
    scheduleActivityId,
    reviewerId,
    reviewerNotes,
    actualStartDate,
    actualFinishDate,
    progressPercentage,
    isEditMode: true,
  });
};

/**
 * Service to reject a proposed progress event match.
 */
const rejectProgressEvent = async ({ eventId, reviewerId = 'planner-1', reviewerNotes = '' }) => {
  const event = await ProgressEvent.findById(eventId);
  if (!event) {
    throw new Error(`Progress event '${eventId}' not found.`);
  }

  if (event.status === 'APPROVED') {
    throw new Error('Cannot reject an event that has already been approved.');
  }

  if (event.status === 'REJECTED') {
    throw new Error('This progress event has already been rejected.');
  }

  const prevStatus = event.status;
  event.status = 'REJECTED';
  await event.save();

  await MatchResult.updateMany(
    { progressEventId: event._id },
    { $set: { status: 'REJECTED_BY_PLANNER' } }
  );

  const reviewDecision = await ReviewDecision.create({
    progressEventId: event._id,
    decision: 'REJECTED',
    selectedScheduleActivityId: null,
    reviewerId: reviewerId || 'planner-1',
    reviewerNotes: reviewerNotes || '',
    reviewedAt: new Date(),
  });

  await AuditLog.create({
    projectId: event.projectId,
    entityType: 'ProgressEvent',
    entityId: event._id,
    action: 'REJECTED',
    previousValue: { status: prevStatus },
    newValue: { status: 'REJECTED' },
    actor: reviewerId || 'planner-1',
    sourceReference: event.sourceFile,
  });

  return {
    eventId: event._id,
    status: 'REJECTED',
    reviewDecisionId: reviewDecision._id,
  };
};

/**
 * Service to list pending review queue items with candidate suggestions
 */
const getPendingReviews = async ({ projectId = 'default-project', page = 1, limit = 50 }) => {
  const query = {
    projectId,
    status: { $in: ['MATCH_SUGGESTED', 'UNMATCHED', 'PENDING_REVIEW', 'NEEDS_CLARIFICATION'] },
  };

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(200, Math.max(1, parseInt(limit, 10) || 50));
  const skip = (pageNum - 1) * limitNum;

  const [events, total] = await Promise.all([
    ProgressEvent.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    ProgressEvent.countDocuments(query),
  ]);

  // Populate candidates for each pending event
  const eventsWithCandidates = await Promise.all(
    events.map(async (evt) => {
      const candidates = await MatchResult.find({ progressEventId: evt._id })
        .populate('candidateActivityId')
        .sort({ confidenceScore: -1 });

      return {
        event: evt,
        candidates,
      };
    })
  );

  return {
    projectId,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
    count: eventsWithCandidates.length,
    items: eventsWithCandidates,
  };
};

/**
 * Service to retrieve audit history logs
 */
const getAuditLogs = async ({ projectId = 'default-project', entityType, entityId, page = 1, limit = 50 }) => {
  const query = { projectId };
  if (entityType) query.entityType = entityType;
  if (entityId) query.entityId = entityId;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(200, Math.max(1, parseInt(limit, 10) || 50));
  const skip = (pageNum - 1) * limitNum;

  const [logs, total] = await Promise.all([
    AuditLog.find(query).sort({ timestamp: -1 }).skip(skip).limit(limitNum),
    AuditLog.countDocuments(query),
  ]);

  return {
    projectId,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
    count: logs.length,
    logs,
  };
};

module.exports = {
  approveProgressEvent,
  editAndApproveProgressEvent,
  rejectProgressEvent,
  getPendingReviews,
  getAuditLogs,
};

const reviewService = require('../services/reviewService');

/**
 * Temporary MVP reviewer identity helper.
 * Extracts reviewer identity from header 'x-reviewer-id' or body 'reviewerId' or defaults to 'planner-1'.
 */
const getReviewerId = (req) => {
  return req.headers['x-reviewer-id'] || req.body.reviewerId || 'planner-1';
};

/**
 * Controller to approve a progress event match and commit schedule actuals
 */
const approveMatch = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { scheduleActivityId, reviewerNotes, actualStartDate, actualFinishDate, progressPercentage } = req.body;
    const reviewerId = getReviewerId(req);

    const data = await reviewService.approveProgressEvent({
      eventId,
      scheduleActivityId,
      reviewerId,
      reviewerNotes,
      actualStartDate,
      actualFinishDate,
      progressPercentage,
    });

    return res.status(200).json({
      success: true,
      message: `Progress event approved and schedule activity '${data.updatedScheduleActivity.activityId}' updated successfully`,
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to edit extracted values or target activity, then approve
 */
const editAndApproveMatch = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const {
      scheduleActivityId,
      extractedActivityName,
      discipline,
      location,
      reviewerNotes,
      actualStartDate,
      actualFinishDate,
      progressPercentage,
    } = req.body;
    const reviewerId = getReviewerId(req);

    const data = await reviewService.editAndApproveProgressEvent({
      eventId,
      scheduleActivityId,
      extractedActivityName,
      discipline,
      location,
      reviewerId,
      reviewerNotes,
      actualStartDate,
      actualFinishDate,
      progressPercentage,
    });

    return res.status(200).json({
      success: true,
      message: `Progress event edited and approved for schedule activity '${data.updatedScheduleActivity.activityId}'`,
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to reject a progress event
 */
const rejectMatch = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { reviewerNotes } = req.body;
    const reviewerId = getReviewerId(req);

    const data = await reviewService.rejectProgressEvent({
      eventId,
      reviewerId,
      reviewerNotes,
    });

    return res.status(200).json({
      success: true,
      message: 'Progress event match rejected successfully',
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to get pending review queue items
 */
const getPendingReviews = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.query.projectId || 'default-project';
    const { page, limit } = req.query;

    const data = await reviewService.getPendingReviews({
      projectId,
      page,
      limit,
    });

    return res.status(200).json({
      success: true,
      message: 'Pending review queue items retrieved successfully',
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to get audit history logs
 */
const getAuditLogs = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.query.projectId || 'default-project';
    const { entityType, entityId, page, limit } = req.query;

    const targetEntityId = req.params.eventId || entityId;

    const data = await reviewService.getAuditLogs({
      projectId,
      entityType,
      entityId: targetEntityId,
      page,
      limit,
    });

    return res.status(200).json({
      success: true,
      message: 'Audit history logs retrieved successfully',
      data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  approveMatch,
  editAndApproveMatch,
  rejectMatch,
  getPendingReviews,
  getAuditLogs,
};

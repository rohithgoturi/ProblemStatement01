const matchingService = require('../services/matchingService');

/**
 * Controller to trigger schedule matching for a single progress event
 */
const matchSingleEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const projectId = req.body.projectId || req.query.projectId || 'default-project';

    const data = await matchingService.matchSingleProgressEvent({
      progressEventId: eventId,
      projectId,
    });

    return res.status(200).json({
      success: true,
      message: data.status === 'MATCH_SUGGESTED' ? 'Candidate matches generated successfully' : 'No confident match found. Event marked UNMATCHED for review.',
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to trigger batch schedule matching for all pending events in a project
 */
const batchMatchEvents = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.body.projectId || req.query.projectId || 'default-project';

    const data = await matchingService.batchMatchProgressEvents({ projectId });

    return res.status(200).json({
      success: true,
      message: `Batch matching completed: ${data.matchedCount} matched, ${data.unmatchedCount} unmatched out of ${data.totalEventsProcessed} events`,
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to retrieve candidate match results for a progress event
 */
const getMatchResultsForEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const results = await matchingService.getMatchResultsForEvent(eventId);

    return res.status(200).json({
      success: true,
      message: 'Candidate match results retrieved successfully',
      data: {
        progressEventId: eventId,
        count: results.length,
        candidates: results,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to list unmatched progress events requiring planner attention
 */
const getUnmatchedEvents = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.query.projectId || 'default-project';
    const { page, limit } = req.query;

    const data = await matchingService.getUnmatchedProgressEvents({
      projectId,
      page,
      limit,
    });

    return res.status(200).json({
      success: true,
      message: 'Unmatched progress events retrieved successfully',
      data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  matchSingleEvent,
  batchMatchEvents,
  getMatchResultsForEvent,
  getUnmatchedEvents,
};

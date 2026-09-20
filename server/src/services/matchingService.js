const ProgressEvent = require('../models/ProgressEvent');
const ScheduleActivity = require('../models/ScheduleActivity');
const MatchResult = require('../models/MatchResult');
const AuditLog = require('../models/AuditLog');
const { computeTextSimilarity, normalizeText } = require('../utils/normalizeText');

/**
 * Service to calculate multi-signal match candidate scores between a ProgressEvent and ScheduleActivities.
 */
const matchSingleProgressEvent = async ({ progressEventId, projectId = 'default-project' }) => {
  const event = await ProgressEvent.findById(progressEventId);
  if (!event) {
    throw new Error(`Progress event '${progressEventId}' not found.`);
  }

  const projId = event.projectId || projectId;

  // Retrieve candidate schedule activities for project
  const candidateActivities = await ScheduleActivity.find({ projectId: projId });

  if (candidateActivities.length === 0) {
    event.status = 'UNMATCHED';
    await event.save();

    await AuditLog.create({
      projectId: projId,
      entityType: 'ProgressEvent',
      entityId: event._id,
      action: 'MATCH_PROPOSED',
      newValue: { status: 'UNMATCHED', reason: 'No schedule activities found in project' },
      actor: 'MATCHING_ENGINE',
    });

    return {
      progressEventId: event._id,
      extractedActivityName: event.extractedActivityName,
      status: 'UNMATCHED',
      reason: 'No schedule activities imported for this project.',
      bestMatch: null,
      alternativeCandidates: [],
    };
  }

  // Clear any existing proposed match results for this event
  await MatchResult.deleteMany({ progressEventId: event._id });

  const scoredCandidates = [];

  // 1. Check for Exact Activity ID match in rawText or extracted name
  const rawTextUpper = (event.rawText + ' ' + event.extractedActivityName).toUpperCase();

  for (const activity of candidateActivities) {
    const actIdUpper = activity.activityId.toUpperCase();
    const isExactIdMatch = rawTextUpper.includes(actIdUpper);

    if (isExactIdMatch) {
      scoredCandidates.push({
        activity,
        confidenceScore: 0.98,
        matchReason: `Exact Schedule Activity ID match ('${activity.activityId}') found in report text.`,
        matchingSignals: {
          textSimilarity: 1.0,
          disciplineMatch: true,
          locationMatch: true,
          wbsMatch: true,
        },
      });
      continue;
    }

    // 2. Multi-Signal Scoring: Text similarity + Discipline + Location
    const textSim = computeTextSimilarity(event.extractedActivityName, activity.activityName);

    // Discipline match evaluation
    const discMatch =
      event.discipline &&
      activity.discipline &&
      (event.discipline === activity.discipline || event.discipline === 'General' || activity.discipline === 'General');

    // Location match evaluation
    let locMatch = false;
    if (event.location && activity.location) {
      const normEvtLoc = normalizeText(event.location);
      const normActLoc = normalizeText(activity.location);
      locMatch = normEvtLoc.includes(normActLoc) || normActLoc.includes(normEvtLoc);
    }

    // Calculate score
    let score = 0.55 * textSim;

    if (discMatch) {
      score += 0.30;
    } else {
      score -= 0.20; // Penalty for discipline mismatch
    }

    if (locMatch) {
      score += 0.15;
    }

    // Clamp score between 0.0 and 0.95
    score = Math.min(0.95, Math.max(0.0, Math.round(score * 100) / 100));

    // Construct human-explainable match reason
    const matchReasonParts = [];
    matchReasonParts.push(`Text similarity: ${Math.round(textSim * 100)}%`);

    if (discMatch) {
      matchReasonParts.push(`Matching discipline (${activity.discipline})`);
    } else {
      matchReasonParts.push(`Discipline mismatch (Reported: ${event.discipline}, Schedule: ${activity.discipline})`);
    }

    if (locMatch) {
      matchReasonParts.push(`Matching location (${activity.location})`);
    }

    const matchReason = matchReasonParts.join(' • ');

    scoredCandidates.push({
      activity,
      confidenceScore: score,
      matchReason,
      matchingSignals: {
        textSimilarity: textSim,
        disciplineMatch: discMatch,
        locationMatch: locMatch,
        wbsMatch: false,
      },
    });
  }

  // Sort candidates by confidence score descending
  scoredCandidates.sort((a, b) => b.confidenceScore - a.confidenceScore);

  const MIN_MATCH_THRESHOLD = 0.45;
  const topCandidates = scoredCandidates.filter((c) => c.confidenceScore >= MIN_MATCH_THRESHOLD).slice(0, 3);

  if (topCandidates.length > 0) {
    // Save MatchResult for top recommendations
    const createdMatchResults = [];
    for (let i = 0; i < topCandidates.length; i++) {
      const cand = topCandidates[i];
      const matchDoc = await MatchResult.create({
        progressEventId: event._id,
        candidateActivityId: cand.activity._id,
        scheduleActivityIdStr: cand.activity.activityId,
        confidenceScore: cand.confidenceScore,
        matchReason: cand.matchReason,
        matchingSignals: cand.matchingSignals,
        isTopRecommendation: i === 0,
        status: 'PROPOSED',
      });
      createdMatchResults.push(matchDoc);
    }

    // Update ProgressEvent status
    event.status = 'MATCH_SUGGESTED';
    await event.save();

    // Log audit record
    await AuditLog.create({
      projectId: projId,
      entityType: 'ProgressEvent',
      entityId: event._id,
      action: 'MATCH_PROPOSED',
      newValue: {
        status: 'MATCH_SUGGESTED',
        topCandidateId: topCandidates[0].activity.activityId,
        confidenceScore: topCandidates[0].confidenceScore,
      },
      actor: 'MATCHING_ENGINE',
    });

    const best = topCandidates[0];
    const alternatives = topCandidates.slice(1);

    return {
      progressEventId: event._id,
      extractedActivityName: event.extractedActivityName,
      status: 'MATCH_SUGGESTED',
      bestMatch: {
        candidateActivityId: best.activity._id,
        scheduleActivityIdStr: best.activity.activityId,
        activityName: best.activity.activityName,
        discipline: best.activity.discipline,
        confidenceScore: best.confidenceScore,
        matchReason: best.matchReason,
        matchingSignals: best.matchingSignals,
      },
      alternativeCandidates: alternatives.map((alt) => ({
        candidateActivityId: alt.activity._id,
        scheduleActivityIdStr: alt.activity.activityId,
        activityName: alt.activity.activityName,
        discipline: alt.activity.discipline,
        confidenceScore: alt.confidenceScore,
        matchReason: alt.matchReason,
      })),
    };
  } else {
    // Event remains unmatched
    event.status = 'UNMATCHED';
    await event.save();

    await AuditLog.create({
      projectId: projId,
      entityType: 'ProgressEvent',
      entityId: event._id,
      action: 'MATCH_PROPOSED',
      newValue: {
        status: 'UNMATCHED',
        reason: 'No schedule candidate exceeded minimum confidence threshold (0.45)',
        highestScore: scoredCandidates.length > 0 ? scoredCandidates[0].confidenceScore : 0,
      },
      actor: 'MATCHING_ENGINE',
    });

    return {
      progressEventId: event._id,
      extractedActivityName: event.extractedActivityName,
      status: 'UNMATCHED',
      reason: 'No candidate activity exceeded minimum confidence threshold (0.45). Flagged for planner review queue.',
      highestCandidate: scoredCandidates.length > 0 ? {
        scheduleActivityIdStr: scoredCandidates[0].activity.activityId,
        activityName: scoredCandidates[0].activity.activityName,
        confidenceScore: scoredCandidates[0].confidenceScore,
        matchReason: scoredCandidates[0].matchReason,
      } : null,
      bestMatch: null,
      alternativeCandidates: [],
    };
  }
};

/**
 * Batch match all un-matched / extracted progress events for a project
 */
const batchMatchProgressEvents = async ({ projectId = 'default-project' }) => {
  const pendingEvents = await ProgressEvent.find({
    projectId,
    status: { $in: ['EXTRACTED', 'UNMATCHED'] },
  });

  const results = [];
  let matchedCount = 0;
  let unmatchedCount = 0;

  for (const evt of pendingEvents) {
    const res = await matchSingleProgressEvent({ progressEventId: evt._id, projectId });
    results.push(res);
    if (res.status === 'MATCH_SUGGESTED') {
      matchedCount++;
    } else {
      unmatchedCount++;
    }
  }

  return {
    projectId,
    totalEventsProcessed: pendingEvents.length,
    matchedCount,
    unmatchedCount,
    results,
  };
};

/**
 * Get stored match results for a progress event
 */
const getMatchResultsForEvent = async (progressEventId) => {
  return await MatchResult.find({ progressEventId })
    .populate('candidateActivityId')
    .sort({ confidenceScore: -1 });
};

/**
 * Get unmatched progress events requiring planner review
 */
const getUnmatchedProgressEvents = async ({ projectId = 'default-project', page = 1, limit = 50 }) => {
  const query = { projectId, status: 'UNMATCHED' };
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
  matchSingleProgressEvent,
  batchMatchProgressEvents,
  getMatchResultsForEvent,
  getUnmatchedProgressEvents,
};

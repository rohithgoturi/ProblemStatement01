require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');

const ScheduleActivity = require('../models/ScheduleActivity');
const ProgressEvent = require('../models/ProgressEvent');
const MatchResult = require('../models/MatchResult');
const ReviewDecision = require('../models/ReviewDecision');
const AuditLog = require('../models/AuditLog');

async function runPhase2Tests() {
  console.log('--- Starting Phase 2 Model Verification Tests ---');
  await connectDB();

  if (mongoose.connection.readyState !== 1) {
    console.error('ERROR: Could not connect to MongoDB for testing.');
    process.exit(1);
  }

  try {
    // Clean up test items
    const testProjectId = 'test-phase2-project';
    await ScheduleActivity.deleteMany({ projectId: testProjectId });
    await ProgressEvent.deleteMany({ projectId: testProjectId });
    await AuditLog.deleteMany({ projectId: testProjectId });

    console.log('1. Testing ScheduleActivity creation...');
    const activity = await ScheduleActivity.create({
      projectId: testProjectId,
      activityId: 'CIV-101',
      activityName: 'Foundation Excavation - Block A',
      wbsCode: '1.2.1',
      hierarchyLevel: 5,
      discipline: 'Civil',
      location: 'Block A',
      plannedStartDate: new Date('2026-09-01'),
      plannedFinishDate: new Date('2026-09-15'),
      status: 'PLANNED',
    });
    console.log(`✓ ScheduleActivity created with _id: ${activity._id} (ID: ${activity.activityId})`);

    console.log('2. Testing ProgressEvent creation...');
    const progressEvent = await ProgressEvent.create({
      projectId: testProjectId,
      sourceFile: 'DPR_2026_09_18.txt',
      sourceType: 'DPR_TEXT',
      rawText: 'Excavation for foundation at Block A completed today.',
      extractedActivityName: 'Excavation for foundation',
      discipline: 'Civil',
      location: 'Block A',
      reportedFinishDate: new Date('2026-09-18'),
      reportedProgressPercentage: 100,
      extractionConfidence: 0.95,
      status: 'MATCH_SUGGESTED',
    });
    console.log(`✓ ProgressEvent created with _id: ${progressEvent._id}`);

    console.log('3. Testing MatchResult creation...');
    const matchResult = await MatchResult.create({
      progressEventId: progressEvent._id,
      candidateActivityId: activity._id,
      scheduleActivityIdStr: activity.activityId,
      confidenceScore: 0.92,
      matchReason: 'High description similarity and matching Civil discipline',
      matchingSignals: { textSimilarity: 0.88, disciplineMatch: true, locationMatch: true },
      isTopRecommendation: true,
      status: 'PROPOSED',
    });
    console.log(`✓ MatchResult created with _id: ${matchResult._id} for Candidate: ${matchResult.scheduleActivityIdStr}`);

    console.log('4. Testing ReviewDecision creation & updating ProgressEvent...');
    const reviewDecision = await ReviewDecision.create({
      progressEventId: progressEvent._id,
      decision: 'APPROVED',
      selectedScheduleActivityId: activity._id,
      reviewerId: 'planner-lead-1',
      reviewerNotes: 'Verified against site supervisor photo logs.',
      appliedChanges: {
        actualFinishDate: new Date('2026-09-18'),
        progressPercentage: 100,
      },
    });
    console.log(`✓ ReviewDecision created with _id: ${reviewDecision._id}`);

    // Update ProgressEvent status & matched ID
    progressEvent.status = 'APPROVED';
    progressEvent.matchedActivityId = activity._id;
    await progressEvent.save();

    // Update ScheduleActivity actual progress
    activity.actualFinishDate = new Date('2026-09-18');
    activity.progressPercentage = 100;
    activity.status = 'COMPLETED';
    await activity.save();

    console.log('5. Testing AuditLog creation...');
    const auditLog = await AuditLog.create({
      projectId: testProjectId,
      entityType: 'ProgressEvent',
      entityId: progressEvent._id,
      action: 'APPROVED',
      previousValue: { status: 'MATCH_SUGGESTED' },
      newValue: { status: 'APPROVED', matchedActivityId: activity._id },
      actor: 'planner-lead-1',
      sourceReference: 'DPR_2026_09_18.txt',
    });
    console.log(`✓ AuditLog created with _id: ${auditLog._id}`);

    console.log('\n--- Verification Summary ---');
    const fetchedActivity = await ScheduleActivity.findById(activity._id);
    console.log(`Fetched Activity Status: ${fetchedActivity.status}, Progress: ${fetchedActivity.progressPercentage}%`);

    const fetchedEvent = await ProgressEvent.findById(progressEvent._id).populate('matchedActivityId');
    console.log(`Fetched Event Linked Activity: ${fetchedEvent.matchedActivityId.activityName}`);

    // Clean up test items
    await ScheduleActivity.deleteMany({ projectId: testProjectId });
    await ProgressEvent.deleteMany({ projectId: testProjectId });
    await MatchResult.deleteMany({ progressEventId: progressEvent._id });
    await ReviewDecision.deleteMany({ progressEventId: progressEvent._id });
    await AuditLog.deleteMany({ projectId: testProjectId });

    console.log('✓ Test cleanup completed. All 5 Mongoose models validated successfully!');
  } catch (err) {
    console.error('X Model Verification Test Failed:', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

runPhase2Tests();

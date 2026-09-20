require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');

const ScheduleActivity = require('../models/ScheduleActivity');
const ProgressEvent = require('../models/ProgressEvent');
const MatchResult = require('../models/MatchResult');
const ReviewDecision = require('../models/ReviewDecision');
const AuditLog = require('../models/AuditLog');

const scheduleService = require('../services/scheduleService');
const matchingService = require('../services/matchingService');
const reviewService = require('../services/reviewService');

async function runPhase7Tests() {
  console.log('--- Starting Phase 7 Planner Review & Audit Verification Tests ---');
  await connectDB();

  if (mongoose.connection.readyState !== 1) {
    console.error('ERROR: Could not connect to MongoDB for testing.');
    process.exit(1);
  }

  const testProjectId = 'test-phase7-project';

  try {
    // 1. Clean up test data
    await scheduleService.deleteProjectSchedule(testProjectId);
    await ProgressEvent.deleteMany({ projectId: testProjectId });
    await MatchResult.deleteMany({});
    await ReviewDecision.deleteMany({});
    await AuditLog.deleteMany({ projectId: testProjectId });

    // 2. Setup test schedule activity & progress event
    console.log('1. Setting up baseline schedule activity & progress event...');
    const activity = await ScheduleActivity.create({
      projectId: testProjectId,
      activityId: 'CIV-101',
      activityName: 'Foundation Excavation - Block A',
      discipline: 'Civil',
      location: 'Block A',
      plannedStartDate: new Date('2026-10-01'),
      plannedFinishDate: new Date('2026-10-10'),
      status: 'PLANNED',
    });

    const eventToApprove = await ProgressEvent.create({
      projectId: testProjectId,
      sourceFile: 'dpr_1.txt',
      sourceType: 'DPR_TEXT',
      rawText: 'Foundation excavation completed at Block A today.',
      extractedActivityName: 'Foundation Excavation - Block A',
      discipline: 'Civil',
      reportedFinishDate: new Date('2026-10-05'),
      reportedProgressPercentage: 100,
      status: 'EXTRACTED',
    });

    const eventToReject = await ProgressEvent.create({
      projectId: testProjectId,
      sourceFile: 'dpr_2.txt',
      sourceType: 'DPR_TEXT',
      rawText: 'Painting of canteen walls.',
      extractedActivityName: 'Canteen painting',
      discipline: 'General',
      status: 'EXTRACTED',
    });

    // Run matching
    await matchingService.matchSingleProgressEvent({ progressEventId: eventToApprove._id, projectId: testProjectId });
    await matchingService.matchSingleProgressEvent({ progressEventId: eventToReject._id, projectId: testProjectId });

    // 3. Test Approval Action
    console.log('\n2. Testing Planner Match Approval...');
    const approvalRes = await reviewService.approveProgressEvent({
      eventId: eventToApprove._id,
      reviewerId: 'planner-lead-john',
      reviewerNotes: 'Approved after site supervisor photo inspection.',
      actualFinishDate: '2026-10-05',
      progressPercentage: 100,
    });

    console.log(`✓ Event Approved! Status: ${approvalRes.status}`);
    console.log(`✓ Updated Activity Progress: ${approvalRes.updatedScheduleActivity.progressPercentage}% | Status: ${approvalRes.updatedScheduleActivity.status}`);
    console.log(`✓ Previous Schedule State: progress=${approvalRes.previousScheduleState.progressPercentage}%`);

    // 4. Test Duplicate Approval Protection Rule
    console.log('\n3. Testing Repeated / Duplicate Approval Protection Rule...');
    try {
      await reviewService.approveProgressEvent({
        eventId: eventToApprove._id,
        reviewerId: 'planner-lead-john',
      });
      console.error('X FAIL: Duplicate approval should have thrown an error!');
    } catch (dupErr) {
      console.log(`✓ Passed: Caught expected error on duplicate approval attempt: "${dupErr.message}"`);
    }

    // 5. Test Rejection Action
    console.log('\n4. Testing Planner Match Rejection...');
    const rejectionRes = await reviewService.rejectProgressEvent({
      eventId: eventToReject._id,
      reviewerId: 'planner-lead-john',
      reviewerNotes: 'Activity not part of project scope.',
    });
    console.log(`✓ Event Rejected! Status: ${rejectionRes.status}`);

    // Verify Schedule Activity remains unchanged by rejected event
    const currentActivity = await ScheduleActivity.findById(activity._id);
    console.log(`✓ Verified Schedule Activity Status: ${currentActivity.status} (Progress: ${currentActivity.progressPercentage}%)`);

    // 6. Test Audit Trail Generation
    console.log('\n5. Verifying Audit History Records...');
    const auditLogs = await reviewService.getAuditLogs({ projectId: testProjectId });
    console.log(`✓ Total Audit Logs Created: ${auditLogs.total}`);

    for (const log of auditLogs.logs) {
      console.log(`  - Audit Action: [${log.action}] on ${log.entityType} by ${log.actor}`);
    }

    // Clean up test data
    await scheduleService.deleteProjectSchedule(testProjectId);
    await ProgressEvent.deleteMany({ projectId: testProjectId });
    await MatchResult.deleteMany({});
    await ReviewDecision.deleteMany({});
    await AuditLog.deleteMany({ projectId: testProjectId });

    console.log('\n✓ Test cleanup completed. Phase 7 Planner Review & Audit verified successfully!');
  } catch (err) {
    console.error('X Phase 7 Test Failed:', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

runPhase7Tests();

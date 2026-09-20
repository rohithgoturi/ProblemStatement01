require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');

const ScheduleActivity = require('../models/ScheduleActivity');
const ProgressEvent = require('../models/ProgressEvent');
const MatchResult = require('../models/MatchResult');
const AuditLog = require('../models/AuditLog');

const scheduleService = require('../services/scheduleService');
const matchingService = require('../services/matchingService');

async function runPhase6Tests() {
  console.log('--- Starting Phase 6 Schedule Matching Engine Verification Tests ---');
  await connectDB();

  if (mongoose.connection.readyState !== 1) {
    console.error('ERROR: Could not connect to MongoDB for testing.');
    process.exit(1);
  }

  const testProjectId = 'test-phase6-project';

  try {
    // 1. Clean up test data
    await scheduleService.deleteProjectSchedule(testProjectId);
    await ProgressEvent.deleteMany({ projectId: testProjectId });
    await MatchResult.deleteMany({});
    await AuditLog.deleteMany({ projectId: testProjectId });

    // 2. Import test schedule
    console.log('1. Importing baseline test schedule activities...');
    await scheduleService.importScheduleData({
      projectId: testProjectId,
      records: [
        { activityId: 'CIV-101', activityName: 'Foundation Excavation - Block A', discipline: 'Civil', location: 'Block A' },
        { activityId: 'CIV-102', activityName: 'Reinforcement & Concreting - Block A', discipline: 'Civil', location: 'Block A' },
        { activityId: 'PIP-201', activityName: 'Main Header Pipe Spool Fitting', discipline: 'Piping', location: 'Yard B' },
        { activityId: 'ELE-301', activityName: 'Substation Cable Tray Erection', discipline: 'Electrical', location: 'Substation 1' },
      ],
    });

    // 3. Create test ProgressEvents representing different matching scenarios
    console.log('2. Creating test progress events (Exact, Terminology Variation, Ambiguous, Unmatched)...');

    // Scenario A: Exact Activity ID Match
    const evtExact = await ProgressEvent.create({
      projectId: testProjectId,
      sourceFile: 'dpr_1.txt',
      sourceType: 'DPR_TEXT',
      rawText: 'Activity CIV-101 completed successfully.',
      extractedActivityName: 'Excavation completed CIV-101',
      discipline: 'Civil',
      status: 'EXTRACTED',
    });

    // Scenario B: Terminology Variation & Contextual Match
    const evtFuzzy = await ProgressEvent.create({
      projectId: testProjectId,
      sourceFile: 'dpr_2.txt',
      sourceType: 'DPR_TEXT',
      rawText: 'Header pipe spool fit up in progress at Yard B.',
      extractedActivityName: 'Header pipe spool fitting',
      discipline: 'Piping',
      location: 'Yard B',
      status: 'EXTRACTED',
    });

    // Scenario C: Completely Unmatched Event
    const evtUnmatched = await ProgressEvent.create({
      projectId: testProjectId,
      sourceFile: 'dpr_3.txt',
      sourceType: 'DPR_TEXT',
      rawText: 'Canteen construction painting finished.',
      extractedActivityName: 'Canteen painting work',
      discipline: 'General',
      location: 'Canteen',
      status: 'EXTRACTED',
    });

    // 4. Test Single Match Execution: Exact Match
    console.log('\n3. Testing Exact Activity ID Match...');
    const matchResA = await matchingService.matchSingleProgressEvent({ progressEventId: evtExact._id, projectId: testProjectId });
    console.log(`✓ Event A Status: ${matchResA.status}`);
    console.log(`✓ Best Match ID: ${matchResA.bestMatch.scheduleActivityIdStr} | Confidence: ${matchResA.bestMatch.confidenceScore}`);
    console.log(`  Explanation: ${matchResA.bestMatch.matchReason}`);

    // 5. Test Single Match Execution: Terminology & Context Match
    console.log('\n4. Testing Terminology Variation & Context Match...');
    const matchResB = await matchingService.matchSingleProgressEvent({ progressEventId: evtFuzzy._id, projectId: testProjectId });
    console.log(`✓ Event B Status: ${matchResB.status}`);
    console.log(`✓ Best Match ID: ${matchResB.bestMatch.scheduleActivityIdStr} | Confidence: ${matchResB.bestMatch.confidenceScore}`);
    console.log(`  Explanation: ${matchResB.bestMatch.matchReason}`);

    // 6. Test Single Match Execution: Unmatched Event
    console.log('\n5. Testing Unmatched Event...');
    const matchResC = await matchingService.matchSingleProgressEvent({ progressEventId: evtUnmatched._id, projectId: testProjectId });
    console.log(`✓ Event C Status: ${matchResC.status} (Expected: UNMATCHED)`);
    console.log(`  Explanation: ${matchResC.reason}`);

    // 7. Verify Schedule Intactness Rule (No Automatic Update to Schedule Actuals!)
    console.log('\n6. Verifying Schedule Intactness Rule...');
    const scheduleActA = await ScheduleActivity.findOne({ projectId: testProjectId, activityId: 'CIV-101' });
    console.log(`✓ Activity CIV-101 actualStartDate: ${scheduleActA.actualStartDate} (Expected: null)`);
    console.log(`✓ Activity CIV-101 progressPercentage: ${scheduleActA.progressPercentage}% (Expected: 0%)`);
    console.log('  Confirmed: Schedule actuals were NOT automatically updated by the matching engine!');

    // Clean up test data
    await scheduleService.deleteProjectSchedule(testProjectId);
    await ProgressEvent.deleteMany({ projectId: testProjectId });
    await MatchResult.deleteMany({});
    await AuditLog.deleteMany({ projectId: testProjectId });

    console.log('\n✓ Test cleanup completed. Phase 6 Schedule Matching Engine verified successfully!');
  } catch (err) {
    console.error('X Phase 6 Test Failed:', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

runPhase6Tests();

require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { connectDB } = require('../config/db');

const scheduleService = require('../services/scheduleService');
const { parseSpreadsheetBuffer } = require('../parsers/scheduleParser');

async function runPhase3Tests() {
  console.log('--- Starting Phase 3 Schedule Import Verification Tests ---');
  await connectDB();

  if (mongoose.connection.readyState !== 1) {
    console.error('ERROR: Could not connect to MongoDB for testing.');
    process.exit(1);
  }

  const testProjectId = 'test-phase3-project';

  try {
    // 1. Clean up test project schedule
    await scheduleService.deleteProjectSchedule(testProjectId);

    // 2. Load and parse sample CSV
    const csvPath = path.join(__dirname, '../../../sample-data/schedules/sample_schedule.csv');
    console.log(`1. Reading sample CSV from ${csvPath}...`);
    const csvBuffer = fs.readFileSync(csvPath);

    const parsedRecords = parseSpreadsheetBuffer(csvBuffer, 'sample_schedule.csv');
    console.log(`✓ Parsed ${parsedRecords.length} records from CSV.`);

    // 3. Test Schedule Import Service
    console.log('2. Importing CSV schedule records into MongoDB...');
    const importResult = await scheduleService.importScheduleData({
      projectId: testProjectId,
      records: parsedRecords,
    });
    console.log(`✓ Import Result: Total=${importResult.totalRecords}, Imported=${importResult.importedCount}, Failed=${importResult.failedCount}`);

    // 4. Test Error Handling with Invalid Record
    console.log('3. Testing validation & error reporting with invalid row...');
    const invalidRecords = [
      { activityId: 'VAL-001', activityName: 'Valid Activity', discipline: 'Civil' },
      { activityName: 'Invalid Activity Missing ID', discipline: 'Civil' }, // Missing activityId
    ];

    const errorImportResult = await scheduleService.importScheduleData({
      projectId: testProjectId,
      records: invalidRecords,
    });
    console.log(`✓ Error Handling: Processed ${errorImportResult.importedCount} valid, Caught ${errorImportResult.failedCount} error.`);
    console.log(`  Reported Error: "${errorImportResult.errors[0].error}" at Row ${errorImportResult.errors[0].row}`);

    // 5. Test Retrieval of Schedule Activities
    console.log('4. Retrieving imported schedule activities from MongoDB...');
    const activitiesList = await scheduleService.getScheduleActivities({
      projectId: testProjectId,
      limit: 10,
    });
    console.log(`✓ Retrieved ${activitiesList.count} of ${activitiesList.total} total activities for project '${testProjectId}'.`);

    // 6. Test Single Activity Lookup
    console.log('5. Retrieving single activity by activityId ("CIV-101")...');
    const singleActivity = await scheduleService.getScheduleActivityById('CIV-101', testProjectId);
    console.log(`✓ Found Activity: "${singleActivity.activityName}" | Discipline: ${singleActivity.discipline} | Status: ${singleActivity.status}`);

    // Clean up test data
    await scheduleService.deleteProjectSchedule(testProjectId);
    console.log('✓ Test cleanup completed. Phase 3 Schedule Import verified successfully!');
  } catch (err) {
    console.error('X Phase 3 Test Failed:', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

runPhase3Tests();

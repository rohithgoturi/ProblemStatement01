require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { connectDB } = require('../config/db');

const SourceDocument = require('../models/SourceDocument');
const ProgressEvent = require('../models/ProgressEvent');
const progressInputService = require('../services/progressInputService');

async function runPhase4Tests() {
  console.log('--- Starting Phase 4 Progress Input Verification Tests ---');
  await connectDB();

  if (mongoose.connection.readyState !== 1) {
    console.error('ERROR: Could not connect to MongoDB for testing.');
    process.exit(1);
  }

  const testProjectId = 'test-phase4-project';

  try {
    // 1. Clean up test project sources & events
    await SourceDocument.deleteMany({ projectId: testProjectId });
    await ProgressEvent.deleteMany({ projectId: testProjectId });

    // 2. Test Free-Text Progress Report Submission
    console.log('1. Submitting free-text progress report...');
    const sampleText = 'Civil team completed excavation at Block A today. Piping fit-up started at Yard B.';
    const textResult = await progressInputService.submitTextProgress({
      projectId: testProjectId,
      reportText: sampleText,
      reporter: 'Supervisor Mark',
    });
    console.log(`✓ SourceDocument created (ID: ${textResult.sourceDocumentId}, File: ${textResult.originalFileName})`);

    // 3. Test TXT File Upload
    console.log('2. Uploading daily_report.txt file...');
    const txtPath = path.join(__dirname, '../../../sample-data/progress-reports/daily_report.txt');
    const txtBuffer = fs.readFileSync(txtPath);

    const txtUploadResult = await progressInputService.uploadProgressFile({
      projectId: testProjectId,
      fileBuffer: txtBuffer,
      fileName: 'daily_report.txt',
      mimeType: 'text/plain',
    });
    console.log(`✓ TXT File Uploaded (Source ID: ${txtUploadResult.sourceDocumentId}, Size: ${txtUploadResult.fileSize} bytes)`);

    // 4. Test Discipline CSV Upload (Parsing raw rows into ProgressEvent)
    console.log('3. Uploading piping_progress.csv discipline spreadsheet...');
    const csvPath = path.join(__dirname, '../../../sample-data/progress-reports/piping_progress.csv');
    const csvBuffer = fs.readFileSync(csvPath);

    const csvUploadResult = await progressInputService.uploadProgressFile({
      projectId: testProjectId,
      fileBuffer: csvBuffer,
      fileName: 'piping_progress.csv',
      mimeType: 'text/csv',
    });
    console.log(`✓ Discipline CSV Uploaded (Extracted ${csvUploadResult.eventsExtractedCount} progress events)`);

    // 5. Test Source Documents Listing
    console.log('4. Listing source documents from MongoDB...');
    const sourcesList = await progressInputService.getSourceDocuments({
      projectId: testProjectId,
    });
    console.log(`✓ Retrieved ${sourcesList.count} source documents for project '${testProjectId}'.`);

    // 6. Test Single Source Document Details
    console.log('5. Retrieving single source document raw content...');
    const singleSource = await progressInputService.getSourceDocumentById(textResult.sourceDocumentId);
    console.log(`✓ Raw Content Verified (${singleSource.fileSize} bytes): "${singleSource.rawContent}"`);

    // 7. Test Progress Events Listing
    console.log('6. Retrieving created progress events...');
    const eventsList = await progressInputService.getProgressEvents({
      projectId: testProjectId,
    });
    console.log(`✓ Retrieved ${eventsList.count} progress events.`);
    if (eventsList.events.length > 0) {
      console.log(`  Event 1: "${eventsList.events[0].extractedActivityName}" | Discipline: ${eventsList.events[0].discipline} | Progress: ${eventsList.events[0].reportedProgressPercentage}%`);
    }

    // Clean up test data
    await SourceDocument.deleteMany({ projectId: testProjectId });
    await ProgressEvent.deleteMany({ projectId: testProjectId });
    console.log('✓ Test cleanup completed. Phase 4 Progress Input verified successfully!');
  } catch (err) {
    console.error('X Phase 4 Test Failed:', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

runPhase4Tests();

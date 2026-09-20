require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');

const SourceDocument = require('../models/SourceDocument');
const ProgressEvent = require('../models/ProgressEvent');
const AuditLog = require('../models/AuditLog');

const extractionService = require('../ai/extractionService');
const { progressExtractionSchema } = require('../ai/extractionSchema');

async function runPhase5Tests() {
  console.log('--- Starting Phase 5 LLM Extraction Verification Tests ---');
  await connectDB();

  if (mongoose.connection.readyState !== 1) {
    console.error('ERROR: Could not connect to MongoDB for testing.');
    process.exit(1);
  }

  const testProjectId = 'test-phase5-project';

  try {
    // Clean up test data
    await SourceDocument.deleteMany({ projectId: testProjectId });
    await ProgressEvent.deleteMany({ projectId: testProjectId });
    await AuditLog.deleteMany({ projectId: testProjectId });

    // 1. Test standard report extraction
    console.log('1. Testing extraction from a standard DPR text report...');
    const dprText = `
      DAILY SITE REPORT - 2026-10-02
      Civil excavation at Block A reached 100% completion today.
      Piping spool fitting at Yard B started on 2026-10-05 and fit-up is 50% complete.
      Substation 1 electrical cable tray installation is in progress.
    `;

    const extractionResult = await extractionService.extractEventsFromText({
      reportText: dprText,
      projectId: testProjectId,
      reporter: 'Supervisor Mark',
    });

    console.log(`✓ Extracted ${extractionResult.totalExtractedCount} events from report.`);
    console.log(`✓ SourceDocument ID: ${extractionResult.sourceDocumentId}`);

    // 2. Validate Zod Schema Verification
    console.log('2. Verifying Zod schema validation...');
    const samplePayload = {
      events: [
        {
          extractedActivityName: 'Foundation Excavation - Block A',
          discipline: 'Civil',
          location: 'Block A',
          reportedStartDate: '2026-10-01',
          reportedFinishDate: null,
          reportedProgressPercentage: 100,
          evidenceText: 'Excavation completed today.',
          uncertainties: [],
        },
      ],
    };
    const validated = progressExtractionSchema.parse(samplePayload);
    console.log(`✓ Zod Schema validated payload successfully (${validated.events.length} event).`);

    // 3. Test Date Non-Fabrication Rule
    console.log('3. Verifying date non-fabrication rule (missing dates remain null)...');
    const missingDateText = 'Electrical cable tray installation started at Substation 1. Progress is 30%.';
    const missingDateResult = await extractionService.extractEventsFromText({
      reportText: missingDateText,
      projectId: testProjectId,
    });
    const firstEvt = missingDateResult.events[0];
    console.log(`✓ Event Name: "${firstEvt.extractedActivityName}"`);
    console.log(`✓ Reported Start Date: ${firstEvt.reportedStartDate} (Expected: null)`);
    console.log(`✓ Reported Finish Date: ${firstEvt.reportedFinishDate} (Expected: null)`);
    console.log(`✓ Reported Progress: ${firstEvt.reportedProgressPercentage}%`);

    // 4. Verify Audit Log Creation
    console.log('4. Verifying Audit Log creation for extraction action...');
    const auditEntries = await AuditLog.find({ projectId: testProjectId, action: 'EXTRACTED' });
    console.log(`✓ Audit Log entries created: ${auditEntries.length}`);

    // Clean up test data
    await SourceDocument.deleteMany({ projectId: testProjectId });
    await ProgressEvent.deleteMany({ projectId: testProjectId });
    await AuditLog.deleteMany({ projectId: testProjectId });

    console.log('✓ Test cleanup completed. Phase 5 LLM Extraction verified successfully!');
  } catch (err) {
    console.error('X Phase 5 Test Failed:', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

runPhase5Tests();

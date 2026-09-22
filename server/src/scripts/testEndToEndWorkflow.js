const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = require('../app');

function makeRequest(port, path, method, data) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null;
    const options = {
      hostname: 'localhost',
      port: port,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {}),
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, body });
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (postData) req.write(postData);
    req.end();
  });
}

async function runEndToEndVerification() {
  console.log('=== PragatiPath Full End-to-End Workflow Verification ===');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('1. Connected to MongoDB database');

  const PORT = 5066;
  const server = app.listen(PORT);
  console.log(`2. Test server listening on port ${PORT}`);

  try {
    // Step 1: Import Baseline Schedule
    console.log('\n--- Step 1: Schedule Import ---');
    const importRes = await makeRequest(PORT, '/api/schedules/import', 'POST', {
      projectId: 'PS-26122',
      activities: [
        {
          activityId: 'A-PUMP-101',
          activityName: 'Pump P-101 Installation & Piping',
          wbsCode: '1.2.3',
          discipline: 'Piping',
          plannedStartDate: '2026-09-01',
          plannedFinishDate: '2026-09-15',
        },
        {
          activityId: 'A-CIVIL-202',
          activityName: 'Unit 2 Concrete Foundation Pouring',
          wbsCode: '1.1.4',
          discipline: 'Civil',
          plannedStartDate: '2026-09-05',
          plannedFinishDate: '2026-09-20',
        },
      ],
    });
    console.log('Import Schedule Response Status:', importRes.status);
    console.log('Imported Activities:', importRes.body.data?.importedCount || importRes.body.data?.length);

    if (importRes.status !== 200 && importRes.status !== 201) {
      throw new Error('Schedule import failed');
    }

    // Step 2: Progress Report Ingestion & AI Extraction
    console.log('\n--- Step 2: Progress Report Ingestion & AI Extraction ---');
    const textProgressRes = await makeRequest(PORT, '/api/progress/text', 'POST', {
      text: 'Pump P-101 installation was started yesterday on 2026-09-10 and completed today on 2026-09-11 in Unit 2.',
      rawContent: 'Pump P-101 installation was started yesterday on 2026-09-10 and completed today on 2026-09-11 in Unit 2.',
      submittedBy: 'site-supervisor-test',
    });
    console.log('Progress Ingestion Status:', textProgressRes.status);
    const extractedEvents = textProgressRes.body.data?.extractedEvents || [];
    console.log('Extracted Events Count:', extractedEvents.length);
    console.log('Extracted Event 1:', extractedEvents[0]);

    if (textProgressRes.status !== 201 && textProgressRes.status !== 200) {
      throw new Error('Progress report submission failed');
    }

    // Step 3: Schedule Activity Matching
    console.log('\n--- Step 3: Pending Review Queue ---');
    const pendingRes = await makeRequest(PORT, '/api/reviews/pending', 'GET', null);
    console.log('Pending Reviews Status:', pendingRes.status);
    let pendingItems = pendingRes.body.data?.pendingReviews || (Array.isArray(pendingRes.body.data) ? pendingRes.body.data : []);
    console.log('Pending Reviews Count:', pendingItems.length);

    if (pendingItems.length === 0) {
      console.log('No pending item found directly, running batch matching...');
      await makeRequest(PORT, '/api/matching/batch', 'POST', {});
      const retryPending = await makeRequest(PORT, '/api/reviews/pending', 'GET', null);
      pendingItems = retryPending.body.data?.pendingReviews || (Array.isArray(retryPending.body.data) ? retryPending.body.data : []);
      console.log('Retried Pending Reviews Count:', pendingItems.length);
    }

    const reviewItem = pendingItems[0];
    console.log('Target Review Item:', reviewItem?._id || reviewItem?.id);

    // Step 4: Planner Approval & Schedule Commit
    console.log('\n--- Step 4: Planner Review Approval & Schedule Update ---');
    if (reviewItem) {
      const eventId = reviewItem._id || reviewItem.id;
      const approveRes = await makeRequest(PORT, `/api/reviews/${eventId}/approve`, 'POST', {
        selectedActivityId: 'A-PUMP-101',
        actualStartDate: '2026-09-10',
        actualFinishDate: '2026-09-11',
        progressPercentage: 100,
        notes: 'Approved via end-to-end integration test',
      });
      console.log('Approve Match Status:', approveRes.status);
      console.log('Approve Match Response:', JSON.stringify(approveRes.body, null, 2));

      if (approveRes.status !== 200) {
        throw new Error('Planner approval failed');
      }
    }

    // Step 5: Verify Schedule Activity Actuals Updated in MongoDB
    console.log('\n--- Step 5: Verify Updated Schedule Activity ---');
    const schedListRes = await makeRequest(PORT, '/api/schedules', 'GET', null);
    const activitiesList = schedListRes.body.data?.activities || (Array.isArray(schedListRes.body.data) ? schedListRes.body.data : []);
    const updatedActivity = activitiesList.find((a) => a.activityId === 'A-PUMP-101');
    console.log('Updated Schedule Activity Actuals:', {
      activityId: updatedActivity?.activityId,
      actualStartDate: updatedActivity?.actualStartDate,
      actualFinishDate: updatedActivity?.actualFinishDate,
      progressPercentage: updatedActivity?.progressPercentage,
    });

    if (updatedActivity?.progressPercentage !== 100) {
      throw new Error('Schedule actuals were not updated properly');
    }

    // Step 6: Verify Immutable Audit History Log
    console.log('\n--- Step 6: Verify Audit History ---');
    const auditRes = await makeRequest(PORT, '/api/reviews/audit', 'GET', null);
    console.log('Audit Logs Status:', auditRes.status);
    console.log('Audit Logs Count:', auditRes.body.data?.length);
    console.log('Latest Audit Entry:', auditRes.body.data?.[0]);

    if (!auditRes.body.data || auditRes.body.data.length === 0) {
      throw new Error('Audit log record missing');
    }

    console.log('\n=== ALL END-TO-END INTEGRATION TESTS PASSED PERFECTLY! ===');
  } finally {
    server.close();
    await mongoose.disconnect();
    console.log('Test Server & Database connection closed.');
  }
}

runEndToEndVerification().catch((err) => {
  console.error('E2E Verification Error:', err);
  process.exit(1);
});

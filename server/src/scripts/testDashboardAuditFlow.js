const http = require('http');

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : '';
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
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

async function runDashboardAuditVerification() {
  console.log('=== PragatiPath Dashboard & Audit Log Integration Test ===\n');

  // 1. Health check
  console.log('1. Checking Backend Health...');
  const healthRes = await makeRequest('/api/health');
  console.log('Health Status:', healthRes.status, '| DB Connected:', healthRes.body.services?.database?.isConnected);
  if (healthRes.status !== 200 || !healthRes.body.services?.database?.isConnected) {
    throw new Error('Backend health check failed: Database not connected');
  }

  // 2. Fetch raw /api/reviews/audit response
  console.log('\n2. Fetching Raw /api/reviews/audit Response...');
  const auditRes = await makeRequest('/api/reviews/audit');
  console.log('Status:', auditRes.status);
  console.log('Backend Data Root Keys:', Object.keys(auditRes.body.data || {}));
  console.log('Is "logs" an array?', Array.isArray(auditRes.body.data?.logs));
  console.log('Log Count:', auditRes.body.data?.logs?.length);

  if (auditRes.status !== 200 || !Array.isArray(auditRes.body.data?.logs)) {
    throw new Error('Expected 200 OK with data.logs array');
  }

  // 3. Simulate Frontend api.js getAuditLogs() unwrapper
  console.log('\n3. Simulating Frontend api.js getAuditLogs() Layer...');
  const frontendAuditLogs = auditRes.body.data?.logs || [];
  console.log('Frontend received type:', typeof frontendAuditLogs);
  console.log('Is Array?', Array.isArray(frontendAuditLogs));

  // 4. Test .slice() and .map() (the exact operation that caused the crash)
  console.log('\n4. Executing auditLogs.slice(0, 5).map(...) in DashboardPage...');
  const sliced = frontendAuditLogs.slice(0, 5);
  console.log('Sliced items count:', sliced.length);
  const renderedLogs = sliced.map((log) => ({
    id: log._id,
    action: log.action,
    actor: log.actor || log.performedBy || 'SYSTEM',
    timestamp: log.timestamp,
  }));
  console.log('Rendered log preview:', JSON.stringify(renderedLogs, null, 2));

  // 5. Test empty array case
  console.log('\n5. Testing Empty Audit Log Array State...');
  const emptyLogs = [];
  const emptySlice = emptyLogs.slice(0, 5);
  console.log('Empty slice length:', emptySlice.length);
  if (emptySlice.length !== 0) throw new Error('Empty slice failed');

  // 6. Test all collection endpoints used by Dashboard
  console.log('\n6. Checking all Dashboard aggregator collection endpoints...');
  const [sched, events, pending, sources] = await Promise.all([
    makeRequest('/api/schedules'),
    makeRequest('/api/progress/events'),
    makeRequest('/api/reviews/pending'),
    makeRequest('/api/progress/sources'),
  ]);

  console.log('  /api/schedules -> activities isArray:', Array.isArray(sched.body.data?.activities));
  console.log('  /api/progress/events -> events isArray:', Array.isArray(events.body.data?.events));
  console.log('  /api/reviews/pending -> items isArray:', Array.isArray(pending.body.data?.items));
  console.log('  /api/progress/sources -> documents isArray:', Array.isArray(sources.body.data?.documents));

  if (
    !Array.isArray(sched.body.data?.activities) ||
    !Array.isArray(events.body.data?.events) ||
    !Array.isArray(pending.body.data?.items) ||
    !Array.isArray(sources.body.data?.documents)
  ) {
    throw new Error('One of the dashboard collection endpoints did not return expected array property');
  }

  console.log('\n====================================================');
  console.log('=== ALL DASHBOARD AUDIT TESTS PASSED (100%) ===');
  console.log('====================================================');
}

runDashboardAuditVerification().catch((err) => {
  console.error('\n❌ Verification Failed:', err.message);
  process.exit(1);
});

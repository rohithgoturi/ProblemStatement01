const http = require('http');

function makeRequest(path, method, data) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : '';
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
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

async function runTestSuite() {
  console.log('=== PragatiPath Signup & Auth Comprehensive Test Suite ===\n');
  const uniqueEmail = `engineer_${Date.now()}@pragatipath.gov.in`;

  // --- Case A: Valid new user ---
  console.log('--- Case A: Valid New User Signup ---');
  const caseA = await makeRequest('/api/auth/signup', 'POST', {
    name: 'Suresh Verma',
    email: uniqueEmail,
    password: 'SecurePassword123!',
    role: 'site_supervisor',
  });
  console.log('Status:', caseA.status);
  console.log('Response:', JSON.stringify(caseA.body, null, 2));

  if (caseA.status !== 201 || !caseA.body.success || !caseA.body.data?.token) {
    throw new Error('Case A Failed: Expected 201 Created with session token');
  }
  // Check password is NOT returned in response
  if (caseA.body.data?.user?.password || JSON.stringify(caseA.body).includes('SecurePassword123!')) {
    throw new Error('Case A Failed: Password leaked in response payload!');
  }
  console.log('✓ Case A Passed: User created successfully. No passwords leaked.\n');

  // --- Case B: Duplicate user / email ---
  console.log('--- Case B: Duplicate Email Signup ---');
  const caseB = await makeRequest('/api/auth/signup', 'POST', {
    name: 'Suresh Verma Duplicate',
    email: uniqueEmail,
    password: 'AnotherPassword456',
    role: 'site_supervisor',
  });
  console.log('Status:', caseB.status);
  console.log('Response:', JSON.stringify(caseB.body, null, 2));

  if (caseB.status !== 409 || caseB.body.success !== false || caseB.body.error?.code !== 'DUPLICATE_EMAIL') {
    throw new Error(`Case B Failed: Expected 409 Conflict with DUPLICATE_EMAIL code, got ${caseB.status}`);
  }
  console.log('✓ Case B Passed: Duplicate email properly rejected with 409 Conflict.\n');

  // --- Case C: Missing required field ---
  console.log('--- Case C: Missing Required Field (Name missing) ---');
  const caseC1 = await makeRequest('/api/auth/signup', 'POST', {
    email: `missing_name_${Date.now()}@pragatipath.gov.in`,
    password: 'Password123',
    role: 'planner',
  });
  console.log('Missing Name Status:', caseC1.status);
  console.log('Response:', JSON.stringify(caseC1.body, null, 2));

  if (caseC1.status !== 400 || caseC1.body.error?.code !== 'MISSING_FIELD') {
    throw new Error(`Case C1 Failed: Expected 400 with MISSING_FIELD, got ${caseC1.status}`);
  }

  console.log('--- Case C2: Missing Password ---');
  const caseC2 = await makeRequest('/api/auth/signup', 'POST', {
    name: 'Ramesh Singh',
    email: `missing_pass_${Date.now()}@pragatipath.gov.in`,
    role: 'planner',
  });
  console.log('Missing Password Status:', caseC2.status);
  console.log('Response:', JSON.stringify(caseC2.body, null, 2));

  if (caseC2.status !== 400 || caseC2.body.error?.code !== 'INVALID_PASSWORD') {
    throw new Error(`Case C2 Failed: Expected 400 with INVALID_PASSWORD, got ${caseC2.status}`);
  }
  console.log('✓ Case C Passed: Missing fields properly return 400 Bad Request.\n');

  // --- Case D: Invalid input (Invalid Email Syntax, Short Password) ---
  console.log('--- Case D: Invalid Email Format ---');
  const caseD1 = await makeRequest('/api/auth/signup', 'POST', {
    name: 'Anil Kumar',
    email: 'not-a-valid-email',
    password: 'Password123',
    role: 'planner',
  });
  console.log('Invalid Email Status:', caseD1.status);
  console.log('Response:', JSON.stringify(caseD1.body, null, 2));

  if (caseD1.status !== 400 || caseD1.body.error?.code !== 'INVALID_EMAIL') {
    throw new Error(`Case D1 Failed: Expected 400 with INVALID_EMAIL, got ${caseD1.status}`);
  }

  console.log('--- Case D2: Short Password (< 6 chars) ---');
  const caseD2 = await makeRequest('/api/auth/signup', 'POST', {
    name: 'Anil Kumar',
    email: `valid_${Date.now()}@test.com`,
    password: '123',
    role: 'planner',
  });
  console.log('Short Password Status:', caseD2.status);
  console.log('Response:', JSON.stringify(caseD2.body, null, 2));

  if (caseD2.status !== 400 || caseD2.body.error?.code !== 'INVALID_PASSWORD') {
    throw new Error(`Case D2 Failed: Expected 400 with INVALID_PASSWORD, got ${caseD2.status}`);
  }
  console.log('✓ Case D Passed: Invalid inputs properly return 400 Bad Request.\n');

  // --- Verification 11: Login with newly created user ---
  console.log('--- Verification: Login Flow with Newly Registered User ---');
  const loginRes = await makeRequest('/api/auth/login', 'POST', {
    email: uniqueEmail,
    password: 'SecurePassword123!',
  });
  console.log('Login Status:', loginRes.status);
  console.log('Response:', JSON.stringify(loginRes.body, null, 2));

  if (loginRes.status !== 200 || !loginRes.body.success || !loginRes.body.data?.token) {
    throw new Error('Login Verification Failed: Expected 200 OK with token');
  }
  if (loginRes.body.data?.user?.password || JSON.stringify(loginRes.body).includes('SecurePassword123!')) {
    throw new Error('Login Verification Failed: Password leaked in login response!');
  }
  console.log('✓ Login Verification Passed: Existing login flow operates perfectly.\n');

  // --- Verification 11b: Login with wrong password ---
  console.log('--- Verification: Login with Wrong Password ---');
  const wrongLoginRes = await makeRequest('/api/auth/login', 'POST', {
    email: uniqueEmail,
    password: 'WrongPassword!',
  });
  console.log('Wrong Password Status:', wrongLoginRes.status);
  console.log('Response:', JSON.stringify(wrongLoginRes.body, null, 2));

  if (wrongLoginRes.status !== 401 || wrongLoginRes.body.error?.code !== 'INVALID_CREDENTIALS') {
    throw new Error('Wrong Password Verification Failed: Expected 401 with INVALID_CREDENTIALS');
  }
  console.log('✓ Wrong Password Verification Passed: Returns 401 Unauthorized.\n');

  console.log('====================================================');
  console.log('=== ALL TEST CASES PASSED SUCCESSFULLY (100%) ===');
  console.log('====================================================');
}

runTestSuite().catch((err) => {
  console.error('\n❌ Test Suite Error:', err.message);
  process.exit(1);
});

const http = require('http');

function makeRequest(path, method, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
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
    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('=== Testing PragatiPath Auth Endpoints ===');
  
  const testEmail = `testuser_${Date.now()}@pragatipath.com`;

  // Test 1: Successful Signup
  console.log('\nTest 1: Signup with valid details...');
  const signupRes = await makeRequest('/api/auth/signup', 'POST', {
    name: 'Test Planner',
    email: testEmail,
    password: 'password123',
    role: 'planner',
  });
  console.log('Signup Status:', signupRes.status);
  console.log('Signup Response:', JSON.stringify(signupRes.body, null, 2));

  if (signupRes.status !== 201 || !signupRes.body.success) {
    console.error('FAILED Test 1');
    process.exit(1);
  }

  // Test 2: Duplicate Signup
  console.log('\nTest 2: Signup with existing email (duplicate check)...');
  const dupRes = await makeRequest('/api/auth/signup', 'POST', {
    name: 'Test Planner Duplicate',
    email: testEmail,
    password: 'password123',
    role: 'planner',
  });
  console.log('Duplicate Signup Status:', dupRes.status);
  console.log('Duplicate Response:', JSON.stringify(dupRes.body, null, 2));

  if (![400, 409].includes(dupRes.status) || dupRes.body.error?.code !== 'DUPLICATE_EMAIL') {
    console.error('FAILED Test 2');
    process.exit(1);
  }

  // Test 3: Login with newly created credentials
  console.log('\nTest 3: Login with newly created user...');
  const loginRes = await makeRequest('/api/auth/login', 'POST', {
    email: testEmail,
    password: 'password123',
  });
  console.log('Login Status:', loginRes.status);
  console.log('Login Response:', JSON.stringify(loginRes.body, null, 2));

  if (loginRes.status !== 200 || !loginRes.body.success) {
    console.error('FAILED Test 3');
    process.exit(1);
  }

  console.log('\n=== ALL AUTH TESTS PASSED SUCCESSFULY! ===');
}

runTests().catch(err => {
  console.error('Test script error:', err);
  process.exit(1);
});

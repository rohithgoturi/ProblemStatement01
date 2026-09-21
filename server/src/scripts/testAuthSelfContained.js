const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = require('../app');
const { connectDB } = require('../config/db');

function makeRequest(port, path, method, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const options = {
      hostname: 'localhost',
      port: port,
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

async function runSelfContainedTests() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected.');

  const TEST_PORT = 5055;
  const server = app.listen(TEST_PORT);
  console.log(`Test Express server listening on port ${TEST_PORT}`);

  try {
    const testEmail = `testuser_${Date.now()}@pragatipath.com`;

    // Test 1: Successful Signup
    console.log('\nTest 1: Signup with valid details...');
    const signupRes = await makeRequest(TEST_PORT, '/api/auth/signup', 'POST', {
      name: 'Test Planner',
      email: testEmail,
      password: 'password123',
      role: 'planner',
    });
    console.log('Signup Status:', signupRes.status);
    console.log('Signup Response:', JSON.stringify(signupRes.body, null, 2));

    if (signupRes.status !== 201 || !signupRes.body.success) {
      throw new Error('FAILED Test 1: Signup failed');
    }

    // Test 2: Duplicate Signup
    console.log('\nTest 2: Signup with existing email (duplicate check)...');
    const dupRes = await makeRequest(TEST_PORT, '/api/auth/signup', 'POST', {
      name: 'Test Planner Duplicate',
      email: testEmail,
      password: 'password123',
      role: 'planner',
    });
    console.log('Duplicate Signup Status:', dupRes.status);
    console.log('Duplicate Response:', JSON.stringify(dupRes.body, null, 2));

    if (dupRes.status !== 400 || dupRes.body.error?.code !== 'DUPLICATE_EMAIL') {
      throw new Error('FAILED Test 2: Duplicate check failed');
    }

    // Test 3: Login with newly created credentials
    console.log('\nTest 3: Login with newly created user...');
    const loginRes = await makeRequest(TEST_PORT, '/api/auth/login', 'POST', {
      email: testEmail,
      password: 'password123',
    });
    console.log('Login Status:', loginRes.status);
    console.log('Login Response:', JSON.stringify(loginRes.body, null, 2));

    if (loginRes.status !== 200 || !loginRes.body.success) {
      throw new Error('FAILED Test 3: Login failed');
    }

    console.log('\n=== ALL AUTH TESTS PASSED SUCCESSFULLY! ===');
  } finally {
    server.close();
    await mongoose.disconnect();
    console.log('Server & DB closed.');
  }
}

runSelfContainedTests().catch(err => {
  console.error('Test script error:', err);
  process.exit(1);
});

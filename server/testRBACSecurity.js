/**
 * PragatiPath — RBAC Security & Auth Integration Test Suite
 * Validates authentication, identity verification, anti-escalation guards, and role permissions.
 */

const BASE_URL = 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    // Non-JSON response
  }

  return { status: res.status, data };
}

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    throw new Error(message);
  }
  console.log(`✅ PASSED: ${message}`);
}

function getErrorCode(res) {
  if (typeof res.data?.error === 'string') return res.data.error;
  return res.data?.error?.code;
}

async function runTests() {
  console.log('====================================================');
  console.log('PRAGATIPATH RBAC & AUTH SECURITY TEST SUITE');
  console.log('====================================================\n');

  const timestamp = Date.now();
  const testUserEmail = `sec_test_${timestamp}@example.com`;
  const testPlannerEmail = `sec_planner_${timestamp}@example.com`;
  const testAdminEmail = `sec_admin_${timestamp}@example.com`;
  const password = 'Password@123';
  const newPassword = 'NewPassword@456';

  // 1. Unauthenticated / Invalid Token tests
  console.log('--- TEST GROUP 1: Token Verification & 401 Enforcement ---');
  const noTokenRes = await request('/auth/me');
  assert(noTokenRes.status === 401, 'Request without token returns 401 Unauthorized');
  assert(getErrorCode(noTokenRes) === 'UNAUTHORIZED', 'Returns UNAUTHORIZED error code');

  const invalidTokenRes = await request('/auth/me', { token: 'invalid.token.payload' });
  assert(invalidTokenRes.status === 401, 'Request with invalid token returns 401 Unauthorized');
  assert(getErrorCode(invalidTokenRes) === 'INVALID_TOKEN', 'Returns INVALID_TOKEN error code');

  // 2. User Registration & Token issuance
  console.log('\n--- TEST GROUP 2: Registration & JWT Token Issuance ---');
  const signupRes = await request('/auth/signup', {
    method: 'POST',
    body: {
      name: 'Security Test Supervisor',
      email: testUserEmail,
      password: password,
      role: 'site_supervisor',
    },
  });
  assert(signupRes.status === 201, 'Signup creates user successfully with 201 Created');
  assert(!!signupRes.data?.data?.token || !!signupRes.data?.token, 'Signup response contains signed JWT token');
  const token = signupRes.data?.data?.token || signupRes.data?.token;
  const supervisorUser = signupRes.data?.data?.user || signupRes.data?.user;
  assert(supervisorUser?.role === 'site_supervisor', 'User created with specified role');
  assert(!supervisorUser?.password, 'User password is NOT exposed in signup response');
  const supervisorToken = token;
  const supervisorId = supervisorUser?._id || supervisorUser?.id;

  // 3. GET /api/auth/me Identity Retrieval
  console.log('\n--- TEST GROUP 3: Live Identity Retrieval via /api/auth/me ---');
  const meRes = await request('/auth/me', { token: supervisorToken });
  assert(meRes.status === 200, 'GET /api/auth/me returns 200 OK');
  const meUser = meRes.data?.data?.user || meRes.data?.data;
  assert(meUser?.email === testUserEmail, 'Returns authenticated user email');
  assert(meUser?.role === 'site_supervisor', 'Returns authenticated user role');
  assert(!meUser?.password, 'User password is never returned by /auth/me');

  // 4. Self-Role Escalation Prevention
  console.log('\n--- TEST GROUP 4: Anti-Role Escalation Defense ---');
  const escalateRes = await request('/auth/profile', {
    method: 'PUT',
    token: supervisorToken,
    body: {
      name: 'Attempting Escalation',
      role: 'admin', // Malicious attempt to elevate to admin
    },
  });
  assert(escalateRes.status === 403, 'Attempting self-role elevation returns 403 Forbidden');
  assert(getErrorCode(escalateRes) === 'ROLE_MODIFICATION_FORBIDDEN', 'Returns ROLE_MODIFICATION_FORBIDDEN');

  // Valid profile update (name + avatar)
  const validProfileRes = await request('/auth/profile', {
    method: 'PUT',
    token: supervisorToken,
    body: {
      name: 'Supervisor Verified',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    },
  });
  assert(validProfileRes.status === 200, 'Updating name & avatar returns 200 OK');
  const updatedUser = validProfileRes.data?.data?.user || validProfileRes.data?.data;
  assert(updatedUser?.name === 'Supervisor Verified', 'Updated name reflected');
  assert(updatedUser?.avatar.includes('unsplash'), 'Updated avatar URL reflected');

  // 5. Password Change Workflow
  console.log('\n--- TEST GROUP 5: Password Change & Authentication Verification ---');
  const wrongOldPassRes = await request('/auth/change-password', {
    method: 'PUT',
    token: supervisorToken,
    body: {
      currentPassword: 'WrongPassword123',
      newPassword: newPassword,
    },
  });
  assert(wrongOldPassRes.status === 400 || wrongOldPassRes.status === 401, 'Incorrect old password rejected (status ' + wrongOldPassRes.status + ')');

  const validPassRes = await request('/auth/change-password', {
    method: 'PUT',
    token: supervisorToken,
    body: {
      currentPassword: password,
      newPassword: newPassword,
    },
  });
  assert(validPassRes.status === 200, 'Valid password change returns 200 OK');

  // Verify login with new password
  const loginNewRes = await request('/auth/login', {
    method: 'POST',
    body: {
      email: testUserEmail,
      password: newPassword,
    },
  });
  assert(loginNewRes.status === 200, 'Login with new password succeeds with 200 OK');

  // 6. RBAC on Operational Endpoints (Review Approval)
  console.log('\n--- TEST GROUP 6: Operational RBAC Endpoint Authorization ---');
  // Register a planner
  const signupPlanner = await request('/auth/signup', {
    method: 'POST',
    body: {
      name: 'Chief Planner',
      email: testPlannerEmail,
      password: password,
      role: 'planner',
    },
  });
  const plannerToken = signupPlanner.data?.data?.token || signupPlanner.data?.token;

  // Site Supervisor attempts to approve a review -> MUST BE 403 Forbidden
  const supervisorApproveRes = await request('/reviews/dummy-event-id/approve', {
    method: 'POST',
    token: supervisorToken,
    body: { notes: 'Unauthorized approval attempt' },
  });
  assert(supervisorApproveRes.status === 403, 'Site Supervisor calling /reviews/:id/approve returns 403 Forbidden');
  assert(getErrorCode(supervisorApproveRes) === 'FORBIDDEN', 'Error code is FORBIDDEN');

  // Planner calls /reviews/:id/approve -> Passes role check (returns 404 because dummy-event-id doesn't exist, but NOT 403)
  const plannerApproveRes = await request('/reviews/dummy-event-id/approve', {
    method: 'POST',
    token: plannerToken,
    body: { notes: 'Authorized approval test' },
  });
  assert(plannerApproveRes.status !== 403 && plannerApproveRes.status !== 401, 'Planner calling /reviews/:id/approve is authorized through RBAC (returned ' + plannerApproveRes.status + ')');

  // 7. Administrative Governance & Role Modification
  console.log('\n--- TEST GROUP 7: Admin Governance & Centralized Role Assignment ---');
  // Register Admin user
  const signupAdmin = await request('/auth/signup', {
    method: 'POST',
    body: {
      name: 'System Admin',
      email: testAdminEmail,
      password: password,
      role: 'admin',
    },
  });
  const adminToken = signupAdmin.data?.data?.token || signupAdmin.data?.token;

  // Non-admin (planner) calls GET /api/admin/users -> MUST BE 403 Forbidden
  const nonAdminListRes = await request('/admin/users', { token: plannerToken });
  assert(nonAdminListRes.status === 403, 'Non-admin calling /api/admin/users returns 403 Forbidden');

  // Admin calls GET /api/admin/users -> 200 OK
  const adminListRes = await request('/admin/users', { token: adminToken });
  assert(adminListRes.status === 200, 'Admin calling /api/admin/users returns 200 OK');
  const userList = adminListRes.data?.data?.users || adminListRes.data?.data;
  assert(Array.isArray(userList), 'Returns array of user accounts');
  const foundUser = userList.find((u) => u.email === testUserEmail);
  assert(!!foundUser, 'Newly registered supervisor found in admin directory');

  // Admin promotes supervisor to project_manager
  const promoteRes = await request(`/admin/users/${supervisorId}/role`, {
    method: 'PUT',
    token: adminToken,
    body: { role: 'project_manager' },
  });
  assert(promoteRes.status === 200, 'Admin successfully promotes user role with 200 OK');
  const promotedUser = promoteRes.data?.data?.user || promoteRes.data?.data;
  assert(promotedUser?.role === 'project_manager', 'Target user role updated to project_manager');

  // Verify the updated user has new role in GET /api/auth/me
  const verifyMeRes = await request('/auth/me', { token: supervisorToken });
  const verifyMeUser = verifyMeRes.data?.data?.user || verifyMeRes.data?.data;
  assert(verifyMeUser?.role === 'project_manager', 'Promoted user /api/auth/me now reflects project_manager');

  console.log('\n====================================================');
  console.log('ALL RBAC & AUTH SECURITY TESTS PASSED SUCCESSFULLY! 🎉');
  console.log('====================================================');
}

runTests().catch((err) => {
  console.error('\nSecurity Test Suite Aborted due to error:', err);
  process.exit(1);
});

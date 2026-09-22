/**
 * PragatiPath API Service — Real Backend Integration Layer
 * All mock data has been removed. All functions connect directly to the Express backend.
 */

import client from './client';

// Helper helper to format standard error/success response wrapper
const handleRequest = async (promise) => {
  try {
    const res = await promise;
    return { data: res.data?.data !== undefined ? res.data.data : res.data, message: res.data?.message || null, error: null };
  } catch (err) {
    return { data: null, error: err.message || 'API Request Failed' };
  }
};

// ==========================================
// 1. AUTHENTICATION API
// ==========================================

export const signup = async ({ name, email, password, role, avatar }) => {
  return handleRequest(client.post('/auth/signup', { name, email, password, role, avatar }));
};

export const login = async ({ email, password }) => {
  return handleRequest(client.post('/auth/login', { email, password }));
};

export const logout = async () => {
  localStorage.removeItem('pragatipath_token');
  localStorage.removeItem('pragatipath_auth');
  localStorage.removeItem('pragatipath_demo_role');
  return { data: { success: true }, error: null };
};

export const getCurrentUser = async () => {
  const res = await handleRequest(client.get('/auth/me'));
  return { ...res, data: res.data?.user || res.data };
};

export const updateUserProfile = async (profileData) => {
  const res = await handleRequest(client.put('/auth/profile', profileData));
  return { ...res, data: res.data?.user || res.data };
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  return handleRequest(client.put('/auth/change-password', { currentPassword, newPassword }));
};

// ==========================================
// 1b. ADMIN GOVERNANCE API
// ==========================================

export const getAdminUsers = async () => {
  const res = await handleRequest(client.get('/admin/users'));
  const users = res.data?.users || (Array.isArray(res.data) ? res.data : []);
  return { ...res, data: Array.isArray(users) ? users : [] };
};

export const updateUserRole = async (userId, role) => {
  return handleRequest(client.put(`/admin/users/${userId}/role`, { role }));
};

export const getAdminStats = async () => {
  return handleRequest(client.get('/admin/stats'));
};

// ==========================================
// ==========================================
// 2. SCHEDULE API
// ==========================================

export const getScheduleActivities = async (params = {}) => {
  const res = await handleRequest(client.get('/schedules', { params }));
  const acts = res.data?.activities || (Array.isArray(res.data) ? res.data : []);
  return {
    ...res,
    data: Array.isArray(acts) ? acts : [],
    pagination: res.data?.activities
      ? {
          total: res.data.total ?? acts.length,
          page: res.data.page ?? 1,
          totalPages: res.data.totalPages ?? 1,
          count: res.data.count ?? acts.length,
        }
      : null,
  };
};

export const getScheduleActivityById = async (id) => {
  return handleRequest(client.get(`/schedules/${id}`));
};

export const importSchedule = async (fileOrFormData) => {
  if (fileOrFormData instanceof FormData) {
    return handleRequest(
      client.post('/schedules/import', fileOrFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );
  }
  return handleRequest(client.post('/schedules/import', fileOrFormData));
};

export const clearSchedule = async () => {
  return handleRequest(client.delete('/schedules'));
};

// ==========================================
// 3. PROGRESS INGESTION API
// ==========================================

export const getSourceDocuments = async (params = {}) => {
  const res = await handleRequest(client.get('/progress/sources', { params }));
  const docs = res.data?.documents || (Array.isArray(res.data) ? res.data : []);
  return {
    ...res,
    data: Array.isArray(docs) ? docs : [],
    pagination: res.data?.documents
      ? {
          total: res.data.total ?? docs.length,
          page: res.data.page ?? 1,
          totalPages: res.data.totalPages ?? 1,
          count: res.data.count ?? docs.length,
        }
      : null,
  };
};

export const getProgressEvents = async (params = {}) => {
  const res = await handleRequest(client.get('/progress/events', { params }));
  const evts = res.data?.events || (Array.isArray(res.data) ? res.data : []);
  return {
    ...res,
    data: Array.isArray(evts) ? evts : [],
    pagination: res.data?.events
      ? {
          total: res.data.total ?? evts.length,
          page: res.data.page ?? 1,
          totalPages: res.data.totalPages ?? 1,
          count: res.data.count ?? evts.length,
        }
      : null,
  };
};

export const uploadProgressFile = async (formData) => {
  return handleRequest(
    client.post('/progress/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  );
};

export const submitTextProgress = async (payload) => {
  return handleRequest(client.post('/progress/text', payload));
};

// Legacy alias for compatibility with existing UI
export const submitDPR = async (payload) => {
  if (payload instanceof FormData) {
    return uploadProgressFile(payload);
  }
  return submitTextProgress(payload);
};

// ==========================================
// 4. AI EXTRACTION API
// ==========================================

export const extractProgressFromSource = async (sourceId) => {
  return handleRequest(client.post(`/extraction/source/${sourceId}`));
};

export const extractProgressFromText = async (text) => {
  return handleRequest(client.post('/extraction/text', { text }));
};

// ==========================================
// 5. MATCHING ENGINE API
// ==========================================

export const matchSingleEvent = async (eventId) => {
  return handleRequest(client.post(`/matching/event/${eventId}`));
};

export const batchMatchEvents = async (projectId = null) => {
  const endpoint = projectId ? `/matching/project/${projectId}` : '/matching/batch';
  return handleRequest(client.post(endpoint, { projectId }));
};

export const getUnmatchedEvents = async (params = {}) => {
  const res = await handleRequest(client.get('/matching/unmatched', { params }));
  const evts = res.data?.events || (Array.isArray(res.data) ? res.data : []);
  return {
    ...res,
    data: Array.isArray(evts) ? evts : [],
    pagination: res.data?.events
      ? {
          total: res.data.total ?? evts.length,
          page: res.data.page ?? 1,
          totalPages: res.data.totalPages ?? 1,
          count: res.data.count ?? evts.length,
        }
      : null,
  };
};

// ==========================================
// 6. PLANNER REVIEW & APPROVAL API
// ==========================================

export const getPendingReviews = async (params = {}) => {
  const res = await handleRequest(client.get('/reviews/pending', { params }));
  const items = res.data?.items || res.data?.pendingReviews || (Array.isArray(res.data) ? res.data : []);
  return {
    ...res,
    data: Array.isArray(items) ? items : [],
    pagination: res.data?.items
      ? {
          total: res.data.total ?? items.length,
          page: res.data.page ?? 1,
          totalPages: res.data.totalPages ?? 1,
          count: res.data.count ?? items.length,
        }
      : null,
  };
};

export const approveMatch = async (eventId, payload = {}) => {
  const body = {
    scheduleActivityId: payload.selectedActivityId || payload.scheduleActivityId,
    actualStartDate: payload.actualStartDate,
    actualFinishDate: payload.actualFinishDate,
    progressPercentage: payload.progressPercentage,
    reviewerNotes: payload.notes || payload.reviewerNotes,
  };
  return handleRequest(client.post(`/reviews/${eventId}/approve`, body));
};

export const editAndApproveMatch = async (eventId, payload = {}) => {
  const body = {
    scheduleActivityId: payload.selectedActivityId || payload.scheduleActivityId,
    extractedActivityName: payload.extractedActivityName,
    discipline: payload.discipline,
    location: payload.location,
    actualStartDate: payload.actualStartDate,
    actualFinishDate: payload.actualFinishDate,
    progressPercentage: payload.progressPercentage,
    reviewerNotes: payload.notes || payload.reviewerNotes,
  };
  return handleRequest(client.post(`/reviews/${eventId}/edit`, body));
};

export const rejectMatch = async (eventId, payload = {}) => {
  const body = {
    reviewerNotes: payload.notes || payload.reviewerNotes || 'Rejected by planner review',
  };
  return handleRequest(client.post(`/reviews/${eventId}/reject`, body));
};

// Legacy alias for existing UI components
export const validateCandidateMatch = async (eventId, action, details = {}) => {
  if (action === 'approve') {
    return approveMatch(eventId, details);
  } else if (action === 'reject') {
    return rejectMatch(eventId, details);
  } else {
    return editAndApproveMatch(eventId, details);
  }
};

// ==========================================
// 7. AUDIT HISTORY & REPORTS API
// ==========================================

export const getAuditLogs = async (params = {}) => {
  const res = await handleRequest(client.get('/reviews/audit', { params }));
  const logs = res.data?.logs || res.data?.auditLogs || (Array.isArray(res.data) ? res.data : []);
  return {
    ...res,
    data: Array.isArray(logs) ? logs : [],
    pagination: res.data?.logs
      ? {
          total: res.data.total ?? logs.length,
          page: res.data.page ?? 1,
          totalPages: res.data.totalPages ?? 1,
          count: res.data.count ?? logs.length,
        }
      : null,
  };
};

// NOTE: triggerReportExport removed — ReportsPage handles CSV export client-side.
// There is no backend export endpoint. Use handleExportCSV in ReportsPage directly.

// ==========================================
// 8. DASHBOARD SUMMARY AGGREGATOR
// ==========================================

export const getDashboardSummary = async () => {
  try {
    const [schedulesRes, eventsRes, pendingRes, sourcesRes] = await Promise.all([
      getScheduleActivities(),
      getProgressEvents(),
      getPendingReviews(),
      getSourceDocuments(),
    ]);

    const activities = schedulesRes.data || [];
    const events = eventsRes.data || [];
    const pendingReviews = pendingRes.data || [];
    const sources = sourcesRes.data || [];

    const completed = activities.filter((a) => a.actualFinishDate || a.progressPercentage >= 100).length;
    const inProgress = activities.filter((a) => a.actualStartDate && (a.progressPercentage < 100 || !a.actualFinishDate)).length;
    const pendingCount = pendingReviews.length;
    const approvedEvents = events.filter((e) => e.status === 'APPROVED').length;

    return {
      data: {
        totalActivities: activities.length,
        completedActivities: completed,
        inProgressActivities: inProgress,
        notStartedActivities: activities.length - (completed + inProgress),
        pendingReviewsCount: pendingCount,
        approvedEventsCount: approvedEvents,
        totalSources: sources.length,
        activities,
        events,
        pendingReviews,
        sources,
      },
      error: null,
    };
  } catch (err) {
    return { data: null, error: err.message || 'Failed to fetch dashboard summary' };
  }
};

export async function getTeamMembers() {
  const { data } = await client.get('/team');
  return data;
}


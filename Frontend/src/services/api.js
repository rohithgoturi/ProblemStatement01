/**
 * PragatiPath API Service — Frontend Abstraction Layer
 *
 * This file provides a clean API boundary between the UI and data layer.
 * Currently uses mock data. Replace the implementations with real HTTP
 * calls when backend integration is ready.
 *
 * Pattern: all service functions return Promises to match real API behavior.
 */

import { projects, projectSummary } from '../data/projects';
import { dprs, dprStatusCounts } from '../data/dprs';
import { scheduleActivities, scheduleStats } from '../data/schedule';

// Simulate network delay
const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

// ---- Projects ----

export const getProjectSummary = async () => {
  await delay();
  return { data: projectSummary, error: null };
};

export const getProjects = async ({ status = null, search = '' } = {}) => {
  await delay();
  let result = [...projects];
  if (status) result = result.filter(p => p.status === status);
  if (search) result = result.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );
  return { data: result, error: null };
};

export const getProjectById = async (id) => {
  await delay();
  const project = projects.find(p => p.id === id);
  if (!project) return { data: null, error: 'Project not found' };
  return { data: project, error: null };
};

// ---- DPRs ----

export const getDPRStatusCounts = async () => {
  await delay();
  return { data: dprStatusCounts, error: null };
};

export const getDPRs = async ({ projectId = null, status = null } = {}) => {
  await delay();
  let result = [...dprs];
  if (projectId) result = result.filter(d => d.projectId === projectId);
  if (status)    result = result.filter(d => d.status === status);
  return { data: result, error: null };
};

export const submitDPR = async (payload) => {
  await delay(800);
  // Mock successful submission
  return {
    data: { id: `DPR-${Date.now()}`, status: 'pending_extraction', ...payload },
    error: null,
  };
};

// ---- Schedule ----

export const getScheduleStats = async () => {
  await delay();
  return { data: scheduleStats, error: null };
};

export const getScheduleActivities = async ({ status = null, discipline = null } = {}) => {
  await delay();
  let result = [...scheduleActivities];
  if (status)     result = result.filter(a => a.status === status);
  if (discipline) result = result.filter(a => a.discipline === discipline);
  return { data: result, error: null };
};

// ---- Auth (frontend mock only) ----

export const login = async ({ email, password, role }) => {
  await delay(800);
  if (!email || !password) return { data: null, error: 'Email and password required' };
  // Mock successful login
  return {
    data: {
      token: 'mock-jwt-token',
      user: {
        id: 'USR-001',
        name: 'Rajesh Kumar',
        role: role || 'project_manager',
        email,
      },
    },
    error: null,
  };
};

export const logout = async () => {
  await delay(200);
  return { data: { success: true }, error: null };
};

// ---- AI Matching & Verification ----
import { AI_MATCHING_DATA } from '../data/aiMatchingData';
import { PROGRESS_TRACKING_DATA } from '../data/progressData';

export const getAIMatchingData = async () => {
  await delay(300);
  return { data: AI_MATCHING_DATA, error: null };
};

export const validateCandidateMatch = async (id, action) => {
  await delay(300);
  return {
    data: {
      id,
      action, // 'approve' | 'change' | 'reject'
      timestamp: new Date().toISOString(),
      updatedStatus: action === 'approve' ? 'Approved' : action === 'reject' ? 'Rejected' : 'Changed',
    },
    error: null,
  };
};

// ---- Progress Tracking ----

export const getProgressTrackingData = async () => {
  await delay(300);
  return { data: PROGRESS_TRACKING_DATA, error: null };
};

// ---- Reports & Export ----
import { REPORTS_DATA } from '../data/reportsData';

export const getReportsData = async () => {
  await delay(300);
  return { data: REPORTS_DATA, error: null };
};

export const triggerReportExport = async (reportId, format = 'PDF') => {
  await delay(500);
  return {
    data: {
      success: true,
      reportId,
      format,
      downloadUrl: `#download-${reportId}-${Date.now()}`,
      generatedAt: new Date().toISOString(),
    },
    error: null,
  };
};



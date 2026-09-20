// ============================================================
// PRAGATIPATH — Mock Services
// Typed stub functions. Backend developer: replace these with
// real API calls. Keep signatures stable.
// ============================================================

import { delay } from '@/lib/utils';
import { MOCK_PROJECTS } from '@/data/mock/projects';
import { MOCK_ACTIVITIES } from '@/data/mock/activities';
import { MOCK_SCHEDULE } from '@/data/mock/schedule';
import { MOCK_OBSERVATIONS } from '@/data/mock/observations';
import { MOCK_MATCHES } from '@/data/mock/matches';
import { MOCK_PROGRESS_SUMMARY } from '@/data/mock/progress';
import { MOCK_EXCEPTIONS } from '@/data/mock/exceptions';
import { MOCK_REPORT_TEMPLATES, MOCK_RECENT_REPORTS } from '@/data/mock/reports';
import type {
  Project, Activity, ScheduleEntry, FieldObservation,
  MatchRecord, ProgressSummary, Exception,
  ReportTemplate, ReportRecord, DemoUser, DemoRole,
} from '@/types';

// ============================================================
// Auth
// TODO: Replace with POST /api/auth/login
// ============================================================

export async function loginDemo(
  _email: string,
  _password: string,
  role: DemoRole
): Promise<DemoUser> {
  await delay(800);
  return {
    id: 'demo-user-001',
    name: 'Rajiv Mehta',
    role,
    email: _email,
    department: 'Project Controls',
    avatarInitials: 'RM',
  };
}

// ============================================================
// Projects
// TODO: Replace with GET /api/projects
// ============================================================

export async function getProjects(): Promise<Project[]> {
  await delay(300);
  return MOCK_PROJECTS;
}

// ============================================================
// Dashboard
// TODO: Replace with GET /api/projects/:id/dashboard
// ============================================================

export async function getProjectDashboard(projectId: string) {
  await delay(400);
  const activities = MOCK_ACTIVITIES.filter(() => true); // all for P-101
  const exceptions = MOCK_EXCEPTIONS.filter((e) => !e.resolved);
  const summary = {
    projectId,
    plannedProgress: 68.4,
    actualProgress: 64.1,
    variance: -4.3,
    criticalActivities: 2,
    pendingVerification: 3,
    overdue: 1,
  };
  return { summary, activities, exceptions };
}

// ============================================================
// Schedule
// TODO: Replace with GET /api/projects/:id/schedule
// ============================================================

export async function getScheduleRegistry(_projectId: string): Promise<ScheduleEntry[]> {
  await delay(350);
  return MOCK_SCHEDULE;
}

// ============================================================
// Field Observations (DPR)
// TODO: Replace with GET /api/observations?projectId=:id
// ============================================================

export async function getFieldObservations(_projectId: string): Promise<FieldObservation[]> {
  await delay(300);
  return MOCK_OBSERVATIONS;
}

// ============================================================
// DPR Extraction Simulation
// TODO: Replace with POST /api/dpr/upload (multipart)
// ============================================================

export async function simulateDprExtraction(input: {
  type: string;
  text?: string;
  fileName?: string;
}): Promise<FieldObservation> {
  // Simulate processing time
  await delay(1600);

  // Return the primary demo observation regardless of input
  // Backend: this is where OCR/NLP/speech-to-text would process the input
  return MOCK_OBSERVATIONS[0];
}

// ============================================================
// AI Matching
// TODO: Replace with GET /api/observations/:id/candidates
// ============================================================

export async function simulateMatch(observationId: string): Promise<MatchRecord> {
  await delay(1200);
  const match = MOCK_MATCHES.find((m) => m.observationId === observationId);
  return match ?? MOCK_MATCHES[0];
}

// ============================================================
// Match Confirmation
// TODO: Replace with POST /api/matches/:id/confirm
// ============================================================

export async function confirmMatchService(
  _matchId: string,
  _reviewer: string
): Promise<{ success: boolean; message: string }> {
  await delay(600);
  return { success: true, message: 'Match confirmed. Activity progress updated.' };
}

// ============================================================
// Match Rejection
// TODO: Replace with POST /api/matches/:id/reject
// ============================================================

export async function rejectMatchService(
  _matchId: string,
  _reason: string
): Promise<{ success: boolean; message: string }> {
  await delay(400);
  return { success: true, message: 'Match rejected.' };
}

// ============================================================
// Progress Intelligence
// TODO: Replace with GET /api/projects/:id/progress
// ============================================================

export async function getProgress(_projectId: string): Promise<ProgressSummary> {
  await delay(400);
  return MOCK_PROGRESS_SUMMARY;
}

// ============================================================
// Exceptions
// TODO: Replace with GET /api/projects/:id/exceptions
// ============================================================

export async function getExceptions(_projectId: string): Promise<Exception[]> {
  await delay(300);
  return MOCK_EXCEPTIONS.filter((e) => !e.resolved);
}

// ============================================================
// Reports
// TODO: Replace with GET /api/reports?projectId=:id
// ============================================================

export async function getReports(_projectId: string): Promise<{
  templates: ReportTemplate[];
  recent: ReportRecord[];
}> {
  await delay(350);
  return {
    templates: MOCK_REPORT_TEMPLATES,
    recent: MOCK_RECENT_REPORTS,
  };
}

// ============================================================
// Report Generation Simulation
// TODO: Replace with POST /api/reports/generate
// ============================================================

export async function simulateReportGeneration(
  templateId: string,
  _projectId: string
): Promise<ReportRecord> {
  // Simulate generation time
  await delay(2000);
  const template = MOCK_REPORT_TEMPLATES.find((t) => t.id === templateId);
  return {
    id: `RPT-${Date.now()}`,
    templateId,
    templateName: template?.name ?? 'Report',
    projectId: _projectId,
    generatedAt: new Date().toISOString(),
    period: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'ready',
    format: 'pdf',
  };
}

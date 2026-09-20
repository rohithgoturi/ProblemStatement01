// ============================================================
// PRAGATIPATH — Domain Types
// Frontend-only. Mock data conforms to these types.
// Backend developer should match these contracts in the API.
// ============================================================

// ============================================================
// Auth & Roles
// ============================================================

export type DemoRole =
  | 'project-manager'
  | 'planning-engineer'
  | 'site-execution'
  | 'admin-auditor';

export type UserRole = DemoRole;

export interface DemoUser {
  id: string;
  name: string;
  role: DemoRole;
  email: string;
  department?: string;
  avatarInitials?: string;
}

export const ROLE_LABELS: Record<DemoRole, string> = {
  'project-manager':    'Project Manager',
  'planning-engineer':  'Planning Engineer',
  'site-execution':     'Site Execution',
  'admin-auditor':      'Admin & Auditor',
};

// ============================================================
// Project
// ============================================================

export interface Project {
  id: string;          // e.g. "P-101"
  name: string;
  client: string;
  location: string;
  contractValue: string;
  startDate: string;
  targetEndDate: string;
  status: ProjectStatus;
  description?: string;
}

export type ProjectStatus = 'active' | 'on-hold' | 'completed' | 'planning';

// ============================================================
// Activities
// ============================================================

export type ActivityStatus =
  | 'on-track'
  | 'pending'
  | 'at-risk'
  | 'delayed'
  | 'completed'
  | 'not-started';

export interface Activity {
  id: string;              // e.g. "A101"
  name: string;
  wbs: string;             // e.g. "1.2.4"
  location: string;        // e.g. "Zone B, Ch. 12+400"
  category: string;        // e.g. "Mechanical"
  plannedStart: string;    // ISO date string
  plannedFinish: string;
  plannedProgress: number; // 0–100
  actualProgress: number;  // 0–100
  variance: number;        // actualProgress - plannedProgress
  status: ActivityStatus;
  contractor?: string;
  lastUpdated?: string;
  reviewer?: string;
  matchStatus?: MatchStatus;
}

// ============================================================
// Schedule
// ============================================================

export type ScheduleType = 'baseline' | 'revision' | 'lookahead' | 'recovery';
export type ScheduleStatus = 'active' | 'draft' | 'archived' | 'pending-review';

export interface ScheduleEntry {
  id: string;
  name: string;
  type: ScheduleType;
  version: string;          // e.g. "v2.1"
  source: string;           // e.g. "Primavera P6 Export"
  uploadedAt: string;
  activities: number;
  category: string;
  status: ScheduleStatus;
}

// ============================================================
// Field Observations (DPR)
// ============================================================

export type ObservationSource = 'text' | 'voice' | 'excel' | 'pdf' | 'photo';

export interface FieldObservation {
  id: string;              // e.g. "OBS-2024-0142"
  projectId: string;
  activityText: string;
  location: string;
  progress: number;
  capturedAt: string;
  source: ObservationSource;
  contractor?: string;
  notes?: string;
  photoUrl?: string;
  extractedActivity?: string;
  extractedLocation?: string;
  extractedProgress?: number;
}

// ============================================================
// AI Matching
// ============================================================

export type MatchStatus =
  | 'recommended'
  | 'verified'
  | 'rejected'
  | 'needs-review'
  | 'pending';

export interface MatchReason {
  factor: string;
  score: number;       // 0–100
  description: string;
}

export interface MatchCandidate {
  activityId: string;
  activityName: string;
  confidence: number;  // 0–100
  reasons: MatchReason[];
  status: MatchStatus;
  wbs: string;
  location: string;
}

export interface MatchRecord {
  id: string;
  observationId: string;
  observationText: string;
  topCandidate: MatchCandidate;
  allCandidates: MatchCandidate[];
  status: MatchStatus;
  reviewer?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  createdAt: string;
}

// ============================================================
// Progress
// ============================================================

export interface ProgressDataPoint {
  date: string;          // e.g. "2024-01-15"
  weekLabel: string;     // e.g. "W01"
  planned: number;       // 0–100
  actual: number;        // 0–100
}

export interface ProgressSummary {
  projectId: string;
  asOfDate: string;
  plannedProgress: number;
  actualProgress: number;
  variance: number;
  trend: 'improving' | 'stable' | 'declining';
  criticalActivities: number;
  pendingVerification: number;
  overdue: number;
  dataPoints: ProgressDataPoint[];
}

// ============================================================
// Exceptions
// ============================================================

export type ExceptionSeverity = 'critical' | 'warning' | 'info';
export type ExceptionType =
  | 'below-plan'
  | 'unverified-update'
  | 'approaching-deadline'
  | 'overdue'
  | 'blocked';

export interface Exception {
  id: string;
  type: ExceptionType;
  severity: ExceptionSeverity;
  activityId?: string;
  activityName?: string;
  description: string;
  createdAt: string;
  resolved: boolean;
}

// ============================================================
// Reports
// ============================================================

export type ReportFormat = 'pdf' | 'excel' | 'csv';
export type ReportStatus = 'generating' | 'ready' | 'failed' | 'draft';

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedPages: number;
  formats: ReportFormat[];
}

export interface ReportRecord {
  id: string;
  templateId: string;
  templateName: string;
  projectId: string;
  generatedAt: string;
  period: string;
  status: ReportStatus;
  format: ReportFormat;
  downloadUrl?: string; // null in demo mode
}

// ============================================================
// Dashboard
// ============================================================

export interface KPIMetric {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'flat';
  trendValue?: string;
  status?: ActivityStatus | 'neutral';
}

export interface GanttActivity {
  id: string;
  name: string;
  plannedStart: number; // offset in days from project start
  plannedDuration: number;
  actualStart?: number;
  actualDuration?: number;
  status: ActivityStatus;
  delay?: number; // in days
}

// ============================================================
// Navigation
// ============================================================

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string; // Lucide icon name
  badge?: number;
}

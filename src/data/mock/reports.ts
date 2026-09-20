// ============================================================
// PRAGATIPATH — Mock Reports
// [Demo data] — Not real report output.
// ============================================================

import type { ReportTemplate, ReportRecord } from '@/types';

export const MOCK_REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: 'RPT-TPL-001',
    name: 'Daily Progress Executive Dossier',
    description: 'Concise daily summary of planned vs actual progress, exceptions, and verification status for project leadership.',
    category: 'Daily',
    estimatedPages: 3,
    formats: ['pdf', 'excel'],
  },
  {
    id: 'RPT-TPL-002',
    name: 'Weekly EVM & Variance Report',
    description: 'Earned Value Management metrics, cost and schedule performance indices, and variance analysis for the reporting week.',
    category: 'Weekly',
    estimatedPages: 8,
    formats: ['pdf', 'excel'],
  },
  {
    id: 'RPT-TPL-003',
    name: 'Delay Attribution & Root Causes',
    description: 'Identifies delayed activities, attributes root causes, and documents corrective actions taken or planned.',
    category: 'Analysis',
    estimatedPages: 5,
    formats: ['pdf'],
  },
  {
    id: 'RPT-TPL-004',
    name: 'Client & Steering Flash Brief',
    description: 'High-level dashboard summary for client and steering committee. Single-page visual snapshot of project health.',
    category: 'Client',
    estimatedPages: 1,
    formats: ['pdf'],
  },
  {
    id: 'RPT-TPL-005',
    name: 'Raw Logs & AI Audit Trail',
    description: 'Complete log of field observations, AI matching decisions, human validations, and progress updates for audit purposes.',
    category: 'Audit',
    estimatedPages: 12,
    formats: ['pdf', 'excel', 'csv'],
  },
];

export const MOCK_RECENT_REPORTS: ReportRecord[] = [
  {
    id: 'RPT-2024-0089',
    templateId: 'RPT-TPL-001',
    templateName: 'Daily Progress Executive Dossier',
    projectId: 'P-101',
    generatedAt: '2024-09-19T18:00:00Z',
    period: '19 Sep 2024',
    status: 'ready',
    format: 'pdf',
  },
  {
    id: 'RPT-2024-0088',
    templateId: 'RPT-TPL-002',
    templateName: 'Weekly EVM & Variance Report',
    projectId: 'P-101',
    generatedAt: '2024-09-16T17:30:00Z',
    period: 'Week of 09–15 Sep 2024',
    status: 'ready',
    format: 'excel',
  },
  {
    id: 'RPT-2024-0087',
    templateId: 'RPT-TPL-005',
    templateName: 'Raw Logs & AI Audit Trail',
    projectId: 'P-101',
    generatedAt: '2024-09-15T20:00:00Z',
    period: '01–15 Sep 2024',
    status: 'ready',
    format: 'csv',
  },
];

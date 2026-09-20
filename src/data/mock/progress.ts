// ============================================================
// PRAGATIPATH — Mock Progress Data
// [Demo data] — Not real project statistics.
// ============================================================

import type { ProgressSummary, ProgressDataPoint } from '@/types';

// 12-week trend series — planned vs actual
// Planned: 68.4% at week 12, Actual: 64.1% — Variance: -4.3%
export const MOCK_PROGRESS_DATA_POINTS: ProgressDataPoint[] = [
  { date: '2024-07-01', weekLabel: 'W01', planned: 12.0, actual: 12.5 },
  { date: '2024-07-08', weekLabel: 'W02', planned: 18.0, actual: 18.2 },
  { date: '2024-07-15', weekLabel: 'W03', planned: 25.0, actual: 25.8 },
  { date: '2024-07-22', weekLabel: 'W04', planned: 32.0, actual: 33.1 },
  { date: '2024-07-29', weekLabel: 'W05', planned: 38.5, actual: 40.0 },
  { date: '2024-08-05', weekLabel: 'W06', planned: 45.0, actual: 46.2 },
  { date: '2024-08-12', weekLabel: 'W07', planned: 50.0, actual: 50.8 },
  { date: '2024-08-19', weekLabel: 'W08', planned: 55.0, actual: 54.5 },
  { date: '2024-08-26', weekLabel: 'W09', planned: 59.5, actual: 57.2 },
  { date: '2024-09-02', weekLabel: 'W10', planned: 63.0, actual: 60.1 },
  { date: '2024-09-09', weekLabel: 'W11', planned: 66.0, actual: 62.0 },
  { date: '2024-09-16', weekLabel: 'W12', planned: 68.4, actual: 64.1 },
];

export const MOCK_PROGRESS_SUMMARY: ProgressSummary = {
  projectId: 'P-101',
  asOfDate: '2024-09-20',
  plannedProgress: 68.4,
  actualProgress: 64.1,
  variance: -4.3,
  trend: 'declining',
  criticalActivities: 2,
  pendingVerification: 3,
  overdue: 1,
  dataPoints: MOCK_PROGRESS_DATA_POINTS,
};

// ============================================================
// PRAGATIPATH — Mock Exceptions
// [Demo data] — Not real project data.
// ============================================================

import type { Exception } from '@/types';

export const MOCK_EXCEPTIONS: Exception[] = [
  {
    id: 'EXC-001',
    type: 'below-plan',
    severity: 'critical',
    activityId: 'A103',
    activityName: 'Civil Foundation — Pump Station 3',
    description: 'Actual progress (72%) is 18 percentage points below planned (90%). Concrete curing delay reported. Risk of milestone slip.',
    createdAt: '2024-09-18T09:00:00Z',
    resolved: false,
  },
  {
    id: 'EXC-002',
    type: 'unverified-update',
    severity: 'warning',
    activityId: 'A101',
    activityName: 'Erect Main Line 24-XX Pipe Segment',
    description: 'Field observation OBS-2024-0142 captured on 20 Sep 2024. AI match recommended but not yet validated by a reviewer.',
    createdAt: '2024-09-20T14:05:00Z',
    resolved: false,
  },
  {
    id: 'EXC-003',
    type: 'below-plan',
    severity: 'critical',
    activityId: 'MECH-24',
    activityName: 'Flange Connections & Gasket Installation',
    description: 'Activity at 60% actual vs 80% planned. Gasket batch GK-2024-09-18 quality issue. Replacement ordered — 3-day delay expected.',
    createdAt: '2024-09-20T10:30:00Z',
    resolved: false,
  },
  {
    id: 'EXC-004',
    type: 'approaching-deadline',
    severity: 'warning',
    activityId: 'A101',
    activityName: 'Erect Main Line 24-XX Pipe Segment',
    description: 'Planned finish date is 15 Oct 2024. Current actual is 4 points behind plan. At current rate, finish will be delayed by 6–8 days.',
    createdAt: '2024-09-19T08:00:00Z',
    resolved: false,
  },
];

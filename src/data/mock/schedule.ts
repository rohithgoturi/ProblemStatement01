// ============================================================
// PRAGATIPATH — Mock Schedule Registry
// [Demo data] — Not real schedule data.
// ============================================================

import type { ScheduleEntry } from '@/types';

export const MOCK_SCHEDULE: ScheduleEntry[] = [
  {
    id: 'SCH-2024-001',
    name: 'NH-58 Pipeline — Baseline Schedule',
    type: 'baseline',
    version: 'v1.0',
    source: 'Primavera P6 Export (.xer)',
    uploadedAt: '2024-03-15T10:00:00Z',
    activities: 248,
    category: 'Mechanical',
    status: 'active',
  },
  {
    id: 'SCH-2024-002',
    name: 'Civil Works — Revised Schedule Rev B',
    type: 'revision',
    version: 'v2.1',
    source: 'MS Project (.mpp)',
    uploadedAt: '2024-06-10T09:30:00Z',
    activities: 86,
    category: 'Civil Prep',
    status: 'active',
  },
  {
    id: 'SCH-2024-003',
    name: 'Pipeline Piping — 4-Week Lookahead',
    type: 'lookahead',
    version: 'v1.0',
    source: 'Excel Upload (.xlsx)',
    uploadedAt: '2024-09-16T14:00:00Z',
    activities: 34,
    category: 'Piping Alignment',
    status: 'active',
  },
  {
    id: 'SCH-2024-004',
    name: 'Instrumentation & E&I — Baseline',
    type: 'baseline',
    version: 'v1.0',
    source: 'Primavera P6 Export (.xer)',
    uploadedAt: '2024-07-01T11:00:00Z',
    activities: 112,
    category: 'Electrical Tie-in',
    status: 'active',
  },
  {
    id: 'SCH-2024-005',
    name: 'Mechanical Erection — Recovery Schedule',
    type: 'recovery',
    version: 'v1.2',
    source: 'Primavera P6 Export (.xer)',
    uploadedAt: '2024-08-20T16:00:00Z',
    activities: 67,
    category: 'Mechanical',
    status: 'pending-review',
  },
];

// ============================================================
// PRAGATIPATH — Mock Projects
// [Demo data] — Not real project statistics.
// ============================================================

import type { Project } from '@/types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'P-101',
    name: 'NHIDCL NH-58 Pipeline Extension',
    client: 'National Highways & Infrastructure Development Corp.',
    location: 'Uttarakhand — Ch. 12+000 to Ch. 18+600',
    contractValue: '₹ 847 Cr',
    startDate: '2024-03-01',
    targetEndDate: '2025-12-31',
    status: 'active',
    description: 'Pipeline extension and allied civil works across 6.6 km stretch including river crossings and mountain terrain.',
  },
  {
    id: 'P-102',
    name: 'PGCIL 400kV Transmission Corridor',
    client: 'Power Grid Corporation of India Ltd.',
    location: 'Rajasthan — Sector 4B, Ch. 28+000 to Ch. 34+200',
    contractValue: '₹ 312 Cr',
    startDate: '2024-06-15',
    targetEndDate: '2026-03-31',
    status: 'active',
    description: 'EHV transmission line erection and substation integration for 400kV corridor.',
  },
];

export const DEFAULT_PROJECT_ID = 'P-101';

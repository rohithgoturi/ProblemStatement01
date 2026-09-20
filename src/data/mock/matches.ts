// ============================================================
// PRAGATIPATH — Mock Matches
// [Demo data] — Deterministic AI match candidates.
// ============================================================

import type { MatchRecord } from '@/types';

export const MOCK_MATCHES: MatchRecord[] = [
  {
    id: 'MATCH-2024-0142',
    observationId: 'OBS-2024-0142',
    observationText: 'Erection work completed for Line 24-XX pipe segment in Zone B. Approximately 64% complete.',
    topCandidate: {
      activityId: 'A101',
      activityName: 'Erect Main Line 24-XX Pipe Segment',
      confidence: 92,
      wbs: '1.2.1',
      location: 'Zone B, Ch. 12+400',
      status: 'recommended',
      reasons: [
        { factor: 'Description Match', score: 95, description: 'Key terms "Line 24-XX", "erection", "pipe segment" match activity description with high precision.' },
        { factor: 'Location Match',    score: 98, description: 'Chainage Ch. 12+400 in Zone B directly matches the scheduled activity location.' },
        { factor: 'WBS Context',       score: 88, description: 'Activity WBS 1.2.1 aligns with the mechanical discipline and project phase.' },
        { factor: 'Recency',           score: 85, description: 'Activity is currently in execution phase per baseline schedule.' },
      ],
    },
    allCandidates: [
      {
        activityId: 'A101',
        activityName: 'Erect Main Line 24-XX Pipe Segment',
        confidence: 92,
        wbs: '1.2.1',
        location: 'Zone B, Ch. 12+400',
        status: 'recommended',
        reasons: [
          { factor: 'Description Match', score: 95, description: 'Key terms "Line 24-XX", "erection", "pipe segment" match activity description.' },
          { factor: 'Location Match',    score: 98, description: 'Ch. 12+400, Zone B matches exactly.' },
          { factor: 'WBS Context',       score: 88, description: 'Mechanical discipline aligns.' },
          { factor: 'Recency',           score: 85, description: 'In active execution phase.' },
        ],
      },
      {
        activityId: 'A102',
        activityName: 'Secondary Pump Piping & Alignment',
        confidence: 41,
        wbs: '1.2.2',
        location: 'Zone A, Ch. 12+200',
        status: 'pending',
        reasons: [
          { factor: 'Description Match', score: 52, description: 'Piping keyword present but "pump" context does not match "Line 24-XX" erection.' },
          { factor: 'Location Match',    score: 35, description: 'Zone A at Ch. 12+200 is adjacent but not the same location.' },
          { factor: 'WBS Context',       score: 42, description: 'Same WBS branch but different sub-activity.' },
          { factor: 'Recency',           score: 50, description: 'Activity is active.' },
        ],
      },
      {
        activityId: 'C204',
        activityName: 'Mechanical Testing & Commissioning',
        confidence: 18,
        wbs: '2.1.4',
        location: 'Control Room, Ch. 14+000',
        status: 'pending',
        reasons: [
          { factor: 'Description Match', score: 22, description: '"Mechanical" keyword present but erection context does not match commissioning phase.' },
          { factor: 'Location Match',    score: 15, description: 'Ch. 14+000 is significantly different from observation location.' },
          { factor: 'WBS Context',       score: 18, description: 'Different WBS phase — commissioning is downstream of erection.' },
          { factor: 'Recency',           score: 20, description: 'Activity not yet scheduled to start.' },
        ],
      },
    ],
    status: 'recommended',
    createdAt: '2024-09-20T14:05:00Z',
  },
  {
    id: 'MATCH-2024-0141',
    observationId: 'OBS-2024-0141',
    observationText: 'Secondary pump piping alignment completed for Zone A section. All flanges torqued to spec.',
    topCandidate: {
      activityId: 'A102',
      activityName: 'Secondary Pump Piping & Alignment',
      confidence: 96,
      wbs: '1.2.2',
      location: 'Zone A, Ch. 12+200',
      status: 'verified',
      reasons: [
        { factor: 'Description Match', score: 98, description: 'Exact phrase "secondary pump piping alignment" matches activity name.' },
        { factor: 'Location Match',    score: 96, description: 'Zone A, Ch. 12+200 matches precisely.' },
        { factor: 'WBS Context',       score: 94, description: 'WBS 1.2.2 is the correct sub-activity for this scope.' },
        { factor: 'Recency',           score: 90, description: 'Active execution window.' },
      ],
    },
    allCandidates: [],
    status: 'verified',
    reviewer: 'Rajiv Mehta',
    reviewedAt: '2024-09-19T13:00:00Z',
    createdAt: '2024-09-19T11:35:00Z',
  },
  {
    id: 'MATCH-2024-0140',
    observationId: 'OBS-2024-0140',
    observationText: 'Civil foundation work at Pump Station 3 showing delays. Only 72% complete.',
    topCandidate: {
      activityId: 'A103',
      activityName: 'Civil Foundation — Pump Station 3',
      confidence: 89,
      wbs: '1.1.3',
      location: 'Zone C, Ch. 13+100',
      status: 'needs-review',
      reasons: [
        { factor: 'Description Match', score: 92, description: 'Direct reference to "Pump Station 3" and "civil foundation".' },
        { factor: 'Location Match',    score: 87, description: 'Zone C, Ch. 13+100 confirmed.' },
        { factor: 'WBS Context',       score: 85, description: 'WBS 1.1.3 is the correct civil sub-activity.' },
        { factor: 'Recency',           score: 82, description: 'Activity is behind schedule — delay flag active.' },
      ],
    },
    allCandidates: [],
    status: 'needs-review',
    createdAt: '2024-09-18T09:05:00Z',
  },
];

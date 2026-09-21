/**
 * PragatiPath — AI Matching & Verification Mock Data
 * Derived from Phase 4 Reference Screen
 */

export const AI_MATCHING_DATA = {
  projectContext: {
    projectId: 'PS-26122',
    projectName: 'Pump P-101 - Unit 2',
    dateRange: '10 Sep 2026 - 10 Sep 2026',
    activeUnit: 'Unit 2 - Pump Installation',
    units: [
      'Unit 2 - Pump Installation',
      'Unit 1 - Boiler Foundation',
      'Unit 3 - Turbines & Piping',
      'Block A - Cable Ducting',
      'Block B - Substation Erection',
    ],
  },

  dprInput: {
    quote: 'Pump P-101 installation completed in Unit 2. Testing work ongoing.',
    author: 'Suresh Patel',
    role: 'Site Engineer',
    mode: 'Voice + Photos',
    photosCount: 3,
    date: '10 Sep 2026',
    time: '09:30 AM',
  },

  extractedData: {
    activity: 'Pump P-101 installation',
    unit: 'Unit 2',
    status: 'Completed',
    progress: 100,
    date: '2025-09-10',
    source: 'Voice + Photos',
  },

  matchingProcess: [
    {
      step: 1,
      title: '1. Hard Filters',
      subtitle: 'Unit, Discipline, Location, Date',
      completed: true,
    },
    {
      step: 2,
      title: '2. Tag Matching',
      subtitle: 'Exact / Fuzzy Matching',
      completed: true,
    },
    {
      step: 3,
      title: '3. Embeddings',
      subtitle: 'Semantic Similarity',
      completed: true,
    },
    {
      step: 4,
      title: '4. Reranking',
      subtitle: 'Weighted Score Calculation',
      completed: true,
    },
    {
      step: 5,
      title: '5. Top-3',
      subtitle: 'Candidates Generated',
      completed: true,
    },
  ],

  confidenceWeights: [
    {
      id: 'tag',
      label: 'Tag Match',
      weight: '35%',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      badgeColor: 'bg-emerald-500',
    },
    {
      id: 'action',
      label: 'Action Match',
      weight: '25%',
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      badgeColor: 'bg-blue-500',
    },
    {
      id: 'location',
      label: 'Location Match',
      weight: '15%',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      badgeColor: 'bg-amber-500',
    },
    {
      id: 'embedding',
      label: 'Embedding',
      weight: '15%',
      color: 'text-purple-700 bg-purple-50 border-purple-200',
      badgeColor: 'bg-purple-500',
    },
    {
      id: 'margin',
      label: 'Margin',
      weight: '10%',
      color: 'text-slate-700 bg-slate-50 border-slate-200',
      badgeColor: 'bg-slate-500',
    },
  ],

  topCandidates: [
    {
      id: 'P-101',
      rank: 1,
      isBestMatch: true,
      title: 'P-101 Installation',
      unit: 'Unit 2',
      discipline: 'Mechanical',
      dateRange: '01 Sep 2025 - 15 Sep 2025',
      confidence: 96,
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=400&auto=format&fit=crop&q=60',
      breakdown: [
        { label: 'Tag Match', pct: 35, color: 'bg-emerald-400' },
        { label: 'Action Match', pct: 25, color: 'bg-blue-400' },
        { label: 'Location Match', pct: 15, color: 'bg-amber-400' },
        { label: 'Embedding', pct: 15, color: 'bg-purple-400' },
        { label: 'Margin', pct: 10, color: 'bg-slate-400' },
      ],
    },
    {
      id: 'P-102',
      rank: 2,
      isBestMatch: false,
      title: 'P-102 Pump Installation',
      unit: 'Unit 2',
      discipline: 'Mechanical',
      dateRange: '03 Sep 2025 - 18 Sep 2025',
      confidence: 78,
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&auto=format&fit=crop&q=60',
    },
    {
      id: 'P-101-TC',
      rank: 3,
      isBestMatch: false,
      title: 'P-101 Testing & Commissioning',
      unit: 'Unit 2',
      discipline: 'Mechanical',
      dateRange: '05 Sep 2025 - 20 Sep 2025',
      confidence: 65,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&auto=format&fit=crop&q=60',
    },
  ],

  humanValidationItems: [
    {
      id: 'val-1',
      rank: 1,
      activity: 'P-101 Installation (Unit 2 - Mechanical)',
      confidence: 96,
      status: 'Pending',
      candidateId: 'P-101',
    },
    {
      id: 'val-2',
      rank: 2,
      activity: 'P-102 Pump Installation (Unit 2 - Mechanical)',
      confidence: 78,
      status: 'Pending',
      candidateId: 'P-102',
    },
    {
      id: 'val-3',
      rank: 3,
      activity: 'P-101 Testing & Commissioning (Unit 2 - Mechanical)',
      confidence: 65,
      status: 'Pending',
      candidateId: 'P-101-TC',
    },
  ],

  matchingSummary: {
    candidatesCount: 3,
    topConfidence: '96%',
    validationStatus: 'Pending',
    processingTime: '2.3s',
  },

  recentActivity: [
    {
      id: 'act-1',
      title: 'AI matching completed for DPR-2025-001',
      timestamp: '10 Sep 2026 • 09:45 AM',
      status: 'Completed',
      type: 'matching',
    },
    {
      id: 'act-2',
      title: 'Extracted 5 work items from DPR',
      timestamp: '10 Sep 2026 • 09:40 AM',
      status: 'Completed',
      type: 'extraction',
    },
    {
      id: 'act-3',
      title: 'DPR uploaded: DPR_2025-001.pdf',
      timestamp: '10 Sep 2026 • 09:32 AM',
      status: 'Completed',
      type: 'upload',
    },
  ],
};

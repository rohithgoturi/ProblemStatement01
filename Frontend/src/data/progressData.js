/**
 * PragatiPath — Progress Tracking Mock Data
 * Derived from Phase 4 Reference Screen 1
 */

export const PROGRESS_TRACKING_DATA = {
  projectContext: {
    projectId: 'PS-26122',
    projectName: 'Pump P-101 - Unit 2',
    dateRange: '01 Sep 2026 - 15 Sep 2026',
    activeUnit: 'Unit 2 - Pump Installation',
    units: [
      'Unit 2 - Pump Installation',
      'Unit 1 - Civil Foundations',
      'Unit 3 - Turbines & Piping',
      'Block A - Electrical Cables',
      'Block B - Substation Structure',
    ],
  },

  summaryKpis: {
    overallProgress: {
      value: 68,
      trend: '+12% vs last week',
      isPositive: true,
    },
    totalPlannedActivities: {
      value: 124,
      subtext: '100% (Baseline Schedule)',
    },
    completed: {
      value: 58,
      pct: '47% (of total)',
    },
    inProgress: {
      value: 42,
      pct: '34% (of total)',
    },
    delayed: {
      value: 18,
      pct: '15% (of total)',
    },
    upcoming: {
      value: 6,
      pct: '5% (of total)',
    },
  },

  progressOverviewTimeline: [
    { date: '1 Sep', planned: 15, actual: 12 },
    { date: '3 Sep', planned: 24, actual: 19 },
    { date: '5 Sep', planned: 33, actual: 26 },
    { date: '7 Sep', planned: 45, actual: 37 },
    { date: '9 Sep', planned: 55, actual: 47 },
    { date: '11 Sep', planned: 63, actual: 54 },
    { date: '13 Sep', planned: 71, actual: 61 },
    { date: '15 Sep', planned: 78, actual: 68 },
  ],

  disciplineProgress: [
    { discipline: 'Civil Works', planned: 82, actual: 78 },
    { discipline: 'Mechanical', planned: 65, actual: 60 },
    { discipline: 'Electrical', planned: 58, actual: 52 },
    { discipline: 'Piping', planned: 76, actual: 68 },
    { discipline: 'Architecture', planned: 90, actual: 85 },
  ],

  locationProgress: [
    { id: 'u1', location: 'Unit 1', planned: 72, actual: 68, color: 'bg-emerald-500' },
    { id: 'u2', location: 'Unit 2', planned: 78, actual: 72, color: 'bg-blue-600' },
    { id: 'u3', location: 'Unit 3', planned: 61, actual: 55, color: 'bg-cyan-500' },
    { id: 'ba', location: 'Block A', planned: 85, actual: 80, color: 'bg-sky-500' },
    { id: 'bb', location: 'Block B', planned: 67, actual: 60, color: 'bg-teal-500' },
  ],

  activityProgressDetails: [
    {
      id: 'P-101',
      activityName: 'Pump Installation',
      location: 'Unit 2',
      planned: 100,
      actual: 100,
      status: 'Completed',
      delay: '-',
    },
    {
      id: 'G-102',
      activityName: 'Cable Laying',
      location: 'Block A',
      planned: 80,
      actual: 60,
      status: 'In Progress',
      delay: '+4 days',
    },
    {
      id: 'M-104',
      activityName: 'Motor Alignment',
      location: 'Unit 2',
      planned: 70,
      actual: 30,
      status: 'Delayed',
      delay: '+3 days',
    },
    {
      id: 'S-118',
      activityName: 'Structural Work',
      location: 'Block B',
      planned: 90,
      actual: 45,
      status: 'In Progress',
      delay: '+5 days',
    },
    {
      id: 'E-120',
      activityName: 'Electrical Testing',
      location: 'Unit 1',
      planned: 60,
      actual: 40,
      status: 'In Progress',
      delay: '+2 days',
    },
  ],

  delayAnalysis: {
    totalDelayed: 18,
    categories: [
      { name: 'Material Delay', count: 8, pct: 44, color: '#EF4444' },
      { name: 'Workforce', count: 5, pct: 28, color: '#F59E0B' },
      { name: 'Weather', count: 3, pct: 17, color: '#3B82F6' },
      { name: 'Other', count: 2, pct: 11, color: '#8B5CF6' },
    ],
    topReasons: [
      { rank: 1, reason: 'Material delivery delay', count: 8 },
      { rank: 2, reason: 'Workforce shortage', count: 5 },
      { rank: 3, reason: 'Weather conditions', count: 3 },
    ],
  },

  recentProgressUpdates: [
    {
      id: 'up-1',
      title: 'P-101 Installation completed',
      subtitle: 'Unit 2 - Mechanical',
      timestamp: '10 Sep 2026 • 09:45 AM',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=200&auto=format&fit=crop&q=60',
    },
    {
      id: 'up-2',
      title: 'G-102 Cable Laying',
      subtitle: 'Block A - Electrical',
      timestamp: '09 Sep 2026 • 04:20 PM',
      status: 'In Progress',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=200&auto=format&fit=crop&q=60',
    },
    {
      id: 'up-3',
      title: 'M-104 Motor Alignment',
      subtitle: 'Unit 2 - Mechanical',
      timestamp: '08 Sep 2026 • 11:30 AM',
      status: 'Delayed',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&auto=format&fit=crop&q=60',
    },
    {
      id: 'up-4',
      title: 'S-118 Structural Work',
      subtitle: 'Block B - Civil',
      timestamp: '07 Sep 2026 • 03:15 PM',
      status: 'In Progress',
      image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=200&auto=format&fit=crop&q=60',
    },
    {
      id: 'up-5',
      title: 'E-120 Electrical Testing',
      subtitle: 'Unit 1 - Electrical',
      timestamp: '06 Sep 2026 • 10:00 AM',
      status: 'In Progress',
      image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=200&auto=format&fit=crop&q=60',
    },
  ],
};

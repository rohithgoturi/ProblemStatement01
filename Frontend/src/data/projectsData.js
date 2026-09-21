/**
 * PragatiPath — Mock Data Store for Dashboards
 * Clean, structured frontend data designed for seamless backend replacement later.
 */

// ============================================================================
// MAIN PORTFOLIO DASHBOARD DATA
// ============================================================================

export const portfolioSummaryKPIs = [
  {
    id: 'total-projects',
    title: 'Total Projects',
    value: 12,
    change: '+2%',
    changeType: 'positive',
    timeframe: 'vs last month',
    icon: 'MdFolderOpen',
    color: 'blue',
  },
  {
    id: 'on-track',
    title: 'On Track',
    value: 8,
    change: '+1%',
    changeType: 'positive',
    timeframe: 'vs last month',
    icon: 'MdCheckCircle',
    color: 'emerald',
  },
  {
    id: 'at-risk',
    title: 'At Risk',
    value: 3,
    change: '-1%',
    changeType: 'warning',
    timeframe: 'vs last month',
    icon: 'MdWarning',
    color: 'amber',
  },
  {
    id: 'delayed',
    title: 'Delayed',
    value: 1,
    change: '-2%',
    changeType: 'negative',
    timeframe: 'vs last month',
    icon: 'MdAccessTime',
    color: 'rose',
  },
  {
    id: 'total-sites',
    title: 'Total Sites',
    value: 5,
    change: '0%',
    changeType: 'neutral',
    timeframe: 'vs last month',
    icon: 'MdLocationOn',
    color: 'purple',
  },
];

export const allProjectsList = [
  {
    id: 'PS-26122',
    name: 'PS 26122 — Pump P-101',
    unit: 'Unit 2 · Mechanical',
    location: 'Site A',
    progress: 68,
    status: 'On Track',
    startDate: '12 Jul 2026',
    endDate: '28 Oct 2026',
    thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=150&auto=format&fit=crop&q=60',
    type: 'mechanical',
  },
  {
    id: 'PS-26123',
    name: 'PS 26123 — Boiler B-202',
    unit: 'Unit 3 · Mechanical',
    location: 'Site B',
    progress: 42,
    status: 'At Risk',
    startDate: '01 Aug 2026',
    endDate: '15 Nov 2026',
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=150&auto=format&fit=crop&q=60',
    type: 'mechanical',
  },
  {
    id: 'PS-26124',
    name: 'PS 26124 — Compressor C-101',
    unit: 'Unit 1 · Mechanical',
    location: 'Site A',
    progress: 19,
    status: 'Delayed',
    startDate: '20 Aug 2026',
    endDate: '10 Dec 2026',
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=150&auto=format&fit=crop&q=60',
    type: 'mechanical',
  },
  {
    id: 'PS-26125',
    name: 'PS 26125 — Cooling Tower',
    unit: 'Unit 4 · Civil',
    location: 'Site A',
    progress: 76,
    status: 'On Track',
    startDate: '05 Jul 2026',
    endDate: '20 Oct 2026',
    thumbnail: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=150&auto=format&fit=crop&q=60',
    type: 'civil',
  },
  {
    id: 'PS-26126',
    name: 'PS 26126 — Electrical Works',
    unit: 'Unit 2 · Electrical',
    location: 'Site H',
    progress: 53,
    status: 'On Track',
    startDate: '15 Aug 2026',
    endDate: '30 Nov 2026',
    thumbnail: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=150&auto=format&fit=crop&q=60',
    type: 'electrical',
  },
  {
    id: 'PS-26127',
    name: 'PS 26127 — Pipeline Rack 3',
    unit: 'Unit 1 · Piping',
    location: 'Site B',
    progress: 88,
    status: 'On Track',
    startDate: '10 Jun 2026',
    endDate: '05 Oct 2026',
    thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=150&auto=format&fit=crop&q=60',
    type: 'piping',
  },
  {
    id: 'PS-26128',
    name: 'PS 26128 — Substation B',
    unit: 'Unit 5 · Electrical',
    location: 'Site H',
    progress: 34,
    status: 'At Risk',
    startDate: '01 Sep 2026',
    endDate: '15 Jan 2027',
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=150&auto=format&fit=crop&q=60',
    type: 'electrical',
  },
];

export const projectTimelineData = [
  {
    id: 'PS 26122',
    name: 'PS 26122',
    status: 'On Track',
    color: '#10B981',
    startMonth: 0, // Sep
    durationMonths: 2.2, // into Oct
    barStyle: 'left-[5%] width-[45%]',
  },
  {
    id: 'PS 26123',
    name: 'PS 26123',
    status: 'At Risk',
    color: '#0056D2',
    startMonth: 0.8, // late Sep
    durationMonths: 2.5, // into Nov
    barStyle: 'left-[22%] width-[50%]',
  },
  {
    id: 'PS 26124',
    name: 'PS 26124',
    status: 'At Risk',
    color: '#F59E0B',
    startMonth: 1.5, // mid Oct
    durationMonths: 2.3, // into Dec
    barStyle: 'left-[42%] width-[40%]',
  },
  {
    id: 'PS 26125',
    name: 'PS 26125',
    status: 'Delayed',
    color: '#EF4444',
    startMonth: 2.0, // Nov
    durationMonths: 2.0, // into Dec
    barStyle: 'left-[55%] width-[42%]',
  },
];

export const progressByDisciplineData = [
  { id: 'mech', name: 'Mechanical', percent: 68, color: '#0056D2', icon: 'MdEngineering' },
  { id: 'civil', name: 'Civil', percent: 54, color: '#0D9488', icon: 'MdDomain' },
  { id: 'elec', name: 'Electrical', percent: 41, color: '#F59E0B', icon: 'MdBolt' },
  { id: 'inst', name: 'Instrumentation', percent: 28, color: '#8B5CF6', icon: 'MdSensors' },
  { id: 'pipe', name: 'Piping', percent: 72, color: '#06B6D4', icon: 'MdGrain' },
];

export const recentProjectUpdates = [
  {
    id: 'u1',
    project: 'PS 26122 — Pump P-101',
    text: 'DPR submitted and AI matching completed',
    time: '2h ago',
    dotColor: 'bg-blue-500',
  },
  {
    id: 'u2',
    project: 'PS 26123 — Boiler B-202',
    text: 'Delayed activity flagged (Mechanical Testing)',
    time: '4h ago',
    dotColor: 'bg-rose-500',
  },
  {
    id: 'u3',
    project: 'PS 26124 — Compressor C-101',
    text: 'Unit 2 - Mechanical alignment progress validated',
    time: '6h ago',
    dotColor: 'bg-blue-500',
  },
  {
    id: 'u4',
    project: 'PS 26125 — Cooling Tower',
    text: 'Progress updated from site (42%) · Site photos uploaded (Civil works)',
    time: '8h ago',
    dotColor: 'bg-emerald-500',
  },
];

export const keyInsightsData = [
  {
    id: 'i1',
    title: 'Overall project progress increased by 4%',
    subtitle: 'Compared to last week',
    trend: 'up',
    color: 'emerald',
    icon: 'MdTrendingUp',
  },
  {
    id: 'i2',
    title: 'Mechanical discipline is ahead of schedule',
    subtitle: 'By 8 days on average',
    trend: 'up',
    color: 'emerald',
    icon: 'MdSpeed',
  },
  {
    id: 'i3',
    title: '3 activities are at risk',
    subtitle: 'Require immediate attention',
    trend: 'right',
    color: 'amber',
    icon: 'MdWarning',
  },
  {
    id: 'i4',
    title: 'AI matching accuracy improved to 92%',
    subtitle: '+6% compared to last week',
    trend: 'up',
    color: 'emerald',
    icon: 'MdAutoAwesome',
  },
];


// ============================================================================
// SINGLE PROJECT DASHBOARD DATA (PS 26122 — Pump P-101)
// ============================================================================

export const ps26122ProjectHeader = {
  id: 'PS 26122',
  title: 'PS 26122 — Project Dashboard',
  category: 'CONSTRUCTION PROJECT MANAGEMENT',
  description: 'Real-time actual progress tracking with AI-powered insights',
  location: 'Pump P-101 · Unit 2',
  date: '10 Sept 2026',
  overallProgress: 68,
  status: 'On Track',
  trend: '+4% vs last month',
};

export const ps26122ActivityKPIs = [
  {
    id: 'completed',
    title: 'Completed Activities',
    value: 124,
    change: '-8%',
    changeType: 'negative',
    timeframe: 'vs last month',
    accentColor: '#10B981',
    icon: 'MdCheckCircle',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    value: 38,
    change: '-2%',
    changeType: 'negative',
    timeframe: 'vs last month',
    accentColor: '#0056D2',
    icon: 'MdAccessTime',
  },
  {
    id: 'delayed',
    title: 'Delayed',
    value: 12,
    change: '-3%',
    changeType: 'negative',
    timeframe: 'vs last month',
    accentColor: '#EF4444',
    icon: 'MdWarning',
  },
  {
    id: 'needs-verification',
    title: 'Needs Verification',
    value: 7,
    change: '0%',
    changeType: 'neutral',
    timeframe: 'vs last month',
    accentColor: '#F59E0B',
    icon: 'MdPerson',
  },
  {
    id: 'total',
    title: 'Total Activities',
    value: 181,
    change: '-6%',
    changeType: 'negative',
    timeframe: 'vs last month',
    accentColor: '#0F172A',
    icon: 'MdLayers',
  },
];

export const plannedVsActualActivities = [
  {
    id: 'A001',
    name: 'Civil Works',
    planned: 20,
    actual: 18,
    status: 'Delayed',
    barColor: '#EF4444',
  },
  {
    id: 'A002',
    name: 'Pump P-101 Installation',
    planned: 60,
    actual: 42,
    status: 'Behind Schedule',
    barColor: '#F59E0B',
  },
  {
    id: 'A003',
    name: 'Electrical Installation',
    planned: 45,
    actual: 48,
    status: 'On Track',
    barColor: '#10B981',
  },
  {
    id: 'A004',
    name: 'Commissioning',
    planned: 10,
    actual: 8,
    status: 'Delayed',
    barColor: '#EF4444',
  },
];

export const dailyProgressReports = [
  {
    id: 'dpr-1',
    date: '10 Sep 2026',
    report: 'Pump P-101 Installation...',
    unit: 'Unit 2',
    sources: ['Text', 'Photo'],
    status: 'Extracted',
    statusColor: 'emerald',
  },
  {
    id: 'dpr-2',
    date: '09 Sep 2026',
    report: 'Alignment work in progress.',
    unit: 'Unit 2',
    sources: ['Voice', 'PDF'],
    status: 'Extracted',
    statusColor: 'emerald',
  },
  {
    id: 'dpr-3',
    date: '08 Sep 2026',
    report: 'Electrical panel installation.',
    unit: 'Unit 2',
    sources: ['Excel', 'Photo'],
    status: 'Reviewed',
    statusColor: 'blue',
  },
];

export const aiMatchingQueueList = [
  {
    id: 'A002',
    activity: 'Pump P-101 Installation',
    unit: 'Unit 2 · Mechanical',
    confidence: 96,
    level: 'High',
    levelColor: 'emerald',
    approved: false,
  },
  {
    id: 'A005',
    activity: 'Pump Alignment',
    unit: 'Unit 2 · Mechanical',
    confidence: 42,
    level: 'Medium',
    levelColor: 'amber',
    approved: false,
  },
  {
    id: 'A008',
    activity: 'Mechanical Testing',
    unit: 'Unit 2 · Mechanical',
    confidence: 18,
    level: 'Low',
    levelColor: 'rose',
    approved: false,
  },
];

export const delayAndRiskStats = {
  delayedCount: 12,
  delayedChange: '+3%',
  atRiskCount: 5,
  atRiskChange: '+2%',
  onTrackCount: 164,
  onTrackChange: '+6%',
  topRiskActivities: [
    {
      id: 'A002',
      name: 'Pump P-101 Installation',
      sub: 'Unit 2 · Mechanical',
      variance: '+2 days',
      severity: 'High',
      severityColor: 'rose',
    },
    {
      id: 'A005',
      name: 'Pump Alignment',
      sub: 'Unit 2 · Mechanical',
      variance: '+3 days',
      severity: 'Medium',
      severityColor: 'amber',
    },
    {
      id: 'A011',
      name: 'Painting Works',
      sub: 'Unit 2 · Civil',
      variance: '+5 days',
      severity: 'Medium',
      severityColor: 'amber',
    },
  ],
};

export const dprInboxList = [
  {
    id: 'inbox-1',
    initials: 'SP',
    avatarColor: 'bg-[#0056D2] text-white',
    title: 'Site Progress Report - 10 Sep',
    snippet: 'Pump P-101 installation completed...',
    time: '10:42 AM',
    hasAttachment: true,
  },
  {
    id: 'inbox-2',
    initials: 'RK',
    avatarColor: 'bg-slate-200 text-slate-700',
    title: 'Rajesh Kumar - DPR',
    snippet: 'Civil work progress update...',
    time: 'Yesterday',
    hasAttachment: false,
  },
  {
    id: 'inbox-3',
    initials: 'AK',
    avatarColor: 'bg-slate-200 text-slate-700',
    title: 'Amit Kumar - DPR',
    snippet: 'Electrical panel installation...',
    time: '09 Sep',
    hasAttachment: false,
  },
  {
    id: 'inbox-4',
    initials: 'VS',
    avatarColor: 'bg-slate-200 text-slate-700',
    title: 'Vikash Singh - DPR',
    snippet: 'Alignment work in progress...',
    time: '08 Sep',
    hasAttachment: false,
  },
  {
    id: 'inbox-5',
    initials: 'PD',
    avatarColor: 'bg-slate-200 text-slate-700',
    title: 'Praveen D - DPR',
    snippet: 'Safety & quality report...',
    time: '07 Sep',
    hasAttachment: false,
  },
];

export const matchingFunnelStages = [
  { id: 's1', count: 48, label: 'Extracted', bgClass: 'bg-[#EFF6FF] text-[#0056D2] border border-blue-100' },
  { id: 's2', count: 32, label: 'Candidates', bgClass: 'bg-[#DBEAFE] text-[#0056D2] border border-blue-200' },
  { id: 's3', count: 12, label: 'Top 3', bgClass: 'bg-[#93C5FD] text-[#0B192C] border border-blue-300 font-bold' },
  { id: 's4', count: 10, label: 'Validated', bgClass: 'bg-[#0056D2] text-white border border-[#0056D2] font-extrabold shadow-sm' },
];

export const recentActivitiesAudit = [
  {
    id: 'A002',
    activity: 'Pump P-101 Installation',
    wbs: '1.2.3',
    plannedFinish: '08 Sep 2026',
    actualFinish: '10 Sep 2026',
    variance: '+2d',
    varianceColor: 'text-rose-600 font-semibold',
    status: 'Delayed',
    statusVariant: 'critical',
  },
  {
    id: 'A005',
    activity: 'Pump Alignment',
    wbs: '1.2.4',
    plannedFinish: '12 Sep 2026',
    actualFinish: '—',
    variance: '—',
    varianceColor: 'text-slate-400',
    status: 'In Progress',
    statusVariant: 'progress',
  },
  {
    id: 'A007',
    activity: 'Cable Tray Installation',
    wbs: '1.3.1',
    plannedFinish: '14 Sep 2026',
    actualFinish: '—',
    variance: '—',
    varianceColor: 'text-slate-400',
    status: 'On Track',
    statusVariant: 'success',
  },
];

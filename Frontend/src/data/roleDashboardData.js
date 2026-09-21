/**
 * PragatiPath — Role-Specific Dashboard Data Store
 * Defines mock data models for:
 * 1. Site Supervisor (Field Execution & Site Progress)
 * 2. Project Planner (Schedule Reconciliation & AI Validation)
 * 3. Project Manager (Portfolio Health & Decisions)
 * 4. System Administrator (Platform & User Access Management)
 */

// ============================================================================
// 1. SITE SUPERVISOR DATA (Field Execution)
// ============================================================================

export const supervisorMetrics = [
  {
    id: 'today-work',
    title: "Today's Assigned",
    value: 6,
    subtext: '3 completed, 3 active',
    icon: 'MdAssignmentInd',
    color: 'blue',
    badge: 'Unit 2',
  },
  {
    id: 'completed-today',
    title: 'Completed Today',
    value: 3,
    subtext: '50% daily target met',
    icon: 'MdCheckCircle',
    color: 'emerald',
    badge: 'On Target',
  },
  {
    id: 'pending-dprs',
    title: 'Pending DPRs',
    value: 1,
    subtext: 'Evening shift report due',
    icon: 'MdInbox',
    color: 'amber',
    badge: 'Due 18:00',
  },
  {
    id: 'site-alerts',
    title: 'Site Alerts',
    value: 0,
    subtext: 'Clear safety audit',
    icon: 'MdWarning',
    color: 'purple',
    badge: 'All Clear',
  },
];

export const supervisorAssignedActivities = [
  {
    id: 'ACT-SUP-01',
    activityId: 'A002',
    name: 'Pump P-101 Installation',
    location: 'Site A · Unit 2',
    discipline: 'Mechanical',
    target: '80%',
    currentProgress: 75,
    crewSize: 6,
    status: 'In Progress',
    statusVariant: 'progress',
    criticalNote: 'Foundation baseplate checked and torqued.',
  },
  {
    id: 'ACT-SUP-02',
    activityId: 'A002-B',
    name: 'Foundation Bolt Torquing',
    location: 'Site A · Unit 2',
    discipline: 'Mechanical',
    target: '100%',
    currentProgress: 100,
    crewSize: 3,
    status: 'Completed',
    statusVariant: 'success',
    criticalNote: 'QA signoff signed by Lead Inspector.',
  },
  {
    id: 'ACT-SUP-03',
    activityId: 'A003-A',
    name: 'Cable Tray Routing',
    location: 'Site A · Unit 2',
    discipline: 'Electrical',
    target: '50%',
    currentProgress: 45,
    crewSize: 4,
    status: 'In Progress',
    statusVariant: 'progress',
    criticalNote: 'Upper tier conduit brackets fixed.',
  },
  {
    id: 'ACT-SUP-04',
    activityId: 'A005-A',
    name: 'Flange Gasket & Piping Alignment',
    location: 'Site A · Unit 2',
    discipline: 'Piping',
    target: '60%',
    currentProgress: 25,
    crewSize: 3,
    status: 'Delayed',
    statusVariant: 'critical',
    criticalNote: 'Waiting on replacement Teflon gasket delivery.',
  },
];

export const supervisorRecentDPRs = [
  {
    id: 'DPR-2026-001',
    title: 'Morning Shift Progress',
    time: '10 Sep · 12:30 PM',
    type: 'Text + Photo',
    status: 'Submitted',
    statusVariant: 'success',
  },
  {
    id: 'DPR-2025-089',
    title: 'Foundation Inspection Audio',
    time: '09 Sep · 06:15 PM',
    type: 'Voice Note',
    status: 'Extracted',
    statusVariant: 'success',
  },
];

export const supervisorCrewStatus = {
  totalWorkers: 16,
  onSite: 14,
  breakdown: [
    { trade: 'Mechanical Fitters', count: 8 },
    { trade: 'Electricians', count: 4 },
    { trade: 'Riggers', count: 2 },
    { trade: 'Safety Marshals', count: 2 },
  ],
};

// ============================================================================
// 2. PROJECT PLANNER DATA (Schedule Reconciliation & AI Validation)
// ============================================================================

export const plannerMetrics = [
  {
    id: 'total-schedule-activities',
    title: 'Total Schedule Activities',
    value: 124,
    subtext: 'Baseline Rev 2 active',
    icon: 'MdCalendarToday',
    color: 'blue',
    badge: '100%',
  },
  {
    id: 'awaiting-review',
    title: 'Awaiting Validation',
    value: 7,
    subtext: 'Field progress submissions',
    icon: 'MdAutoAwesome',
    color: 'amber',
    badge: 'Action Needed',
  },
  {
    id: 'unmatched-events',
    title: 'Unmatched Progress Events',
    value: 12,
    subtext: 'No baseline activity linked',
    icon: 'MdWarning',
    color: 'rose',
    badge: 'High Priority',
  },
  {
    id: 'schedule-deviation',
    title: 'Schedule Deviation',
    value: '+4d',
    subtext: 'Critical path variance',
    icon: 'MdTrendingUp',
    color: 'purple',
    badge: 'Variance',
  },
];

export const plannerAIValidationList = [
  {
    id: 'VAL-101',
    dprSnippet: 'Pump P-101 baseplate leveled and anchor bolts torqued to 280 Nm in Unit 2.',
    sourceDPR: 'DPR-2025-001 (Text)',
    suggestedActivityId: 'A002',
    suggestedActivityName: 'Pump P-101 Installation',
    wbs: 'L1.2 / L5.2 · Mechanical',
    reportedProgress: '100% of subtask',
    confidence: 96,
    status: 'Pending',
  },
  {
    id: 'VAL-102',
    dprSnippet: 'Completed electrical conduit pulling through fire wall sleeve in Unit 2.',
    sourceDPR: 'DPR-2025-000 (Voice)',
    suggestedActivityId: 'A003',
    suggestedActivityName: 'Electrical Installation',
    wbs: 'L1.3 / L5.3 · Electrical',
    reportedProgress: '40% of activity',
    confidence: 89,
    status: 'Pending',
  },
  {
    id: 'VAL-103',
    dprSnippet: 'Shaft runout measurement and coupling guard check recorded.',
    sourceDPR: 'DPR-2025-004 (Photos)',
    suggestedActivityId: 'A005',
    suggestedActivityName: 'Pump Alignment',
    wbs: 'L1.2 / L5.2 · Mechanical',
    reportedProgress: '20% of activity',
    confidence: 78,
    status: 'Pending',
  },
];

export const plannerUnmatchedEvents = [
  {
    id: 'UNM-01',
    description: 'Pressure sensor bracket welding in Unit 2 pipe rack',
    submittedBy: 'Suresh Patel (Supervisor)',
    source: 'Photo DPR #004',
    date: '10 Sep 2026',
    suggestedAction: 'Create sub-activity or map to A007',
  },
  {
    id: 'UNM-02',
    description: 'Transformer secondary neutral grounding cable run',
    submittedBy: 'Neha Singh (Site Eng)',
    source: 'Voice Note #000',
    date: '09 Sep 2026',
    suggestedAction: 'Map to A003 Electrical Package',
  },
  {
    id: 'UNM-03',
    description: 'Perimeter drainage ditch clearance around pump pad',
    submittedBy: 'Vikash S. (Civil Fore)',
    source: 'Excel Log #003',
    date: '08 Sep 2026',
    suggestedAction: 'Mark as Civil Non-Schedule Task',
  },
];

export const plannerDeviationByWBS = [
  { wbs: 'L1.1', name: 'Civil Works', plannedFinish: '03 Sep', actualFinish: '02 Sep', variance: '-1d (Ahead)', status: 'On Track' },
  { wbs: 'L1.2', name: 'Mechanical Package', plannedFinish: '12 Sep', actualFinish: '15 Sep', variance: '+3d (Delay)', status: 'Delayed' },
  { wbs: 'L1.3', name: 'Electrical Works', plannedFinish: '14 Sep', actualFinish: '15 Sep', variance: '+1d (Minor)', status: 'At Risk' },
  { wbs: 'L1.4', name: 'Piping & Valves', plannedFinish: '16 Sep', actualFinish: '18 Sep', variance: '+2d (Delay)', status: 'At Risk' },
];

export const plannerRecentApprovals = [
  { id: 'APP-01', activity: 'A001 Site Preparation', approvedBy: 'Raghav S.', date: '10 Sep 2026 · 11:30 AM', status: 'Reconciled' },
  { id: 'APP-02', activity: 'A008 Foundation Inspection', approvedBy: 'Raghav S.', date: '09 Sep 2026 · 04:45 PM', status: 'Approved' },
  { id: 'APP-03', activity: 'Boiler B-202 Milestone 1', approvedBy: 'Raghav S.', date: '08 Sep 2026 · 02:15 PM', status: 'Approved' },
];

// ============================================================================
// 3. SYSTEM ADMINISTRATOR DATA (Platform Governance & User Management)
// ============================================================================

export const adminMetrics = [
  {
    id: 'total-projects',
    title: 'Total Projects',
    value: 12,
    subtext: '5 sites active',
    icon: 'MdFolderOpen',
    color: 'blue',
    badge: 'Production',
  },
  {
    id: 'active-users',
    title: 'Active Users',
    value: 28,
    subtext: 'Across 4 role categories',
    icon: 'MdPeople',
    color: 'emerald',
    badge: '100% Verified',
  },
  {
    id: 'system-storage',
    title: 'Storage & Media',
    value: '1.4 GB',
    subtext: 'DPRs, CAD, Primavera XER',
    icon: 'MdBarChart',
    color: 'purple',
    badge: '14% Quota',
  },
  {
    id: 'api-uptime',
    title: 'System Health',
    value: '99.8%',
    subtext: 'AI Extraction Pipeline v2.4',
    icon: 'MdCheckCircle',
    color: 'indigo',
    badge: 'Optimal',
  },
];

export const adminUsersList = [
  {
    id: 'USR-001',
    name: 'Rahul Sharma',
    role: 'Project Manager',
    roleKey: 'project_manager',
    email: 'manager@pragatipath.com',
    projectsCount: 8,
    lastActive: 'Active now',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'USR-002',
    name: 'Raghav Sharma',
    role: 'Project Planner',
    roleKey: 'planner',
    email: 'planner@pragatipath.com',
    projectsCount: 12,
    lastActive: '12m ago',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'USR-003',
    name: 'Suresh Patel',
    role: 'Site Supervisor',
    roleKey: 'site_supervisor',
    email: 'supervisor@pragatipath.com',
    projectsCount: 2,
    lastActive: 'Active now',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'USR-004',
    name: 'Amit Verma',
    role: 'Project Manager',
    roleKey: 'project_manager',
    email: 'amit.v@pragatipath.com',
    projectsCount: 4,
    lastActive: '2h ago',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'USR-005',
    name: 'Neha Singh',
    role: 'Site Engineer',
    roleKey: 'site_supervisor',
    email: 'neha.s@pragatipath.com',
    projectsCount: 3,
    lastActive: '1h ago',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'USR-006',
    name: 'Ananya Verma',
    role: 'System Administrator',
    roleKey: 'admin',
    email: 'admin@pragatipath.com',
    projectsCount: 12,
    lastActive: 'Active now',
    status: 'Superadmin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  },
];

export const adminSystemAuditLogs = [
  { id: 'LOG-01', time: '10 Sep 2026 · 11:42 AM', user: 'Raghav Sharma', action: 'Uploaded Baseline Schedule Rev 2 for PS 26122', category: 'Import' },
  { id: 'LOG-02', time: '10 Sep 2026 · 10:15 AM', user: 'Ananya Verma', action: 'Provisioned Site Supervisor account for Suresh Patel', category: 'Access' },
  { id: 'LOG-03', time: '10 Sep 2026 · 09:30 AM', user: 'System Worker', action: 'Processed 14 DPR multimodal inputs through AI pipeline', category: 'AI Pipeline' },
  { id: 'LOG-04', time: '09 Sep 2026 · 18:00 PM', user: 'System Worker', action: 'Created daily database snapshot & cloud backup', category: 'Backup' },
];

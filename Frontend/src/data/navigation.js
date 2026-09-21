// Mock navigation structure
export const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'MdDashboard',
    group: 'main',
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/projects',
    icon: 'MdFolderOpen',
    group: 'main',
  },
  {
    id: 'dpr',
    label: 'DPR Inbox',
    path: '/dpr',
    icon: 'MdInbox',
    badge: 8,
    group: 'main',
  },
  {
    id: 'schedule',
    label: 'Schedule',
    path: '/schedule',
    icon: 'MdCalendarToday',
    group: 'main',
  },
  {
    id: 'ai-matching',
    label: 'AI Matching',
    path: '/ai-matching',
    icon: 'MdAutoAwesome',
    badge: 18,
    group: 'main',
  },
  {
    id: 'progress',
    label: 'Progress',
    path: '/progress',
    icon: 'MdTrendingUp',
    group: 'main',
  },
  {
    id: 'reports',
    label: 'Reports',
    path: '/reports',
    icon: 'MdBarChart',
    group: 'main',
  },
  {
    id: 'team',
    label: 'Team',
    path: '/team',
    icon: 'MdPeople',
    group: 'project',
  },
  {
    id: 'locations',
    label: 'Locations',
    path: '/locations',
    icon: 'MdLocationOn',
    group: 'project',
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'MdSettings',
    group: 'system',
  },
  {
    id: 'help',
    label: 'Help',
    path: '/help',
    icon: 'MdHelpOutline',
    group: 'system',
  },
];

// Mock current user
export const currentUser = {
  id: 'USR-001',
  name: 'Rajesh Kumar',
  role: 'Project Manager',
  email: 'rajesh.kumar@pragatipath.in',
  avatar: null,
  initials: 'RK',
  organization: 'NHAI – Regional Office',
};

// Mock notifications
export const notifications = [
  {
    id: 'N-001',
    type: 'dpr',
    title: 'New DPR Submitted',
    message: 'Priya Mehta submitted DPR for PS-26122',
    time: '10 min ago',
    read: false,
  },
  {
    id: 'N-002',
    type: 'ai',
    title: 'AI Matching Complete',
    message: '18 activities matched with high confidence',
    time: '1 hr ago',
    read: false,
  },
  {
    id: 'N-003',
    type: 'delay',
    title: 'Delay Alert',
    message: 'PS-33741 is 17 days behind schedule',
    time: '3 hrs ago',
    read: false,
  },
  {
    id: 'N-004',
    type: 'report',
    title: 'Weekly Report Ready',
    message: 'September week 3 report is available',
    time: '1 day ago',
    read: true,
  },
  {
    id: 'N-005',
    type: 'approval',
    title: 'Approval Required',
    message: '3 DPR verifications need your review',
    time: '2 days ago',
    read: true,
  },
];

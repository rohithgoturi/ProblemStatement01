/**
 * PragatiPath — Reports & Export Mock Data
 * Derived from Phase 5 Reference Screen
 */

export const REPORTS_DATA = {
  projectContext: {
    projectId: 'PS-26122',
    projectName: 'Pump P-101 - Unit 2',
    dateRange: '01 Sep 2026 - 15 Sep 2026',
    activeUnit: 'Unit 2 - Pump Installation',
    units: [
      'Unit 2 - Pump Installation',
      'Unit 1 - Boiler Foundation',
      'Unit 3 - Turbines & Piping',
      'Block A - Cable Ducting',
      'Block B - Substation Structure',
    ],
  },

  summaryKpis: {
    totalReports: {
      value: 28,
      trend: '12% vs last week',
      isPositive: true,
    },
    completed: {
      value: 22,
      pct: '79% of total',
    },
    inProgress: {
      value: 4,
      pct: '14% of total',
    },
    delayed: {
      value: 2,
      pct: '7% of total',
    },
    upcoming: {
      value: 0,
      pct: '0% of total',
    },
    exports: {
      value: 8,
      subtext: 'this month',
    },
  },

  reportsTrend: [
    { date: '1 Sep', total: 6, completed: 4 },
    { date: '3 Sep', total: 14, completed: 10 },
    { date: '5 Sep', total: 14, completed: 12 },
    { date: '7 Sep', total: 16, completed: 13 },
    { date: '9 Sep', total: 19, completed: 16 },
    { date: '11 Sep', total: 22, completed: 18 },
    { date: '13 Sep', total: 25, completed: 20 },
    { date: '15 Sep', total: 28, completed: 22 },
  ],

  reportDistribution: {
    totalReports: 28,
    categories: [
      { name: 'Completed', count: 22, pct: 79, color: '#10B981' },
      { name: 'In Progress', count: 4, pct: 14, color: '#0056D2' },
      { name: 'Delayed', count: 2, pct: 7, color: '#F59E0B' },
      { name: 'Upcoming', count: 0, pct: 0, color: '#8B5CF6' },
    ],
  },

  quickExports: [
    {
      id: 'dpr-pdf',
      title: 'Daily Progress Report',
      subtitle: 'Day-wise activity summary',
      format: 'PDF',
      buttonText: 'Download PDF',
      buttonClass: 'bg-[#0056D2] hover:bg-blue-700 text-white',
      iconType: 'pdf',
    },
    {
      id: 'weekly-excel',
      title: 'Weekly Report',
      subtitle: 'Weekly progress & variance',
      format: 'Excel',
      buttonText: 'Download Excel',
      buttonClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      iconType: 'excel',
    },
    {
      id: 'monthly-pdf',
      title: 'Monthly Report',
      subtitle: 'Overall project status',
      format: 'PDF',
      buttonText: 'Download PDF',
      buttonClass: 'bg-[#0056D2] hover:bg-blue-700 text-white',
      iconType: 'pdf',
    },
    {
      id: 'custom-excel',
      title: 'Custom Report',
      subtitle: 'Filter by unit / WBS / Date',
      format: 'Excel',
      buttonText: 'Download Excel',
      buttonClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      iconType: 'excel',
    },
  ],

  recentReports: [
    {
      id: 'rep-1',
      name: 'Daily_Progress_Report_10Sep2026.pdf',
      type: 'Daily',
      typeStyle: 'bg-blue-50 text-[#0056D2] border border-blue-200',
      generatedOn: '10 Sep 2026 - 08:45 AM',
      status: 'Completed',
      format: 'PDF',
      size: '2.4 MB',
      author: 'Rahul Sharma',
    },
    {
      id: 'rep-2',
      name: 'Weekly_Progress_W37.xlsx',
      type: 'Weekly',
      typeStyle: 'bg-purple-50 text-purple-700 border border-purple-200',
      generatedOn: '08 Sep 2026 - 04:20 PM',
      status: 'Completed',
      format: 'Excel',
      size: '1.8 MB',
      author: 'Raghav Sharma',
    },
    {
      id: 'rep-3',
      name: 'Delay_Analysis_Report.pdf',
      type: 'Analysis',
      typeStyle: 'bg-amber-50 text-amber-700 border border-amber-200',
      generatedOn: '06 Sep 2026 - 11:15 AM',
      status: 'In Progress',
      format: 'PDF',
      size: '3.1 MB',
      author: 'AI Pipeline',
    },
    {
      id: 'rep-4',
      name: 'Custom_Report_PumpP-101.xlsx',
      type: 'Custom',
      typeStyle: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
      generatedOn: '05 Sep 2026 - 03:32 PM',
      status: 'Completed',
      format: 'Excel',
      size: '940 KB',
      author: 'Suresh Patel',
    },
    {
      id: 'rep-5',
      name: 'Monthly_Summary_Sep2026.pdf',
      type: 'Monthly',
      typeStyle: 'bg-purple-50 text-purple-700 border border-purple-200',
      generatedOn: '01 Sep 2026 - 10:00 AM',
      status: 'Completed',
      format: 'PDF',
      size: '4.2 MB',
      author: 'Rahul Sharma',
    },
  ],

  reportInsights: [
    {
      id: 'ins-1',
      type: 'trend',
      title: 'Project progress is 68%',
      desc: 'On track as per planned schedule.',
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'ins-2',
      type: 'clock',
      title: '2 activities are delayed',
      desc: 'Requires immediate attention.',
      iconBg: 'bg-blue-50 text-[#0056D2]',
    },
    {
      id: 'ins-3',
      type: 'chart',
      title: 'Pump P-101 installation',
      desc: 'Completed and verified in 100% of units.',
      iconBg: 'bg-purple-50 text-purple-600',
    },
    {
      id: 'ins-4',
      type: 'file',
      title: 'Weekly report on time',
      desc: 'W37 report submitted successfully.',
      iconBg: 'bg-amber-50 text-amber-600',
    },
  ],
};

/**
 * PragatiPath — Progress Tracking Page
 * Faithfully reproduces Phase 4 Reference Screen 1:
 * - Hero banner with construction site image, context dropdowns, and header
 * - 6 Top-Row Activity KPI Cards (Overall Progress radial, Total, Completed, In Progress, Delayed, Upcoming)
 * - Middle Row: Progress Overview Line Chart, Schedule vs Actual Discipline Bars, Progress by Location
 * - Bottom Row: Activity Progress Details Table, Delay Analysis Donut Chart + Top Reasons, Recent Progress Updates
 * - Bottom Slogan / Real-time Update Bar
 */
import { useState } from 'react';
import {
  MdTrendingUp,
  MdCalendarToday,
  MdKeyboardArrowDown,
  MdLocationCity,
  MdAssignment,
  MdCheckCircle,
  MdAccessTime,
  MdWarning,
  MdHourglassEmpty,
  MdArrowUpward,
  MdArrowForward,
  MdLocationOn,
  MdInfoOutline,
  MdLayers,
  MdClose,
} from 'react-icons/md';
import { PROGRESS_TRACKING_DATA } from '../../data/progressData';
import { cn } from '../../utils/helpers';
import { PageHero } from '../../components/shared/PageHero';

export default function ProgressPage() {
  const [data] = useState(PROGRESS_TRACKING_DATA);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper for overall radial gauge in KPI card 1
  const renderRadialGauge = (pct = 68, size = 52) => {
    const strokeWidth = 5;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (pct / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#10B981"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        </div>
      </div>
    );
  };

  // Helper for delay donut chart
  const renderDelayDonut = (total = 18, size = 130) => {
    // Slices: Material (44%), Workforce (28%), Weather (17%), Other (11%)
    const strokeWidth = 14;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    // Cumulative offsets
    const s1 = 0.44 * circumference;
    const s2 = 0.28 * circumference;
    const s3 = 0.17 * circumference;
    const s4 = 0.11 * circumference;

    return (
      <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          {/* Material Delay: Red */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#EF4444"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${s1} ${circumference}`}
            strokeDashoffset={0}
          />
          {/* Workforce: Amber */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F59E0B"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${s2} ${circumference}`}
            strokeDashoffset={-s1}
          />
          {/* Weather: Blue */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#3B82F6"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${s3} ${circumference}`}
            strokeDashoffset={-(s1 + s2)}
          />
          {/* Other: Purple */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#8B5CF6"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${s4} ${circumference}`}
            strokeDashoffset={-(s1 + s2 + s3)}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-extrabold text-slate-900 leading-none">{total}</span>
          <span className="text-[9px] font-semibold text-slate-500 mt-0.5 leading-tight">
            Delayed<br />Activities
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-7 max-w-[1600px] mx-auto space-y-4">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <MdCheckCircle className="text-emerald-400 text-base flex-shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <MdClose size={14} />
          </button>
        </div>
      )}

      {/* 1. UNIFIED PROGRESS HERO BANNER */}
      <PageHero
        title="Progress Tracking"
        subtitle="Compare planned work with actual execution"
        icon={<MdTrendingUp />}
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Progress' },
        ]}
        actions={
          <>
            {/* Date Range Selector */}
            <div
              onClick={() => showToast('Filtered schedule window: 01 Sep 2026 - 15 Sep 2026')}
              className="bg-white hover:bg-slate-50 text-slate-800 rounded-xl px-3.5 py-2 flex items-center gap-2 text-xs font-semibold shadow-xs transition-colors cursor-pointer border border-slate-100"
            >
              <MdCalendarToday className="text-slate-500 text-sm" />
              <span>01 Sep 2026 &nbsp;–&nbsp; 15 Sep 2026</span>
              <MdKeyboardArrowDown className="text-slate-400 text-sm ml-0.5" />
            </div>

            {/* Project / Unit Selector */}
            <div
              onClick={() => showToast('Switched to Unit 2 - Pump Installation')}
              className="bg-white hover:bg-slate-50 text-slate-800 rounded-xl px-3.5 py-2 flex items-center gap-2 text-xs font-semibold shadow-xs transition-colors cursor-pointer border border-slate-100"
            >
              <MdLocationCity className="text-slate-500 text-sm" />
              <span>Unit 2 - Pump Installation</span>
              <MdKeyboardArrowDown className="text-slate-400 text-sm ml-0.5" />
            </div>
          </>
        }
      />

      {/* Top Row: 6 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Overall Progress */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Overall Progress
            </span>
          </div>

          <div className="flex items-center gap-3 my-1">
            {renderRadialGauge(data.summaryKpis.overallProgress.value, 46)}
            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                {data.summaryKpis.overallProgress.value}%
              </div>
              <div className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 mt-1">
                <MdArrowUpward size={11} />
                <span>{data.summaryKpis.overallProgress.trend}</span>
              </div>
            </div>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${data.summaryKpis.overallProgress.value}%` }}
            />
          </div>
        </div>

        {/* Card 2: Total Planned Activities */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0056D2] flex items-center justify-center">
              <MdAssignment className="text-base" />
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500">
              Total Planned Activities
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight my-0.5">
              {data.summaryKpis.totalPlannedActivities.value}
            </div>
            <div className="text-[10px] text-slate-400">
              {data.summaryKpis.totalPlannedActivities.subtext}
            </div>
          </div>
        </div>

        {/* Card 3: Completed */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MdCheckCircle className="text-base" />
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500">
              Completed
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight my-0.5">
              {data.summaryKpis.completed.value}
            </div>
            <div className="text-[10px] font-semibold text-emerald-600">
              {data.summaryKpis.completed.pct}
            </div>
          </div>
        </div>

        {/* Card 4: In Progress */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0056D2] flex items-center justify-center">
              <MdAccessTime className="text-base" />
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500">
              In Progress
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight my-0.5">
              {data.summaryKpis.inProgress.value}
            </div>
            <div className="text-[10px] font-semibold text-[#0056D2]">
              {data.summaryKpis.inProgress.pct}
            </div>
          </div>
        </div>

        {/* Card 5: Delayed */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <MdWarning className="text-base" />
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500">
              Delayed
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight my-0.5">
              {data.summaryKpis.delayed.value}
            </div>
            <div className="text-[10px] font-semibold text-red-600">
              {data.summaryKpis.delayed.pct}
            </div>
          </div>
        </div>

        {/* Card 6: Upcoming */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <MdHourglassEmpty className="text-base" />
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500">
              Upcoming
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight my-0.5">
              {data.summaryKpis.upcoming.value}
            </div>
            <div className="text-[10px] font-semibold text-purple-600">
              {data.summaryKpis.upcoming.pct}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Progress Overview (Line), Schedule vs Actual (Bars), Progress by Location */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Card 1: Progress Overview Line Chart (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h3 className="text-sm font-bold text-slate-900">Progress Overview</h3>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#0056D2]" />
                  Planned Progress
                </span>
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Actual Progress
                </span>
              </div>
            </div>

            {/* Custom Responsive SVG Line Chart matching reference */}
            <div className="w-full h-56 pt-2">
              <svg viewBox="0 0 460 200" className="w-full h-full overflow-visible">
                {/* Horizontal Grid lines */}
                <line x1="36" y1="20" x2="430" y2="20" stroke="#F1F5F9" strokeDasharray="3 3" />
                <text x="5" y="24" fill="#94A3B8" fontSize="10" fontWeight="600">100%</text>

                <line x1="36" y1="60" x2="430" y2="60" stroke="#F1F5F9" strokeDasharray="3 3" />
                <text x="12" y="64" fill="#94A3B8" fontSize="10" fontWeight="600">75%</text>

                <line x1="36" y1="100" x2="430" y2="100" stroke="#F1F5F9" strokeDasharray="3 3" />
                <text x="12" y="104" fill="#94A3B8" fontSize="10" fontWeight="600">50%</text>

                <line x1="36" y1="140" x2="430" y2="140" stroke="#F1F5F9" strokeDasharray="3 3" />
                <text x="12" y="144" fill="#94A3B8" fontSize="10" fontWeight="600">25%</text>

                <line x1="36" y1="180" x2="430" y2="180" stroke="#E2E8F0" />
                <text x="18" y="184" fill="#94A3B8" fontSize="10" fontWeight="600">0%</text>

                {/* Planned Progress Line (Blue) */}
                {/* Points: 15%->y=156, 24%->y=141, 33%->y=127, 45%->y=108, 55%->y=92, 63%->y=79, 71%->y=66, 78%->y=55 */}
                <path
                  d="M 50 156 L 102 141 L 154 127 L 206 108 L 258 92 L 310 79 L 362 66 L 414 55"
                  fill="none"
                  stroke="#0056D2"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Actual Progress Line (Emerald Green) */}
                {/* Points: 12%->y=160, 19%->y=149, 26%->y=138, 37%->y=120, 47%->y=104, 54%->y=93, 61%->y=82, 68%->y=71 */}
                <path
                  d="M 50 160 L 102 149 L 154 138 L 206 120 L 258 104 L 310 93 L 362 82 L 414 71"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Dots on Planned line */}
                {[
                  [50, 156], [102, 141], [154, 127], [206, 108],
                  [258, 92], [310, 79], [362, 66], [414, 55],
                ].map(([cx, cy], i) => (
                  <circle key={`p-${i}`} cx={cx} cy={cy} r="3.5" fill="#0056D2" stroke="#FFFFFF" strokeWidth="1.5" />
                ))}

                {/* Dots on Actual line */}
                {[
                  [50, 160], [102, 149], [154, 138], [206, 120],
                  [258, 104], [310, 93], [362, 82], [414, 71],
                ].map(([cx, cy], i) => (
                  <circle key={`a-${i}`} cx={cx} cy={cy} r="3.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                ))}

                {/* Final value tags */}
                {/* 78% blue badge */}
                <rect x="400" y="44" width="30" height="16" rx="4" fill="#0056D2" />
                <text x="404" y="56" fill="#FFFFFF" fontSize="9" fontWeight="bold">78%</text>

                {/* 68% emerald badge */}
                <rect x="400" y="67" width="30" height="16" rx="4" fill="#10B981" />
                <text x="404" y="79" fill="#FFFFFF" fontSize="9" fontWeight="bold">68%</text>

                {/* X-axis labels */}
                {data.progressOverviewTimeline.map((item, i) => (
                  <text
                    key={item.date}
                    x={50 + i * 52}
                    y="196"
                    textAnchor="middle"
                    fill="#64748B"
                    fontSize="9.5"
                    fontWeight="500"
                  >
                    {item.date}
                  </text>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Schedule vs Actual Progress (Grouped Horizontal Bars) (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h3 className="text-sm font-bold text-slate-900">Schedule vs Actual Progress</h3>
              <div className="flex items-center gap-2.5 text-[11px]">
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#0056D2]" /> Planned
                </span>
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Actual
                </span>
              </div>
            </div>

            {/* Discipline Bars */}
            <div className="space-y-3 pt-1">
              {data.disciplineProgress.map((item) => (
                <div key={item.discipline} className="space-y-1">
                  <div className="text-[11px] font-semibold text-slate-700">
                    {item.discipline}
                  </div>

                  {/* Planned Bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-[#0056D2] rounded-full transition-all duration-300"
                        style={{ width: `${item.planned}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-[#0056D2] w-7 text-right">
                      {item.planned}%
                    </span>
                  </div>

                  {/* Actual Bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${item.actual}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 w-7 text-right">
                      {item.actual}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Axis grid markings */}
            <div className="flex justify-between text-[9px] font-semibold text-slate-400 pt-3 border-t border-slate-100 mt-2">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Card 3: Progress by Location (3 Cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded-md bg-blue-50 text-[#0056D2]">
                  <MdLocationOn className="text-sm" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">Progress by Location</h3>
              </div>
              <button
                type="button"
                onClick={() => showToast('Viewing all project site locations.')}
                className="text-xs font-semibold text-[#0056D2] hover:underline flex items-center gap-0.5"
              >
                View All <MdArrowForward size={11} />
              </button>
            </div>

            {/* Location Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                    <th className="py-2">Location</th>
                    <th className="py-2 text-center">Planned</th>
                    <th className="py-2 text-right">Actual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.locationProgress.map((loc) => (
                    <tr key={loc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 font-semibold text-slate-800">
                        {loc.location}
                      </td>
                      <td className="py-2.5 text-center text-slate-600 font-medium">
                        {loc.planned}%
                      </td>
                      <td className="py-2.5 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <div className="w-14 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={cn('h-full rounded-full', loc.color)}
                              style={{ width: `${loc.actual}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-800 text-[11px] w-7 text-right">
                            {loc.actual}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Activity Progress Details, Delay Analysis, Recent Progress Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Card 1: Activity Progress Details (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-blue-50 text-[#0056D2]">
                  <MdAssignment className="text-base" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">Activity Progress Details</h3>
              </div>
              <button
                type="button"
                onClick={() => showToast('Opening complete schedule activity progress registry.')}
                className="text-xs font-semibold text-[#0056D2] hover:underline flex items-center gap-0.5"
              >
                View All <MdArrowForward size={11} />
              </button>
            </div>

            {/* Activity Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-2 px-2">Activity ID</th>
                    <th className="py-2 px-2">Activity Name</th>
                    <th className="py-2 px-2">Location</th>
                    <th className="py-2 px-2 text-center">Planned %</th>
                    <th className="py-2 px-2 text-center">Actual %</th>
                    <th className="py-2 px-2 text-center">Status</th>
                    <th className="py-2 px-2 text-center">Delay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.activityProgressDetails.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-2 font-bold text-slate-800 text-[11px]">
                        {row.id}
                      </td>
                      <td className="py-2.5 px-2 font-medium text-slate-800">
                        {row.activityName}
                      </td>
                      <td className="py-2.5 px-2 text-slate-500 text-[11px]">
                        {row.location}
                      </td>
                      <td className="py-2.5 px-2 text-center font-semibold text-slate-700">
                        {row.planned}%
                      </td>
                      <td className="py-2.5 px-2 text-center font-bold text-slate-900">
                        {row.actual}%
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span
                          className={cn(
                            'inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold',
                            row.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : row.status === 'Delayed'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          )}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-center font-semibold text-xs">
                        {row.delay === '-' ? (
                          <span className="text-slate-400">-</span>
                        ) : (
                          <span className="text-red-500 font-bold">{row.delay}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Card 2: Delay Analysis (3.5 Cols / approx lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-blue-50 text-[#0056D2]">
                  <MdAccessTime className="text-base" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">Delay Analysis</h3>
              </div>
              <button
                type="button"
                onClick={() => showToast('Opening root cause analysis report.')}
                className="text-xs font-semibold text-[#0056D2] hover:underline flex items-center gap-0.5"
              >
                View All <MdArrowForward size={11} />
              </button>
            </div>

            {/* Donut Chart + Slices Legend */}
            <div className="flex items-center justify-between gap-4 py-1">
              {renderDelayDonut(data.delayAnalysis.totalDelayed, 120)}

              <div className="space-y-2 flex-1 text-xs">
                {data.delayAnalysis.categories.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-600 truncate">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      {cat.name}
                    </span>
                    <span className="font-bold text-slate-800 ml-2">
                      {cat.count} <span className="text-[10px] text-slate-400">({cat.pct}%)</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Delay Reasons List */}
            <div className="pt-3 border-t border-slate-100 mt-2 space-y-1.5">
              <h4 className="text-[11px] font-bold text-slate-700">Top Delay Reasons</h4>
              <div className="space-y-1 text-xs text-slate-600">
                {data.delayAnalysis.topReasons.map((reason) => (
                  <div key={reason.rank} className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-medium">{reason.rank}.</span>
                    <span>{reason.reason}</span>
                    <span className="text-slate-400">({reason.count})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Recent Progress Updates (3 Cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded-md bg-blue-50 text-[#0056D2]">
                  <MdLayers className="text-sm" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">Recent Progress Updates</h3>
              </div>
              <button
                type="button"
                onClick={() => showToast('Opening complete live progress feed.')}
                className="text-xs font-semibold text-[#0056D2] hover:underline flex items-center gap-0.5"
              >
                View All <MdArrowForward size={11} />
              </button>
            </div>

            {/* Updates list with images */}
            <div className="divide-y divide-slate-100 space-y-2">
              {data.recentProgressUpdates.map((item) => (
                <div key={item.id} className="pt-2 flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 truncate">
                      {item.subtitle}
                    </p>
                    <p className="text-[9px] text-slate-400">
                      {item.timestamp}
                    </p>
                  </div>

                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-[9px] font-semibold flex-shrink-0',
                      item.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.status === 'Delayed'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    )}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Slogan / Real-time Update Bar matching reference */}
      <div className="rounded-2xl bg-blue-50/60 border border-blue-100/90 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-slate-700">
          <span className="w-7 h-7 rounded-full bg-[#0056D2] text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
            <MdInfoOutline />
          </span>
          <p className="leading-relaxed">
            Progress data is updated in real-time based on approved AI matching and human validation. Delays are flagged automatically based on schedule variance.
          </p>
        </div>

        {/* Right sketch & cursive branding */}
        <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0 text-[#0056D2] font-medium italic">
          <svg className="w-6 h-6 stroke-current text-[#0056D2]" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
            <path d="M3 21h18M6 21V9l8-4v16M14 11l4-2v12M9 13v.01M9 17v.01M17 13v.01M17 17v.01" />
          </svg>
          <span className="tracking-wide">
            On time progress. Better decisions. Stronger projects.
          </span>
        </div>
      </div>
    </div>
  );
}

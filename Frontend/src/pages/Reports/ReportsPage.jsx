/**
 * PragatiPath — Reports & Export Page
 * Visual Correction matching Reference Image exactly:
 * - Real construction site hero banner with vibrant sky, cranes, and site engineer overlay
 * - 6 Top-Row KPI Cards with horizontal flex layout and solid circular badge icons (white on color)
 * - Middle Row (3 cards):
 *    - 5 Cols: Reports Trend (SVG area fill, 0-40 Y-axis, 28 & 22 badge pills)
 *    - 3.5 Cols: Report Distribution (Donut chart with center text + stacked legend with dots and counts)
 *    - 3.5 Cols: Quick Export (2x2 grid with PDF/Excel format icons & solid download buttons)
 * - Bottom Row (2 cards):
 *    - 7 Cols: Recent Reports table (5 rows with file icons, category pills, dates, completed/in-progress badges, action icons)
 *    - 5 Cols: Report Insights (4 cards with solid colored circular icons with white symbols)
 * - Bottom Info Banner: Info note on left + cursive handwritten sketch branding on right
 * - Interactive states: Download preparation loading & toast notification, View details modal
 */
import { useState } from 'react';
import {
  MdCalendarToday,
  MdKeyboardArrowDown,
  MdLocationCity,
  MdCheck,
  MdCheckCircle,
  MdAccessTime,
  MdWarning,
  MdHourglassEmpty,
  MdFileDownload,
  MdArrowUpward,
  MdArrowForward,
  MdVisibility,
  MdTrendingUp,
  MdBarChart,
  MdDescription,
  MdLightbulbOutline,
  MdCloudDownload,
  MdClose,
  MdInfoOutline,
  MdPictureAsPdf,
  MdTableChart,
  MdPieChart,
} from 'react-icons/md';
import { REPORTS_DATA } from '../../data/reportsData';
import { cn } from '../../utils/helpers';
import { PageHeader } from '../../components/shared/PageHeader';

export default function ReportsPage() {
  const [data] = useState(REPORTS_DATA);
  const [toastMessage, setToastMessage] = useState(null);
  const [exportingId, setExportingId] = useState(null);
  const [activeReportModal, setActiveReportModal] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleDownload = (report) => {
    setExportingId(report.id || report.title);
    setTimeout(() => {
      setExportingId(null);
      showToast(`Downloaded ${report.name || report.title} successfully.`);
    }, 600);
  };

  // SVG Donut Chart helper matching reference
  const renderDistributionDonut = (total = 28, size = 114) => {
    const strokeWidth = 14;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    // Slices matching reference image:
    // 1. Delayed (Orange, 7%): at top, 12 o'clock clockwise to ~12:45
    // 2. Completed (Green, 79%): sweeps clockwise down and around to ~10:15
    // 3. In Progress (Blue, 14%): sweeps clockwise up left side to 12 o'clock
    const sDelayed = 0.07 * circumference;
    const sCompleted = 0.79 * circumference;
    const sInProgress = 0.14 * circumference;

    return (
      <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          {/* Delayed: Orange */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F59E0B"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${sDelayed} ${circumference}`}
            strokeDashoffset={0}
          />
          {/* Completed: Green */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#10B981"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${sCompleted} ${circumference}`}
            strokeDashoffset={-sDelayed}
          />
          {/* In Progress: Blue */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#0056D2"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${sInProgress} ${circumference}`}
            strokeDashoffset={-(sDelayed + sCompleted)}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-black text-slate-900 leading-none">{total}</span>
          <span className="text-[9px] font-semibold text-slate-500 mt-0.5">Total Reports</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-5 lg:p-6 max-w-[1600px] mx-auto space-y-4">
      {/* Toast Notification */}
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

      {/* Report Preview Modal */}
      {activeReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-2xs p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-5 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-blue-50 text-[#0056D2]">
                  {activeReportModal.format === 'PDF' ? <MdPictureAsPdf size={20} /> : <MdTableChart size={20} />}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 truncate">
                    {activeReportModal.name}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Generated: {activeReportModal.generatedOn}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveReportModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <MdClose size={18} />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Category:</span>
                <span className="font-semibold text-slate-800">{activeReportModal.type} Report</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Status:</span>
                <span className="font-semibold text-emerald-600">{activeReportModal.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">File Size:</span>
                <span className="font-semibold text-slate-800">{activeReportModal.size}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Author:</span>
                <span className="font-semibold text-slate-800">{activeReportModal.author}</span>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-[11px] text-slate-600 leading-relaxed">
              This report contains aggregated site execution progress, milestone tracking, and quantity verification for Project PS-26122 (Unit 2 - Pump Installation).
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveReportModal(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownload(activeReportModal);
                  setActiveReportModal(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0056D2] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
              >
                <MdFileDownload size={15} /> Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. STANDARDIZED PAGE HEADER */}
      <PageHeader
        title="Reports & Export"
        subtitle="Daily/Weekly progress, delay reports, Excel/PDF Export."
        icon={<MdDescription />}
        actions={
          <>
            {/* Date Range Selector */}
            <div
              onClick={() => showToast('Date range selected: 01 Sep 2026 - 15 Sep 2026')}
              className="bg-white hover:bg-slate-50 text-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm font-medium shadow-xs transition-colors cursor-pointer border border-white/40"
            >
              <MdCalendarToday className="text-slate-500 text-sm" />
              <span>01 Sep 2026 – 15 Sep 2026</span>
              <MdKeyboardArrowDown className="text-slate-400 text-sm ml-0.5" />
            </div>

            {/* Project / Unit Selector */}
            <div
              onClick={() => showToast('Active report unit: Unit 2 - Pump Installation')}
              className="bg-white hover:bg-slate-50 text-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm font-medium shadow-xs transition-colors cursor-pointer border border-white/40"
            >
              <MdLocationCity className="text-slate-500 text-sm" />
              <span>Unit 2 – Pump Installation</span>
              <MdKeyboardArrowDown className="text-slate-400 text-sm ml-0.5" />
            </div>
          </>
        }
      />

      {/* Top Row: 6 KPI Cards with Solid Circular Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Total Reports */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-[#0056D2] text-white flex items-center justify-center text-lg flex-shrink-0 shadow-xs">
            <MdDescription />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-500 truncate">Total Reports</div>
            <div className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {data.summaryKpis.totalReports.value}
            </div>
            <div className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
              <MdArrowUpward size={12} />
              <span>{data.summaryKpis.totalReports.trend}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Completed */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-[#10B981] text-white flex items-center justify-center text-lg flex-shrink-0 shadow-xs">
            <MdCheck className="text-xl" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-500 truncate">Completed</div>
            <div className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {data.summaryKpis.completed.value}
            </div>
            <div className="text-[11px] font-semibold text-emerald-600">
              {data.summaryKpis.completed.pct}
            </div>
          </div>
        </div>

        {/* Card 3: In Progress */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-[#F59E0B] text-white flex items-center justify-center text-lg flex-shrink-0 shadow-xs">
            <MdAccessTime />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-500 truncate">In Progress</div>
            <div className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {data.summaryKpis.inProgress.value}
            </div>
            <div className="text-[11px] font-medium text-slate-500">
              {data.summaryKpis.inProgress.pct}
            </div>
          </div>
        </div>

        {/* Card 4: Delayed */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-[#EF4444] text-white flex items-center justify-center text-lg flex-shrink-0 shadow-xs">
            <MdWarning />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-500 truncate">Delayed</div>
            <div className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {data.summaryKpis.delayed.value}
            </div>
            <div className="text-[11px] font-medium text-slate-500">
              {data.summaryKpis.delayed.pct}
            </div>
          </div>
        </div>

        {/* Card 5: Upcoming */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-lg flex-shrink-0 shadow-xs">
            <MdHourglassEmpty />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-500 truncate">Upcoming</div>
            <div className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {data.summaryKpis.upcoming.value}
            </div>
            <div className="text-[11px] font-medium text-slate-500">
              {data.summaryKpis.upcoming.pct}
            </div>
          </div>
        </div>

        {/* Card 6: Exports */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-[#0056D2] text-white flex items-center justify-center text-lg flex-shrink-0 shadow-xs">
            <MdFileDownload />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-500 truncate">Exports</div>
            <div className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {data.summaryKpis.exports.value}
            </div>
            <div className="text-[11px] font-medium text-slate-500">
              {data.summaryKpis.exports.subtext}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Reports Trend, Report Distribution, Quick Export */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr_1.05fr] gap-4 items-stretch">
        {/* Card 1: Reports Trend */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
                  <MdCalendarToday className="text-sm" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">Reports Trend</h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0056D2]" />
                  Total Reports
                </span>
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Completed
                </span>
              </div>
            </div>

            {/* SVG Area & Line Chart */}
            <div className="w-full h-56 pt-2">
              <svg viewBox="0 0 460 200" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="reportsAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0056D2" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#0056D2" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                <line x1="30" y1="20" x2="430" y2="20" stroke="#F1F5F9" strokeDasharray="3 3" />
                <text x="12" y="24" fill="#94A3B8" fontSize="10" fontWeight="600">40</text>

                <line x1="30" y1="60" x2="430" y2="60" stroke="#F1F5F9" strokeDasharray="3 3" />
                <text x="12" y="64" fill="#94A3B8" fontSize="10" fontWeight="600">30</text>

                <line x1="30" y1="100" x2="430" y2="100" stroke="#F1F5F9" strokeDasharray="3 3" />
                <text x="12" y="104" fill="#94A3B8" fontSize="10" fontWeight="600">20</text>

                <line x1="30" y1="140" x2="430" y2="140" stroke="#F1F5F9" strokeDasharray="3 3" />
                <text x="12" y="144" fill="#94A3B8" fontSize="10" fontWeight="600">10</text>

                <line x1="30" y1="180" x2="430" y2="180" stroke="#E2E8F0" />
                <text x="18" y="184" fill="#94A3B8" fontSize="10" fontWeight="600">0</text>

                {/* Total Reports Area */}
                <path
                  d="M 50 156 L 102 124 L 154 124 L 206 116 L 258 104 L 310 92 L 362 80 L 414 68 L 414 180 L 50 180 Z"
                  fill="url(#reportsAreaGradient)"
                />

                {/* Total Reports Line (Blue) */}
                <path
                  d="M 50 156 L 102 124 L 154 124 L 206 116 L 258 104 L 310 92 L 362 80 L 414 68"
                  fill="none"
                  stroke="#0056D2"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Completed Reports Line (Emerald) */}
                <path
                  d="M 50 164 L 102 140 L 154 132 L 206 128 L 258 116 L 310 108 L 362 100 L 414 92"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Dots on Total Reports */}
                {[
                  [50, 156], [102, 124], [154, 124], [206, 116],
                  [258, 104], [310, 92], [362, 80], [414, 68],
                ].map(([cx, cy], i) => (
                  <circle key={`tot-${i}`} cx={cx} cy={cy} r="3.5" fill="#0056D2" stroke="#FFFFFF" strokeWidth="1.5" />
                ))}

                {/* Dots on Completed Reports */}
                {[
                  [50, 164], [102, 140], [154, 132], [206, 128],
                  [258, 116], [310, 108], [362, 100], [414, 92],
                ].map(([cx, cy], i) => (
                  <circle key={`comp-${i}`} cx={cx} cy={cy} r="3.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                ))}

                {/* 28 Blue Badge */}
                <rect x="400" y="58" width="28" height="16" rx="4" fill="#0056D2" />
                <text x="406" y="70" fill="#FFFFFF" fontSize="9" fontWeight="bold">28</text>

                {/* 22 Emerald Badge */}
                <rect x="400" y="88" width="28" height="16" rx="4" fill="#10B981" />
                <text x="406" y="100" fill="#FFFFFF" fontSize="9" fontWeight="bold">22</text>

                {/* X-Axis Date Labels */}
                {data.reportsTrend.map((item, i) => (
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

        {/* Card 2: Report Distribution (Donut) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
                <MdPieChart className="text-base" />
              </span>
              <h3 className="text-sm font-bold text-slate-900">Report Distribution</h3>
            </div>

            {/* Donut Chart + Stacked Legend on Right */}
            <div className="flex items-center justify-between gap-3 sm:gap-4 py-2">
              {renderDistributionDonut(data.reportDistribution.totalReports, 114)}

              <div className="space-y-2.5 flex-1 min-w-0 text-xs">
                {data.reportDistribution.categories.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-slate-600 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-[11px] font-medium truncate">{cat.name}</span>
                    </span>
                    <span className="font-bold text-slate-800 text-xs ml-1 whitespace-nowrap flex-shrink-0">
                      {cat.pct}% <span className="text-[10px] text-slate-400 font-normal">({cat.count})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Quick Export */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
                  <MdCloudDownload className="text-base" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">Quick Export</h3>
              </div>
              <button
                type="button"
                onClick={() => showToast('Displaying all export formats.')}
                className="text-xs font-semibold text-[#0056D2] hover:underline flex items-center gap-0.5"
              >
                View All <MdArrowForward size={11} />
              </button>
            </div>

            {/* 2x2 Grid of Export Cards */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {data.quickExports.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5 flex flex-col justify-between space-y-2 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={cn(
                        'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm mt-0.5',
                        item.iconType === 'pdf'
                          ? 'bg-blue-100 text-[#0056D2]'
                          : 'bg-emerald-100 text-emerald-600'
                      )}
                    >
                      {item.iconType === 'pdf' ? <MdPictureAsPdf /> : <MdTableChart />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownload(item)}
                    disabled={exportingId === item.id}
                    className={cn(
                      'w-full py-1.5 px-2 rounded-lg text-xs font-semibold transition-all shadow-2xs text-center',
                      item.buttonClass
                    )}
                  >
                    {exportingId === item.id ? 'Preparing...' : item.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Reports Table (7 Cols) & Report Insights (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Card 1: Recent Reports (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
                  <MdDescription className="text-base" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">Recent Reports</h3>
              </div>
              <button
                type="button"
                onClick={() => showToast('Opening complete archive of generated reports.')}
                className="text-xs font-semibold text-[#0056D2] hover:underline flex items-center gap-0.5"
              >
                View All <MdArrowForward size={11} />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-3 w-[36%]">Report Name</th>
                    <th className="py-2.5 px-2 text-center w-[12%]">Type</th>
                    <th className="py-2.5 px-2 w-[24%]">Generated On</th>
                    <th className="py-2.5 px-2 text-center w-[14%]">Status</th>
                    <th className="py-2.5 px-2 text-center w-[14%]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.recentReports.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Name */}
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2 max-w-[240px]">
                          <span className="text-slate-400 flex-shrink-0">
                            {row.format === 'PDF' ? (
                              <MdPictureAsPdf className="text-blue-600" />
                            ) : (
                              <MdTableChart className="text-emerald-600" />
                            )}
                          </span>
                          <span className="font-semibold text-slate-800 truncate text-[11px]">
                            {row.name}
                          </span>
                        </div>
                      </td>

                      {/* Type Badge */}
                      <td className="py-2.5 px-2 text-center">
                        <span
                          className={cn(
                            'inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold',
                            row.typeStyle
                          )}
                        >
                          {row.type}
                        </span>
                      </td>

                      {/* Generated On */}
                      <td className="py-2.5 px-2 text-slate-500 text-[11px] whitespace-nowrap">
                        {row.generatedOn}
                      </td>

                      {/* Status */}
                      <td className="py-2.5 px-2 text-center">
                        <span
                          className={cn(
                            'inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold',
                            row.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          )}
                        >
                          {row.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-2.5 px-2 text-center">
                        <div className="flex items-center justify-center gap-1.5 text-slate-400">
                          <button
                            type="button"
                            onClick={() => handleDownload(row)}
                            title="Download Report"
                            className="p-1 rounded-md hover:bg-slate-100 hover:text-[#0056D2] transition-colors"
                          >
                            <MdFileDownload size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveReportModal(row)}
                            title="View Report Details"
                            className="p-1 rounded-md hover:bg-slate-100 hover:text-slate-700 transition-colors"
                          >
                            <MdVisibility size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Card 2: Report Insights (5 Cols) with Solid Circular Icons */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
                  <MdLightbulbOutline className="text-base" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">Report Insights</h3>
              </div>
              <button
                type="button"
                onClick={() => showToast('Opening complete insights feed.')}
                className="text-xs font-semibold text-[#0056D2] hover:underline flex items-center gap-0.5"
              >
                View All <MdArrowForward size={11} />
              </button>
            </div>

            {/* Insights list matching reference */}
            <div className="space-y-2.5 pt-1">
              {/* Item 1: Progress is 68% */}
              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 flex items-center gap-3 hover:border-blue-100 transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#10B981] text-white flex items-center justify-center text-base flex-shrink-0 shadow-2xs">
                  <MdTrendingUp />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    Project progress is 68%
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    On track as per planned schedule.
                  </p>
                </div>
              </div>

              {/* Item 2: 2 activities are delayed */}
              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 flex items-center gap-3 hover:border-blue-100 transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#0056D2] text-white flex items-center justify-center text-base flex-shrink-0 shadow-2xs">
                  <MdAccessTime />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    2 activities are delayed
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    Requires immediate attention.
                  </p>
                </div>
              </div>

              {/* Item 3: Pump P-101 installation */}
              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 flex items-center gap-3 hover:border-blue-100 transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-base flex-shrink-0 shadow-2xs">
                  <MdBarChart />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    Pump P-101 installation
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    Completed and verified in 100% of units.
                  </p>
                </div>
              </div>

              {/* Item 4: Weekly report on time */}
              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 flex items-center gap-3 hover:border-blue-100 transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#F59E0B] text-white flex items-center justify-center text-base flex-shrink-0 shadow-2xs">
                  <MdDescription />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    Weekly report on time
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    W37 report submitted successfully.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Slogan / Information Bar matching reference */}
      <div className="rounded-2xl bg-blue-50/60 border border-blue-100/90 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-slate-700">
          <span className="w-7 h-7 rounded-full bg-[#0056D2] text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
            <MdInfoOutline />
          </span>
          <p className="leading-relaxed">
            Reports help you track project performance, identify delays and make data-driven decisions.
          </p>
        </div>

        {/* Right sketch icon & cursive branding */}
        <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0 text-[#0056D2] font-medium italic">
          <svg className="w-6 h-6 stroke-current text-[#0056D2]" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="tracking-wide">
            Better data. Smarter tracking. On time progress.
          </span>
        </div>
      </div>
    </div>
  );
}

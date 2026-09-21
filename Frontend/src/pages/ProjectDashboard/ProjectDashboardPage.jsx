/**
 * ProjectDashboardPage — PS 26122 Project Dashboard
 * Faithfully reproduces Reference Screen 1 with complete precision:
 * - Construction Hero Banner with 'Overall Progress 68% On Track' radial card
 * - 5 Activity KPI Cards with colored bottom accent lines
 * - 3-Column Middle Grid:
 *   - Col 1: Planned vs Actual Progress + Daily Progress Reports
 *   - Col 2: AI Matching Queue (interactive Approve/Review) + Delay & Risk Flags
 *   - Col 3: DPR Inbox feed
 * - 3-Column Bottom Row:
 *   - Project Progress Donut Gauge
 *   - Activity Matching Funnel (48 → 32 → 12 → 10)
 *   - Recent Activity Audit Table
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdLocationOn, MdCheckCircle, MdAccessTime, MdWarning,
  MdPerson, MdLayers, MdChevronRight, MdAutoAwesome,
  MdArticle, MdImage, MdMic, MdPictureAsPdf,
  MdGridOn, MdCheck,
} from 'react-icons/md';
import { PageHero } from '../../components/shared/PageHero';

import {
  ps26122ProjectHeader,
  ps26122ActivityKPIs,
  plannedVsActualActivities,
  dailyProgressReports,
  aiMatchingQueueList as initialMatchingQueue,
  delayAndRiskStats,
  dprInboxList,
  matchingFunnelStages,
  recentActivitiesAudit,
} from '../../data/projectsData';
import { useRole, ROLES } from '../../context/RoleContext';
import { SupervisorProjectWorkspace } from './SupervisorProjectWorkspace';
import { PlannerProjectWorkspace } from './PlannerProjectWorkspace';
import { AdminProjectWorkspace } from './AdminProjectWorkspace';

export function ManagerProjectWorkspace() {
  const navigate = useNavigate();

  // Interactive AI Matching Queue State
  const [matchingQueue, setMatchingQueue] = useState(initialMatchingQueue);
  const [toastMessage, setToastMessage] = useState(null);

  // Approve candidate action
  const handleApprove = (id, activityName) => {
    setMatchingQueue(prev =>
      prev.map(item => item.id === id ? { ...item, approved: true } : item)
    );
    showToast(`Approved match for ${activityName} (Activity #${id})`);
  };

  // Review action
  const handleReview = (id) => {
    navigate('/ai-matching', { state: { targetId: id } });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-500/30 animate-fade-in">
          <MdCheckCircle className="text-emerald-400 text-lg flex-shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. UNIFIED HERO BANNER */}
      <PageHero
        title={ps26122ProjectHeader.title}
        subtitle={ps26122ProjectHeader.description}
        icon={<MdLayers />}
        eyebrow={ps26122ProjectHeader.category}
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Projects', path: '/projects' },
          { label: 'PS 26122' },
        ]}
        meta={
          <>
            <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/15">
              <MdLocationOn className="text-sky-300" size={13} />
              <span>{ps26122ProjectHeader.location}</span>
            </span>
            <span className="text-blue-300/60">|</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/15">
              {ps26122ProjectHeader.date}
            </span>
          </>
        }
        actions={
          <Link
            to="/progress"
            className="bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl p-3 sm:p-4 shadow-xl border border-white/80 flex items-center gap-3.5 hover:scale-[1.02] transition-transform group"
          >
            {/* Radial Progress Gauge */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#EFF6FF"
                  strokeWidth="3.6"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#0056D2"
                  strokeWidth="3.6"
                  strokeDasharray="68, 100"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-extrabold text-xs text-[#0056D2]">
                68%
              </div>
            </div>

            {/* Progress Labels */}
            <div>
              <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wide">
                Overall Progress
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>On Track</span>
                </span>
              </div>
              <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                ↑ +4% <span className="text-slate-400 font-normal">vs last month</span>
              </p>
            </div>

            <MdChevronRight className="text-slate-400 group-hover:text-[#0056D2] group-hover:translate-x-1 transition-all text-lg" />
          </Link>
        }
      />

      {/* ========================================================================= */}
      {/* 2. 5 ACTIVITY KPI CARDS WITH COLORED BOTTOM ACCENT LINES                   */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {ps26122ActivityKPIs.map(kpi => (
          <div
            key={kpi.id}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-slate-300 transition-all"
          >
            {/* Top Row: Icon + Title */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{
                  backgroundColor: `${kpi.accentColor}15`,
                  color: kpi.accentColor,
                }}
              >
                {kpi.icon === 'MdCheckCircle' && <MdCheckCircle />}
                {kpi.icon === 'MdAccessTime' && <MdAccessTime />}
                {kpi.icon === 'MdWarning' && <MdWarning />}
                {kpi.icon === 'MdPerson' && <MdPerson />}
                {kpi.icon === 'MdLayers' && <MdLayers />}
              </div>
              <p className="text-xs font-semibold text-slate-500 truncate">
                {kpi.title}
              </p>
            </div>

            {/* Value + Trend */}
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {kpi.value}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
                <span className={kpi.changeType === 'negative' ? 'text-slate-500' : 'text-slate-500'}>
                  ↑ {kpi.change}
                </span>
                <span>{kpi.timeframe}</span>
              </p>
            </div>

            {/* Bottom Accent Line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ backgroundColor: kpi.accentColor }}
            />
          </div>
        ))}
      </section>

      {/* ========================================================================= */}
      {/* 3. MIDDLE SECTION: 3 COLUMNS GRID                                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ----------------------------------------------------------------------- */}
        {/* COLUMN 1 (4 COLS): Planned vs Actual Progress + Daily Progress Reports  */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Planned vs Actual Progress */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0056D2]" />
                <span>Planned vs Actual Progress</span>
              </h3>
              <Link to="/progress" className="text-xs text-[#0056D2] font-semibold hover:underline">
                View Details &gt;
              </Link>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-12 text-[11px] font-bold text-slate-400 border-b border-slate-100 pb-1.5">
                <div className="col-span-6">Activity</div>
                <div className="col-span-2 text-center">Planned</div>
                <div className="col-span-2 text-center">Actual</div>
                <div className="col-span-2 text-right">Status</div>
              </div>

              {plannedVsActualActivities.map(act => (
                <div key={act.id} className="space-y-1.5 text-xs">
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-6 font-semibold text-slate-800 truncate pr-1">
                      <span className="text-[10px] font-mono text-slate-400 mr-1">{act.id}</span>
                      {act.name}
                    </div>
                    <div className="col-span-2 text-center text-slate-500 font-medium">
                      {act.planned}%
                    </div>
                    <div className="col-span-2 text-center font-bold text-slate-900">
                      {act.actual}%
                    </div>
                    <div className="col-span-2 text-right">
                      <span
                        className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          act.status === 'On Track'
                            ? 'bg-emerald-50 text-emerald-700'
                            : act.status === 'Behind Schedule'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {act.status}
                      </span>
                    </div>
                  </div>

                  {/* Dual Bar Progress */}
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${act.actual}%`, backgroundColor: act.barColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Progress Reports */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MdArticle className="text-[#0056D2]" size={16} />
                <span>Daily Progress Reports</span>
              </h3>
              <Link to="/dpr" className="text-xs text-[#0056D2] font-semibold hover:underline">
                View All &gt;
              </Link>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="grid grid-cols-12 text-[11px] font-bold text-slate-400 pb-2">
                <div className="col-span-3">Date</div>
                <div className="col-span-5">Report</div>
                <div className="col-span-2 text-center">Source</div>
                <div className="col-span-2 text-right">Status</div>
              </div>

              {dailyProgressReports.map(dpr => (
                <div key={dpr.id} className="grid grid-cols-12 items-center py-2.5 gap-1">
                  <div className="col-span-3 text-slate-500 font-medium text-[11px]">
                    {dpr.date}
                  </div>
                  <div className="col-span-5 truncate">
                    <div className="font-bold text-slate-800 truncate">{dpr.report}</div>
                    <div className="text-[10px] text-slate-400">{dpr.unit}</div>
                  </div>
                  <div className="col-span-2 flex items-center justify-center gap-1">
                    {dpr.sources.map(src => (
                      <span
                        key={src}
                        className="p-1 rounded bg-slate-100 text-slate-600 text-[10px]"
                        title={src}
                      >
                        {src === 'Text' && <MdArticle size={12} />}
                        {src === 'Photo' && <MdImage size={12} />}
                        {src === 'Voice' && <MdMic size={12} />}
                        {src === 'PDF' && <MdPictureAsPdf size={12} />}
                        {src === 'Excel' && <MdGridOn size={12} />}
                      </span>
                    ))}
                  </div>
                  <div className="col-span-2 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      dpr.statusColor === 'emerald'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}>
                      {dpr.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* COLUMN 2 (4 COLS): AI Matching Queue + Delay & Risk Flags              */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AI Matching Queue */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0056D2] flex items-center justify-center">
                  <MdAutoAwesome size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">AI Matching Queue</h3>
                </div>
              </div>
              <Link to="/ai-matching" className="text-xs text-[#0056D2] font-semibold hover:underline">
                View All &gt;
              </Link>
            </div>

            <div className="space-y-3">
              {matchingQueue.map(item => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    item.approved
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-slate-50/60 border-slate-200/70 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#0056D2] bg-blue-50 px-1.5 py-0.5 rounded mr-1.5">
                        {item.id}
                      </span>
                      <span className="font-bold text-xs text-slate-900">
                        {item.activity}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {item.unit}
                      </p>
                    </div>

                    {/* Circular Confidence Badge */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <div
                        className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-[11px] font-extrabold ${
                          item.levelColor === 'emerald'
                            ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                            : item.levelColor === 'amber'
                            ? 'border-amber-500 text-amber-700 bg-amber-50'
                            : 'border-rose-500 text-rose-700 bg-rose-50'
                        }`}
                      >
                        {item.confidence}%
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">
                        {item.level}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100/80">
                    {item.approved ? (
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 py-1">
                        <MdCheck size={16} /> Approved
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleReview(item.id)}
                          className="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 transition-colors"
                        >
                          Review
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApprove(item.id, item.activity)}
                          className="px-3.5 py-1 rounded-lg bg-[#0056D2] hover:bg-[#1A73E8] text-white text-xs font-bold shadow-2xs transition-colors"
                        >
                          Approve
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delay & Risk Flags */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="text-amber-500">⚠️</span>
                <span>Delay & Risk Flags</span>
              </h3>
              <Link to="/progress" className="text-xs text-[#0056D2] font-semibold hover:underline">
                View All &gt;
              </Link>
            </div>

            {/* 3 Status Counters */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-100 text-center">
                <span className="block text-[10px] font-semibold text-rose-600 truncate">Delayed</span>
                <span className="text-base font-extrabold text-rose-700">{delayAndRiskStats.delayedCount}</span>
                <span className="block text-[9px] text-rose-500">{delayAndRiskStats.delayedChange}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100 text-center">
                <span className="block text-[10px] font-semibold text-amber-600 truncate">At Risk</span>
                <span className="text-base font-extrabold text-amber-700">{delayAndRiskStats.atRiskCount}</span>
                <span className="block text-[9px] text-amber-500">{delayAndRiskStats.atRiskChange}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-center">
                <span className="block text-[10px] font-semibold text-emerald-600 truncate">On Track</span>
                <span className="text-base font-extrabold text-emerald-700">{delayAndRiskStats.onTrackCount}</span>
                <span className="block text-[9px] text-emerald-500">{delayAndRiskStats.onTrackChange}</span>
              </div>
            </div>

            {/* Top Risk Activities */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Top Risk Activities
              </p>
              {delayAndRiskStats.topRiskActivities.map(r => (
                <div key={r.id} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 mr-1">{r.id}</span>
                    <span className="text-slate-700 font-medium">{r.name}</span>
                    <div className="text-[10px] text-slate-400">{r.sub}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-rose-600 text-xs">{r.variance}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.severityColor === 'rose' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {r.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* COLUMN 3 (4 COLS): DPR Inbox feed                                       */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0056D2] flex items-center justify-center">
                  <MdArticle size={16} />
                </div>
                <h3 className="text-sm font-bold text-slate-900">DPR Inbox</h3>
              </div>
              <Link to="/dpr" className="text-xs text-[#0056D2] font-semibold hover:underline">
                View All &gt;
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {dprInboxList.map(inbox => (
                <div
                  key={inbox.id}
                  onClick={() => navigate('/dpr')}
                  className="py-3 first:pt-0 last:pb-0 hover:bg-slate-50/70 transition-colors p-2 rounded-xl cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${inbox.avatarColor}`}>
                      {inbox.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-xs text-slate-900 group-hover:text-[#0056D2] transition-colors truncate">
                          {inbox.title}
                        </span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {inbox.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5 truncate">
                        {inbox.snippet}
                      </p>
                    </div>
                    <MdChevronRight className="text-slate-300 group-hover:text-[#0056D2] group-hover:translate-x-0.5 transition-all text-base mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM ROW: 3 COLUMNS (Donut Gauge, Funnel, Recent Activity)           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Card 1: Project Progress Radial Donut (4 Cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0056D2]" />
            <span>Project Progress</span>
          </h3>

          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4">
            {/* SVG Donut */}
            <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#F1F5F9"
                  strokeWidth="3.8"
                />
                {/* Completed (68%) */}
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#0056D2"
                  strokeWidth="4"
                  strokeDasharray="68, 100"
                />
                {/* In Progress (24%) */}
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="4"
                  strokeDasharray="24, 100"
                  strokeDashoffset="-68"
                />
                {/* Delayed (8%) */}
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="4"
                  strokeDasharray="8, 100"
                  strokeDashoffset="-92"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-extrabold text-slate-900 leading-none">68%</span>
                <span className="text-[9px] text-slate-400 font-semibold uppercase mt-0.5">Completed</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs w-full">
              <div className="flex items-center justify-between text-slate-700">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0056D2]" />
                  <span>Completed</span>
                </div>
                <span className="font-bold text-slate-900">68%</span>
              </div>

              <div className="flex items-center justify-between text-slate-700">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
                  <span>In Progress</span>
                </div>
                <span className="font-bold text-slate-900">24%</span>
              </div>

              <div className="flex items-center justify-between text-slate-700">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span>Delayed</span>
                </div>
                <span className="font-bold text-slate-900">8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Activity Matching Funnel (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#0056D2]">⚡</span>
              <span>Activity Matching Funnel</span>
            </h3>
            <Link to="/ai-matching" className="text-xs text-[#0056D2] font-semibold hover:underline">
              View Details &gt;
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-2 items-center text-center">
            {matchingFunnelStages.map((stage, idx) => (
              <div key={stage.id} className="relative flex flex-col items-center">
                <div className={`w-full p-2.5 rounded-xl flex flex-col items-center justify-center ${stage.bgClass}`}>
                  <span className="text-lg font-extrabold leading-none">{stage.count}</span>
                  <span className="text-[10px] mt-1 font-semibold truncate max-w-full">{stage.label}</span>
                </div>

                {/* Arrow connector */}
                {idx < matchingFunnelStages.length - 1 && (
                  <span className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-slate-300 z-10 text-xs font-bold">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
            Neural reasoning pipeline matches extracted DPR entities against the Primavera P6 schedule WBS tree with 92% confirmed accuracy.
          </p>
        </div>

        {/* Card 3: Recent Activity (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MdAccessTime className="text-[#0056D2]" size={16} />
              <span>Recent Activity</span>
            </h3>
            <Link to="/progress" className="text-xs text-[#0056D2] font-semibold hover:underline">
              View All &gt;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                <tr>
                  <th className="pb-2">Activity</th>
                  <th className="pb-2">WBS</th>
                  <th className="pb-2">Planned</th>
                  <th className="pb-2">Actual</th>
                  <th className="pb-2">Variance</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentActivitiesAudit.map(row => (
                  <tr key={row.id} className="hover:bg-slate-50/50">
                    <td className="py-2 pr-1 font-bold text-slate-800 truncate max-w-[130px]">
                      <span className="text-[10px] font-mono text-slate-400 block">{row.id}</span>
                      {row.activity}
                    </td>
                    <td className="py-2 text-slate-500 text-[11px]">{row.wbs}</td>
                    <td className="py-2 text-slate-500 text-[11px] whitespace-nowrap">{row.plannedFinish}</td>
                    <td className="py-2 text-slate-700 text-[11px] whitespace-nowrap">{row.actualFinish}</td>
                    <td className={`py-2 text-[11px] ${row.varianceColor}`}>{row.variance}</td>
                    <td className="py-2 text-right">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        row.status === 'Delayed'
                          ? 'bg-rose-50 text-rose-700'
                          : row.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Showing 1–3 of 3</span>
            <div className="flex items-center gap-1">
              <button type="button" disabled className="px-2 py-0.5 rounded border border-slate-200 opacity-50">&lt;</button>
              <button type="button" className="px-2 py-0.5 rounded bg-[#0056D2] text-white font-bold">1</button>
              <button type="button" disabled className="px-2 py-0.5 rounded border border-slate-200 opacity-50">&gt;</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function ProjectDashboardPage() {
  const { currentRole } = useRole();

  if (currentRole === ROLES.SITE_SUPERVISOR) {
    return <SupervisorProjectWorkspace projectHeader={ps26122ProjectHeader} />;
  }
  if (currentRole === ROLES.PLANNER) {
    return <PlannerProjectWorkspace projectHeader={ps26122ProjectHeader} />;
  }
  if (currentRole === ROLES.ADMIN) {
    return <AdminProjectWorkspace projectHeader={ps26122ProjectHeader} />;
  }

  return <ManagerProjectWorkspace projectHeader={ps26122ProjectHeader} />;
}

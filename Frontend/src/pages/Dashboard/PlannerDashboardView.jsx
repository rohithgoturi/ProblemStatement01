/**
 * PragatiPath — Project Planner Main Dashboard View
 * Focus: SCHEDULE RECONCILIATION & AI MATCH VALIDATION
 * - Schedule activities awaiting review
 * - Unmatched progress events queue
 * - AI matches requiring validation (Approve/Change/Reject)
 * - Critical path schedule deviation by WBS
 * - Primary CTA: 'Review Matches'
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdAutoAwesome, MdWarning,
  MdCheckCircle, MdClose, MdArrowForward,
  MdTimeline, MdHistory
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import {
  plannerMetrics,
  plannerAIValidationList,
  plannerUnmatchedEvents,
  plannerDeviationByWBS,
  plannerRecentApprovals,
} from '../../data/roleDashboardData';

export function PlannerDashboardView() {
  const navigate = useNavigate();
  const [validationQueue, setValidationQueue] = useState(plannerAIValidationList);
  const [unmatchedEvents, setUnmatchedEvents] = useState(plannerUnmatchedEvents);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApproveMatch = (id) => {
    setValidationQueue((prev) => prev.filter((item) => item.id !== id));
    showToast('✓ AI match approved & linked to Baseline Schedule');
  };

  const handleRejectMatch = (id) => {
    setValidationQueue((prev) => prev.filter((item) => item.id !== id));
    showToast('Match rejected — moved to Unmatched Events queue');
  };

  const handleDismissUnmatched = (id) => {
    setUnmatchedEvents((prev) => prev.filter((item) => item.id !== id));
    showToast('Unmatched event archived');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-lg shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. STANDARDIZED PLANNER PAGE HEADER */}
      <PageHeader
        title="Project Planner Dashboard"
        subtitle="Current focus: Reconcile daily field reports with Baseline Rev 2 schedule and validate high-confidence AI matching candidates"
        icon={<MdAutoAwesome />}
        actions={
          <>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('validation-queue-section');
                el?.scrollIntoView({ behavior: 'smooth' });
                showToast('Reviewing 3 pending AI candidates');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#0056D2] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <MdAutoAwesome size={16} />
              <span>Review Matches</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/schedule')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors"
            >
              <span>Open Schedule</span>
              <MdArrowForward size={16} />
            </button>
          </>
        }
      />

      {/* 2. PLANNER 4 KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {plannerMetrics.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-2 hover:border-blue-200 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">{kpi.title}</span>
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  kpi.color === 'rose'
                    ? 'bg-rose-50 text-rose-700'
                    : kpi.color === 'amber'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                {kpi.badge}
              </span>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900 leading-none">
                {kpi.value}
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                {kpi.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. PLANNER MAIN CONTENT: Left AI Matches & Unmatched | Right Variance & Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT (~65%): AI Validation Queue & Unmatched Events */}
        <div className="lg:col-span-8 space-y-6">
          {/* AI Matches Requiring Validation */}
          <div
            id="validation-queue-section"
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
                  <MdAutoAwesome size={18} />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  AI Matches Requiring Validation
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0056D2] text-xs font-bold border border-blue-100">
                  {validationQueue.length} Pending
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setValidationQueue([]);
                  showToast('All pending matches approved!');
                }}
                className="text-xs font-semibold text-[#0056D2] hover:underline"
              >
                Approve All (High Confidence)
              </button>
            </div>

            {validationQueue.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <MdCheckCircle className="mx-auto text-emerald-500 text-3xl mb-2" />
                <p className="text-xs font-bold text-slate-700">All matching candidates have been validated!</p>
                <p className="text-[11px] text-slate-400 mt-0.5">New DPR submissions will automatically appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {validationQueue.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            {item.sourceDPR}
                          </span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs font-bold text-slate-700">{item.wbs}</span>
                        </div>
                        <p className="text-xs font-medium text-slate-800 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                          "{item.dprSnippet}"
                        </p>
                      </div>

                      {/* Circular Confidence Dial */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-11 h-11 rounded-full border-2 border-emerald-500 flex items-center justify-center bg-emerald-50 text-emerald-700 font-extrabold text-xs">
                          {item.confidence}%
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 mt-0.5">Confidence</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <div>
                        <div className="text-[11px] text-slate-500 font-medium">Mapped to Schedule:</div>
                        <div className="text-xs font-bold text-slate-900">
                          {item.suggestedActivityId} — {item.suggestedActivityName}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleRejectMatch(item.id)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold"
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast('Editing activity mapping')}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApproveMatch(item.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#0056D2] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Unmatched Progress Events Queue */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                  <MdWarning size={18} />
                </div>
                <h2 className="text-sm font-bold text-slate-900">
                  Unmatched Progress Events (Needs Linking)
                </h2>
              </div>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                {unmatchedEvents.length} Events
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {unmatchedEvents.map((evt) => (
                <div key={evt.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <p className="font-bold text-slate-800">{evt.description}</p>
                    <div className="text-[11px] text-slate-500">
                      By: {evt.submittedBy} • <span className="font-mono">{evt.source}</span> • {evt.date}
                    </div>
                    <div className="text-[11px] text-blue-700 bg-blue-50/70 px-2 py-0.5 rounded border border-blue-100 inline-block font-medium">
                      Action: {evt.suggestedAction}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        showToast(`Linking "${evt.description}" to Schedule`);
                        handleDismissUnmatched(evt.id);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#0056D2] text-white text-[11px] font-bold hover:bg-blue-700 transition-colors"
                    >
                      Link to WBS
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDismissUnmatched(evt.id)}
                      className="p-1 text-slate-400 hover:text-slate-600"
                      title="Dismiss"
                    >
                      <MdClose size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT (~35%): Schedule Deviation by WBS & Recent Approvals */}
        <div className="lg:col-span-4 space-y-6">
          {/* Schedule Deviation by WBS */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdTimeline className="text-[#0056D2]" size={18} />
                <h3 className="text-sm font-bold text-slate-900">Deviation by WBS</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/schedule')}
                className="text-xs font-semibold text-[#0056D2] hover:underline"
              >
                Gantt →
              </button>
            </div>

            <div className="space-y-2">
              {plannerDeviationByWBS.map((wbs) => (
                <div
                  key={wbs.wbs}
                  className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-800">{wbs.wbs} — {wbs.name}</div>
                    <div className="text-[10px] text-slate-400">Plan: {wbs.plannedFinish} • Actual: {wbs.actualFinish}</div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      wbs.status === 'Delayed'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : wbs.status === 'At Risk'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {wbs.variance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reconciliations Log */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdHistory className="text-[#0056D2]" size={18} />
                <h3 className="text-sm font-bold text-slate-900">Recent Approvals</h3>
              </div>
              <span className="text-xs text-slate-400">Audit</span>
            </div>

            <div className="space-y-2">
              {plannerRecentApprovals.map((app) => (
                <div key={app.id} className="p-2.5 rounded-xl border border-slate-100 text-xs space-y-0.5">
                  <div className="font-bold text-slate-800">{app.activity}</div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>{app.date}</span>
                    <span className="text-emerald-600 font-semibold">{app.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

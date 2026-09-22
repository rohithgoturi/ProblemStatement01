/**
 * PragatiPath — Project Planner Main Dashboard View (Full Backend API Integrated)
 * All mock data removed. Connected directly to Express API & MongoDB.
 * Focus: SCHEDULE RECONCILIATION & AI MATCH VALIDATION
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdAutoAwesome, MdWarning,
  MdCheckCircle, MdClose, MdArrowForward,
  MdTimeline, MdHistory, MdRefresh
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import {
  getPendingReviews,
  getUnmatchedEvents,
  getAuditLogs,
  getScheduleActivities,
  approveMatch,
  rejectMatch,
} from '../../services/api';

export function PlannerDashboardView() {
  const navigate = useNavigate();

  const [pendingReviews, setPendingReviews] = useState([]);
  const [unmatchedEvents, setUnmatchedEvents] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    setErrorMsg('');

    const [pendingRes, unmatchedRes, auditRes, schedRes] = await Promise.all([
      getPendingReviews(),
      getUnmatchedEvents(),
      getAuditLogs(),
      getScheduleActivities(),
    ]);

    if (pendingRes.error) {
      setErrorMsg(`Failed to load review queue: ${pendingRes.error}`);
    } else {
      setPendingReviews(Array.isArray(pendingRes.data) ? pendingRes.data : []);
    }

    setUnmatchedEvents(Array.isArray(unmatchedRes.data) ? unmatchedRes.data : []);
    setAuditLogs(Array.isArray(auditRes.data) ? auditRes.data : []);
    setActivities(Array.isArray(schedRes.data) ? schedRes.data : []);

    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Real KPIs computed from backend data
  const totalActivities = activities.length;
  const awaitingValidation = pendingReviews.length;
  const unmatchedCount = unmatchedEvents.length;
  const avgProgress = totalActivities > 0
    ? Math.round(activities.reduce((sum, a) => sum + (a.progressPercentage || 0), 0) / totalActivities)
    : 0;

  // Derive WBS deviation from real activities (planned vs actual dates)
  const wbsGroups = {};
  activities.forEach((act) => {
    const wbs = act.wbsCode || 'General';
    if (!wbsGroups[wbs]) {
      wbsGroups[wbs] = {
        wbs,
        name: act.discipline || 'General Works',
        planned: act.plannedFinishDate,
        actual: act.actualFinishDate,
        delayed: false,
      };
    }
    if (act.status === 'DELAYED') {
      wbsGroups[wbs].delayed = true;
    }
  });
  const wbsDeviation = Object.values(wbsGroups).slice(0, 4);

  const handleApprove = async (item) => {
    const eventId = item._id || item.id;
    setProcessingId(eventId);

    const res = await approveMatch(eventId, {
      selectedActivityId: item.matchedScheduleActivity?.activityId || item.suggestedActivityId,
      actualStartDate: item.actualStartDate,
      actualFinishDate: item.actualFinishDate,
      progressPercentage: item.progressPercentage || 100,
    });

    setProcessingId(null);

    if (res.error) {
      setErrorMsg(`Approval failed: ${res.error}`);
    } else {
      showToast('✓ AI match approved & linked to Baseline Schedule');
      fetchDashboardData();
    }
  };

  const handleReject = async (item) => {
    const eventId = item._id || item.id;
    setProcessingId(eventId);

    const res = await rejectMatch(eventId, { notes: 'Rejected by planner from dashboard' });
    setProcessingId(null);

    if (res.error) {
      setErrorMsg(`Rejection failed: ${res.error}`);
    } else {
      showToast('Match rejected — moved to Unmatched Events queue');
      fetchDashboardData();
    }
  };

  const plannerKPIs = [
    {
      id: 'total-schedule',
      title: 'Total Schedule Activities',
      value: loading ? '—' : totalActivities,
      subtext: totalActivities > 0 ? 'Loaded from MongoDB' : 'Upload a schedule file',
      badge: avgProgress > 0 ? `${avgProgress}% Avg` : 'No Data',
      color: 'blue',
    },
    {
      id: 'awaiting-review',
      title: 'Awaiting Validation',
      value: loading ? '—' : awaitingValidation,
      subtext: awaitingValidation > 0 ? 'Pending planner action' : 'All reviewed',
      badge: awaitingValidation > 0 ? 'Action Needed' : 'Clear',
      color: 'amber',
    },
    {
      id: 'unmatched-events',
      title: 'Unmatched Progress Events',
      value: loading ? '—' : unmatchedCount,
      subtext: unmatchedCount > 0 ? 'No baseline activity linked' : 'None pending',
      badge: unmatchedCount > 0 ? 'High Priority' : 'Clear',
      color: 'rose',
    },
    {
      id: 'recent-approvals',
      title: 'Audit Records',
      value: loading ? '—' : auditLogs.length,
      subtext: 'Total planner decisions',
      badge: 'Immutable',
      color: 'purple',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-lg shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* PAGE HEADER */}
      <PageHeader
        title="Project Planner Dashboard"
        subtitle="Schedule reconciliation, AI match validation & real-time progress review queue"
        icon={<MdAutoAwesome />}
        actions={
          <>
            <button
              type="button"
              onClick={fetchDashboardData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#0056D2] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <MdRefresh size={16} />
              <span>Refresh Data</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/ai-matching')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors"
            >
              <span>Full Review Queue</span>
              <MdArrowForward size={16} />
            </button>
          </>
        }
      />

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          {errorMsg}
        </div>
      )}

      {/* 4 KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {plannerKPIs.map((kpi) => (
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
                    : kpi.color === 'purple'
                    ? 'bg-purple-50 text-purple-700'
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

      {/* MAIN CONTENT GRID */}
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
                  {pendingReviews.length} Pending
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/ai-matching')}
                className="text-xs font-semibold text-[#0056D2] hover:underline"
              >
                Open Full Queue →
              </button>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">
                <span className="inline-block w-5 h-5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-2" />
                <p>Loading review queue from backend...</p>
              </div>
            ) : pendingReviews.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <MdCheckCircle className="mx-auto text-emerald-500 text-3xl mb-2" />
                <p className="text-xs font-bold text-slate-700">All matching candidates have been validated!</p>
                <p className="text-[11px] text-slate-400 mt-0.5">New DPR submissions will automatically appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingReviews.slice(0, 4).map((item) => {
                  const eventId = item._id || item.id;
                  const isProcessing = processingId === eventId;
                  const suggested = item.matchedScheduleActivity || item.candidateMatches?.[0];
                  const confidence = item.matchConfidence || item.confidence || 85;

                  return (
                    <div
                      key={eventId}
                      className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                              {item.discipline || 'General'}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-slate-800 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                            "{item.extractedActivityName || item.rawActivityName || 'Reported Progress Event'}"
                          </p>
                        </div>

                        {/* Confidence Dial */}
                        <div className="flex flex-col items-center shrink-0">
                          <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-extrabold text-xs ${
                            confidence >= 80
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                              : 'border-amber-400 bg-amber-50 text-amber-700'
                          }`}>
                            {confidence}%
                          </div>
                          <span className="text-[9px] font-bold text-slate-400 mt-0.5">Confidence</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                        <div>
                          <div className="text-[11px] text-slate-500 font-medium">Suggested Schedule Activity:</div>
                          <div className="text-xs font-bold text-slate-900">
                            {suggested?.activityId || 'Unlinked'} — {suggested?.activityName || 'No direct match found'}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleReject(item)}
                            disabled={isProcessing}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold disabled:opacity-50"
                          >
                            <MdClose size={13} className="inline mr-1" />
                            Reject
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate('/ai-matching')}
                            disabled={isProcessing}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold disabled:opacity-50"
                          >
                            Edit Match
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApprove(item)}
                            disabled={isProcessing}
                            className="px-3.5 py-1.5 rounded-lg bg-[#0056D2] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
                          >
                            {isProcessing ? 'Saving...' : 'Approve'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {pendingReviews.length > 4 && (
                  <button
                    type="button"
                    onClick={() => navigate('/ai-matching')}
                    className="w-full py-2 text-xs font-bold text-[#0056D2] hover:underline"
                  >
                    View all {pendingReviews.length} pending items in Full Review Queue →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Unmatched Progress Events */}
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
                {loading ? '—' : unmatchedEvents.length} Events
              </span>
            </div>

            {loading ? (
              <div className="py-6 text-center text-xs text-slate-400">Loading unmatched events...</div>
            ) : unmatchedEvents.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed text-xs text-slate-400">
                <MdCheckCircle size={28} className="mx-auto text-emerald-400 mb-2" />
                No unmatched progress events. All field reports are linked to schedule activities.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {unmatchedEvents.slice(0, 5).map((evt) => (
                  <div key={evt._id || evt.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <p className="font-bold text-slate-800">{evt.rawActivityName || evt.extractedActivityName || 'Unnamed Progress Event'}</p>
                      <div className="text-[11px] text-slate-500">
                        Discipline: {evt.discipline || 'General'} •{' '}
                        Status: <span className="font-mono">{evt.status}</span>
                      </div>
                      <div className="text-[11px] text-blue-700 bg-blue-50/70 px-2 py-0.5 rounded border border-blue-100 inline-block font-medium">
                        Action: Link to schedule activity in AI Matching
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/ai-matching')}
                      className="px-2.5 py-1 rounded-lg bg-[#0056D2] text-white text-[11px] font-bold hover:bg-blue-700 transition-colors shrink-0"
                    >
                      Link to WBS
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT (~35%): WBS Deviation & Recent Audit */}
        <div className="lg:col-span-4 space-y-6">
          {/* Schedule Deviation by WBS (derived from real activities) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdTimeline className="text-[#0056D2]" size={18} />
                <h3 className="text-sm font-bold text-slate-900">Schedule Status by WBS</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/schedule')}
                className="text-xs font-semibold text-[#0056D2] hover:underline"
              >
                Gantt →
              </button>
            </div>

            {loading ? (
              <div className="py-4 text-center text-xs text-slate-400">Loading...</div>
            ) : wbsDeviation.length === 0 ? (
              <div className="py-4 text-center text-xs text-slate-400 border border-dashed rounded-xl">
                No schedule loaded. Upload a baseline schedule to see WBS deviation.
              </div>
            ) : (
              <div className="space-y-2">
                {wbsDeviation.map((wbs) => {
                  const isDelayed = wbs.delayed || (wbs.actual && wbs.planned && new Date(wbs.actual) > new Date(wbs.planned));
                  return (
                    <div
                      key={wbs.wbs}
                      className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-800">{wbs.wbs} — {wbs.name}</div>
                        <div className="text-[10px] text-slate-400">
                          {wbs.planned ? `Planned: ${new Date(wbs.planned).toLocaleDateString()}` : 'No planned date'}
                          {wbs.actual ? ` · Actual: ${new Date(wbs.actual).toLocaleDateString()}` : ''}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          isDelayed
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : wbs.actual
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {isDelayed ? 'Delayed' : wbs.actual ? 'On Track' : 'In Progress'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Audit Log */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdHistory className="text-[#0056D2]" size={18} />
                <h3 className="text-sm font-bold text-slate-900">Recent Approvals</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/reports')}
                className="text-xs text-slate-400 hover:text-[#0056D2]"
              >
                View All Audit →
              </button>
            </div>

            {loading ? (
              <div className="py-4 text-center text-xs text-slate-400">Loading audit records...</div>
            ) : auditLogs.length === 0 ? (
              <div className="p-4 text-center bg-slate-50 rounded-xl border border-dashed text-xs text-slate-400">
                No review decisions recorded yet. Audit records appear after approval or rejection.
              </div>
            ) : (
              <div className="space-y-2">
                {auditLogs.slice(0, 4).map((log) => (
                  <div key={log._id || log.id} className="p-2.5 rounded-xl border border-slate-100 text-xs space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-bold text-[10px] uppercase px-1.5 py-0.5 rounded ${
                          (log.action || '').includes('APPROVED')
                            ? 'bg-emerald-100 text-emerald-800'
                            : (log.action || '').includes('REJECTED')
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {log.action || 'ACTION_LOGGED'}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(log.timestamp || log.createdAt || Date.now()).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="font-bold text-slate-800">{log.entityType || 'ScheduleActivity'}</div>
                    <div className="text-[10px] text-slate-400">By: {log.performedBy || log.actor || 'SYSTEM'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

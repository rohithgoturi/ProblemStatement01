/**
 * PragatiPath — Site Supervisor Main Dashboard View (Full Backend API Integrated)
 * All mock data removed. Connected directly to Express API & MongoDB.
 * Focus: FIELD EXECUTION & DAILY WORK REPORTING
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdAssignmentInd, MdCheckCircle, MdInbox, MdWarning,
  MdSend, MdAttachFile,
  MdArrowForward, MdPeople, MdRefresh
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import {
  getScheduleActivities,
  getSourceDocuments,
  submitTextProgress,
} from '../../services/api';

export function SupervisorDashboardView() {
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [quickNote, setQuickNote] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg('');

    const [schedRes, sourcesRes] = await Promise.all([
      getScheduleActivities(),
      getSourceDocuments(),
    ]);

    if (schedRes.data) setActivities(schedRes.data || []);
    if (sourcesRes.data) setSources(sourcesRes.data || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Real KPIs computed from backend data
  const totalAssigned = activities.length;
  const completedToday = activities.filter(
    (a) => a.status === 'COMPLETED' || a.progressPercentage >= 100
  ).length;
  const inProgress = activities.filter(
    (a) => a.status === 'IN_PROGRESS' || (a.actualStartDate && a.progressPercentage < 100)
  ).length;
  const pendingDPRs = sources.filter((s) => s.status === 'PENDING' || !s.status).length;

  const supervisorKPIs = [
    {
      id: 'assigned',
      title: "Total Activities",
      value: loading ? '—' : totalAssigned,
      subtext: totalAssigned > 0 ? `${completedToday} completed, ${inProgress} active` : 'No schedule loaded',
      badge: 'Schedule',
    },
    {
      id: 'completed',
      title: 'Completed',
      value: loading ? '—' : completedToday,
      subtext: totalAssigned > 0 ? `${Math.round((completedToday / totalAssigned) * 100) || 0}% of total` : 'No data',
      badge: completedToday > 0 ? 'Done' : 'None yet',
    },
    {
      id: 'submitted-dprs',
      title: 'Submitted DPRs',
      value: loading ? '—' : sources.length,
      subtext: 'Total progress reports ingested',
      badge: 'Ingested',
    },
    {
      id: 'site-alerts',
      title: 'In Progress',
      value: loading ? '—' : inProgress,
      subtext: 'Active schedule activities',
      badge: 'Active',
    },
  ];

  const handleQuickDPRSubmit = async (e) => {
    e.preventDefault();
    if (!quickNote.trim()) {
      showToast('Please enter progress notes before submitting');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');

    const res = await submitTextProgress({
      text: quickNote.trim(),
      rawContent: quickNote.trim(),
      submittedBy: 'site-supervisor',
    });

    setIsSubmitting(false);

    if (res.error) {
      setErrorMsg(`Submission failed: ${res.error}`);
    } else {
      setQuickNote('');
      showToast('✓ Quick DPR submitted for AI extraction');
      fetchData();
    }
  };

  // Static crew reference — no backend crew tracking API exists
  const crewReference = [
    { trade: 'Mechanical Fitters', count: '—' },
    { trade: 'Electricians', count: '—' },
    { trade: 'Riggers', count: '—' },
    { trade: 'Safety Marshals', count: '—' },
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
        title="Site Supervisor Dashboard"
        subtitle="Field execution overview — submit progress updates and track assigned schedule activities"
        icon={<MdAssignmentInd />}
        actions={
          <>
            <button
              type="button"
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#0056D2] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <MdRefresh size={16} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/dpr')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#0056D2] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <MdSend size={16} />
              <span>Submit DPR</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/schedule')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors"
            >
              <span>View Schedule</span>
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
        {supervisorKPIs.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-2 hover:border-blue-200 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">{kpi.title}</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
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
        {/* LEFT (~65%): Assigned Schedule Activities & Quick DPR */}
        <div className="lg:col-span-8 space-y-6">
          {/* Schedule Activities (from backend) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
                  <MdAssignmentInd size={18} />
                </div>
                <h2 className="text-base font-bold text-slate-900">Project Schedule Activities</h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0056D2] text-xs font-bold">
                  {activities.length} Total
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/schedule')}
                className="text-xs font-semibold text-[#0056D2] hover:underline"
              >
                View Full Schedule →
              </button>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">
                <span className="inline-block w-5 h-5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-2" />
                <p>Loading schedule activities from backend...</p>
              </div>
            ) : activities.length === 0 ? (
              <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed text-xs text-slate-400 space-y-2">
                <p>No schedule activities loaded. Upload a baseline schedule first.</p>
                <button
                  type="button"
                  onClick={() => navigate('/schedule')}
                  className="px-3 py-1.5 bg-[#0056D2] text-white text-xs font-bold rounded-lg hover:bg-blue-700"
                >
                  Go to Schedule Upload
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {activities.slice(0, 5).map((act) => {
                  const progress = act.progressPercentage || 0;
                  const status = act.status || (progress >= 100 ? 'COMPLETED' : act.actualStartDate ? 'IN_PROGRESS' : 'NOT_STARTED');
                  return (
                    <div
                      key={act._id || act.activityId}
                      className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-slate-50/50 transition-all space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#0056D2]">
                              {act.activityId}
                            </span>
                            <h3 className="text-sm font-bold text-slate-900">{act.activityName}</h3>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {act.discipline || 'General'} • WBS: {act.wbsCode || '—'}
                          </p>
                        </div>

                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0 ${
                            status === 'COMPLETED'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : status === 'DELAYED'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : status === 'IN_PROGRESS'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {status}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                          <span>Schedule Progress</span>
                          <span className="text-slate-900 font-bold">{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              status === 'COMPLETED'
                                ? 'bg-emerald-500'
                                : status === 'DELAYED'
                                ? 'bg-amber-500'
                                : 'bg-[#0056D2]'
                            }`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                        <span>
                          {act.plannedStartDate
                            ? `Planned: ${new Date(act.plannedStartDate).toLocaleDateString()} → ${act.plannedFinishDate ? new Date(act.plannedFinishDate).toLocaleDateString() : '?'}`
                            : 'No planned dates'}
                        </span>
                        <button
                          type="button"
                          onClick={() => navigate('/dpr')}
                          className="text-[#0056D2] hover:underline font-semibold text-[10px] shrink-0 ml-2"
                        >
                          Report Progress →
                        </button>
                      </div>
                    </div>
                  );
                })}
                {activities.length > 5 && (
                  <button
                    type="button"
                    onClick={() => navigate('/schedule')}
                    className="w-full py-2 text-xs font-bold text-[#0056D2] hover:underline"
                  >
                    View all {activities.length} activities in Schedule →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Quick DPR Submission Widget */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <MdSend size={18} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Quick DPR Submission</h2>
                <p className="text-[11px] text-slate-500">Fast shift update — submitted to AI extraction pipeline</p>
              </div>
            </div>

            <form onSubmit={handleQuickDPRSubmit} className="space-y-3">
              <div>
                <textarea
                  rows={3}
                  value={quickNote}
                  onChange={(e) => setQuickNote(e.target.value)}
                  placeholder="Enter quick notes in English, Hindi, or Hinglish (e.g. 'Pump aligned, 8 bolts torqued. Foundation pouring ongoing in Unit 2.')"
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0056D2] resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigate('/dpr')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-600"
                  >
                    <MdAttachFile size={14} />
                    Full DPR Inbox
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !quickNote.trim()}
                  className="px-5 py-2 rounded-xl bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quick Update'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT (~35%): Crew Reference & Recent DPRs */}
        <div className="lg:col-span-4 space-y-6">
          {/* Static Crew Reference Panel */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdPeople className="text-[#0056D2]" size={18} />
                <h3 className="text-sm font-bold text-slate-900">Crew Breakdown</h3>
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                Static Reference
              </span>
            </div>
            <p className="text-[10px] text-slate-400 italic">
              Crew tracking API not yet available. Update crew data in project settings.
            </p>
            <div className="space-y-2 pt-1">
              {crewReference.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-none"
                >
                  <span className="text-slate-600 font-medium">{item.trade}</span>
                  <span className="font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent DPR Submissions (from backend) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdInbox className="text-[#0056D2]" size={18} />
                <h3 className="text-sm font-bold text-slate-900">Recent DPR Reports</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/dpr')}
                className="text-xs font-semibold text-[#0056D2] hover:underline"
              >
                View All →
              </button>
            </div>

            {loading ? (
              <div className="py-4 text-center text-xs text-slate-400">Loading...</div>
            ) : sources.length === 0 ? (
              <div className="p-4 text-center bg-slate-50 rounded-xl border border-dashed text-xs text-slate-400">
                No DPR reports submitted yet.
              </div>
            ) : (
              <div className="space-y-2">
                {sources.slice(0, 4).map((src) => (
                  <div
                    key={src._id || src.id}
                    onClick={() => navigate('/dpr')}
                    className="p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {src.originalFileName || src.sourceType || 'Text Progress Report'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {new Date(src.createdAt || Date.now()).toLocaleString()}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {src.fileType || 'text'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Site Safety Directive (static operational notice) */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
              <MdWarning size={16} />
              <span>Site Safety Notice</span>
            </div>
            <p className="text-xs text-amber-700 leading-relaxed">
              Always conduct a pre-work toolbox talk. Ensure PPE compliance and hazard briefing before any elevated or confined space work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

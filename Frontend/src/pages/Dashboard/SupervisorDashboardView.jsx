/**
 * PragatiPath — Site Supervisor Main Dashboard View
 * Focus: FIELD EXECUTION & DAILY WORK
 * - Today's assigned work & checklist
 * - Quick DPR submission widget
 * - Active site/location context
 * - Recent DPR submissions & site alerts
 * - Primary CTA: 'Submit DPR'
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdAssignmentInd, MdCheckCircle, MdInbox, MdWarning,
  MdSend, MdAttachFile,
  MdArrowForward, MdPeople
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import {
  supervisorMetrics,
  supervisorAssignedActivities,
  supervisorRecentDPRs,
  supervisorCrewStatus,
} from '../../data/roleDashboardData';

export function SupervisorDashboardView() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState(supervisorAssignedActivities);
  const [quickNote, setQuickNote] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('A002');
  const [toastMessage, setToastMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleActivityStatus = (id) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === id) {
          const nextStatus = act.status === 'Completed' ? 'In Progress' : 'Completed';
          return {
            ...act,
            status: nextStatus,
            statusVariant: nextStatus === 'Completed' ? 'success' : 'progress',
            currentProgress: nextStatus === 'Completed' ? 100 : 75,
          };
        }
        return act;
      })
    );
    showToast('Activity status updated');
  };

  const handleQuickDPRSubmit = (e) => {
    e.preventDefault();
    if (!quickNote.trim()) {
      showToast('Please enter progress notes');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setQuickNote('');
      showToast('✓ Quick DPR submitted for AI extraction');
    }, 800);
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

      {/* 1. STANDARDIZED SUPERVISOR PAGE HEADER */}
      <PageHeader
        title="Site Supervisor Dashboard"
        subtitle="Today's operational priority: Execute Unit 2 mechanical installation and report shift progress"
        icon={<MdAssignmentInd />}
        actions={
          <>
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
              onClick={() => navigate('/projects/PS-26122')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors"
            >
              <span>View Assigned Site</span>
              <MdArrowForward size={16} />
            </button>
          </>
        }
      />

      {/* 2. SUPERVISOR 4 KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {supervisorMetrics.map((kpi) => (
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

      {/* 3. SUPERVISOR MAIN CONTENT: Left Activities & Quick DPR | Right Site Context */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT (~65%): Today's Assigned Work & Quick DPR Widget */}
        <div className="lg:col-span-8 space-y-6">
          {/* Today's Assigned Work Checklist */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
                  <MdAssignmentInd size={18} />
                </div>
                <h2 className="text-base font-bold text-slate-900">Today's Assigned Work</h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0056D2] text-xs font-bold">
                  {activities.length} Tasks
                </span>
              </div>
              <button
                type="button"
                onClick={() => showToast('All tasks updated')}
                className="text-xs font-semibold text-[#0056D2] hover:underline"
              >
                Mark All Done
              </button>
            </div>

            <div className="space-y-3">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-slate-50/50 transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#0056D2]">
                          {act.activityId}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{act.name}</h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {act.location} • <span className="font-semibold text-slate-700">{act.discipline}</span> • Crew: {act.crewSize} fitters
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${act.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : act.status === 'Delayed'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                      >
                        {act.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleActivityStatus(act.id)}
                        className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium"
                        title="Toggle status"
                      >
                        <MdCheckCircle
                          size={18}
                          className={act.status === 'Completed' ? 'text-emerald-600' : 'text-slate-300'}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Progress track */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                      <span>Field Progress</span>
                      <span className="text-slate-900 font-bold">{act.currentProgress}% (Target: {act.target})</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${act.status === 'Completed' ? 'bg-emerald-500' : act.status === 'Delayed' ? 'bg-amber-500' : 'bg-[#0056D2]'
                          }`}
                        style={{ width: `${act.currentProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Note */}
                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                    <span>Note: {act.criticalNote}</span>
                    <button
                      type="button"
                      onClick={() => navigate('/dpr')}
                      className="text-[#0056D2] hover:underline font-semibold text-[10px] shrink-0 ml-2"
                    >
                      Report Progress →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick DPR Submission Widget */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <MdSend size={18} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Quick DPR Submission</h2>
                <p className="text-[11px] text-slate-500">Fast shift update — automatically submitted for AI extraction</p>
              </div>
            </div>

            <form onSubmit={handleQuickDPRSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase">
                    Select Activity
                  </label>
                  <select
                    value={selectedActivity}
                    onChange={(e) => setSelectedActivity(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0056D2] bg-white"
                  >
                    <option value="A002">A002 — Pump P-101 Installation (Unit 2)</option>
                    <option value="A002-B">A002-B — Foundation Bolt Torquing</option>
                    <option value="A003-A">A003-A — Cable Tray Routing</option>
                    <option value="A005-A">A005-A — Flange Gasket Alignment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase">
                    Shift / Time
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Day Shift · 10 Sep 2026"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600"
                  />
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  value={quickNote}
                  onChange={(e) => setQuickNote(e.target.value)}
                  placeholder="Enter quick notes in English, Hindi, or Hinglish (e.g. Pump aligned, 8 bolts torqued)..."
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
                    Attach Photo / Voice
                  </button>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">or go to full DPR Inbox</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quick Update'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT (~35%): Site Context, Crew Status, Recent DPRs & Alerts */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Site Crew Status */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdPeople className="text-[#0056D2]" size={18} />
                <h3 className="text-sm font-bold text-slate-900">Assigned Crew Breakdown</h3>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                14 / 16 Present
              </span>
            </div>

            <div className="space-y-2 pt-1">
              {supervisorCrewStatus.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-none"
                >
                  <span className="text-slate-600 font-medium">{item.trade}</span>
                  <span className="font-bold text-slate-900 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {item.count} workers
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent DPR Submissions */}
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

            <div className="space-y-2">
              {supervisorRecentDPRs.map((dpr) => (
                <div
                  key={dpr.id}
                  onClick={() => navigate('/dpr')}
                  className="p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-800">{dpr.title}</div>
                    <div className="text-[11px] text-slate-400">{dpr.id} • {dpr.time}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {dpr.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Site Alert Callout */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
              <MdWarning size={16} />
              <span>Site Safety Directive</span>
            </div>
            <p className="text-xs text-amber-700 leading-relaxed">
              Mandatory safety harness check before starting Unit 2 elevated conduit works. Ensure fire extinguisher is staged during welding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

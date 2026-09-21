/**
 * PragatiPath — Project Planner Project Workspace View
 * Selected project view for PS 26122 — Pump P-101
 * Focus: SCHEDULE-LINKED ACTIVITIES & RECONCILIATION PIPELINE
 * - WBS hierarchy and schedule activities (A001 - A008)
 * - AI matching validation queue (Approve / Change / Reject)
 * - Natural operational flow: DPR → AI Match → Review → Approve → Progress
 * - Schedule deviation & baseline variance
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdCalendarToday, MdAutoAwesome, MdCheckCircle, MdTimeline
} from 'react-icons/md';
import {
  scheduleActivitiesList,
} from '../../data/scheduleData';
import {
  plannerAIValidationList,
  plannerDeviationByWBS,
} from '../../data/roleDashboardData';

export function PlannerProjectWorkspace({ projectHeader }) {
  const navigate = useNavigate();
  const [activities] = useState(scheduleActivitiesList);
  const [matchingQueue, setMatchingQueue] = useState(plannerAIValidationList);
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApprove = (id, actName) => {
    setMatchingQueue((prev) => prev.filter((item) => item.id !== id));
    showToast(`✓ Reconciled match for ${actName}`);
  };

  const handleReject = (id) => {
    setMatchingQueue((prev) => prev.filter((item) => item.id !== id));
    showToast('Match candidate rejected');
  };

  const filteredActivities = activities.filter((act) => {
    if (selectedDiscipline !== 'All' && act.discipline !== selectedDiscipline) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-lg shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Planner Project Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0056D2] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#0056D2] animate-pulse" />
            <span>Schedule Reconciliation Workspace</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            {projectHeader.code} — Schedule Control
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Baseline Schedule: Rev 2 (10 Sep 2026) • Critical Path Deviation: +3d in Mechanical Package
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigate('/schedule')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <MdCalendarToday size={15} />
            <span>Open Gantt Schedule</span>
          </button>
        </div>
      </div>

      {/* Operational Flow Strip: DPR → AI Match → Review → Approve → Progress */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <span className="text-[#0056D2]">Reconciliation Flow:</span>
          <span className="bg-white px-2 py-0.5 rounded shadow-2xs">1. Field DPR</span>
          <span>→</span>
          <span className="bg-white px-2 py-0.5 rounded shadow-2xs">2. AI Extraction</span>
          <span>→</span>
          <span className="bg-blue-100 text-[#0056D2] px-2 py-0.5 rounded font-extrabold">3. Planner Review</span>
          <span>→</span>
          <span className="bg-white px-2 py-0.5 rounded shadow-2xs">4. Schedule Sync</span>
        </div>
        <div className="text-[11px] font-semibold text-blue-900">
          {matchingQueue.length} candidates pending your sign-off
        </div>
      </div>

      {/* Main Grid: Left AI Matching Queue & Schedule Table | Right WBS Deviations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (~65%): AI Validation Queue & Schedule Activities */}
        <div className="lg:col-span-8 space-y-6">
          {/* AI Matching Queue for this project */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
                  <MdAutoAwesome size={18} />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  AI Matching Validation Queue ({matchingQueue.length})
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">Click Approve to link to Baseline</span>
            </div>

            {matchingQueue.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500 font-medium">
                All candidates for PS 26122 have been verified and reconciled!
              </div>
            ) : (
              <div className="space-y-3">
                {matchingQueue.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {item.sourceDPR}
                        </span>
                        <p className="text-xs font-medium text-slate-800 italic mt-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          "{item.dprSnippet}"
                        </p>
                      </div>

                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-10 h-10 rounded-full border-2 border-emerald-500 flex items-center justify-center bg-emerald-50 text-emerald-700 font-extrabold text-xs">
                          {item.confidence}%
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 mt-0.5">Confidence</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Target Activity</div>
                        <div className="text-xs font-bold text-slate-900">
                          {item.suggestedActivityId} — {item.suggestedActivityName} ({item.wbs})
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleReject(item.id)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold"
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApprove(item.id, item.suggestedActivityName)}
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

          {/* Schedule Activities Table */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdCalendarToday className="text-[#0056D2]" size={18} />
                <h3 className="text-base font-bold text-slate-900">
                  PS 26122 Schedule Activities
                </h3>
              </div>

              {/* Discipline filter */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-medium">Discipline:</span>
                <select
                  value={selectedDiscipline}
                  onChange={(e) => setSelectedDiscipline(e.target.value)}
                  className="rounded-lg border border-slate-200 px-2 py-1 font-bold text-slate-700 bg-white"
                >
                  <option value="All">All</option>
                  <option value="Civil">Civil</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Electrical">Electrical</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="pb-2">Activity ID</th>
                    <th className="pb-2">Description</th>
                    <th className="pb-2">WBS</th>
                    <th className="pb-2">Planned Finish</th>
                    <th className="pb-2">Match Status</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredActivities.map((act) => (
                    <tr key={act.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 font-mono font-bold text-[#0056D2]">{act.id}</td>
                      <td className="py-2.5 font-bold text-slate-800">{act.description}</td>
                      <td className="py-2.5 text-slate-500 font-mono text-[11px]">{act.wbs}</td>
                      <td className="py-2.5 text-slate-600">{act.plannedFinish}</td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                          Reconciled
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            act.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : act.status === 'Delayed'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {act.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right (~35%): WBS Deviations & Planner History */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdTimeline className="text-[#0056D2]" size={18} />
                <h3 className="text-sm font-bold text-slate-900">WBS Package Variance</h3>
              </div>
            </div>

            <div className="space-y-2">
              {plannerDeviationByWBS.map((wbs) => (
                <div
                  key={wbs.wbs}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-800">{wbs.wbs} — {wbs.name}</div>
                    <div className="text-[10px] text-slate-400">Plan: {wbs.plannedFinish}</div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      wbs.status === 'Delayed'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {wbs.variance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

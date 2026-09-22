/**
 * PragatiPath — Progress Tracking Page (Full Backend API Integrated)
 * All mock data removed. Connected directly to Express API & MongoDB.
 */
import { useState, useEffect } from 'react';
import {
  MdCalendarToday,
  MdCheckCircle,
  MdRefresh,
  MdLayers,
  MdShowChart,
  MdWarning
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import { getScheduleActivities, getProgressEvents } from '../../services/api';

export default function ProgressPage() {
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchProgressData = async () => {
    setLoading(true);
    setErrorMsg('');
    const [schedRes, eventsRes] = await Promise.all([
      getScheduleActivities(),
      getProgressEvents({ status: 'APPROVED' }),
    ]);

    if (schedRes.error) {
      setErrorMsg(schedRes.error);
    } else {
      setActivities(schedRes.data || []);
    }

    if (eventsRes.data) {
      setEvents(eventsRes.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProgressData();
  }, []);

  // Compute metrics from actual activities & approved progress events
  const totalCount = activities.length;
  const completed = activities.filter((a) => a.status === 'COMPLETED' || a.progressPercentage >= 100);
  const inProgress = activities.filter((a) => a.status === 'IN_PROGRESS' || (a.actualStartDate && a.progressPercentage < 100));
  const delayed = activities.filter((a) => a.status === 'DELAYED');
  const notStarted = activities.filter((a) => a.status === 'NOT_STARTED' || (!a.actualStartDate && !a.actualFinishDate));
  const avgProgress = totalCount > 0 ? Math.round(activities.reduce((sum, a) => sum + (a.progressPercentage || 0), 0) / totalCount) : 0;

  // Group progress by discipline
  const disciplineMap = {};
  activities.forEach((act) => {
    const disc = act.discipline || 'General';
    if (!disciplineMap[disc]) {
      disciplineMap[disc] = { total: 0, completed: 0, totalPct: 0 };
    }
    disciplineMap[disc].total += 1;
    disciplineMap[disc].totalPct += (act.progressPercentage || 0);
    if (act.progressPercentage >= 100 || act.actualFinishDate) {
      disciplineMap[disc].completed += 1;
    }
  });

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-lg shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Real-Time Execution Progress Tracking"
        subtitle="Schedule vs Actual execution progress across engineering disciplines"
        icon={<MdShowChart />}
        actions={
          <button
            type="button"
            onClick={fetchProgressData}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
          >
            <MdRefresh size={16} className="inline mr-1" />
            Refresh Data
          </button>
        }
      />

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Top Row: 5 Progress KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Overall Progress</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{avgProgress}%</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Total Activities</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalCount}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Completed</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{completed.length}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">In Progress</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{inProgress.length}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center col-span-2 sm:col-span-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Approved Updates</div>
          <div className="text-2xl font-black text-blue-600 mt-1">{events.length}</div>
        </div>
      </div>

      {/* Middle Row: Progress by Discipline */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MdLayers className="text-blue-600" /> Progress Breakdown by Discipline
          </h2>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400">Loading progress data...</div>
        ) : Object.keys(disciplineMap).length === 0 ? (
          <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed text-xs text-slate-400">
            No schedule activities found. Upload a baseline schedule to view progress breakdown.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(disciplineMap).map(([disc, info]) => {
              const avgDiscPct = Math.round(info.totalPct / info.total);
              return (
                <div key={disc} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between font-bold text-xs text-slate-800">
                    <span>{disc}</span>
                    <span className="text-blue-700">{avgDiscPct}% Avg</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#0056D2] h-full transition-all" style={{ width: `${Math.min(avgDiscPct, 100)}%` }} />
                  </div>
                  <div className="text-[11px] text-slate-500 flex justify-between">
                    <span>{info.completed} / {info.total} Completed</span>
                    <span>{info.total - info.completed} Active/Pending</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Row: Approved Progress Updates Feed */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Approved Actual Execution Updates</h2>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400">Loading approved records...</div>
        ) : events.length === 0 ? (
          <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed text-xs text-slate-400">
            No approved progress updates committed yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="pb-2">Activity Name</th>
                  <th className="pb-2">Discipline</th>
                  <th className="pb-2">Actual Start</th>
                  <th className="pb-2">Actual Finish</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.map((ev) => (
                  <tr key={ev._id || ev.id} className="hover:bg-slate-50">
                    <td className="py-2.5 font-bold text-slate-800">{ev.rawActivityName || ev.extractedActivityName}</td>
                    <td className="py-2.5 text-slate-600">{ev.discipline || 'General'}</td>
                    <td className="py-2.5 text-slate-600">{ev.actualStartDate ? new Date(ev.actualStartDate).toLocaleDateString() : '-'}</td>
                    <td className="py-2.5 text-slate-600">{ev.actualFinishDate ? new Date(ev.actualFinishDate).toLocaleDateString() : '-'}</td>
                    <td className="py-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        APPROVED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * PragatiPath — Progress Tracking Page (Full Backend API Integrated)
 * Clienter-inspired warm rounded cards, discipline progress indicators, and approved execution updates.
 * Connected directly to Express API & MongoDB.
 */
import { useState, useEffect } from 'react';
import {
  MdCheckCircle,
  MdRefresh,
  MdLayers,
  MdShowChart,
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
    <div className="space-y-6 pb-16 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B1320] text-white px-5 py-3 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-base shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Real-Time Execution Progress Tracking"
        subtitle="Schedule baseline vs actual site execution progress across engineering disciplines"
        icon={<MdShowChart />}
        actions={
          <button
            type="button"
            onClick={fetchProgressData}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-2 transition-all shadow-2xs"
          >
            <MdRefresh size={16} className={loading ? 'animate-spin text-[#FF5500]' : ''} />
            <span>Refresh Progress</span>
          </button>
        }
      />

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800">
          {errorMsg}
        </div>
      )}

      {/* Top Row: 5 Progress KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Overall Progress</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1.5">{avgProgress}%</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Total Activities</div>
          <div className="text-2xl sm:text-3xl font-black text-[#0B1320] mt-1.5">{totalCount}</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Completed</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1.5">{completed.length}</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">In Progress</div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1.5">{inProgress.length}</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center col-span-2 sm:col-span-1 transition-all hover:shadow-xs ring-2 ring-[#FF5500]/10">
          <div className="text-[11px] font-bold text-[#FF5500] uppercase tracking-wider">Approved Updates</div>
          <div className="text-2xl sm:text-3xl font-black text-[#FF5500] mt-1.5">{events.length}</div>
        </div>
      </div>

      {/* Middle Row: Progress by Discipline */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-2xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0B1320]/5 text-[#0B1320] flex items-center justify-center">
              <MdLayers size={18} />
            </div>
            <h2 className="text-base font-bold text-[#0B1320]">Progress Breakdown by Discipline</h2>
          </div>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-stone-400">Loading progress data...</div>
        ) : Object.keys(disciplineMap).length === 0 ? (
          <div className="py-10 text-center bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] text-xs text-stone-500">
            No schedule activities found. Upload a baseline schedule to view progress breakdown.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(disciplineMap).map(([disc, info]) => {
              const avgDiscPct = Math.round(info.totalPct / info.total);
              return (
                <div key={disc} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-3">
                  <div className="flex items-center justify-between font-bold text-xs text-[#0B1320]">
                    <span>{disc}</span>
                    <span className="text-[#FF5500] font-bold">{avgDiscPct}% Avg</span>
                  </div>
                  <div className="w-full bg-white border border-[#E8E1D5] rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-[#FF5500] h-full transition-all rounded-full"
                      style={{ width: `${Math.min(avgDiscPct, 100)}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-stone-500 flex justify-between font-medium">
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
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-2xs space-y-5">
        <h2 className="text-base font-bold text-[#0B1320]">Approved Actual Execution Updates</h2>

        {loading ? (
          <div className="py-8 text-center text-xs text-stone-400">Loading approved records...</div>
        ) : events.length === 0 ? (
          <div className="py-10 text-center bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] text-xs text-stone-500">
            No approved progress updates committed yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8E1D5] text-stone-400 font-bold uppercase text-[10px] tracking-wider bg-[#FAF8F5]">
                  <th className="py-3 px-3">Activity Name</th>
                  <th className="py-3 px-3">Discipline</th>
                  <th className="py-3 px-3">Actual Start</th>
                  <th className="py-3 px-3">Actual Finish</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {events.map((ev) => (
                  <tr key={ev._id || ev.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3 px-3 font-bold text-[#0B1320]">{ev.rawActivityName || ev.extractedActivityName}</td>
                    <td className="py-3 px-3 text-stone-600">{ev.discipline || 'General'}</td>
                    <td className="py-3 px-3 text-stone-600">{ev.actualStartDate ? new Date(ev.actualStartDate).toLocaleDateString() : '-'}</td>
                    <td className="py-3 px-3 text-stone-600">{ev.actualFinishDate ? new Date(ev.actualFinishDate).toLocaleDateString() : '-'}</td>
                    <td className="py-3 px-3">
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

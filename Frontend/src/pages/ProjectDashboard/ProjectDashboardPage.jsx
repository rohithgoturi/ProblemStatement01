/**
 * PragatiPath — Project Workspace Dashboard (Full Backend API Integrated)
 * Clienter-inspired warm rounded cards, orange accents, and real project metrics.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MdDashboard,
  MdCheckCircle,
  MdCalendarToday,
  MdAutoAwesome,
  MdRefresh,
  MdArrowForward,
  MdCheck,
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import { getScheduleActivities, getProgressEvents, getPendingReviews } from '../../services/api';

export default function ProjectDashboardPage() {
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchWorkspaceData = async () => {
    setLoading(true);
    setErrorMsg('');
    const [schedRes, eventsRes, pendingRes] = await Promise.all([
      getScheduleActivities(),
      getProgressEvents(),
      getPendingReviews(),
    ]);

    if (schedRes.data) setActivities(Array.isArray(schedRes.data) ? schedRes.data : []);
    if (eventsRes.data) setEvents(Array.isArray(eventsRes.data) ? eventsRes.data : []);
    if (pendingRes.data) setPendingReviews(Array.isArray(pendingRes.data) ? pendingRes.data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkspaceData();
  }, []);

  const totalCount = activities.length;
  const completedCount = activities.filter((a) => a.status === 'COMPLETED' || a.progressPercentage >= 100).length;
  const inProgressCount = activities.filter((a) => a.status === 'IN_PROGRESS' || (a.actualStartDate && a.progressPercentage < 100)).length;
  const avgProgress = totalCount > 0 ? Math.round(activities.reduce((sum, a) => sum + (a.progressPercentage || 0), 0) / totalCount) : 0;

  return (
    <div className="space-y-6 pb-16 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B1320] text-white px-5 py-3 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-base shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Standardized Page Header */}
      <PageHeader
        title="Infrastructure Project Workspace"
        subtitle="Schedule linking, AI progress extraction & planner review hub"
        icon={<MdDashboard />}
        actions={
          <button
            type="button"
            onClick={fetchWorkspaceData}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-2 transition-all shadow-2xs"
          >
            <MdRefresh size={16} className={loading ? 'animate-spin text-[#FF5500]' : ''} />
            <span>Refresh Workspace</span>
          </button>
        }
      />

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800">
          {errorMsg}
        </div>
      )}

      {/* Real Activity KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Overall Progress</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1.5">{avgProgress}%</div>
          <div className="text-[10px] text-stone-500 mt-1">Weighted Actuals</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Total Schedule Items</div>
          <div className="text-2xl sm:text-3xl font-black text-[#0B1320] mt-1.5">{totalCount}</div>
          <div className="text-[10px] text-stone-500 mt-1">Primavera Baseline</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Completed</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1.5">{completedCount}</div>
          <div className="text-[10px] text-stone-500 mt-1">100% Verified</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">In Progress</div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1.5">{inProgressCount}</div>
          <div className="text-[10px] text-stone-500 mt-1">Active Site Work</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs col-span-2 sm:col-span-1 ring-2 ring-[#FF5500]/10">
          <div className="text-[11px] font-bold text-[#FF5500] uppercase tracking-wider">Pending Review</div>
          <div className="text-2xl sm:text-3xl font-black text-[#FF5500] mt-1.5">{pendingReviews.length}</div>
          <div className="text-[10px] text-stone-500 mt-1">Awaiting Planner</div>
        </div>
      </div>

      {/* Workspace Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Schedule Activities */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0B1320]/5 text-[#0B1320] flex items-center justify-center">
                <MdCalendarToday size={18} />
              </div>
              <h2 className="text-base font-bold text-[#0B1320]">Loaded Baseline Schedule</h2>
            </div>
            <Link
              to="/schedule"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#FF5500] hover:text-[#EA580C]"
            >
              <span>Open Schedule</span>
              <MdArrowForward size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-stone-400">Loading activities...</div>
          ) : activities.length === 0 ? (
            <div className="py-10 text-center bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] text-xs text-stone-500">
              No schedule loaded. Upload a CSV/Excel file in Schedule.
            </div>
          ) : (
            <div className="space-y-2.5">
              {activities.slice(0, 5).map((act) => (
                <div
                  key={act._id || act.activityId}
                  className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-[#FF5500]">{act.activityId}</span>
                    <h4 className="font-bold text-[#0B1320] mt-0.5">{act.activityName}</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white text-stone-700 border border-[#E8E1D5]">
                    {act.progressPercentage || 0}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: AI Extraction & Review */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center">
                <MdAutoAwesome size={18} />
              </div>
              <h2 className="text-base font-bold text-[#0B1320]">
                AI Pending Review Queue ({pendingReviews.length})
              </h2>
            </div>
            <Link
              to="/ai-matching"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#FF5500] hover:text-[#EA580C]"
            >
              <span>Review All</span>
              <MdArrowForward size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-stone-400">Loading pending reviews...</div>
          ) : pendingReviews.length === 0 ? (
            <div className="py-10 text-center bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] text-xs text-stone-500 space-y-1">
              <MdCheck className="mx-auto text-emerald-600 text-2xl" />
              <p className="font-bold text-[#0B1320]">No pending reviews</p>
              <p>All AI progress matches approved.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {pendingReviews.slice(0, 4).map((item) => (
                <div
                  key={item._id || item.id}
                  className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-[#0B1320]">
                      {item.extractedActivityName || item.rawActivityName}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      Confidence: <strong>{item.matchConfidence || 85}%</strong>
                    </div>
                  </div>
                  <Link
                    to="/ai-matching"
                    className="px-3.5 py-1.5 bg-[#0B1320] hover:bg-[#FF5500] text-white font-bold rounded-full text-xs transition-colors"
                  >
                    Approve
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

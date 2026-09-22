/**
 * PragatiPath — Project Workspace Dashboard (Full Backend API Integrated)
 * All mock data removed. Connected directly to Express API & MongoDB.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MdDashboard,
  MdCheckCircle,
  MdCalendarToday,
  MdAutoAwesome,
  MdRefresh,
  MdInbox,
  MdShowChart
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
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-lg shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="PS 26122 • Infrastructure Project Workspace"
        subtitle="Schedule linking, AI progress extraction & planner review hub"
        icon={<MdDashboard />}
        actions={
          <button
            type="button"
            onClick={fetchWorkspaceData}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer inline-flex items-center gap-1.5"
          >
            <MdRefresh size={16} />
            <span>Refresh Workspace</span>
          </button>
        }
      />

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          {errorMsg}
        </div>
      )}

      {/* 5 Real Activity KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Overall Progress</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{avgProgress}%</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Total Schedule Items</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalCount}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Completed</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{completedCount}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">In Progress</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{inProgressCount}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center col-span-2 sm:col-span-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Pending Review</div>
          <div className="text-2xl font-black text-rose-600 mt-1">{pendingReviews.length}</div>
        </div>
      </div>

      {/* Workspace Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Schedule Activities */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MdCalendarToday className="text-blue-600" /> Loaded Baseline Schedule
            </h2>
            <Link to="/schedule" className="text-xs font-bold text-blue-600 hover:underline">
              Open Schedule →
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-slate-400">Loading activities...</div>
          ) : activities.length === 0 ? (
            <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed text-xs text-slate-400">
              No schedule loaded. Upload a CSV/Excel file in Schedule.
            </div>
          ) : (
            <div className="space-y-2">
              {activities.slice(0, 5).map((act) => (
                <div key={act._id || act.activityId} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-blue-700">{act.activityId}</span>
                    <h4 className="font-bold text-slate-900">{act.activityName}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-700 border border-slate-200">
                    {act.progressPercentage || 0}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: AI Extraction & Review */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MdAutoAwesome className="text-rose-600" /> AI Pending Review Queue ({pendingReviews.length})
            </h2>
            <Link to="/ai-matching" className="text-xs font-bold text-blue-600 hover:underline">
              Review All →
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-slate-400">Loading pending reviews...</div>
          ) : pendingReviews.length === 0 ? (
            <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed text-xs text-slate-400">
              No pending reviews. All AI matches approved!
            </div>
          ) : (
            <div className="space-y-2">
              {pendingReviews.slice(0, 4).map((item) => (
                <div key={item._id || item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-800">{item.extractedActivityName || item.rawActivityName}</div>
                    <div className="text-[10px] text-slate-500">Confidence: {item.matchConfidence || 85}%</div>
                  </div>
                  <Link to="/ai-matching" className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-md hover:bg-emerald-700 text-xs">
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

/**
 * PragatiPath — Dashboard Page (Full Backend API Integrated)
 * All mock data removed. Connected directly to Express API & MongoDB aggregator.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MdDashboard,
  MdCheckCircle,
  MdCalendarToday,
  MdInbox,
  MdAutoAwesome,
  MdRefresh,
  MdLayers,
  MdInfoOutline
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import { getDashboardSummary, getAuditLogs } from '../../services/api';
import { useRole } from '../../context/RoleContext';

export default function DashboardPage() {
  const { currentRole } = useRole();
  const [summary, setSummary] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    setErrorMsg('');
    const [sumRes, auditRes] = await Promise.all([
      getDashboardSummary(),
      getAuditLogs(),
    ]);

    if (sumRes.error) {
      setErrorMsg(sumRes.error);
    } else {
      setSummary(sumRes.data || {});
    }

    if (auditRes.data && Array.isArray(auditRes.data)) {
      setAuditLogs(auditRes.data);
    } else {
      setAuditLogs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalAct = summary?.totalActivities || 0;
  const completed = summary?.completedActivities || 0;
  const inProgress = summary?.inProgressActivities || 0;
  const pendingCount = summary?.pendingReviewsCount || 0;
  const approvedCount = summary?.approvedEventsCount || 0;
  const sourcesCount = summary?.totalSources || 0;

  const activities = summary?.activities || [];
  const pendingReviews = summary?.pendingReviews || [];

  return (
    <div className="space-y-5 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-lg shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Infrastructure Project Dashboard"
        subtitle={`PragatiPath Overview • Role: ${currentRole.replace('_', ' ').toUpperCase()}`}
        icon={<MdDashboard />}
        actions={
          <button
            type="button"
            onClick={loadData}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer inline-flex items-center gap-1.5"
          >
            <MdRefresh size={16} />
            <span>Refresh Overview</span>
          </button>
        }
      />

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Top 5 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Schedule Activities</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalAct}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Completed</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{completed}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">In Progress</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{inProgress}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Pending Planner Review</div>
          <div className="text-2xl font-black text-rose-600 mt-1">{pendingCount}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center col-span-2 sm:col-span-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Ingested Sources</div>
          <div className="text-2xl font-black text-blue-600 mt-1">{sourcesCount}</div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Recent Schedule & Review Queue */}
        <div className="lg:col-span-7 space-y-5">
          {/* Pending Planner Review Queue Action Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                  <MdAutoAwesome size={18} />
                </div>
                <h2 className="text-sm font-bold text-slate-900">Pending Planner Review Queue</h2>
              </div>
              <Link to="/ai-matching" className="text-xs font-bold text-blue-600 hover:underline">
                Open Full Review Queue →
              </Link>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading pending items...</div>
            ) : pendingReviews.length === 0 ? (
              <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed text-xs text-slate-400">
                All extracted progress updates reviewed! No items pending planner action.
              </div>
            ) : (
              <div className="space-y-2">
                {pendingReviews.slice(0, 4).map((item) => (
                  <div key={item._id || item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-800">{item.extractedActivityName || item.rawActivityName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">Suggested: {item.matchedScheduleActivity?.activityId || 'Unlinked'}</div>
                    </div>
                    <Link to="/ai-matching" className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-md hover:bg-emerald-700">
                      Review Match
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Schedule Activities Overview */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                  <MdCalendarToday size={18} />
                </div>
                <h2 className="text-sm font-bold text-slate-900">Project Schedule Activities</h2>
              </div>
              <Link to="/schedule" className="text-xs font-bold text-blue-600 hover:underline">
                Manage Schedule →
              </Link>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading schedule...</div>
            ) : activities.length === 0 ? (
              <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed text-xs text-slate-400 space-y-2">
                <p>No baseline schedule loaded in MongoDB.</p>
                <Link to="/schedule" className="inline-block px-3 py-1.5 bg-blue-600 text-white font-bold rounded-lg text-xs">
                  Upload Schedule CSV / Excel
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
                      <th className="pb-2">Activity ID</th>
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Discipline</th>
                      <th className="pb-2">Progress</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activities.slice(0, 5).map((act) => (
                      <tr key={act._id || act.activityId}>
                        <td className="py-2.5 font-mono font-bold text-slate-800">{act.activityId}</td>
                        <td className="py-2.5 font-bold text-slate-800">{act.activityName}</td>
                        <td className="py-2.5 text-slate-600">{act.discipline || '-'}</td>
                        <td className="py-2.5 font-bold text-blue-700">{act.progressPercentage || 0}%</td>
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                            {act.status || 'NOT_STARTED'}
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

        {/* Right Column: Audit History & Quick Links */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Recent Audit History</h2>
              <Link to="/reports" className="text-xs font-bold text-blue-600 hover:underline">
                View All →
              </Link>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading audit history...</div>
            ) : auditLogs.length === 0 ? (
              <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed text-xs text-slate-400">
                No audit decisions recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {auditLogs.slice(0, 5).map((log) => (
                  <div key={log._id || log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-800">{log.action}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{new Date(log.timestamp || Date.now()).toLocaleTimeString()}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">By {log.performedBy || log.actor || 'SYSTEM'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-blue-50/60 border border-blue-100 p-5 rounded-2xl space-y-2 text-xs text-blue-900">
            <div className="font-bold flex items-center gap-1.5 text-blue-800">
              <MdInfoOutline size={18} /> PragatiPath Real Data Pipeline
            </div>
            <p>
              Upload progress reports via <strong>DPR Inbox</strong> or baseline schedules via <strong>Schedule</strong>. All extracted events are validated, matched by the matching engine, and stored in MongoDB upon planner approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

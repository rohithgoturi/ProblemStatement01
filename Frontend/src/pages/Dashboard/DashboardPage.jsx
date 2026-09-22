/**
 * PragatiPath — Dashboard Page (Full Backend API Integrated)
 * Clienter-inspired warm neutral control center, bold KPI cards, and orange accents.
 * All data sourced directly from Express API & MongoDB aggregator.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MdDashboard,
  MdCheckCircle,
  MdCalendarToday,
  MdAutoAwesome,
  MdRefresh,
  MdInfoOutline,
  MdArrowForward,
  MdHistory,
  MdCheck,
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
    <div className="space-y-6 font-sans pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B1320] text-white px-5 py-3 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-base shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Standardized Page Header */}
      <PageHeader
        title="Infrastructure Project Control Center"
        subtitle={`Live Operations Overview • Authorized Role: ${currentRole.replace('_', ' ').toUpperCase()}`}
        icon={<MdDashboard />}
        actions={
          <button
            type="button"
            onClick={loadData}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-2 transition-all shadow-2xs"
          >
            <MdRefresh size={16} className={loading ? 'animate-spin text-[#FF5500]' : ''} />
            <span>Refresh Overview</span>
          </button>
        }
      />

      {/* Error Message Banner */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800">
          {errorMsg}
        </div>
      )}

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Schedule Activities</div>
          <div className="text-2xl sm:text-3xl font-black text-[#0B1320] mt-1.5">{totalAct}</div>
          <div className="text-[10px] text-stone-500 mt-1">Primavera / Excel</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Completed</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1.5">{completed}</div>
          <div className="text-[10px] text-stone-500 mt-1">Verified Finish</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">In Progress</div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1.5">{inProgress}</div>
          <div className="text-[10px] text-stone-500 mt-1">Active on Site</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs ring-2 ring-[#FF5500]/10">
          <div className="text-[11px] font-bold text-[#FF5500] uppercase tracking-wider">Pending Planner Review</div>
          <div className="text-2xl sm:text-3xl font-black text-[#FF5500] mt-1.5">{pendingCount}</div>
          <div className="text-[10px] text-stone-500 mt-1">Awaiting Decision</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs col-span-2 sm:col-span-1">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Ingested Sources</div>
          <div className="text-2xl sm:text-3xl font-black text-[#0B1320] mt-1.5">{sourcesCount}</div>
          <div className="text-[10px] text-stone-500 mt-1">DPRs & Field Logs</div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Schedule & Review Queue */}
        <div className="lg:col-span-7 space-y-6">
          {/* Pending Planner Review Queue Action Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center">
                  <MdAutoAwesome size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#0B1320]">Pending Planner Review Queue</h2>
                  <p className="text-xs text-stone-500">Extracted progress matches awaiting verification</p>
                </div>
              </div>
              <Link
                to="/ai-matching"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#FF5500] hover:text-[#EA580C] transition-colors"
              >
                <span>Open Queue</span>
                <MdArrowForward size={14} />
              </Link>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-stone-400">Loading pending items...</div>
            ) : pendingReviews.length === 0 ? (
              <div className="py-10 text-center bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] p-6 space-y-2">
                <MdCheck className="mx-auto text-emerald-600 text-2xl" />
                <h3 className="text-xs font-bold text-[#0B1320]">All Extracted Progress Updates Reviewed</h3>
                <p className="text-xs text-stone-500">No pending items in queue. Submit new DPRs to extract updates.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingReviews.slice(0, 4).map((item) => (
                  <div
                    key={item._id || item.id}
                    className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-[#0B1320]">
                        {item.extractedActivityName || item.rawActivityName}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        Suggested Link:{' '}
                        <strong className="font-mono text-[#0B1320]">
                          {item.matchedScheduleActivity?.activityId || 'Unlinked'}
                        </strong>
                      </div>
                    </div>
                    <Link
                      to="/ai-matching"
                      className="inline-flex items-center justify-center px-4 py-2 bg-[#0B1320] hover:bg-[#FF5500] text-white font-bold rounded-full text-xs transition-colors self-start sm:self-auto"
                    >
                      Review Match
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Schedule Activities Overview */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0B1320]/5 text-[#0B1320] flex items-center justify-center">
                  <MdCalendarToday size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#0B1320]">Project Schedule Activities</h2>
                  <p className="text-xs text-stone-500">Current baseline activities loaded in project</p>
                </div>
              </div>
              <Link
                to="/schedule"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#FF5500] hover:text-[#EA580C] transition-colors"
              >
                <span>Manage Schedule</span>
                <MdArrowForward size={14} />
              </Link>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-stone-400">Loading schedule...</div>
            ) : activities.length === 0 ? (
              <div className="py-10 text-center bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] p-6 space-y-3">
                <p className="text-xs text-stone-600">No baseline schedule loaded yet.</p>
                <Link
                  to="/schedule"
                  className="inline-block px-5 py-2.5 bg-[#0B1320] hover:bg-[#FF5500] text-white font-bold rounded-full text-xs transition-colors"
                >
                  Upload Schedule File (.xlsx / .csv)
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8E1D5] text-stone-400 uppercase text-[10px] font-bold">
                      <th className="pb-3">Activity ID</th>
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Discipline</th>
                      <th className="pb-3">Progress</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {activities.slice(0, 5).map((act) => (
                      <tr key={act._id || act.activityId} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="py-3 font-mono font-bold text-[#0B1320]">{act.activityId}</td>
                        <td className="py-3 font-semibold text-[#0B1320]">{act.activityName}</td>
                        <td className="py-3 text-stone-600">{act.discipline || '-'}</td>
                        <td className="py-3 font-bold text-[#FF5500]">{act.progressPercentage || 0}%</td>
                        <td className="py-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF8F5] text-stone-700 border border-[#E8E1D5]">
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

        {/* Right Column: Audit History & Information Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0B1320]/5 text-[#0B1320] flex items-center justify-center">
                  <MdHistory size={18} />
                </div>
                <h2 className="text-sm font-bold text-[#0B1320]">Recent Audit History</h2>
              </div>
              <Link
                to="/reports"
                className="text-xs font-bold text-[#FF5500] hover:text-[#EA580C]"
              >
                View All →
              </Link>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-stone-400">Loading audit history...</div>
            ) : auditLogs.length === 0 ? (
              <div className="py-8 text-center bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] text-xs text-stone-500">
                No audit decisions recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {auditLogs.slice(0, 5).map((log) => (
                  <div
                    key={log._id || log.id}
                    className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-[#0B1320]">{log.action}</span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {new Date(log.timestamp || Date.now()).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500">
                      By {log.performedBy || log.actor || 'SYSTEM'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Operational Pipeline Note */}
          <div className="bg-[#FAF8F5] border border-[#E8E1D5] p-6 rounded-3xl space-y-3 text-xs text-stone-700 shadow-2xs">
            <div className="font-bold flex items-center gap-2 text-[#0B1320] text-sm">
              <MdInfoOutline size={20} className="text-[#FF5500]" />
              <span>Real-Time Schedule Linking Flow</span>
            </div>
            <p className="leading-relaxed">
              Upload daily reports via <strong>DPR Inbox</strong> or baseline schedules via <strong>Schedule</strong>. All extracted progress updates require human planner approval before updating project data in MongoDB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

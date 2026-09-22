/**
 * PragatiPath — System Administrator Main Dashboard View (Partially Backend API Integrated)
 * Mock data removed. Audit logs fetched from real backend.
 * User management API is not yet available — clearly displayed as such.
 * Focus: PLATFORM GOVERNANCE & ACCESS CONTROL
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdPeople, MdCheckCircle, MdRefresh,
  MdSecurity, MdHistory, MdInfoOutline,
  MdAdminPanelSettings
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import {
  getAuditLogs,
  getScheduleActivities,
  getSourceDocuments,
} from '../../services/api';

export function AdminDashboardView() {
  const navigate = useNavigate();

  const [auditLogs, setAuditLogs] = useState([]);
  const [activities, setActivities] = useState([]);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg('');

    const [auditRes, schedRes, sourcesRes] = await Promise.all([
      getAuditLogs(),
      getScheduleActivities(),
      getSourceDocuments(),
    ]);

    if (auditRes.error) {
      setErrorMsg(`Failed to load audit logs: ${auditRes.error}`);
    } else {
      setAuditLogs(Array.isArray(auditRes.data) ? auditRes.data : []);
    }

    if (schedRes.data) setActivities(Array.isArray(schedRes.data) ? schedRes.data : []);
    if (sourcesRes.data) setSources(Array.isArray(sourcesRes.data) ? sourcesRes.data : []);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Real KPI metrics derived from backend data
  const completedActivities = activities.filter(
    (a) => a.status === 'COMPLETED' || a.progressPercentage >= 100
  ).length;
  const avgProgress = activities.length > 0
    ? Math.round(activities.reduce((sum, a) => sum + (a.progressPercentage || 0), 0) / activities.length)
    : 0;

  const adminKPIs = [
    {
      id: 'total-activities',
      title: 'Schedule Activities',
      value: loading ? '—' : activities.length,
      subtext: activities.length > 0 ? `${completedActivities} completed` : 'No schedule loaded',
      badge: 'Schedule',
    },
    {
      id: 'avg-progress',
      title: 'Avg. Progress',
      value: loading ? '—' : `${avgProgress}%`,
      subtext: 'Across all schedule activities',
      badge: 'Live',
    },
    {
      id: 'ingested-sources',
      title: 'Ingested DPRs',
      value: loading ? '—' : sources.length,
      subtext: 'Progress reports submitted',
      badge: 'Data',
    },
    {
      id: 'audit-records',
      title: 'Audit Records',
      value: loading ? '—' : auditLogs.length,
      subtext: 'Planner review decisions',
      badge: 'Immutable',
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
        title="System Administrator Console"
        subtitle="Platform data overview, audit trail, and system governance"
        icon={<MdAdminPanelSettings />}
        actions={
          <>
            <button
              type="button"
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#0056D2] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <MdRefresh size={16} />
              <span>Refresh Data</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/reports')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors"
            >
              <span>View Full Audit</span>
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
        {adminKPIs.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-2 hover:border-purple-200 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">{kpi.title}</span>
              <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold">
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
        {/* LEFT (~65%): User Directory (API not available) */}
        <div className="lg:col-span-8 space-y-6">
          {/* User Management — API Not Available */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-50 text-purple-700">
                  <MdPeople size={18} />
                </div>
                <h2 className="text-base font-bold text-slate-900">User Access & Role Matrix</h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold border border-slate-200">
                API Coming Soon
              </span>
            </div>

            <div className="py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 p-8 space-y-3">
              <MdPeople size={36} className="mx-auto text-slate-300" />
              <h3 className="text-sm font-bold text-slate-700">User Directory API Not Yet Available</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                The backend does not yet expose a user management endpoint. User records cannot be fetched, created, or modified via API. This feature will be available in a future backend update.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] font-semibold text-amber-700">
                <MdInfoOutline size={14} />
                Requires: GET /api/users backend endpoint
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT (~35%): System Audit Logs & Platform Health */}
        <div className="lg:col-span-4 space-y-6">
          {/* Real System Audit Trail */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdHistory className="text-purple-600" size={18} />
                <h3 className="text-sm font-bold text-slate-900">System Audit Trail</h3>
              </div>
              <span className="text-xs text-emerald-600 font-bold">Live</span>
            </div>

            {loading ? (
              <div className="py-6 text-center text-xs text-slate-400">
                <span className="inline-block w-4 h-4 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-1" />
                <p>Fetching audit logs...</p>
              </div>
            ) : auditLogs.length === 0 ? (
              <div className="py-6 text-center bg-slate-50 rounded-xl border border-dashed text-xs text-slate-400">
                No audit records yet. Planner review decisions will appear here.
              </div>
            ) : (
              <div className="space-y-2">
                {auditLogs.slice(0, 5).map((log) => (
                  <div key={log._id || log.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-bold text-[10px] uppercase px-1.5 py-0.5 rounded ${
                          (log.action || '').includes('APPROVED')
                            ? 'bg-emerald-100 text-emerald-800'
                            : (log.action || '').includes('REJECTED')
                            ? 'bg-red-100 text-red-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {log.action || 'LOG'}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(log.timestamp || log.createdAt || Date.now()).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium leading-tight">
                      {log.entityType || 'ScheduleActivity'} — {log.entityId || '—'}
                    </p>
                    <p className="text-[10px] text-slate-400">By: {log.performedBy || 'system'}</p>
                  </div>
                ))}
                {auditLogs.length > 5 && (
                  <button
                    type="button"
                    onClick={() => navigate('/reports')}
                    className="w-full py-1.5 text-xs font-bold text-[#0056D2] hover:underline"
                  >
                    View all {auditLogs.length} audit records →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Platform Health — Static System Info */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <MdSecurity className="text-emerald-600" size={18} />
              <span>Platform Configuration</span>
            </div>
            <p className="text-[10px] text-slate-400 italic">
              Static configuration reference. Live health metrics API not yet available.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">AI Extraction Engine</span>
                <span className="text-emerald-600 font-bold">Gemini (Configured)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Database</span>
                <span className="text-emerald-600 font-bold">MongoDB Atlas</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">File Storage</span>
                <span className="text-slate-700 font-semibold">Local (multer)</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-600">API Server</span>
                <span className="text-emerald-600 font-bold">Express.js (Running)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

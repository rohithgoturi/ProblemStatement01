/**
 * PragatiPath — Audit History & Reports Page (Full Backend API Integrated)
 * All mock data removed. Fetches real audit logs and schedule history from Express API.
 */
import { useState, useEffect } from 'react';
import {
  MdFileDownload,
  MdCheckCircle,
  MdRefresh,
  MdHistory,
  MdTableChart
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import { getAuditLogs, getScheduleActivities } from '../../services/api';

export default function ReportsPage() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchAuditData = async () => {
    setLoading(true);
    setErrorMsg('');
    const [auditRes, schedRes] = await Promise.all([
      getAuditLogs(),
      getScheduleActivities(),
    ]);

    if (auditRes.error) {
      setErrorMsg(auditRes.error);
    } else {
      setAuditLogs(Array.isArray(auditRes.data) ? auditRes.data : []);
    }

    if (schedRes.data) {
      setActivities(Array.isArray(schedRes.data) ? schedRes.data : []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAuditData();
  }, []);

  // Export audit log data as CSV file download
  const handleExportCSV = () => {
    if (auditLogs.length === 0 && activities.length === 0) {
      showToast('No data available to export');
      return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,';

    if (auditLogs.length > 0) {
      csvContent += 'Timestamp,Action,PerformedBy,EntityType,EntityID,PreviousValues,UpdatedValues\n';
      auditLogs.forEach((log) => {
        const ts = new Date(log.timestamp || log.createdAt).toISOString();
        const action = log.action || '';
        const user = log.performedBy || 'planner-1';
        const type = log.entityType || '';
        const id = log.entityId || '';
        const prev = JSON.stringify(log.previousValues || {}).replace(/"/g, '""');
        const updated = JSON.stringify(log.updatedValues || {}).replace(/"/g, '""');
        csvContent += `"${ts}","${action}","${user}","${type}","${id}","${prev}","${updated}"\n`;
      });
    } else {
      csvContent += 'ActivityID,ActivityName,Discipline,PlannedStart,PlannedFinish,ActualStart,ActualFinish,ProgressPercentage,Status\n';
      activities.forEach((act) => {
        csvContent += `"${act.activityId}","${act.activityName}","${act.discipline || ''}","${act.plannedStartDate || ''}","${act.plannedFinishDate || ''}","${act.actualStartDate || ''}","${act.actualFinishDate || ''}","${act.progressPercentage || 0}","${act.status || ''}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PragatiPath_Audit_History_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Downloaded audit history report successfully!');
  };

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
        title="Audit History & Project Reports"
        subtitle="Immutable audit trail of planner review decisions and schedule actual updates"
        icon={<MdHistory />}
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchAuditData}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
            >
              <MdRefresh size={16} className="inline mr-1" />
              Refresh Logs
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-[#0056D2] text-white font-bold text-xs hover:bg-blue-700 cursor-pointer inline-flex items-center gap-1.5"
            >
              <MdFileDownload size={16} />
              <span>Export Audit CSV</span>
            </button>
          </div>
        }
      />

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Audit Records ({auditLogs.length})
          </h2>
          <span className="text-xs text-slate-500">
            Traceable log of all schedule updates & review decisions
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">
            <span className="inline-block w-6 h-6 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-2" />
            <p>Fetching audit logs from backend database...</p>
          </div>
        ) : auditLogs.length === 0 ? (
          <div className="py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 p-8 space-y-2">
            <MdTableChart size={36} className="mx-auto text-slate-300" />
            <h3 className="text-sm font-bold text-slate-700">No Audit Logs Recorded Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Audit records are automatically recorded when a project planner approves, edits, or rejects a progress event in the AI Review Queue.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="pb-2">Timestamp</th>
                  <th className="pb-2">Action</th>
                  <th className="pb-2">Performed By</th>
                  <th className="pb-2">Entity Type</th>
                  <th className="pb-2">Previous Values</th>
                  <th className="pb-2">Updated Values</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map((log) => {
                  const id = log._id || log.id;
                  const dateStr = new Date(log.timestamp || log.createdAt || Date.now()).toLocaleString();
                  const action = log.action || 'ACTION_LOGGED';

                  return (
                    <tr key={id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 font-mono text-[11px] text-slate-600">{dateStr}</td>
                      <td className="py-2.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            action.includes('APPROVED')
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : action.includes('REJECTED')
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {action}
                        </span>
                      </td>
                      <td className="py-2.5 font-bold text-slate-800">{log.performedBy || 'planner-1'}</td>
                      <td className="py-2.5 text-slate-600 font-mono text-[11px]">{log.entityType || 'ScheduleActivity'}</td>
                      <td className="py-2.5 text-slate-500 font-mono text-[10px] max-w-xs truncate">
                        {log.previousValues ? JSON.stringify(log.previousValues) : '-'}
                      </td>
                      <td className="py-2.5 text-slate-700 font-mono text-[10px] max-w-xs truncate">
                        {log.updatedValues ? JSON.stringify(log.updatedValues) : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

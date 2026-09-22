/**
 * PragatiPath — Audit History & Project Reports (Full Backend API Integrated)
 * Clienter-inspired warm rounded cards, timeline & table views, and orange accents.
 * Fetches real immutable audit logs and schedule history from Express API.
 */
import { useState, useEffect } from 'react';
import {
  MdFileDownload,
  MdCheckCircle,
  MdRefresh,
  MdHistory,
  MdTableChart,
  MdTimeline,
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import { getAuditLogs, getScheduleActivities } from '../../services/api';

export default function ReportsPage() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' | 'table'

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
        title="Audit History & Project Reports"
        subtitle="Immutable audit trail of planner review decisions and schedule actual updates"
        icon={<MdHistory />}
        actions={
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={fetchAuditData}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <MdRefresh size={16} className={loading ? 'animate-spin text-[#FF5500]' : ''} />
              <span>Refresh Logs</span>
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-5 py-2.5 rounded-full bg-[#FF5500] hover:bg-[#EA580C] text-white font-bold text-xs cursor-pointer inline-flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <MdFileDownload size={16} />
              <span>Export Audit CSV</span>
            </button>
          </div>
        }
      />

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800">
          {errorMsg}
        </div>
      )}

      {/* Audit Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-[#0B1320]">
              Audit Records ({auditLogs.length})
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Cryptographically timestamped log of human review decisions
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all ${
                viewMode === 'timeline' ? 'bg-[#0B1320] text-white shadow-2xs font-bold' : 'text-stone-600 hover:text-[#0B1320]'
              }`}
            >
              <MdTimeline size={16} />
              <span>Timeline View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all ${
                viewMode === 'table' ? 'bg-[#0B1320] text-white shadow-2xs font-bold' : 'text-stone-600 hover:text-[#0B1320]'
              }`}
            >
              <MdTableChart size={15} />
              <span>Table View</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs text-stone-400 font-medium">
            <span className="inline-block w-8 h-8 border-3 border-stone-200 border-t-[#FF5500] rounded-full animate-spin mb-3" />
            <p>Fetching audit logs from backend database...</p>
          </div>
        ) : auditLogs.length === 0 ? (
          <div className="py-16 text-center bg-[#FAF8F5] rounded-3xl border border-[#E8E1D5] p-8 space-y-3">
            <MdHistory size={38} className="mx-auto text-stone-300" />
            <h3 className="text-sm font-bold text-[#0B1320]">No Audit Logs Recorded Yet</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Audit records are automatically created whenever an authorized planner approves, edits, or rejects an activity match.
            </p>
          </div>
        ) : viewMode === 'timeline' ? (
          /* Timeline View (Section 20 from Prompt) */
          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#FF5500]/30 space-y-6 my-4 ml-3">
            {auditLogs.map((log) => {
              const id = log._id || log.id;
              const dateStr = new Date(log.timestamp || log.createdAt || Date.now()).toLocaleString();
              const action = log.action || 'DECISION_LOGGED';

              return (
                <div key={id} className="relative group">
                  {/* Timeline Pulse Node */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-3 border-[#FF5500] shadow-xs group-hover:scale-110 transition-transform" />

                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] shadow-2xs space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-0.5 rounded-full text-[10px] font-bold border ${
                            action.includes('APPROVED')
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : action.includes('REJECTED')
                              ? 'bg-rose-50 text-rose-800 border-rose-200'
                              : 'bg-[#FF5500]/10 text-[#FF5500] border-[#FF5500]/20'
                          }`}
                        >
                          {action}
                        </span>
                        <span className="text-xs font-bold text-[#0B1320]">
                          By {log.performedBy || 'Planner'}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-stone-400">
                        {dateStr}
                      </span>
                    </div>

                    <div className="text-xs text-stone-600">
                      Entity:{' '}
                      <strong className="font-mono text-[#0B1320]">{log.entityType || 'ScheduleActivity'}</strong>
                      {log.entityId && <span className="ml-1 font-mono text-stone-400">({log.entityId})</span>}
                    </div>

                    {(log.previousValues || log.updatedValues) && (
                      <div className="mt-2 pt-2 border-t border-stone-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {log.previousValues && (
                          <div className="bg-white p-2.5 rounded-xl border border-[#E8E1D5] text-stone-500 font-mono truncate">
                            <span className="text-[9px] uppercase font-bold text-stone-400 block">Previous Values</span>
                            {JSON.stringify(log.previousValues)}
                          </div>
                        )}
                        {log.updatedValues && (
                          <div className="bg-white p-2.5 rounded-xl border border-[#E8E1D5] text-[#0B1320] font-mono truncate">
                            <span className="text-[9px] uppercase font-bold text-emerald-600 block">Committed Update</span>
                            {JSON.stringify(log.updatedValues)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8E1D5] text-stone-400 font-bold uppercase text-[10px] tracking-wider bg-[#FAF8F5]">
                  <th className="py-3 px-3">Timestamp</th>
                  <th className="py-3 px-3">Action</th>
                  <th className="py-3 px-3">Performed By</th>
                  <th className="py-3 px-3">Entity Type</th>
                  <th className="py-3 px-3">Previous Values</th>
                  <th className="py-3 px-3">Updated Values</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {auditLogs.map((log) => {
                  const id = log._id || log.id;
                  const dateStr = new Date(log.timestamp || log.createdAt || Date.now()).toLocaleString();
                  const action = log.action || 'ACTION_LOGGED';

                  return (
                    <tr key={id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3 px-3 font-mono text-[11px] text-stone-500">{dateStr}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                            action.includes('APPROVED')
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : action.includes('REJECTED')
                              ? 'bg-rose-50 text-rose-800 border-rose-200'
                              : 'bg-[#FF5500]/10 text-[#FF5500] border-[#FF5500]/20'
                          }`}
                        >
                          {action}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-[#0B1320]">{log.performedBy || 'Planner'}</td>
                      <td className="py-3 px-3 text-stone-600 font-mono text-[11px]">{log.entityType || 'ScheduleActivity'}</td>
                      <td className="py-3 px-3 text-stone-500 font-mono text-[10px] max-w-xs truncate">
                        {log.previousValues ? JSON.stringify(log.previousValues) : '-'}
                      </td>
                      <td className="py-3 px-3 text-[#0B1320] font-mono text-[10px] max-w-xs truncate">
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

/**
 * PragatiPath — Schedule Management Page (Full Backend API Integrated)
 * All mock data removed. Connected directly to Node + Express + MongoDB backend.
 */
import { useState, useEffect, useRef } from 'react';
import {
  MdCalendarToday, MdCloudUpload, MdFolderOpen, MdCheckCircle, MdAccessTime,
  MdWarning, MdVisibility, MdMoreVert, MdRefresh,
  MdViewList, MdViewTimeline, MdDeleteOutline, MdInfoOutline
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import { getScheduleActivities, importSchedule, clearSchedule } from '../../services/api';

export default function SchedulePage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // View toggle: 'split' | 'gantt'
  const [activeView, setActiveView] = useState('split');

  // Filter states
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch real schedule activities from backend
  const fetchActivities = async () => {
    setLoading(true);
    setErrorMsg('');
    const res = await getScheduleActivities();
    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setActivities(Array.isArray(res.data) ? res.data : []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRowIds(activities.map((a) => a.activityId || a._id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const handleToggleRow = (id) => {
    setSelectedRowIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSelectedDiscipline('All');
    setSelectedStatus('All');
    showToast('Filters reset to default');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    const res = await importSchedule(formData);
    setUploading(false);

    if (res.error) {
      setErrorMsg(`Import failed: ${res.error}`);
    } else {
      showToast(`Successfully imported schedule (${res.data?.importedCount || 'activities updated'})`);
      fetchActivities();
    }
  };

  const handleClearSchedule = async () => {
    if (!window.confirm('Are you sure you want to clear all schedule activities?')) return;
    setLoading(true);
    const res = await clearSchedule();
    if (res.error) {
      setErrorMsg(res.error);
    } else {
      showToast('Schedule activities cleared');
      setActivities([]);
    }
    setLoading(false);
  };

  // Filter activities
  const filteredActivities = activities.filter((act) => {
    if (selectedDiscipline !== 'All' && act.discipline !== selectedDiscipline) return false;
    const status = act.status || (act.actualFinishDate ? 'COMPLETED' : act.actualStartDate ? 'IN_PROGRESS' : 'NOT_STARTED');
    if (selectedStatus !== 'All' && status !== selectedStatus) return false;
    return true;
  });

  // Calculate dynamic KPIs from backend data
  const totalCount = activities.length;
  const completedCount = activities.filter((a) => a.status === 'COMPLETED' || a.progressPercentage >= 100).length;
  const inProgressCount = activities.filter((a) => a.status === 'IN_PROGRESS' || (a.actualStartDate && a.progressPercentage < 100)).length;
  const delayedCount = activities.filter((a) => a.status === 'DELAYED').length;
  const notStartedCount = activities.filter((a) => a.status === 'NOT_STARTED' || (!a.actualStartDate && !a.actualFinishDate)).length;
  const avgProgress = totalCount > 0 ? Math.round(activities.reduce((sum, a) => sum + (a.progressPercentage || 0), 0) / totalCount) : 0;

  // Extract unique disciplines
  const disciplines = Array.from(new Set(activities.map((a) => a.discipline).filter(Boolean)));

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-lg shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. PAGE HEADER */}
      <PageHeader
        title="Schedule Management"
        subtitle="PS 26122 • Real Project Schedule"
        icon={<MdCalendarToday />}
        actions={
          <div className="flex items-center gap-2">
            {activities.length > 0 && (
              <button
                type="button"
                onClick={handleClearSchedule}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs border border-red-200 transition-all cursor-pointer"
              >
                <MdDeleteOutline size={16} />
                <span>Clear Schedule</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <MdCloudUpload size={18} />
              <span>{uploading ? 'Uploading...' : 'Upload Schedule'}</span>
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

      {/* 2. TOP SECTION: Upload Card (Left) + 5 KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* TOP LEFT: Upload Schedule File */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div className="text-center space-y-3 pt-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 text-[#0056D2] flex items-center justify-center">
              <MdCloudUpload size={32} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">Upload Project Schedule</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Support for CSV, Excel (.xlsx), and JSON schedule files
              </p>
            </div>

            <div className="pt-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv,.json"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <MdFolderOpen size={18} />
                <span>{uploading ? 'Processing File...' : 'Select File'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-100 text-[11px] font-semibold">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              Excel (.xlsx, .xls)
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              CSV (.csv)
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
              JSON Schedule
            </span>
          </div>
        </div>

        {/* TOP RIGHT: Dynamic 5 Activity KPIs */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {/* KPI 1 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
              <div className="text-[11px] font-semibold text-slate-400 uppercase">Total Activities</div>
              <div className="text-2xl font-black text-slate-900 mt-1">{totalCount}</div>
            </div>

            {/* KPI 2 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
              <div className="text-[11px] font-semibold text-slate-400 uppercase">Avg Progress</div>
              <div className="text-2xl font-black text-blue-600 mt-1">{avgProgress}%</div>
            </div>

            {/* KPI 3 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
              <div className="text-[11px] font-semibold text-slate-400 uppercase">Completed</div>
              <div className="text-2xl font-black text-emerald-600 mt-1">{completedCount}</div>
            </div>

            {/* KPI 4 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
              <div className="text-[11px] font-semibold text-slate-400 uppercase">In Progress</div>
              <div className="text-2xl font-black text-amber-600 mt-1">{inProgressCount}</div>
            </div>

            {/* KPI 5 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-center col-span-2 sm:col-span-1">
              <div className="text-[11px] font-semibold text-slate-400 uppercase">Not Started</div>
              <div className="text-2xl font-black text-slate-500 mt-1">{notStartedCount}</div>
            </div>
          </div>

          <div className="bg-blue-50/60 border border-blue-100 p-4 rounded-xl text-xs text-blue-800 mt-4 flex items-center gap-3">
            <MdInfoOutline size={20} className="text-[#0056D2] shrink-0" />
            <span>
              <strong>Backend Verified:</strong> Only approved planner decisions update activity actual dates & progress percentages. Uploading a new schedule file automatically parses activity IDs and WBS hierarchy into MongoDB.
            </span>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SECTION: Schedule Activities Table */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
        {/* Header with Title and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
              <MdCalendarToday size={18} />
            </div>
            <h2 className="text-base font-bold text-slate-900">Schedule Activities</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0056D2] text-xs font-semibold border border-blue-100">
              {filteredActivities.length} Activities
            </span>
          </div>

          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveView('split')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'split' ? 'bg-[#0056D2] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MdViewList size={15} />
              <span>List View</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('gantt')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'gantt' ? 'bg-[#0056D2] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MdViewTimeline size={15} />
              <span>Gantt View</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Discipline:</span>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-[#0056D2]"
            >
              <option value="All">All Disciplines</option>
              {disciplines.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-[#0056D2]"
            >
              <option value="All">All Statuses</option>
              <option value="COMPLETED">Completed</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DELAYED">Delayed</option>
              <option value="NOT_STARTED">Not Started</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleResetFilters}
            className="ml-auto inline-flex items-center gap-1 text-slate-500 hover:text-[#0056D2] font-semibold text-xs transition-colors"
          >
            <MdRefresh size={16} />
            <span>Reset</span>
          </button>
        </div>

        {/* Table / Empty / Loading */}
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs font-medium">
            <span className="inline-block w-6 h-6 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-2" />
            <p>Loading schedule activities from MongoDB...</p>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 p-8 space-y-3">
            <MdCalendarToday size={36} className="mx-auto text-slate-300" />
            <h3 className="text-sm font-bold text-slate-700">No Schedule Activities Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Upload a baseline schedule CSV or Excel file to populate the project activities.
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-[#0056D2] text-white text-xs font-bold rounded-lg hover:bg-blue-700"
            >
              Upload Schedule File
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="pb-2 w-6">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedRowIds.length === activities.length}
                      className="rounded border-slate-300 text-[#0056D2] focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th className="pb-2">Activity ID</th>
                  <th className="pb-2">Activity Name</th>
                  <th className="pb-2">WBS</th>
                  <th className="pb-2">Discipline</th>
                  <th className="pb-2">Planned Dates</th>
                  <th className="pb-2">Actual Dates</th>
                  <th className="pb-2">Progress %</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredActivities.map((act) => {
                  const id = act.activityId || act._id;
                  const isChecked = selectedRowIds.includes(id);
                  const progress = act.progressPercentage || 0;
                  const status = act.status || (progress >= 100 ? 'COMPLETED' : act.actualStartDate ? 'IN_PROGRESS' : 'NOT_STARTED');

                  return (
                    <tr key={id} className={`hover:bg-slate-50/80 transition-colors ${isChecked ? 'bg-blue-50/40' : ''}`}>
                      <td className="py-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleRow(id)}
                          className="rounded border-slate-300 text-[#0056D2] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-2.5 font-mono font-bold text-slate-800">{act.activityId}</td>
                      <td className="py-2.5 font-bold text-slate-800">{act.activityName}</td>
                      <td className="py-2.5 text-slate-500 font-mono text-[11px]">{act.wbsCode || '-'}</td>
                      <td className="py-2.5 text-slate-700">{act.discipline || '-'}</td>
                      <td className="py-2.5 text-slate-600 text-[11px]">
                        {act.plannedStartDate ? new Date(act.plannedStartDate).toLocaleDateString() : '-'} →{' '}
                        {act.plannedFinishDate ? new Date(act.plannedFinishDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="py-2.5 text-slate-600 text-[11px]">
                        {act.actualStartDate ? new Date(act.actualStartDate).toLocaleDateString() : 'Not started'}{' '}
                        {act.actualFinishDate ? `→ ${new Date(act.actualFinishDate).toLocaleDateString()}` : ''}
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-[#0056D2] h-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
                          </div>
                          <span className="font-bold text-[11px]">{progress}%</span>
                        </div>
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            status === 'COMPLETED'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : status === 'IN_PROGRESS'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : status === 'DELAYED'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {status}
                        </span>
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

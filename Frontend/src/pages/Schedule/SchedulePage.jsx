/**
 * PragatiPath — Schedule Management Page (Full Backend API Integrated)
 * Clienter-inspired warm neutral control center, WBS hierarchy badges, and orange accents.
 * All mock data removed. Connected directly to Express API & MongoDB.
 */
import { useState, useEffect, useRef } from 'react';
import {
  MdCalendarToday, MdCloudUpload, MdFolderOpen, MdCheckCircle,
  MdRefresh, MdViewList, MdViewTimeline, MdDeleteOutline, MdInfoOutline
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

  // Helper to compute WBS hierarchy level
  const getWbsLevel = (wbs) => {
    if (!wbs) return 'L1';
    const depth = (wbs.match(/\./g) || []).length + 1;
    return `L${Math.min(depth, 6)}`;
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

      {/* 1. PAGE HEADER */}
      <PageHeader
        title="Schedule Baseline Workspace"
        subtitle="Real Schedule Activities & WBS Hierarchy • Planning-to-Execution Bridge"
        icon={<MdCalendarToday />}
        actions={
          <div className="flex items-center gap-2.5">
            {activities.length > 0 && (
              <button
                type="button"
                onClick={handleClearSchedule}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 font-bold text-xs border border-rose-500/30 transition-all cursor-pointer shadow-2xs"
              >
                <MdDeleteOutline size={16} />
                <span>Clear</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF5500] hover:bg-[#EA580C] text-white font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <MdCloudUpload size={18} />
              <span>{uploading ? 'Processing File...' : 'Upload Schedule'}</span>
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

      {/* 2. TOP SECTION: Upload Dropzone (Left) + 5 KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* TOP LEFT: Upload Schedule File */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-2xs flex flex-col justify-between space-y-4">
          <div className="text-center space-y-3 pt-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center shadow-2xs">
              <MdCloudUpload size={30} />
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0B1320]">Import Baseline Schedule</h2>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Primavera P6 or Excel schedules (.xlsx, .csv, .json)
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
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B1320] hover:bg-[#FF5500] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <MdFolderOpen size={16} />
                <span>{uploading ? 'Parsing Schedule...' : 'Select File'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 border-t border-stone-100 text-[11px] font-semibold">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FAF8F5] text-stone-700 border border-[#E8E1D5]">
              Excel (.xlsx, .xls)
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FAF8F5] text-stone-700 border border-[#E8E1D5]">
              CSV (.csv)
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FAF8F5] text-stone-700 border border-[#E8E1D5]">
              JSON Schedule
            </span>
          </div>
        </div>

        {/* TOP RIGHT: Dynamic 5 Activity KPIs */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs">
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Total Activities</div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1320] mt-1.5">{totalCount}</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs">
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Avg Progress</div>
              <div className="text-2xl sm:text-3xl font-black text-[#FF5500] mt-1.5">{avgProgress}%</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs">
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Completed</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1.5">{completedCount}</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center transition-all hover:shadow-xs">
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">In Progress</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1.5">{inProgressCount}</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-2xs text-center col-span-2 sm:col-span-1 transition-all hover:shadow-xs">
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Not Started</div>
              <div className="text-2xl sm:text-3xl font-black text-stone-500 mt-1.5">{notStartedCount}</div>
            </div>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E8E1D5] p-5 rounded-3xl text-xs text-stone-700 flex items-start gap-3 shadow-2xs">
            <MdInfoOutline size={20} className="text-[#FF5500] shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              <strong>Human-in-the-Loop Governance:</strong> Only approved planner review decisions update activity actual dates & progress percentages. Uploading a new schedule file parses activity IDs, planned dates, and WBS levels directly into MongoDB.
            </span>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SECTION: Schedule Activities Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-2xs space-y-5">
        {/* Header with Title and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0B1320]/5 text-[#0B1320] flex items-center justify-center">
              <MdCalendarToday size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0B1320]">Schedule Activities</h2>
              <span className="text-xs text-stone-500">{filteredActivities.length} Activities Found</span>
            </div>
          </div>

          {/* View Switcher Pill */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveView('split')}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all ${
                activeView === 'split' ? 'bg-[#0B1320] text-white shadow-2xs font-bold' : 'text-stone-600 hover:text-[#0B1320]'
              }`}
            >
              <MdViewList size={15} />
              <span>List View</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('gantt')}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all ${
                activeView === 'gantt' ? 'bg-[#0B1320] text-white shadow-2xs font-bold' : 'text-stone-600 hover:text-[#0B1320]'
              }`}
            >
              <MdViewTimeline size={15} />
              <span>Gantt View</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-bold">Discipline:</span>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="rounded-full border border-[#E8E1D5] px-3 py-1.5 text-xs font-bold text-[#0B1320] bg-[#FAF8F5] focus:outline-none focus:border-[#FF5500]"
            >
              <option value="All">All Disciplines</option>
              {disciplines.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-bold">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-full border border-[#E8E1D5] px-3 py-1.5 text-xs font-bold text-[#0B1320] bg-[#FAF8F5] focus:outline-none focus:border-[#FF5500]"
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
            className="ml-auto inline-flex items-center gap-1 text-stone-500 hover:text-[#FF5500] font-bold text-xs transition-colors"
          >
            <MdRefresh size={16} />
            <span>Reset Filters</span>
          </button>
        </div>

        {/* Table / Empty / Loading */}
        {loading ? (
          <div className="py-16 text-center text-stone-400 text-xs font-medium">
            <span className="inline-block w-8 h-8 border-3 border-stone-200 border-t-[#FF5500] rounded-full animate-spin mb-3" />
            <p>Loading schedule activities from MongoDB...</p>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="py-16 text-center bg-[#FAF8F5] rounded-3xl border border-[#E8E1D5] p-8 space-y-3">
            <MdCalendarToday size={36} className="mx-auto text-stone-300" />
            <h3 className="text-sm font-bold text-[#0B1320]">No Schedule Activities Found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Upload a baseline schedule CSV or Excel file to populate the project activities.
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-2.5 bg-[#0B1320] hover:bg-[#FF5500] text-white text-xs font-bold rounded-full transition-colors"
            >
              Upload Schedule File
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8E1D5] text-stone-400 font-bold uppercase text-[10px] tracking-wider bg-[#FAF8F5]">
                  <th className="py-3 px-3 w-8">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedRowIds.length === activities.length && activities.length > 0}
                      className="rounded border-stone-300 accent-[#FF5500] cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-3">Activity ID</th>
                  <th className="py-3 px-3">Activity Name</th>
                  <th className="py-3 px-3">WBS Level</th>
                  <th className="py-3 px-3">Discipline</th>
                  <th className="py-3 px-3">Planned Dates</th>
                  <th className="py-3 px-3">Actual Dates</th>
                  <th className="py-3 px-3">Progress %</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredActivities.map((act) => {
                  const id = act.activityId || act._id;
                  const isChecked = selectedRowIds.includes(id);
                  const progress = act.progressPercentage || 0;
                  const status = act.status || (progress >= 100 ? 'COMPLETED' : act.actualStartDate ? 'IN_PROGRESS' : 'NOT_STARTED');
                  const wbsLevel = getWbsLevel(act.wbsCode);

                  return (
                    <tr
                      key={id}
                      className={`hover:bg-[#FAF8F5] transition-colors ${isChecked ? 'bg-[#FF5500]/5' : ''}`}
                    >
                      <td className="py-3 px-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleRow(id)}
                          className="rounded border-stone-300 accent-[#FF5500] cursor-pointer"
                        />
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-[#0B1320]">{act.activityId}</td>
                      <td className="py-3 px-3 font-semibold text-[#0B1320]">{act.activityName}</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF8F5] text-stone-700 border border-[#E8E1D5] font-mono">
                          {wbsLevel} · {act.wbsCode || 'Root'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-stone-700">{act.discipline || '-'}</td>
                      <td className="py-3 px-3 text-stone-600 text-[11px]">
                        {act.plannedStartDate ? new Date(act.plannedStartDate).toLocaleDateString() : '-'} →{' '}
                        {act.plannedFinishDate ? new Date(act.plannedFinishDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="py-3 px-3 text-stone-600 text-[11px]">
                        {act.actualStartDate ? new Date(act.actualStartDate).toLocaleDateString() : 'Not started'}{' '}
                        {act.actualFinishDate ? `→ ${new Date(act.actualFinishDate).toLocaleDateString()}` : ''}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-[#FAF8F5] border border-[#E8E1D5] rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-[#FF5500] h-full transition-all rounded-full"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                          <span className="font-bold text-[11px] text-[#0B1320]">{progress}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                            status === 'COMPLETED'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : status === 'IN_PROGRESS'
                              ? 'bg-[#FF5500]/10 text-[#FF5500] border-[#FF5500]/20'
                              : status === 'DELAYED'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-stone-50 text-stone-600 border-stone-200'
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

/**
 * PragatiPath — Schedule Management Page
 * Faithfully matches Phase 3 Reference Image 1:
 * - Schedule Management Header with breadcrumbs
 * - Top Left: Upload Baseline Schedule card (drag-and-drop, Choose File button, format badges)
 * - Top Right: 5 Activity KPI Cards & Uploaded Schedules Table (Baseline, Update, Primavera)
 * - Bottom Left: Filterable Schedule Activities Table (Discipline, Location, Status, Reset, Selectable rows)
 * - Bottom Left: Supported Formats & Tips callout card
 * - Bottom Right: Schedule Gantt timeline with 'Today' vertical marker and status-colored bars
 * - Bottom Right: Recent Activity attachments gallery
 */
import { useState, useRef } from 'react';
import {
  MdCalendarToday, MdCloudUpload, MdFolderOpen, MdCheckCircle, MdAccessTime,
  MdWarning, MdVisibility, MdMoreVert, MdRefresh,
  MdViewList, MdViewTimeline, MdInfoOutline, MdAdd,
  MdChevronLeft, MdChevronRight, MdTableChart, MdPictureAsPdf
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import {
  scheduleKPIs,
  uploadedSchedulesList,
  scheduleActivitiesList,
  scheduleGanttDays,
  scheduleGanttRows,
  recentScheduleAttachments,
} from '../../data/scheduleData';

export default function SchedulePage() {
  // View toggle: 'list' | 'gantt' | 'split'
  const [activeView, setActiveView] = useState('split'); // 'split' renders both side-by-side as in reference

  // Filter states
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Checkbox selection state (A002 checked by default as in reference)
  const [selectedRowIds, setSelectedRowIds] = useState(['A002']);

  // Uploaded schedules state
  const [schedules, setSchedules] = useState(uploadedSchedulesList);
  const [recentAtts, setRecentAtts] = useState(recentScheduleAttachments);

  // Month navigation state
  const [currentMonth] = useState('September 2026');

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  const fileInputRef = useRef(null);
  const addMoreRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRowIds(scheduleActivitiesList.map((a) => a.id));
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
    setSelectedLocation('All');
    setSelectedStatus('All');
    showToast('Filters reset to default');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const newSchedule = {
        id: `sch-${Date.now()}`,
        projectName: 'PS 26122 - New Upload',
        fileName: file.name,
        fileType: file.name.endsWith('.xer') ? 'primavera' : file.name.endsWith('.csv') ? 'csv' : 'excel',
        uploadedOn: 'Today',
        uploaderName: 'Rahul Sharma',
        uploaderRole: 'Project Manager',
        uploaderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      };
      setSchedules([newSchedule, ...schedules]);
      const newAtt = {
        id: `att-${Date.now()}`,
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        type: file.name.endsWith('.pdf') ? 'pdf' : file.name.endsWith('.xlsx') ? 'excel' : 'image',
      };
      setRecentAtts((prev) => [newAtt, ...prev]);
      showToast(`Uploaded ${file.name} successfully!`);
    }
  };

  // Filter activities
  const filteredActivities = scheduleActivitiesList.filter((act) => {
    if (selectedDiscipline !== 'All' && act.discipline !== selectedDiscipline) return false;
    if (selectedLocation !== 'All' && act.location !== selectedLocation) return false;
    if (selectedStatus !== 'All' && act.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-lg shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. STANDARDIZED PAGE HEADER */}
      <PageHeader
        title="Schedule Management"
        subtitle="PS 26122 • Baseline Schedule"
        icon={<MdCalendarToday />}
        actions={
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#3158C9] font-bold text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <MdCloudUpload size={18} />
            <span>Upload Baseline</span>
          </button>
        }
      />

      {/* 2. TOP SECTION: Upload Card (Left) + 5 KPIs & Uploaded Table (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* TOP LEFT: Upload Baseline Schedule */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-5">
          <div className="text-center space-y-3 pt-2">
            {/* Cloud Icon */}
            <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 text-[#0056D2] flex items-center justify-center">
              <MdCloudUpload size={32} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">Upload Baseline Schedule</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Support for Excel, CSV and Primavera (XER) formats
              </p>
            </div>

            {/* Choose File CTA Button */}
            <div className="pt-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv,.xer"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
              >
                <MdFolderOpen size={18} />
                <span>Choose File</span>
              </button>
            </div>
          </div>

          {/* Supported Format Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-100 text-[11px] font-semibold">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="font-bold text-[10px] bg-emerald-600 text-white rounded px-1">X</span>
              Excel (.xlsx, .xls)
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <span className="font-bold text-[10px] bg-blue-600 text-white rounded px-1">CSV</span>
              CSV (.csv)
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
              <span className="font-bold text-[10px] bg-rose-600 text-white rounded px-1">P</span>
              Primavera (.xer)
            </span>
          </div>
        </div>

        {/* TOP RIGHT: 5 Activity KPIs + Uploaded Schedules Table */}
        <div className="lg:col-span-8 space-y-4">
          {/* 5 Activity KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {scheduleKPIs.map((kpi) => {
              return (
                <div
                  key={kpi.id}
                  className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-2 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-1.5 rounded-lg text-xs ${kpi.iconBg}`}>
                      {kpi.id === 'total' && <MdCalendarToday size={14} />}
                      {kpi.id === 'completed' && <MdCheckCircle size={14} />}
                      {kpi.id === 'in-progress' && <MdAccessTime size={14} />}
                      {kpi.id === 'delayed' && <MdWarning size={14} />}
                      {kpi.id === 'upcoming' && <MdCalendarToday size={14} />}
                    </div>
                    <span className={`text-xs font-bold ${kpi.percentColor}`}>
                      {kpi.percentage}
                    </span>
                  </div>

                  <div>
                    <div className="text-xl font-extrabold text-slate-900 leading-none">
                      {kpi.count}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-500 mt-1 truncate">
                      {kpi.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Uploaded Schedules Table Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Uploaded Schedules</h2>
              <button
                type="button"
                onClick={() => showToast('Showing all uploaded schedule revisions')}
                className="text-xs font-semibold text-[#0056D2] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="pb-2">Project Name</th>
                    <th className="pb-2">File Name</th>
                    <th className="pb-2">Uploaded On</th>
                    <th className="pb-2">By</th>
                    <th className="pb-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {schedules.map((sch) => (
                    <tr key={sch.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 font-bold text-slate-800">{sch.projectName}</td>
                      <td className="py-2.5">
                        <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                          {sch.fileType === 'excel' && (
                            <span className="w-4 h-4 rounded bg-emerald-600 text-white font-bold text-[9px] flex items-center justify-center">
                              X
                            </span>
                          )}
                          {sch.fileType === 'csv' && (
                            <span className="w-4 h-4 rounded bg-blue-600 text-white font-bold text-[8px] flex items-center justify-center">
                              CSV
                            </span>
                          )}
                          {sch.fileType === 'primavera' && (
                            <span className="w-4 h-4 rounded bg-rose-600 text-white font-bold text-[9px] flex items-center justify-center">
                              P
                            </span>
                          )}
                          {sch.fileName}
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-500 font-medium">{sch.uploadedOn}</td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <img
                            src={sch.uploaderAvatar}
                            alt={sch.uploaderName}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-bold text-slate-800 text-[11px] leading-tight">
                              {sch.uploaderName}
                            </div>
                            <div className="text-[10px] text-slate-400">{sch.uploaderRole}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => showToast(`Previewing ${sch.fileName}`)}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-600 font-medium text-[11px]"
                          >
                            <MdVisibility size={13} className="text-[#0056D2]" />
                            <span>View</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => showToast(`Options for ${sch.fileName}`)}
                            className="p-1 rounded text-slate-400 hover:text-slate-600"
                          >
                            <MdMoreVert size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SECTION: Schedule Activities (Left) + Gantt & Attachments (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* BOTTOM LEFT (~58%): Schedule Activities & Filters */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            {/* Header with Title, Badge, and List/Gantt Toggles */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
                  <MdCalendarToday size={18} />
                </div>
                <h2 className="text-base font-bold text-slate-900">Schedule Activities</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0056D2] text-xs font-semibold border border-blue-100">
                  124 Activities
                </span>
              </div>

              {/* View Toggle Buttons matching reference */}
              <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setActiveView('split');
                    showToast('Switched to List View');
                  }}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                    activeView === 'split' || activeView === 'list'
                      ? 'bg-[#0056D2] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <MdViewList size={15} />
                  <span>List View</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveView('gantt');
                    showToast('Focused on Gantt View');
                  }}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                    activeView === 'gantt'
                      ? 'bg-[#0056D2] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <MdViewTimeline size={15} />
                  <span>Gantt View</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
              {/* Discipline Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Discipline</span>
                <select
                  value={selectedDiscipline}
                  onChange={(e) => setSelectedDiscipline(e.target.value)}
                  className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-[#0056D2]"
                >
                  <option value="All">All</option>
                  <option value="Civil">Civil</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Electrical">Electrical</option>
                  <option value="MEP">MEP</option>
                  <option value="Fire">Fire</option>
                </select>
              </div>

              {/* Location Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Location</span>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-[#0056D2]"
                >
                  <option value="All">All</option>
                  <option value="Main Area">Main Area</option>
                  <option value="Unit 2">Unit 2</option>
                  <option value="Block A">Block A</option>
                  <option value="Block B">Block B</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Status</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-[#0056D2]"
                >
                  <option value="All">All</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                type="button"
                onClick={handleResetFilters}
                className="ml-auto inline-flex items-center gap-1 text-slate-500 hover:text-[#0056D2] font-semibold text-xs transition-colors"
              >
                <MdRefresh size={16} />
                <span>Reset</span>
              </button>
            </div>

            {/* Activities Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="pb-2 w-6">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedRowIds.length === scheduleActivitiesList.length}
                        className="rounded border-slate-300 text-[#0056D2] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="pb-2">Activity ID</th>
                    <th className="pb-2">Description</th>
                    <th className="pb-2">WBS/L5/L6</th>
                    <th className="pb-2">Discipline</th>
                    <th className="pb-2">Location</th>
                    <th className="pb-2">Planned Start</th>
                    <th className="pb-2">Planned Finish</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 w-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredActivities.map((act) => {
                    const isChecked = selectedRowIds.includes(act.id);
                    return (
                      <tr
                        key={act.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isChecked ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        <td className="py-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleRow(act.id)}
                            className="rounded border-slate-300 text-[#0056D2] focus:ring-0 cursor-pointer"
                          />
                        </td>
                        <td className="py-2.5 font-mono font-bold text-slate-800">{act.id}</td>
                        <td className="py-2.5 font-bold text-slate-800">{act.description}</td>
                        <td className="py-2.5 text-slate-500 font-mono text-[11px]">{act.wbs}</td>
                        <td className="py-2.5 text-slate-700">{act.discipline}</td>
                        <td className="py-2.5 text-slate-600">{act.location}</td>
                        <td className="py-2.5 text-slate-600">{act.plannedStart}</td>
                        <td className="py-2.5 text-slate-600">{act.plannedFinish}</td>
                        <td className="py-2.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              act.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : act.status === 'In Progress'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : act.status === 'Delayed'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {act.status}
                          </span>
                        </td>
                        <td className="py-2.5 text-right">
                          <button
                            type="button"
                            onClick={() => showToast(`Options for ${act.id}`)}
                            className="text-slate-400 hover:text-slate-600 p-1"
                          >
                            <MdMoreVert size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Supported Formats & Tips Card */}
          <div className="bg-gradient-to-r from-blue-50/70 to-slate-50 rounded-2xl p-5 border border-blue-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-md">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0056D2]">
                <MdInfoOutline size={16} />
                <span>Supported Formats & Tips</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-600">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0056D2] mt-0.5 font-bold">•</span>
                  <span>You can write in English, Hindi or Hinglish.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0056D2] mt-0.5 font-bold">•</span>
                  <span>For photos, please upload clear images with site context.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0056D2] mt-0.5 font-bold">•</span>
                  <span>Make sure to include key details like activity, location, unit and status.</span>
                </li>
              </ul>
            </div>

            {/* Decorative branding handwritten style & sketch */}
            <div className="flex items-center gap-3 shrink-0 text-right md:border-l md:border-blue-200/60 md:pl-5">
              <div className="text-right">
                <p className="text-xs font-serif italic text-blue-900 font-medium leading-tight">
                  Better data.<br />
                  Smarter tracking.<br />
                  On time progress.
                </p>
              </div>
              {/* Construction hardhat SVG sketch */}
              <div className="w-12 h-12 text-[#0056D2]/60 shrink-0">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 34h36c2 0 3-1 3-3 0-11-8-20-21-20S3 20 3 31c0 2 1 3 3 3z" />
                  <path d="M16 11v-3h16v3" />
                  <path d="M24 8v26" />
                  <path d="M12 34v4h24v-4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM RIGHT (~42%): Schedule Gantt & Recent Activity */}
        <div className="lg:col-span-5 space-y-5">
          {/* Card 1: Schedule Gantt Timeline */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
                  <MdCalendarToday size={18} />
                </div>
                <h2 className="text-sm font-bold text-slate-900">Schedule Gantt</h2>
              </div>

              {/* Month Navigator */}
              <div className="inline-flex items-center gap-1 text-xs font-bold text-slate-700">
                <button
                  type="button"
                  onClick={() => showToast('Previous month')}
                  className="p-1 rounded hover:bg-slate-100 text-slate-500"
                >
                  <MdChevronLeft size={16} />
                </button>
                <span>{currentMonth}</span>
                <button
                  type="button"
                  onClick={() => showToast('Next month')}
                  className="p-1 rounded hover:bg-slate-100 text-slate-500"
                >
                  <MdChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Gantt Timeline Viewport */}
            <div className="relative border border-slate-100 rounded-xl p-3 bg-slate-50/50">
              {/* Date Header Columns */}
              <div className="grid grid-cols-7 text-center pb-3 border-b border-slate-200 text-[11px] font-semibold text-slate-500">
                {scheduleGanttDays.map((d) => (
                  <div key={d.day} className={`relative ${d.isToday ? 'text-[#0056D2] font-bold' : ''}`}>
                    {d.day}
                  </div>
                ))}
              </div>

              {/* Vertical Dashed Line for 'Today' (at 10 Sep — second column ~ 21.4%) */}
              <div
                className="absolute top-10 bottom-6 w-px border-l-2 border-dashed border-[#0056D2]/60 pointer-events-none z-10"
                style={{ left: '21.4%' }}
              />

              {/* Activity Rows */}
              <div className="space-y-4 py-3 min-h-[220px]">
                {scheduleGanttRows.map((row) => (
                  <div key={row.activityId} className="space-y-1">
                    {/* Activity Label */}
                    <div className="text-[11px] font-bold text-slate-700">
                      {row.activityId} <span className="font-normal text-slate-500">{row.activityName}</span>
                    </div>

                    {/* Timeline bar container */}
                    <div className="relative h-6 bg-slate-100/70 rounded-md overflow-hidden">
                      <div
                        className={`absolute top-1 bottom-1 ${row.barColor} rounded-md flex items-center px-2 text-[10px] font-bold text-white shadow-sm`}
                        style={{
                          left: `${row.startColPercent}%`,
                          width: `${row.widthPercent}%`,
                        }}
                      >
                        <span className="truncate">{row.barText}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 'Today' bottom pill marker */}
              <div className="relative pt-2 flex items-center" style={{ paddingLeft: '17%' }}>
                <span className="px-2.5 py-0.5 rounded-full bg-[#0056D2] text-white text-[10px] font-bold shadow-sm">
                  Today
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Recent Activity Attachments */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
                <MdCalendarToday className="text-slate-500" size={16} />
                <span>Recent Activity</span>
              </div>
              <button
                type="button"
                onClick={() => showToast('Opening all recent project activities')}
                className="text-xs font-semibold text-[#0056D2] hover:underline"
              >
                View All →
              </button>
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-4 gap-2.5 pt-1">
              {recentAtts.slice(0, 3).map((att) => (
                <div
                  key={att.id}
                  onClick={() => showToast(`Opening ${att.name}`)}
                  className="p-2 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer text-center space-y-1"
                >
                  {att.thumbnail ? (
                    <div className="w-full h-11 rounded-lg overflow-hidden bg-slate-100">
                      <img src={att.thumbnail} alt={att.name} className="w-full h-full object-cover" />
                    </div>
                  ) : att.type === 'excel' ? (
                    <div className="w-full h-11 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      <MdTableChart size={22} />
                    </div>
                  ) : (
                    <div className="w-full h-11 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs">
                      <MdPictureAsPdf size={22} />
                    </div>
                  )}
                  <div className="text-[11px] font-semibold text-slate-700 truncate">{att.name}</div>
                  <div className="text-[10px] text-slate-400">{att.size}</div>
                </div>
              ))}

              {/* Add More card */}
              <div
                onClick={() => addMoreRef.current?.click()}
                className="p-2 rounded-xl border-2 border-dashed border-slate-200 hover:border-[#0056D2] hover:bg-blue-50/20 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-1"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0056D2] flex items-center justify-center">
                  <MdAdd size={18} />
                </div>
                <div className="text-[11px] font-bold text-[#0056D2]">Add More</div>
                <input ref={addMoreRef} type="file" className="hidden" onChange={handleFileUpload} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

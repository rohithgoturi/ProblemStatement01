/**
 * DashboardPage — Main Dashboard / Multi-Project Portfolio Overview
 * Faithfully reproduces Reference Screen 2 with full interactivity:
 * - Construction Hero Banner with '+ New Project' modal
 * - 5 Summary KPI Cards with directional actions
 * - 8-Col: All Projects Table (search, status/location filters, actions, pagination)
 * - 8-Col: Project Timeline (Next 3 Months) Gantt chart
 * - 4-Col: Project Progress Overview (SVG Donut Chart)
 * - 4-Col: Progress by Discipline meters
 * - 4-Col: Recent Project Updates live feed
 * - 4-Col: Strategic Key Insights
 */
import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdAdd, MdSearch, MdLocationOn, MdMoreVert,
  MdCheckCircle, MdWarning, MdAccessTime,
  MdArrowForward, MdEngineering, MdDomain,
  MdBolt, MdSensors, MdGrain, MdCalendarToday,
  MdArticle, MdTrendingUp, MdSpeed, MdAutoAwesome,
  MdFolderOpen, MdClose,
} from 'react-icons/md';

import {
  portfolioSummaryKPIs,
  allProjectsList,
  projectTimelineData,
  progressByDisciplineData,
  recentProjectUpdates,
  keyInsightsData,
} from '../../data/projectsData';
import { useRole, ROLES } from '../../context/RoleContext';
import { SupervisorDashboardView } from './SupervisorDashboardView';
import { PlannerDashboardView } from './PlannerDashboardView';
import { AdminDashboardView } from './AdminDashboardView';

export function ManagerDashboardView() {
  const navigate = useNavigate();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // New Project Modal State
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    name: '',
    unit: '',
    location: 'Site A',
    startDate: '',
    endDate: '',
  });
  const [projectsList, setProjectsList] = useState(allProjectsList);
  const [notificationToast, setNotificationToast] = useState(null);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projectsList.filter(proj => {
      const matchesSearch =
        proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        selectedStatus === 'All Status' || proj.status === selectedStatus;
      const matchesLocation =
        selectedLocation === 'All Locations' || proj.location === selectedLocation;
      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [projectsList, searchQuery, selectedStatus, selectedLocation]);

  // Paginated projects
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));

  // Add project handler
  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjectForm.name.trim()) return;

    const newProj = {
      id: `PS-${26120 + projectsList.length + 1}`,
      name: newProjectForm.name,
      unit: newProjectForm.unit || 'Unit 1 · Civil',
      location: newProjectForm.location,
      progress: 5,
      status: 'On Track',
      startDate: newProjectForm.startDate || '01 Oct 2026',
      endDate: newProjectForm.endDate || '15 Dec 2026',
      thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=150&auto=format&fit=crop&q=60',
      type: 'civil',
    };

    setProjectsList([newProj, ...projectsList]);
    setShowNewProjectModal(false);
    setNewProjectForm({ name: '', unit: '', location: 'Site A', startDate: '', endDate: '' });
    
    setNotificationToast(`Project ${newProj.id} initialized successfully!`);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  return (
    <div className="space-y-6 pb-12">

      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-blue-500/30 animate-fade-in">
          <MdCheckCircle className="text-emerald-400 text-lg flex-shrink-0" />
          <span className="text-xs font-semibold">{notificationToast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HERO BANNER WITH BLUEPRINT CONSTRUCTION BACKGROUND                      */}
      {/* ========================================================================= */}
      <section className="relative rounded-2xl overflow-hidden shadow-sm border border-blue-200/50 bg-gradient-to-r from-[#0056D2] via-[#0047B3] to-[#0A2E6E] text-white">
        
        {/* Background construction scene overlay with cranes */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url('/stitch-hero-bg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
          }}
        />

        {/* Blueprint grid effect */}
        <div
          className="absolute inset-0 z-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10 px-6 sm:px-8 py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-200 bg-blue-900/40 px-2.5 py-0.5 rounded-md border border-blue-400/20 inline-block mb-1">
              CONSTRUCTION PROJECT MANAGEMENT
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Pragatipath
            </h1>
            <p className="text-sm sm:text-base text-blue-100/90 font-normal leading-relaxed">
              Track progress, monitor performance and keep your projects on schedule.
            </p>

            {/* Context chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-blue-100">
              <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/15">
                <MdLocationOn className="text-sky-300" size={14} />
                <span>Pump P-101</span>
              </span>
              <span className="text-blue-300/60">|</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/15">
                Unit 2
              </span>
              <span className="text-blue-300/60">|</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/15">
                10 Sept 2026
              </span>
            </div>
          </div>

          {/* New Project CTA Button */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setShowNewProjectModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-blue-50 text-[#0056D2] font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 group"
            >
              <MdAdd className="text-lg transition-transform group-hover:rotate-90" />
              <span>+ New Project</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 5 SUMMARY KPI CARDS                                                    */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {portfolioSummaryKPIs.map(kpi => {
          const isSelected = kpi.id === 'total-projects';
          return (
            <div
              key={kpi.id}
              className={`rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-[#0056D2] to-[#0040A1] text-white border-transparent shadow-md'
                  : 'bg-white text-slate-900 border-slate-200/80 shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : kpi.color === 'emerald'
                      ? 'bg-emerald-50 text-emerald-600'
                      : kpi.color === 'amber'
                      ? 'bg-amber-50 text-amber-600'
                      : kpi.color === 'rose'
                      ? 'bg-rose-50 text-rose-600'
                      : 'bg-purple-50 text-purple-600'
                  }`}
                >
                  {kpi.icon === 'MdFolderOpen' && <MdFolderOpen />}
                  {kpi.icon === 'MdCheckCircle' && <MdCheckCircle />}
                  {kpi.icon === 'MdWarning' && <MdWarning />}
                  {kpi.icon === 'MdAccessTime' && <MdAccessTime />}
                  {kpi.icon === 'MdLocationOn' && <MdLocationOn />}
                </div>

                <button
                  type="button"
                  title={`View ${kpi.title}`}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-white/20 hover:bg-white/30 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
                  }`}
                >
                  <MdArrowForward size={14} />
                </button>
              </div>

              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${
                  isSelected ? 'text-blue-100' : 'text-slate-500'
                }`}>
                  {kpi.title}
                </p>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {kpi.value}
                </div>
                <p className={`text-[11px] mt-1.5 flex items-center gap-1 font-medium ${
                  isSelected
                    ? 'text-blue-100/90'
                    : kpi.changeType === 'positive'
                    ? 'text-emerald-600'
                    : kpi.changeType === 'warning'
                    ? 'text-amber-600'
                    : kpi.changeType === 'negative'
                    ? 'text-rose-600'
                    : 'text-slate-500'
                }`}>
                  <span>{kpi.change.startsWith('+') ? '↑' : kpi.change.startsWith('-') ? '↓' : '•'}</span>
                  <span>{kpi.change}</span>
                  <span className={isSelected ? 'text-blue-200/70' : 'text-slate-400'}>{kpi.timeframe}</span>
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* ========================================================================= */}
      {/* 3. MAIN CONTENT: 8 COLS (LEFT) + 4 COLS (RIGHT)                            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ----------------------------------------------------------------------- */}
        {/* LEFT COLUMN (8 COLS): All Projects Table + Project Timeline (Gantt)     */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card: All Projects */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            
            {/* Top Toolbar */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0056D2] flex items-center justify-center">
                  <MdArticle size={18} />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  All Projects
                </h2>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                  {filteredProjects.length}
                </span>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search input */}
                <div className="relative min-w-[160px] sm:min-w-[180px]">
                  <MdSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    placeholder="Search projects..."
                    className="w-full h-8.5 pl-8 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0056D2] focus:bg-white"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                  className="h-8.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-[#0056D2]"
                >
                  <option value="All Status">All Status</option>
                  <option value="On Track">On Track</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Delayed">Delayed</option>
                </select>

                {/* Location Filter */}
                <select
                  value={selectedLocation}
                  onChange={(e) => { setSelectedLocation(e.target.value); setCurrentPage(1); }}
                  className="h-8.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-[#0056D2]"
                >
                  <option value="All Locations">All Locations</option>
                  <option value="Site A">Site A</option>
                  <option value="Site B">Site B</option>
                  <option value="Site H">Site H</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 sm:px-5">Project Name</th>
                    <th className="py-3 px-3">Location</th>
                    <th className="py-3 px-3 w-40">Progress</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Start Date</th>
                    <th className="py-3 px-3">End Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedProjects.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No projects match your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedProjects.map(project => {
                      const isTrack = project.status === 'On Track';
                      const isRisk = project.status === 'At Risk';
                      return (
                        <tr
                          key={project.id}
                          className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                          onClick={() => navigate(`/projects/${project.id}`)}
                        >
                          {/* Project Name + Thumbnail */}
                          <td className="py-3.5 px-4 sm:px-5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                                <img
                                  src={project.thumbnail}
                                  alt={project.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-slate-900 group-hover:text-[#0056D2] transition-colors truncate">
                                  {project.name}
                                </div>
                                <div className="text-[11px] text-slate-500 truncate">
                                  {project.unit}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Location */}
                          <td className="py-3.5 px-3 font-medium text-slate-600 whitespace-nowrap">
                            {project.location}
                          </td>

                          {/* Progress */}
                          <td className="py-3.5 px-3">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[11px] font-bold">
                                <span>{project.progress}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    isTrack ? 'bg-[#0056D2]' : isRisk ? 'bg-amber-500' : 'bg-rose-500'
                                  }`}
                                  style={{ width: `${project.progress}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                isTrack
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                                  : isRisk
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200/80'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200/80'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isTrack ? 'bg-emerald-500' : isRisk ? 'bg-amber-500' : 'bg-rose-500'
                                }`}
                              />
                              <span>{project.status}</span>
                            </span>
                          </td>

                          {/* Start Date */}
                          <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap text-[11px]">
                            {project.startDate}
                          </td>

                          {/* End Date */}
                          <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap text-[11px]">
                            {project.endDate}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => navigate(`/projects/${project.id}`)}
                              title="Open Project Details"
                              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                              <MdMoreVert size={18} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-3.5 px-4 sm:px-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                Showing {paginatedProjects.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}–
                {Math.min(currentPage * pageSize, filteredProjects.length)} of {filteredProjects.length} projects
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="px-2.5 py-1 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none text-xs"
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-md text-xs font-bold transition-colors ${
                      currentPage === page
                        ? 'bg-[#0056D2] text-white'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="px-2.5 py-1 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none text-xs"
                >
                  &gt;
                </button>
              </div>
            </div>

          </div>

          {/* Card: Project Timeline (Next 3 Months) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0056D2] flex items-center justify-center">
                  <MdCalendarToday size={16} />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Project Timeline (Next 3 Months)
                </h3>
              </div>
              <button
                type="button"
                className="text-xs text-[#0056D2] hover:underline font-semibold flex items-center gap-1"
              >
                <span>View Calendar</span>
                <span>&gt;</span>
              </button>
            </div>

            {/* Gantt Timeline View */}
            <div className="overflow-x-auto">
              <div className="min-w-[500px]">
                {/* Timeline Months Header */}
                <div className="grid grid-cols-5 text-[11px] font-bold text-slate-400 border-b border-slate-100 pb-2 mb-3">
                  <div className="text-slate-500">Project</div>
                  <div className="text-center">Sep 2026</div>
                  <div className="text-center">Oct 2026</div>
                  <div className="text-center">Nov 2026</div>
                  <div className="text-center">Dec 2026</div>
                </div>

                {/* Timeline Rows */}
                <div className="space-y-3 relative">
                  {/* Vertical Month Grid lines */}
                  <div className="absolute inset-0 left-[20%] grid grid-cols-4 pointer-events-none border-l border-slate-100">
                    <div className="border-r border-slate-100" />
                    <div className="border-r border-slate-100" />
                    <div className="border-r border-slate-100" />
                    <div className="border-r border-slate-100" />
                  </div>

                  {projectTimelineData.map(t => (
                    <div key={t.id} className="grid grid-cols-5 items-center relative py-1 text-xs">
                      <div className="font-bold text-slate-800 flex items-center gap-1.5 z-10">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                        <span>{t.name}</span>
                      </div>
                      <div className="col-span-4 relative h-6 flex items-center z-10">
                        <div
                          className="h-3 rounded-full transition-all hover:opacity-90 cursor-pointer shadow-2xs"
                          style={{
                            backgroundColor: t.color,
                            marginLeft: `${t.startMonth * 25}%`,
                            width: `${t.durationMonths * 25}%`,
                          }}
                          title={`${t.name} (${t.status})`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-5 mt-4 pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    <span>On Track</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span>At Risk</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span>Delayed</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* RIGHT COLUMN (4 COLS): Progress Overview, Disciplines, Updates, Insights*/}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card: Project Progress Overview (Donut Chart) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0056D2]" />
              <span>Project Progress Overview</span>
            </h3>

            <div className="flex items-center justify-between gap-4">
              {/* SVG Donut Chart */}
              <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  {/* Background Track */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="4"
                  />
                  {/* Segment 1: On Track (67% = stroke-dasharray: 67 100) */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="4.2"
                    strokeDasharray="67, 100"
                  />
                  {/* Segment 2: At Risk (25%) */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="4.2"
                    strokeDasharray="25, 100"
                    strokeDashoffset="-67"
                  />
                  {/* Segment 3: Delayed (8%) */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="4.2"
                    strokeDasharray="8, 100"
                    strokeDashoffset="-92"
                  />
                </svg>
                {/* Center Stats */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-extrabold text-slate-900 leading-none">12</span>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase mt-0.5">Total Projects</span>
                </div>
              </div>

              {/* Breakdown Legend */}
              <div className="space-y-2 flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span>On Track</span>
                  </div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>8</span>
                    <span className="text-slate-400 font-normal text-[11px]">67%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span>At Risk</span>
                  </div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>3</span>
                    <span className="text-slate-400 font-normal text-[11px]">25%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                    <span>Delayed</span>
                  </div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>1</span>
                    <span className="text-slate-400 font-normal text-[11px]">8%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Card: Progress by Discipline */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">
                Progress by Discipline
              </h3>
              <button type="button" className="text-xs text-[#0056D2] font-semibold hover:underline">
                View All &gt;
              </button>
            </div>

            <div className="space-y-3.5">
              {progressByDisciplineData.map(d => (
                <div key={d.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-medium text-slate-700">
                      <span className="text-slate-500">
                        {d.id === 'mech' && <MdEngineering size={15} />}
                        {d.id === 'civil' && <MdDomain size={15} />}
                        {d.id === 'elec' && <MdBolt size={15} />}
                        {d.id === 'inst' && <MdSensors size={15} />}
                        {d.id === 'pipe' && <MdGrain size={15} />}
                      </span>
                      <span>{d.name}</span>
                    </div>
                    <span className="font-bold text-slate-900">{d.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${d.percent}%`, backgroundColor: d.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Recent Project Updates */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Recent Project Updates
              </h3>
              <button type="button" className="text-xs text-[#0056D2] font-semibold hover:underline">
                View All &gt;
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recentProjectUpdates.map(u => (
                <div key={u.id} className="py-2.5 first:pt-0 last:pb-0 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${u.dotColor}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <Link
                          to="/projects/PS-26122"
                          className="font-bold text-slate-900 hover:text-[#0056D2] truncate transition-colors"
                        >
                          {u.project}
                        </Link>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{u.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                        {u.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Key Insights */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span className="text-amber-500">⚡</span>
                <span>Key Insights</span>
              </h3>
              <button type="button" className="text-xs text-[#0056D2] font-semibold hover:underline">
                View All &gt;
              </button>
            </div>

            <div className="space-y-3">
              {keyInsightsData.map(insight => (
                <div
                  key={insight.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs hover:bg-blue-50/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#0056D2] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {insight.id === 'i1' && <MdTrendingUp size={16} />}
                    {insight.id === 'i2' && <MdSpeed size={16} />}
                    {insight.id === 'i3' && <MdWarning className="text-amber-600" size={16} />}
                    {insight.id === 'i4' && <MdAutoAwesome size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 leading-snug">
                      {insight.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {insight.subtitle}
                    </p>
                  </div>
                  <div className="text-emerald-600 font-bold text-xs pt-0.5">
                    {insight.trend === 'up' ? '↑' : '→'}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. NEW PROJECT MODAL                                                      */}
      {/* ========================================================================= */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MdAdd className="text-[#0056D2]" size={20} />
                <span>Initialize New EPC Project</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowNewProjectModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <MdClose size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PS 26129 — Turbine T-400"
                  value={newProjectForm.name}
                  onChange={e => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
                  className="w-full h-9 px-3 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#0056D2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit & Discipline</label>
                  <input
                    type="text"
                    placeholder="e.g. Unit 3 · Mechanical"
                    value={newProjectForm.unit}
                    onChange={e => setNewProjectForm({ ...newProjectForm, unit: e.target.value })}
                    className="w-full h-9 px-3 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#0056D2]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location / Site</label>
                  <select
                    value={newProjectForm.location}
                    onChange={e => setNewProjectForm({ ...newProjectForm, location: e.target.value })}
                    className="w-full h-9 px-2.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#0056D2]"
                  >
                    <option value="Site A">Site A</option>
                    <option value="Site B">Site B</option>
                    <option value="Site H">Site H</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Start Date</label>
                  <input
                    type="date"
                    value={newProjectForm.startDate}
                    onChange={e => setNewProjectForm({ ...newProjectForm, startDate: e.target.value })}
                    className="w-full h-9 px-2.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#0056D2]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Finish Date</label>
                  <input
                    type="date"
                    value={newProjectForm.endDate}
                    onChange={e => setNewProjectForm({ ...newProjectForm, endDate: e.target.value })}
                    className="w-full h-9 px-2.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#0056D2]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#0056D2] hover:bg-[#1A73E8] text-white font-bold shadow-sm"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function DashboardPage() {
  const { currentRole } = useRole();

  if (currentRole === ROLES.SITE_SUPERVISOR) {
    return <SupervisorDashboardView />;
  }
  if (currentRole === ROLES.PLANNER) {
    return <PlannerDashboardView />;
  }
  if (currentRole === ROLES.ADMIN) {
    return <AdminDashboardView />;
  }

  return <ManagerDashboardView />;
}

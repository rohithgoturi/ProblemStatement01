/**
 * PragatiPath — Projects Portfolio Directory (`/projects`)
 * Dedicated project workspace answering: "Which project am I working with?"
 * Distinct from Main Dashboard:
 * - Portfolio-wide project catalogue
 * - Grid / Table view toggle
 * - Search, Location & Status filtering
 * - Direct deep-link cards to project workspaces
 */
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdFolderOpen, MdSearch, MdLocationOn,
  MdViewModule, MdViewList, MdAdd, MdArrowForward,
  MdCheckCircle, MdWarning, MdAccessTime,
  MdClose
} from 'react-icons/md';
import { allProjectsList } from '../../data/projectsData';

export function ProjectsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [newProject, setNewProject] = useState({
    name: '',
    unit: '',
    location: 'Site A',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredProjects = useMemo(() => {
    return allProjectsList.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.unit.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchLoc = locationFilter === 'All' || p.location === locationFilter;
      return matchSearch && matchStatus && matchLoc;
    });
  }, [search, statusFilter, locationFilter]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-lg shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0056D2] uppercase tracking-wider">
            <MdFolderOpen size={16} />
            <span>Project Directory</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Projects Portfolio Workspace
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Explore and access all 12 active infrastructure projects across 5 regional sites.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Grid / Table view toggle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-white text-[#0056D2] shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <MdViewModule size={18} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-white text-[#0056D2] shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table View"
            >
              <MdViewList size={18} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <MdAdd size={16} />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Portfolio Summary Metric Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase">Total Portfolio</div>
            <div className="text-xl font-extrabold text-slate-900 leading-tight">12 Projects</div>
          </div>
          <span className="p-2 rounded-lg bg-blue-50 text-[#0056D2]">
            <MdFolderOpen size={18} />
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase">On Track</div>
            <div className="text-xl font-extrabold text-emerald-600 leading-tight">8 Projects</div>
          </div>
          <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <MdCheckCircle size={18} />
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase">At Risk</div>
            <div className="text-xl font-extrabold text-amber-600 leading-tight">3 Projects</div>
          </div>
          <span className="p-2 rounded-lg bg-amber-50 text-amber-600">
            <MdWarning size={18} />
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase">Delayed</div>
            <div className="text-xl font-extrabold text-rose-600 leading-tight">1 Project</div>
          </div>
          <span className="p-2 rounded-lg bg-rose-50 text-rose-600">
            <MdAccessTime size={18} />
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <MdSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by project name, unit, or code..."
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0056D2]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 font-bold text-slate-700 bg-white focus:outline-none focus:border-[#0056D2]"
            >
              <option value="All">All Status</option>
              <option value="On Track">On Track</option>
              <option value="At Risk">At Risk</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Location:</span>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 font-bold text-slate-700 bg-white focus:outline-none focus:border-[#0056D2]"
            >
              <option value="All">All Locations</option>
              <option value="Site A">Site A</option>
              <option value="Site B">Site B</option>
            </select>
          </div>

          {(search || statusFilter !== 'All' || locationFilter !== 'All') && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setStatusFilter('All');
                setLocationFilter('All');
              }}
              className="text-slate-400 hover:text-slate-700 ml-1"
              title="Reset Filters"
            >
              <MdClose size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Projects Display: Grid or Table */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/projects/${p.id}`)}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail Header */}
                <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                  <img
                    src={p.thumbnail}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[10px] font-mono font-bold">
                    {p.id}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                        p.status === 'On Track'
                          ? 'bg-emerald-500 text-white'
                          : p.status === 'Delayed'
                          ? 'bg-rose-500 text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0056D2] transition-colors line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <MdLocationOn size={13} className="text-slate-400" />
                      <span>{p.location} • {p.unit}</span>
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-500 text-[11px]">Execution Progress</span>
                      <span className="font-bold text-slate-900">{p.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          p.status === 'On Track'
                            ? 'bg-emerald-500'
                            : p.status === 'Delayed'
                            ? 'bg-rose-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                    <span>{p.startDate}</span>
                    <span>→</span>
                    <span>{p.endDate}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0056D2]">
                <span>Open Project Workspace</span>
                <MdArrowForward size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Unit & Location</th>
                <th className="py-3 px-4">Progress</th>
                <th className="py-3 px-4">Timeline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => navigate(`/projects/${p.id}`)}
                  className="hover:bg-blue-50/30 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                  <td className="py-3 px-4 text-slate-600">{p.location} · {p.unit}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 max-w-[120px]">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            p.status === 'On Track' ? 'bg-emerald-500' : p.status === 'Delayed' ? 'bg-rose-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-800">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{p.startDate} - {p.endDate}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'On Track'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : p.status === 'Delayed'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-[#0056D2] font-bold inline-flex items-center gap-1 hover:underline">
                      Workspace <MdArrowForward size={13} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add New Construction Project</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <MdClose size={20} />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="e.g. PS 26127 — Chiller CH-101"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Unit & Scope</label>
                <input
                  type="text"
                  value={newProject.unit}
                  onChange={(e) => setNewProject({ ...newProject, unit: e.target.value })}
                  placeholder="e.g. Unit 4 · HVAC Package"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  showToast('Project created successfully');
                }}
                className="px-4 py-2 rounded-xl bg-[#0056D2] text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;

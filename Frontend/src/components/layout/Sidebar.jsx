/**
 * Sidebar — Left navigation panel
 * Persistent on desktop, collapsible on mobile
 * Clienter-inspired dark navy surface, orange active indicator, and professional spacing.
 */
import { NavLink, Link } from 'react-router-dom';
import {
  MdDashboard, MdFolderOpen, MdInbox, MdCalendarToday,
  MdAutoAwesome, MdTrendingUp, MdBarChart, MdPeople,
  MdLocationOn, MdSettings, MdHelpOutline,
  MdChevronLeft, MdChevronRight,
  MdKeyboardArrowRight, MdLayers,
} from 'react-icons/md';
import { cn } from '../../utils/helpers';
import { Logo, PragatiPathIcon } from '../shared/Logo';
import { useRole } from '../../context/RoleContext';

const ICON_MAP = {
  MdDashboard:    <MdDashboard size={19} />,
  MdFolderOpen:   <MdFolderOpen size={19} />,
  MdInbox:        <MdInbox size={19} />,
  MdCalendarToday:<MdCalendarToday size={19} />,
  MdAutoAwesome:  <MdAutoAwesome size={19} />,
  MdTrendingUp:   <MdTrendingUp size={19} />,
  MdBarChart:     <MdBarChart size={19} />,
  MdPeople:       <MdPeople size={19} />,
  MdLocationOn:   <MdLocationOn size={19} />,
  MdSettings:     <MdSettings size={19} />,
  MdHelpOutline:  <MdHelpOutline size={19} />,
};

const NAV_GROUPS = [
  {
    id: 'main',
    label: 'MAIN WORKFLOW',
    items: [
      { id: 'dashboard',  label: 'Dashboard',   path: '/dashboard',   icon: 'MdDashboard' },
      { id: 'projects',   label: 'Projects',    path: '/projects',    icon: 'MdFolderOpen' },
      { id: 'dpr',        label: 'DPR Inbox',   path: '/dpr',         icon: 'MdInbox' },
      { id: 'schedule',   label: 'Schedule',    path: '/schedule',    icon: 'MdCalendarToday' },
      { id: 'ai-matching',label: 'AI Matching', path: '/ai-matching', icon: 'MdAutoAwesome', allowedRoles: ['planner', 'project_manager', 'admin'] },
      { id: 'progress',   label: 'Progress',    path: '/progress',    icon: 'MdTrendingUp' },
      { id: 'reports',    label: 'Reports',     path: '/reports',     icon: 'MdBarChart' },
    ],
  },
  {
    id: 'project',
    label: 'PROJECT GOVERNANCE',
    items: [
      { id: 'team',      label: 'Team Roster', path: '/team',      icon: 'MdPeople' },
      { id: 'locations', label: 'Locations',   path: '/locations', icon: 'MdLocationOn' },
      { id: 'settings',  label: 'Settings',    path: '/settings',  icon: 'MdSettings' },
      { id: 'help',      label: 'Help & Docs', path: '/help',      icon: 'MdHelpOutline' },
    ],
  },
];

export function Sidebar({ collapsed = false, onToggle }) {
  const { currentRole } = useRole();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 bottom-0 bg-[#0B1320] border-r border-white/10 flex flex-col z-30 transition-all duration-300 select-none',
        collapsed
          ? '-translate-x-full lg:translate-x-0 lg:w-18'
          : 'translate-x-0 w-64 shadow-2xl lg:shadow-md',
      )}
    >
      {/* Brand Logo Header */}
      <div className={cn(
        'flex items-center border-b border-white/10 flex-shrink-0 bg-[#080E18]',
        collapsed ? 'h-16 lg:justify-center px-3' : 'h-16 px-5 gap-3',
      )}>
        {collapsed ? (
          <Link to="/dashboard" title="PragatiPath Dashboard">
            <PragatiPathIcon size={30} />
          </Link>
        ) : (
          <Logo size="sm" to="/dashboard" variant="white" wordmarkVariant="white" />
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
        {NAV_GROUPS.map((group) => (
          <div key={group.id}>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                {group.label}
              </p>
            )}
            <ul className="space-y-1">
              {group.items
                .filter((item) => !item.allowedRoles || item.allowedRoles.includes(currentRole))
                .map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      title={collapsed ? item.label : undefined}
                      className={({ isActive }) => cn(
                        'flex items-center gap-3 rounded-xl transition-all duration-150 relative text-xs sm:text-sm font-medium',
                        collapsed ? 'justify-center h-11 w-11 mx-auto' : 'px-3.5 py-2.5',
                        isActive
                          ? 'bg-[#FF5500] text-white font-bold shadow-sm shadow-[#FF5500]/20'
                          : 'text-stone-300 hover:bg-white/5 hover:text-white',
                      )}
                    >
                      <span className="flex-shrink-0">{ICON_MAP[item.icon]}</span>
                      {!collapsed && (
                        <span className="flex-1 min-w-0 truncate">{item.label}</span>
                      )}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Selected Project Status Widget (Bottom) */}
      <div className="border-t border-white/10 p-3 flex-shrink-0 bg-[#080E18]">
        {!collapsed ? (
          <Link
            to="/projects/PS-26122"
            title="Open Active Project Dashboard"
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors border border-white/10 group"
          >
            <div className="w-8 h-8 rounded-lg flex-shrink-0 bg-[#FF5500]/15 border border-[#FF5500]/30 text-[#FF5500] flex items-center justify-center">
              <MdLayers size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                PS-26122
              </div>
              <p className="text-[10px] text-stone-400 truncate">
                Active Project Scope
              </p>
            </div>
            <MdKeyboardArrowRight className="text-stone-400 group-hover:text-[#FF5500] group-hover:translate-x-0.5 transition-all text-base" />
          </Link>
        ) : (
          <Link
            to="/projects/PS-26122"
            title="PS-26122 Active Project"
            className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#FF5500] text-[#FF5500] transition-colors"
          >
            <MdLayers size={18} />
          </Link>
        )}

        {/* Collapse Toggle Control */}
        <div className="mt-2 pt-2 border-t border-white/5 flex justify-end">
          <button
            type="button"
            onClick={onToggle}
            className="text-stone-400 hover:text-white p-1 rounded-md text-xs flex items-center gap-1 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <MdChevronRight size={18} /> : <MdChevronLeft size={18} />}
            {!collapsed && <span className="text-[11px] font-semibold">Collapse</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

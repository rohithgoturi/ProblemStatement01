/**
 * Sidebar — Left navigation panel
 * Persistent on desktop, collapsible on mobile
 * Faithfully matches Phase 2 Reference Screens (Main Dashboard & Project Dashboard)
 */
import { NavLink, Link } from 'react-router-dom';
import {
  MdDashboard, MdFolderOpen, MdInbox, MdCalendarToday,
  MdAutoAwesome, MdTrendingUp, MdBarChart, MdPeople,
  MdLocationOn, MdSettings, MdHelpOutline,
  MdChevronLeft, MdChevronRight, MdWorkspacePremium,
  MdArrowForward, MdKeyboardArrowRight,
} from 'react-icons/md';
import { cn } from '../../utils/helpers';
import { Logo, PragatiPathIcon } from '../shared/Logo';

const ICON_MAP = {
  MdDashboard:    <MdDashboard size={18} />,
  MdFolderOpen:   <MdFolderOpen size={18} />,
  MdInbox:        <MdInbox size={18} />,
  MdCalendarToday:<MdCalendarToday size={18} />,
  MdAutoAwesome:  <MdAutoAwesome size={18} />,
  MdTrendingUp:   <MdTrendingUp size={18} />,
  MdBarChart:     <MdBarChart size={18} />,
  MdPeople:       <MdPeople size={18} />,
  MdLocationOn:   <MdLocationOn size={18} />,
  MdSettings:     <MdSettings size={18} />,
  MdHelpOutline:  <MdHelpOutline size={18} />,
};

const NAV_GROUPS = [
  {
    id: 'main',
    label: 'MAIN MENU',
    items: [
      { id: 'dashboard',  label: 'Dashboard',  path: '/dashboard',  icon: 'MdDashboard' },
      { id: 'projects',   label: 'Projects',   path: '/projects',   icon: 'MdFolderOpen',   badge: 12 },
      { id: 'dpr',        label: 'DPR Inbox',  path: '/dpr',        icon: 'MdInbox',        badge: 24 },
      { id: 'schedule',   label: 'Schedule',   path: '/schedule',   icon: 'MdCalendarToday' },
      { id: 'ai-matching',label: 'AI Matching',path: '/ai-matching', icon: 'MdAutoAwesome' },
      { id: 'progress',   label: 'Progress',   path: '/progress',   icon: 'MdTrendingUp' },
      { id: 'reports',    label: 'Reports',    path: '/reports',    icon: 'MdBarChart' },
    ],
  },
  {
    id: 'project',
    label: 'PROJECT MANAGEMENT',
    items: [
      { id: 'team',      label: 'Team',      path: '/team',      icon: 'MdPeople' },
      { id: 'locations', label: 'Locations', path: '/locations', icon: 'MdLocationOn' },
      { id: 'settings',  label: 'Settings',  path: '/settings',  icon: 'MdSettings' },
      { id: 'help',      label: 'Help',      path: '/help',      icon: 'MdHelpOutline' },
    ],
  },
];

export function Sidebar({ collapsed = false, onToggle }) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 bottom-0 bg-white border-r border-slate-200/80 flex flex-col z-30 transition-all duration-300',
        collapsed
          ? '-translate-x-full lg:translate-x-0 lg:w-16'
          : 'translate-x-0 w-64 shadow-2xl lg:shadow-xs',
      )}
    >
      {/* Brand Logo */}
      <div className={cn(
        'flex items-center border-b border-slate-100 flex-shrink-0',
        collapsed ? 'h-16 lg:justify-center px-4 lg:px-0' : 'h-16 px-4 gap-2.5',
      )}>
        {collapsed ? (
          <div className="hidden lg:block">
            <PragatiPathIcon size={28} />
          </div>
        ) : (
          <Logo size="sm" to="/dashboard" />
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5 custom-scrollbar">
        {NAV_GROUPS.map(group => (
          <div key={group.id}>
            {!collapsed && (
              <p className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map(item => (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    title={collapsed ? item.label : undefined}
                    className={({ isActive }) => cn(
                      'flex items-center gap-3 rounded-lg transition-all duration-150 relative text-sm',
                      collapsed ? 'justify-center h-10 w-10 mx-auto' : 'px-3 py-2',
                      isActive
                        ? 'bg-[#0056D2] text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                    )}
                  >
                    <span className="flex-shrink-0">{ICON_MAP[item.icon]}</span>
                    {!collapsed && (
                      <span className="flex-1 min-w-0 truncate">{item.label}</span>
                    )}
                    {!collapsed && item.badge != null && (
                      <span className={cn(
                        'ml-auto text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center flex-shrink-0',
                        item.path === '/dashboard' ? 'bg-white text-[#0056D2]' : 'bg-[#0056D2] text-white'
                      )}>
                        {item.badge}
                      </span>
                    )}
                    {collapsed && item.badge != null && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-[#0056D2] rounded-full" />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Upgrade to Pro Card (visible when expanded) */}
        {!collapsed && (
          <div className="pt-2 px-1">
            <div className="rounded-xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-100 p-3.5 relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-[#0056D2] mb-1 font-bold text-xs">
                <MdWorkspacePremium className="text-base text-amber-500" />
                <span>Upgrade to Pro</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight mb-3">
                Get advanced analytics, more exports and priority support.
              </p>
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-[#0056D2] hover:bg-[#1A73E8] text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <span>Upgrade Now</span>
                <MdArrowForward size={12} />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Selected Project Switcher (Bottom Widget matching reference) */}
      <div className="border-t border-slate-100 p-2 flex-shrink-0 bg-white">
        {!collapsed ? (
          <Link
            to="/projects/PS-26122"
            title="Open PS 26122 Project Dashboard"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100 group"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=150&auto=format&fit=crop&q=60"
                alt="PS 26122"
                className="w-8 h-8 object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                PS 26122
              </div>
              <p className="text-[10px] text-slate-500 truncate">
                Pump P-101 · Unit 2
              </p>
              <p className="text-[9px] text-slate-400 truncate">
                Report Date: 10 Sept 2026
              </p>
            </div>
            <MdKeyboardArrowRight className="text-slate-400 group-hover:text-[#0056D2] group-hover:translate-x-0.5 transition-all text-base" />
          </Link>
        ) : (
          <Link
            to="/projects/PS-26122"
            title="PS 26122"
            className="w-10 h-10 mx-auto rounded-lg overflow-hidden flex items-center justify-center bg-slate-100 border border-slate-200 hover:border-[#0056D2] transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=150&auto=format&fit=crop&q=60"
              alt="PS 26122"
              className="w-full h-full object-cover"
            />
          </Link>
        )}

        {/* Collapse toggle */}
        <div className="mt-1 pt-1 flex justify-end">
          <button
            type="button"
            onClick={onToggle}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md text-xs flex items-center gap-1 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <MdChevronRight size={18} /> : <MdChevronLeft size={18} />}
            {!collapsed && <span className="text-[11px]">Collapse</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

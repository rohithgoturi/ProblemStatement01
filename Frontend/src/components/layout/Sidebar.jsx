/**
 * Sidebar — Left navigation panel
 * Persistent on desktop, collapsible on mobile
 */
import { NavLink } from 'react-router-dom';
import {
  MdDashboard, MdFolderOpen, MdInbox, MdCalendarToday,
  MdAutoAwesome, MdTrendingUp, MdBarChart, MdPeople,
  MdLocationOn, MdSettings, MdHelpOutline,
  MdChevronLeft, MdChevronRight,
} from 'react-icons/md';
import { cn } from '../../utils/helpers';

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
    label: 'Main',
    items: [
      { id: 'dashboard',  label: 'Dashboard',  path: '/dashboard',  icon: 'MdDashboard' },
      { id: 'projects',   label: 'Projects',   path: '/projects',   icon: 'MdFolderOpen' },
      { id: 'dpr',        label: 'DPR Inbox',  path: '/dpr',        icon: 'MdInbox',        badge: 8 },
      { id: 'schedule',   label: 'Schedule',   path: '/schedule',   icon: 'MdCalendarToday' },
      { id: 'ai-matching',label: 'AI Matching',path: '/ai-matching', icon: 'MdAutoAwesome',  badge: 18 },
      { id: 'progress',   label: 'Progress',   path: '/progress',   icon: 'MdTrendingUp' },
      { id: 'reports',    label: 'Reports',    path: '/reports',    icon: 'MdBarChart' },
    ],
  },
  {
    id: 'project',
    label: 'Project',
    items: [
      { id: 'team',      label: 'Team',      path: '/team',      icon: 'MdPeople' },
      { id: 'locations', label: 'Locations', path: '/locations', icon: 'MdLocationOn' },
    ],
  },
  {
    id: 'system',
    label: 'System',
    items: [
      { id: 'settings', label: 'Settings', path: '/settings', icon: 'MdSettings' },
      { id: 'help',     label: 'Help',     path: '/help',     icon: 'MdHelpOutline' },
    ],
  },
];

export function Sidebar({ collapsed = false, onToggle }) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 bottom-0 bg-white border-r border-surface-border flex flex-col z-sidebar shadow-sidebar transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center border-b border-surface-border flex-shrink-0',
        collapsed ? 'h-16 justify-center px-0' : 'h-16 px-5 gap-3',
      )}>
        {/* Construction hard hat logo mark */}
        <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 3C7 3 3 7 3 12H4.5C4.5 7.8 7.8 4.5 12 4.5V3Z" fill="white"/>
            <path d="M12 3C17 3 21 7 21 12H19.5C19.5 7.8 16.2 4.5 12 4.5V3Z" fill="white" opacity="0.7"/>
            <rect x="3" y="12" width="18" height="2.5" rx="1.25" fill="white"/>
            <rect x="7" y="14.5" width="10" height="4" rx="1" fill="white" opacity="0.85"/>
          </svg>
        </div>
        {!collapsed && (
          <div>
            <span className="text-base font-bold text-ink-primary tracking-tight">PragatiPath</span>
            <p className="text-[10px] text-ink-muted leading-tight">Construction Intelligence</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {NAV_GROUPS.map(group => (
          <div key={group.id}>
            {!collapsed && (
              <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-ink-muted/70">
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
                      'flex items-center gap-3 rounded-md transition-colors duration-150 relative',
                      collapsed ? 'justify-center h-10 w-10 mx-auto' : 'px-3 py-2.5',
                      isActive
                        ? 'bg-brand-blue-xlight text-brand-blue font-semibold'
                        : 'text-ink-secondary hover:bg-surface-muted hover:text-ink-primary',
                    )}
                  >
                    {/* Active indicator */}
                    {!collapsed && (
                      <span className="nav-active-indicator" />
                    )}
                    <span className="flex-shrink-0">{ICON_MAP[item.icon]}</span>
                    {!collapsed && (
                      <span className="text-sm flex-1 min-w-0 truncate">{item.label}</span>
                    )}
                    {!collapsed && item.badge != null && (
                      <span className="ml-auto bg-brand-blue text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center flex-shrink-0">
                        {item.badge}
                      </span>
                    )}
                    {collapsed && item.badge != null && (
                      <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-brand-blue rounded-full" />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-surface-border p-2 flex-shrink-0">
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            'w-full flex items-center gap-2 px-3 py-2 rounded-md text-ink-muted hover:text-ink-primary hover:bg-surface-muted transition-colors text-sm',
            collapsed && 'justify-center px-0',
          )}
        >
          {collapsed ? <MdChevronRight size={18} /> : <MdChevronLeft size={18} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

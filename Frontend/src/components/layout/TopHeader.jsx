/**
 * TopHeader — Dashboard top navigation bar
 * Search | Notifications | Profile | Theme toggle
 */
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdSearch, MdNotificationsNone, MdKeyboardArrowDown,
  MdLogout, MdSettings, MdPerson, MdClose,
  MdMenu,
} from 'react-icons/md';
import { cn } from '../../utils/helpers';
import { notifications as mockNotifications } from '../../data/navigation';

const NOTIFICATION_ICONS = {
  dpr:      { bg: 'bg-blue-50',   text: 'text-blue-600',   char: 'D' },
  ai:       { bg: 'bg-violet-50', text: 'text-violet-600', char: 'A' },
  delay:    { bg: 'bg-amber-50',  text: 'text-amber-600',  char: '!' },
  report:   { bg: 'bg-green-50',  text: 'text-green-600',  char: 'R' },
  approval: { bg: 'bg-red-50',    text: 'text-red-600',    char: 'V' },
};

export function TopHeader({ collapsed, onMenuToggle, user }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const notifRef    = useRef(null);
  const profileRef  = useRef(null);
  const navigate    = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target))   setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead = () => {
    setNotifications(ns => ns.map(n => ({ ...n, read: true })));
  };

  const handleLogout = () => {
    localStorage.removeItem('pragatipath_auth');
    navigate('/login');
  };

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-header bg-white border-b border-surface-border z-header flex items-center px-5 gap-4 shadow-header transition-all duration-300',
        collapsed ? 'left-16' : 'left-64',
      )}
    >
      {/* Mobile menu toggle */}
      <button
        type="button"
        onClick={onMenuToggle}
        className="lg:hidden text-ink-muted hover:text-ink-primary p-1 rounded transition-colors"
      >
        <MdMenu size={22} />
      </button>

      {/* Page context — filled by child pages via portal or context if needed */}
      <div className="flex-1" />

      {/* Search */}
      <div className="hidden md:flex items-center">
        <div className="relative">
          <MdSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          <input
            type="search"
            placeholder="Search projects, activities…"
            className="w-64 h-9 pl-9 pr-4 text-sm bg-surface-light border border-surface-border rounded-lg text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="relative" ref={notifRef}>
        <button
          type="button"
          onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }}
          className="relative w-9 h-9 flex items-center justify-center rounded-lg text-ink-muted hover:text-ink-primary hover:bg-surface-muted transition-colors"
        >
          <MdNotificationsNone size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-status-red text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notifications dropdown */}
        {notifOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-80 bg-white border border-surface-border rounded-xl shadow-dropdown z-dropdown animate-slide-in">
            <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border">
              <h3 className="text-sm font-semibold text-ink-primary">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-xs text-brand-blue hover:underline"
                  >
                    Mark all read
                  </button>
                )}
                <button onClick={() => setNotifOpen(false)} className="text-ink-muted hover:text-ink-primary">
                  <MdClose size={16} />
                </button>
              </div>
            </div>
            <ul className="max-h-72 overflow-y-auto divide-y divide-surface-border">
              {notifications.map(n => {
                const iconCfg = NOTIFICATION_ICONS[n.type] || NOTIFICATION_ICONS.report;
                return (
                  <li
                    key={n.id}
                    className={cn(
                      'flex items-start gap-3 px-4 py-3 hover:bg-surface-light cursor-pointer transition-colors',
                      !n.read && 'bg-brand-blue-xlight',
                    )}
                    onClick={() => setNotifications(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x))}
                  >
                    <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5', iconCfg.bg, iconCfg.text)}>
                      {iconCfg.char}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-ink-primary truncate">{n.title}</p>
                      <p className="text-xs text-ink-muted leading-relaxed mt-0.5">{n.message}</p>
                      <p className="text-[10px] text-ink-disabled mt-1">{n.time}</p>
                    </div>
                    {!n.read && (
                      <span className="w-1.5 h-1.5 bg-brand-blue rounded-full flex-shrink-0 mt-1.5" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Profile */}
      <div className="relative" ref={profileRef}>
        <button
          type="button"
          onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}
          className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-lg hover:bg-surface-muted transition-colors"
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.initials || 'U'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-ink-primary leading-tight">{user?.name || 'User'}</p>
            <p className="text-[10px] text-ink-muted leading-tight">{user?.role || 'Member'}</p>
          </div>
          <MdKeyboardArrowDown size={16} className={cn('text-ink-muted transition-transform', profileOpen && 'rotate-180')} />
        </button>

        {/* Profile dropdown */}
        {profileOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-surface-border rounded-xl shadow-dropdown z-dropdown animate-slide-in">
            <div className="px-4 py-3 border-b border-surface-border">
              <p className="text-xs font-semibold text-ink-primary">{user?.name}</p>
              <p className="text-[10px] text-ink-muted mt-0.5">{user?.email}</p>
            </div>
            <ul className="py-1">
              {[
                { icon: <MdPerson size={16} />, label: 'My Profile',  path: '/settings' },
                { icon: <MdSettings size={16} />, label: 'Settings',   path: '/settings' },
              ].map(item => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => { navigate(item.path); setProfileOpen(false); }}
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-ink-secondary hover:bg-surface-muted hover:text-ink-primary transition-colors"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-surface-border py-1">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-status-red hover:bg-red-50 transition-colors"
              >
                <MdLogout size={16} />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

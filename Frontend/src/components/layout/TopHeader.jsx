/**
 * TopHeader — Dashboard top navigation bar
 * Search (with ⌘ K) | Role Indicator | Notifications | Help | User Profile
 * Clienter-inspired warm neutral styling, orange accent focus states, and real auth data.
 */
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdSearch, MdNotificationsNone, MdHelpOutline,
  MdLogout, MdSettings, MdPerson, MdClose,
  MdMenu, MdCheck,
} from 'react-icons/md';
import { cn } from '../../utils/helpers';
import { getPendingReviews } from '../../services/api';
import { useRole } from '../../context/RoleContext';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../shared/Avatar';
import { Logo } from '../shared/Logo';

export function TopHeader({ collapsed, onMenuToggle }) {
  const { currentProfile } = useRole();
  const { logout } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const notifRef   = useRef(null);
  const profileRef = useRef(null);
  const navigate   = useNavigate();

  useEffect(() => {
    let isMounted = true;
    getPendingReviews().then((res) => {
      if (isMounted && res.data) {
        const items = res.data.map((r, i) => ({
          id: r._id || r.id || `notif-${i}`,
          title: `AI Match: ${r.matchedActivityId || 'Schedule Item'}`,
          message: `${Math.round((r.confidence || 0) * 100)}% match confidence • Action needed`,
          time: 'Action Required',
        }));
        setNotifications(items);
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  const unreadCount = notifications.length;

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-[#E8E1D5] z-20 flex items-center justify-between px-4 sm:px-6 shadow-2xs transition-all duration-300',
        'left-0',
        collapsed ? 'lg:left-18' : 'lg:left-64',
      )}
    >
      {/* Left: Mobile Toggle & Global Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          type="button"
          onClick={onMenuToggle}
          className="lg:hidden text-stone-600 hover:text-stone-900 p-1.5 rounded-lg transition-colors"
          title="Toggle Navigation"
        >
          <MdMenu size={22} />
        </button>

        {/* Mobile Brand Mark */}
        <div className="lg:hidden flex items-center">
          <Logo size="xs" to="/dashboard" showWordmark={false} />
        </div>

        {/* Search Input with ⌘ K Shortcut */}
        <div className="relative w-full max-w-md hidden sm:block">
          <MdSearch size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <input
            type="search"
            placeholder="Search activities, DPRs, locations..."
            className="w-full h-9.5 pl-10 pr-12 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E8E1D5] rounded-full text-[#0B1320] placeholder:text-stone-400 focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all shadow-2xs"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-stone-200/60 border border-stone-300/60 text-[10px] font-mono text-stone-600 font-medium">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right: Controls & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Authenticated Server-Authoritative Role Badge (Non-switchable) */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] text-xs font-bold text-[#0B1320] shadow-2xs select-none"
          title={`Authenticated Role: ${currentProfile.label}`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
          <span className="hidden sm:inline text-stone-400 font-medium text-[11px]">Role:</span>
          <span className="truncate max-w-[130px]">{currentProfile.label}</span>
        </div>

        {/* Notifications Button */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => { setNotifOpen((o) => !o); setProfileOpen(false); }}
            className="relative w-9 h-9 flex items-center justify-center rounded-full text-stone-600 hover:text-[#0B1320] hover:bg-[#FAF8F5] transition-colors border border-transparent hover:border-[#E8E1D5]"
            title="Notifications"
          >
            <MdNotificationsNone size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF5500] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-2xs">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-[#E8E1D5] rounded-3xl shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#FAF8F5] border-b border-[#E8E1D5]">
                <h3 className="text-xs font-bold text-[#0B1320] uppercase tracking-wider">Notifications</h3>
                <button onClick={() => setNotifOpen(false)} className="text-stone-400 hover:text-stone-600">
                  <MdClose size={16} />
                </button>
              </div>
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-500">
                  <MdCheck className="mx-auto text-emerald-500 text-xl mb-1" />
                  All caught up! No pending reviews or alerts.
                </div>
              ) : (
                <ul className="max-h-72 overflow-y-auto divide-y divide-stone-100">
                  {notifications.slice(0, 5).map((n) => (
                    <li
                      key={n.id}
                      onClick={() => { setNotifOpen(false); navigate('/ai-matching'); }}
                      className="p-4 hover:bg-[#FAF8F5] text-xs transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#0B1320]">{n.title}</span>
                        <span className="text-[10px] text-[#FF5500] font-bold">{n.time}</span>
                      </div>
                      <p className="text-stone-600 leading-snug">{n.message}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Help Circle Button */}
        <button
          type="button"
          onClick={() => navigate('/help')}
          className="w-9 h-9 flex items-center justify-center rounded-full text-stone-600 hover:text-[#0B1320] hover:bg-[#FAF8F5] transition-colors border border-transparent hover:border-[#E8E1D5]"
          title="Help & Documentation"
        >
          <MdHelpOutline size={20} />
        </button>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => { setProfileOpen((o) => !o); setNotifOpen(false); }}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-[#FAF8F5] transition-colors border border-transparent hover:border-[#E8E1D5]"
          >
            <Avatar name={currentProfile.name} avatar={currentProfile.avatar} size="md" />
            <div className="hidden md:block text-left max-w-[130px] pr-2">
              <p className="text-xs font-bold text-[#0B1320] leading-tight truncate">
                {currentProfile.name}
              </p>
              <p className="text-[10px] text-stone-500 leading-tight truncate">
                {currentProfile.label}
              </p>
            </div>
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#E8E1D5] rounded-3xl shadow-xl z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-5 py-4 border-b border-stone-100 flex items-center gap-3 bg-[#FAF8F5]/50">
                <Avatar name={currentProfile.name} avatar={currentProfile.avatar} size="lg" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#0B1320] truncate">{currentProfile.name}</p>
                  <p className="text-[10px] text-stone-500 truncate">{currentProfile.email}</p>
                  <span className={`inline-block text-[9px] font-bold px-2.5 py-0.5 rounded-full border mt-1.5 ${currentProfile.badgeColor}`}>
                    {currentProfile.label}
                  </span>
                </div>
              </div>
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => { navigate('/settings'); setProfileOpen(false); }}
                  className="w-full px-5 py-2.5 text-left text-xs text-stone-700 hover:bg-[#FAF8F5] flex items-center gap-2 font-medium"
                >
                  <MdPerson size={16} className="text-stone-400" /> My Profile
                </button>
                <button
                  type="button"
                  onClick={() => { navigate('/settings'); setProfileOpen(false); }}
                  className="w-full px-5 py-2.5 text-left text-xs text-stone-700 hover:bg-[#FAF8F5] flex items-center gap-2 font-medium"
                >
                  <MdSettings size={16} className="text-stone-400" /> System Settings
                </button>
              </div>
              <div className="border-t border-stone-100 my-1" />
              <button
                type="button"
                onClick={handleLogout}
                className="w-full px-5 py-2.5 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold"
              >
                <MdLogout size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

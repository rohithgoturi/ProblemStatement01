/**
 * TopHeader — Dashboard top navigation bar
 * Search (with ⌘ K) | Demo Role Switcher | Theme toggle | Notifications | Help | Dynamic User Profile
 * Matches Phase 2 Reference Screens with precision while enabling real-time role switching
 */
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdSearch, MdNotificationsNone, MdHelpOutline,
  MdLogout, MdSettings, MdPerson, MdClose,
  MdMenu, MdWbSunny, MdNightlightRound, MdKeyboardArrowDown,
  MdCheck, MdEngineering, MdAssignmentInd, MdAdminPanelSettings, MdBuild
} from 'react-icons/md';
import { cn } from '../../utils/helpers';
import { notifications as mockNotifications } from '../../data/navigation';
import { useRole } from '../../context/RoleContext';
import { Logo } from '../shared/Logo';

export function TopHeader({ collapsed, onMenuToggle }) {
  const { currentRole, setRole, currentProfile, availableRoles } = useRole();
  const [roleOpen, setRoleOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const notifications = mockNotifications;
  const roleRef    = useRef(null);
  const notifRef   = useRef(null);
  const profileRef = useRef(null);
  const navigate   = useNavigate();

  const unreadCount = 3; // Fixed 3 matching reference badge

  useEffect(() => {
    const handler = (e) => {
      if (roleRef.current && !roleRef.current.contains(e.target)) setRoleOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pragatipath_auth');
    localStorage.removeItem('pragatipath_demo_role');
    navigate('/login');
  };

  const getRoleIcon = (roleKey) => {
    switch (roleKey) {
      case 'site_supervisor': return <MdBuild size={15} className="text-emerald-600" />;
      case 'planner': return <MdEngineering size={15} className="text-blue-600" />;
      case 'project_manager': return <MdAssignmentInd size={15} className="text-indigo-600" />;
      case 'admin': return <MdAdminPanelSettings size={15} className="text-purple-600" />;
      default: return <MdPerson size={15} className="text-slate-600" />;
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 bg-white border-b border-slate-200/80 z-20 flex items-center justify-between px-4 sm:px-6 shadow-xs transition-all duration-300',
        'left-0',
        collapsed ? 'lg:left-16' : 'lg:left-64',
      )}
    >
      {/* Left: Mobile Toggle & Global Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          type="button"
          onClick={onMenuToggle}
          className="lg:hidden text-slate-500 hover:text-slate-800 p-1.5 rounded-lg transition-colors"
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
          <MdSearch size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="search"
            placeholder="Search projects, locations, or anything..."
            className="w-full h-9.5 pl-10 pr-12 text-xs sm:text-sm bg-slate-50/80 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0056D2] focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200/60 border border-slate-300/60 text-[10px] font-mono text-slate-500 font-medium">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right: Controls, Demo Role Switcher & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* LIVE DEMO ROLE SWITCHER PILL */}
        <div className="relative" ref={roleRef}>
          <button
            type="button"
            onClick={() => {
              setRoleOpen((o) => !o);
              setNotifOpen(false);
              setProfileOpen(false);
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-blue-50/90 hover:bg-blue-100/80 border border-blue-200 text-xs font-bold text-[#0056D2] transition-all shadow-xs"
            title="Switch Demo Role"
          >
            <span className="w-2 h-2 rounded-full bg-[#0056D2] animate-pulse" />
            <span className="hidden sm:inline text-slate-500 font-medium text-[11px]">Role:</span>
            <span className="truncate max-w-[120px]">{currentProfile.label}</span>
            <MdKeyboardArrowDown size={16} className="text-[#0056D2]" />
          </button>

          {/* Role Dropdown Menu */}
          {roleOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Switch Demo Role
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Changes dashboard and project workspace experience.
                </p>
              </div>

              <div className="space-y-1 py-1.5">
                {availableRoles.map((roleItem) => {
                  const isSelected = currentRole === roleItem.roleKey;
                  return (
                    <button
                      key={roleItem.roleKey}
                      type="button"
                      onClick={() => {
                        setRole(roleItem.roleKey);
                        setRoleOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-blue-50/80 border border-blue-200 text-[#0056D2]'
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-xs shrink-0 mt-0.5">
                        {getRoleIcon(roleItem.roleKey)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold truncate">{roleItem.label}</span>
                          {isSelected && <MdCheck size={16} className="text-[#0056D2]" />}
                        </div>
                        <div className="text-[10px] text-slate-500 leading-tight truncate mt-0.5">
                          {roleItem.tagline}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Pill */}
        <button
          type="button"
          onClick={() => setIsDarkMode(d => !d)}
          title="Toggle theme appearance"
          className="flex items-center bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full px-2 py-1 transition-all text-slate-500 shadow-2xs"
        >
          <span className={`p-1 rounded-full ${!isDarkMode ? 'bg-white shadow-xs text-amber-500' : 'text-slate-400'}`}>
            <MdWbSunny size={13} />
          </span>
          <span className={`p-1 rounded-full ${isDarkMode ? 'bg-slate-800 shadow-xs text-sky-400' : 'text-slate-400'} ml-0.5`}>
            <MdNightlightRound size={13} />
          </span>
        </button>

        {/* Notifications Button */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); setRoleOpen(false); }}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <MdNotificationsNone size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Notifications</h3>
                <button onClick={() => setNotifOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <MdClose size={16} />
                </button>
              </div>
              <ul className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.slice(0, 3).map(n => (
                  <li key={n.id} className="p-3.5 hover:bg-slate-50 text-xs transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-slate-600 leading-snug">{n.message}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Help Circle Button */}
        <button
          type="button"
          onClick={() => navigate('/help')}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Help & Documentation"
        >
          <MdHelpOutline size={20} />
        </button>

        {/* User Profile (Dynamic based on current role) */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); setRoleOpen(false); }}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-slate-200 bg-slate-100">
              <img
                src={currentProfile.avatar}
                alt={currentProfile.name}
                className="w-9 h-9 object-cover rounded-full"
              />
            </div>
            <div className="hidden md:block text-left max-w-[130px]">
              <p className="text-xs font-bold text-slate-900 leading-tight truncate">
                {currentProfile.name}
              </p>
              <p className="text-[10px] text-slate-500 leading-tight truncate">
                {currentProfile.label}
              </p>
            </div>
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 py-1.5 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{currentProfile.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{currentProfile.email}</p>
                <div className="mt-1.5">
                  <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full border ${currentProfile.badgeColor}`}>
                    {currentProfile.label}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { navigate('/settings'); setProfileOpen(false); }}
                className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <MdPerson size={15} /> My Profile
              </button>
              <button
                type="button"
                onClick={() => { navigate('/settings'); setProfileOpen(false); }}
                className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <MdSettings size={15} /> Project Settings
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button
                type="button"
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
              >
                <MdLogout size={15} /> Sign Out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Folder,
  Calendar,
  FileText,
  Share2,
  TrendingUp,
  BarChart2,
  LogOut,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDemoStore } from '@/store/demoStore';

// ============================================================
// PROJECTAI BRIDGE — Sidebar Navigation
// Matches Reference Image 1 (Dark Navy #0B192C, active royal blue)
// ============================================================

const NAV_ITEMS = [
  { id: 'dashboard',   label: 'Dashboard',   path: '/dashboard',   Icon: LayoutDashboard },
  { id: 'projects',    label: 'Projects',    path: '/projects',    Icon: Folder },
  { id: 'schedule',    label: 'Schedule',    path: '/schedule',    Icon: Calendar },
  { id: 'dpr',         label: 'DPR',         path: '/dpr',         Icon: FileText },
  { id: 'ai-matching', label: 'AI Matching', path: '/ai-matching', Icon: Share2 },
  { id: 'progress',    label: 'Progress',    path: '/progress',    Icon: TrendingUp },
  { id: 'reports',     label: 'Reports',     path: '/reports',     Icon: BarChart2 },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export function Sidebar({ isOpen = true, onClose, isMobile = false }: SidebarProps) {
  const { logout } = useDemoStore();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const content = (
    <div className="flex flex-col h-full bg-[#0B192C] text-white">
      {/* Brand Logo Header */}
      <div className="flex items-center justify-between px-5 h-16 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
              <path d="M6 31V10L14 5V31" stroke="#0062FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 12L22 7V31" stroke="#0062FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 14L30 9V31" stroke="#0062FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="6" y1="16" x2="14" y2="16" stroke="#0062FF" strokeWidth="1.6" strokeLinecap="round"/>
              <line x1="6" y1="21" x2="14" y2="21" stroke="#0062FF" strokeWidth="1.6" strokeLinecap="round"/>
              <line x1="6" y1="26" x2="14" y2="26" stroke="#0062FF" strokeWidth="1.6" strokeLinecap="round"/>
              <line x1="14" y1="18" x2="22" y2="18" stroke="#0062FF" strokeWidth="1.6" strokeLinecap="round"/>
              <line x1="14" y1="24" x2="22" y2="24" stroke="#0062FF" strokeWidth="1.6" strokeLinecap="round"/>
              <line x1="22" y1="19" x2="30" y2="19" stroke="#0062FF" strokeWidth="1.6" strokeLinecap="round"/>
              <line x1="22" y1="25" x2="30" y2="25" stroke="#0062FF" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M3 31H33" stroke="#0062FF" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex items-baseline font-bold text-lg tracking-tight">
            <span className="text-white">ProjectAI</span>
            <span className="text-[#0062FF] ml-1.5">Bridge</span>
          </div>
        </div>

        {isMobile && (
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation Items List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ id, label, path, Icon }) => (
          <NavLink
            key={id}
            to={path}
            onClick={isMobile ? onClose : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[#0062FF] text-white shadow-xs font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              )
            }
          >
            <Icon size={18} strokeWidth={2} className="shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / Sign Out */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <LogOut size={18} strokeWidth={2} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-neutral-950/60"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
        <aside
          className={cn(
            'fixed top-0 left-0 z-50 h-full w-60 bg-[#0B192C] transition-transform duration-200',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {content}
        </aside>
      </>
    );
  }

  return (
    <aside className="w-56 min-w-[224px] h-full hidden md:flex flex-col shrink-0 bg-[#0B192C]">
      {content}
    </aside>
  );
}

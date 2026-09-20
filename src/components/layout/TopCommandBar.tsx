import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, SlidersHorizontal, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDemoStore } from '@/store/demoStore';

// ============================================================
// PROJECTAI BRIDGE — Top Command Bar
// Matches Reference Image 1:
// - Left: Collapse/toggle icon
// - Center: Search "Search projects, activities, or DPR..."
// - Right: Bell (red badge 3), Avatar Raghav Sankar (Project Manager)
// ============================================================

interface TopCommandBarProps {
  onMenuToggle?: () => void;
  mobileMenuButton?: React.ReactNode;
}

export function TopCommandBar({ mobileMenuButton }: TopCommandBarProps) {
  const { currentUser } = useDemoStore();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="h-16 px-6 bg-white border-b border-neutral-200 flex items-center justify-between gap-4 z-30 shrink-0">
      
      {/* Left: Menu toggle + Search Input */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        {mobileMenuButton || (
          <button
            className="text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <SlidersHorizontal size={18} />
          </button>
        )}

        {/* Search Input Box */}
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects, activities, or DPR..."
            className="block w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-neutral-50/70 hover:bg-white border border-neutral-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0062FF]/20 focus:border-[#0062FF] transition-all"
          />
        </div>
      </div>

      {/* Right: Notifications + User Profile */}
      <div className="flex items-center gap-4 shrink-0">
        
        {/* Notification Bell with Badge 3 */}
        <button
          className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label="Notifications (3 unread)"
        >
          <Bell size={19} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Profile Info */}
        <div className="flex items-center gap-3 pl-2 border-l border-neutral-200">
          <img
            src="/raghav-sankar.jpg"
            alt="Raghav Sankar"
            className="w-9 h-9 rounded-full object-cover border border-neutral-200 shadow-xs"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-tight">
              {currentUser?.name || 'Raghav Sankar'}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-none">
              Project Manager
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-neutral-100"
      aria-label="Open menu"
    >
      <Menu size={20} />
    </button>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumb?: Array<{ label: string; href?: string }>;
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-1 text-xs text-slate-400">
            {breadcrumb.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>/</span>}
                {item.href ? (
                  <Link to={item.href} className="hover:text-slate-600 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-slate-600 font-medium">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}

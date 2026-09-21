/**
 * AppShell — Authenticated application layout shell
 * Combines Sidebar + TopHeader + main content area
 */
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { cn } from '../../utils/helpers';
import { currentUser } from '../../data/navigation';

export function AppShell() {
  const [collapsed, setCollapsed] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 1024 : false));

  return (
    <div className="min-h-screen bg-surface-light">
      {/* Mobile backdrop when sidebar is open on small screens */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-25 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
      />

      {/* Top Header */}
      <TopHeader
        collapsed={collapsed}
        onMenuToggle={() => setCollapsed(c => !c)}
        user={currentUser}
      />

      {/* Main Content */}
      <main
        className={cn(
          'pt-header min-h-screen transition-all duration-300',
          'pl-0',
          collapsed ? 'lg:pl-16' : 'lg:pl-64',
        )}
      >
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

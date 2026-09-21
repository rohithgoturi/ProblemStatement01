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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-surface-light">
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
          collapsed ? 'pl-16' : 'pl-64',
        )}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

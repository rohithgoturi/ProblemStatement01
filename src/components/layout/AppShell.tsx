import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopCommandBar, MobileMenuButton } from './TopCommandBar';
import { useDemoStore } from '@/store/demoStore';

// ============================================================
// PRAGATIPATH — App Shell
// Composes: Sidebar + TopCommandBar + Content region
// Responsive: desktop sidebar always visible, mobile drawer
// ============================================================

export function AppShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { isAuthenticated } = useDemoStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-shell">
      {/* Desktop sidebar (hidden on mobile, shown md+) */}
      <Sidebar />

      {/* Mobile sidebar drawer */}
      <Sidebar
        isMobile
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* Main region */}
      <div className="main-region">
        <TopCommandBar
          mobileMenuButton={
            <MobileMenuButton onClick={() => setMobileNavOpen(true)} />
          }
        />
        <main className="content-region">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

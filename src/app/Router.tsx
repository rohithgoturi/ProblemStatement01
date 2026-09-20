import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { LoadingState } from '@/components/ui/Card';
import LandingPage from '@/features/landing/LandingPage';
import LoginPage from '@/features/auth/LoginPage';

// Lazy load all app screens for better initial load
const WorkspacePage   = lazy(() => import('@/features/workspace/WorkspacePage'));
const DashboardPage   = lazy(() => import('@/features/dashboard/DashboardPage'));
const ProjectsPage    = lazy(() => import('@/features/projects/ProjectsPage'));
const SchedulePage    = lazy(() => import('@/features/schedule/SchedulePage'));
const DPRPage         = lazy(() => import('@/features/dpr/DPRPage'));
const AIMatchingPage  = lazy(() => import('@/features/ai-matching/AIMatchingPage'));
const ProgressPage    = lazy(() => import('@/features/progress/ProgressPage'));
const ReportsPage     = lazy(() => import('@/features/reports/ReportsPage'));
const SettingsPage    = lazy(() => import('@/features/settings/SettingsPage'));
const HelpPage        = lazy(() => import('@/features/help/HelpPage'));

function PageLoader() {
  return <LoadingState label="Loading page…" />;
}

// ============================================================
// PRAGATIPATH — Application Router
// ============================================================

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected app routes (AppShell handles auth guard) */}
        <Route element={<AppShell />}>
          <Route
            path="/workspace"
            element={
              <Suspense fallback={<PageLoader />}>
                <WorkspacePage />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<PageLoader />}>
                <DashboardPage />
              </Suspense>
            }
          />
          <Route
            path="/projects"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProjectsPage />
              </Suspense>
            }
          />
          <Route
            path="/schedule"
            element={
              <Suspense fallback={<PageLoader />}>
                <SchedulePage />
              </Suspense>
            }
          />
          <Route
            path="/dpr"
            element={
              <Suspense fallback={<PageLoader />}>
                <DPRPage />
              </Suspense>
            }
          />
          <Route
            path="/ai-matching"
            element={
              <Suspense fallback={<PageLoader />}>
                <AIMatchingPage />
              </Suspense>
            }
          />
          <Route
            path="/progress"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProgressPage />
              </Suspense>
            }
          />
          <Route
            path="/reports"
            element={
              <Suspense fallback={<PageLoader />}>
                <ReportsPage />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<PageLoader />}>
                <SettingsPage />
              </Suspense>
            }
          />
          <Route
            path="/help"
            element={
              <Suspense fallback={<PageLoader />}>
                <HelpPage />
              </Suspense>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

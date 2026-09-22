/**
 * PragatiPath — Application Router
 * All routes defined. Pages are placeholders until their phase is implemented.
 */
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppShell } from './components/layout/AppShell';
import { RouteErrorBoundary } from './components/shared/ErrorBoundary';

import LandingPage           from './pages/Landing/LandingPage';
import LoginPage             from './pages/Login/LoginPage';
import SignupPage            from './pages/Signup/SignupPage';
import DashboardPage         from './pages/Dashboard/DashboardPage';
import ProjectsPage          from './pages/Dashboard/ProjectsPage';
import ProjectDashboardPage  from './pages/ProjectDashboard/ProjectDashboardPage';
import DPRInboxPage          from './pages/DPRInbox/DPRInboxPage';
import SchedulePage          from './pages/Schedule/SchedulePage';
import AIMatchingPage        from './pages/AIMatching/AIMatchingPage';
import ProgressPage          from './pages/Progress/ProgressPage';
import ReportsPage           from './pages/Reports/ReportsPage';

import SettingsPage         from './pages/Settings/SettingsPage';
import { ProtectedRoute }      from './components/shared/ProtectedRoute';

export const router = createBrowserRouter([
  // Public routes (no AppShell)
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
    errorElement: <RouteErrorBoundary />,
  },

  // Authenticated app routes (inside AppShell, protected)
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'projects/:projectId',
        element: <ProjectDashboardPage />,
      },
      {
        path: 'dpr',
        element: <DPRInboxPage />,
      },
      {
        path: 'schedule',
        element: <SchedulePage />,
      },
      {
        path: 'ai-matching',
        element: (
          <ProtectedRoute allowedRoles={['planner', 'project_manager', 'admin']}>
            <AIMatchingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'progress',
        element: <ProgressPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      // Misc system routes
      {
        path: 'team',
        element: <DashboardPage />,
      },
      {
        path: 'locations',
        element: <DashboardPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'help',
        element: <DashboardPage />,
      },
    ],
  },

  // Catch-all redirect
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

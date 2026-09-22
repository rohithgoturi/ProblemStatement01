/**
 * PragatiPath — Application Router
 * Provides unified routing across Public Website (PublicLayout) and Authenticated App (AppShell).
 */
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { PublicLayout } from './components/layout/PublicLayout';
import { AppShell } from './components/layout/AppShell';
import { RouteErrorBoundary } from './components/shared/ErrorBoundary';
import { ProtectedRoute } from './components/shared/ProtectedRoute';

// Public Pages
import LandingPage from './pages/Landing/LandingPage';
import AboutPage from './pages/Public/AboutPage';
import ServicesPage from './pages/Public/ServicesPage';
import ContactPage from './pages/Public/ContactPage';
import PrivacyPage from './pages/Public/PrivacyPage';
import TermsPage from './pages/Public/TermsPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';

// Authenticated Pages
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProjectsPage from './pages/Dashboard/ProjectsPage';
import ProjectDashboardPage from './pages/ProjectDashboard/ProjectDashboardPage';
import DPRInboxPage from './pages/DPRInbox/DPRInboxPage';
import SchedulePage from './pages/Schedule/SchedulePage';
import AIMatchingPage from './pages/AIMatching/AIMatchingPage';
import ProgressPage from './pages/Progress/ProgressPage';
import ReportsPage from './pages/Reports/ReportsPage';
import SettingsPage from './pages/Settings/SettingsPage';
import TeamPage from './pages/Team/TeamPage';
import LocationsPage from './pages/Locations/LocationsPage';

export const router = createBrowserRouter([
  // Public website routes (wrapped in PublicLayout with navbar & footer)
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
      },
      {
        path: 'terms',
        element: <TermsPage />,
      },
    ],
  },

  // Public standalone authentication routes (no shell/footer)
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

  // Authenticated app routes (inside AppShell, protected with JWT check)
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
      {
        path: 'team',
        element: <TeamPage />,
      },
      {
        path: 'locations',
        element: <LocationsPage />,
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
    element: <Navigate to="/" replace />,
  },
]);

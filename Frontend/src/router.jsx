/**
 * PragatiPath — Application Router
 * Provides unified routing across Public Website (PublicLayout) and Authenticated App (AppShell).
 */
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { PublicLayout } from './components/layout/PublicLayout';
import { AppShell } from './components/layout/AppShell';
import { RouteErrorBoundary } from './components/shared/ErrorBoundary';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

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
import HelpPage from './pages/Public/HelpPage';

/**
 * Adaptive wrapper for Team, Locations, and Help pages:
 * - If authenticated: renders seamlessly inside AppShell with sidebar & project controls.
 * - If public: renders inside PublicLayout with floating navbar, public header, and intentional empty state.
 */
function AdaptiveRoute({ component: Component }) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-[#FF5500]/20 border-t-[#FF5500] rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <AppShell>
        <Component isPublic={false} />
      </AppShell>
    );
  }

  return (
    <PublicLayout>
      <Component isPublic={true} />
    </PublicLayout>
  );
}

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

  // Adaptive routes for Team & Locations (support both public access & authenticated AppShell)
  {
    path: '/team',
    element: <AdaptiveRoute component={TeamPage} />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/locations',
    element: <AdaptiveRoute component={LocationsPage} />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/help',
    element: <AdaptiveRoute component={HelpPage} />,
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
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },

  // Catch-all redirect
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

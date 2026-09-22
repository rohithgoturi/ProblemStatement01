/**
 * PragatiPath — Role Context (Server-Authoritative RBAC)
 * Strictly derives the active role and user identity from the authenticated session.
 * Arbitrary client-side role switching has been permanently removed.
 */
import { createContext, useContext, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';

export const ROLES = {
  SITE_SUPERVISOR: 'site_supervisor',
  PLANNER: 'planner',
  PROJECT_MANAGER: 'project_manager',
  ADMIN: 'admin',
};

export const ROLE_CONFIG = {
  [ROLES.SITE_SUPERVISOR]: {
    roleKey: ROLES.SITE_SUPERVISOR,
    label: 'Site Supervisor',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    primaryCTA: 'Submit DPR',
    tagline: 'Field Execution & Site Progress',
    permissions: ['submit_dpr', 'view_schedule', 'view_progress'],
  },
  [ROLES.PLANNER]: {
    roleKey: ROLES.PLANNER,
    label: 'Project Planner',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    primaryCTA: 'Review Matches',
    tagline: 'Schedule Reconciliation & AI Validation',
    permissions: ['submit_dpr', 'view_schedule', 'import_schedule', 'clear_schedule', 'review_matches', 'view_progress', 'view_reports'],
  },
  [ROLES.PROJECT_MANAGER]: {
    roleKey: ROLES.PROJECT_MANAGER,
    label: 'Project Manager',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    primaryCTA: 'View Project Health',
    tagline: 'Project Health & Executive Oversight',
    permissions: ['submit_dpr', 'view_schedule', 'import_schedule', 'review_matches', 'view_progress', 'view_reports', 'manage_projects'],
  },
  [ROLES.ADMIN]: {
    roleKey: ROLES.ADMIN,
    label: 'System Administrator',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    primaryCTA: 'Manage Platform',
    tagline: 'Platform Governance & Access Management',
    permissions: ['all'],
  },
};

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const { user } = useAuth();

  // Authoritative role directly from authenticated database session
  const currentRole = user?.role || ROLES.PROJECT_MANAGER;

  const currentProfile = useMemo(() => {
    const config = ROLE_CONFIG[currentRole] || ROLE_CONFIG[ROLES.PROJECT_MANAGER];
    return {
      roleKey: currentRole,
      label: config.label,
      name: user?.name || 'Authenticated User',
      email: user?.email || '',
      avatar: user?.avatar || null,
      badgeColor: config.badgeColor,
      primaryCTA: config.primaryCTA,
      tagline: config.tagline,
      permissions: config.permissions,
    };
  }, [user, currentRole]);

  // Read-only stub to prevent breaking components while preventing role escalation
  const setRole = () => {
    console.warn('Security Alert: Client-side role switching is prohibited. Role is determined by backend authentication.');
  };

  const hasPermission = (permission) => {
    if (currentRole === ROLES.ADMIN) return true;
    const config = ROLE_CONFIG[currentRole];
    return config?.permissions?.includes(permission) || false;
  };

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setRole,
        currentProfile,
        hasPermission,
        availableRoles: Object.values(ROLE_CONFIG),
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

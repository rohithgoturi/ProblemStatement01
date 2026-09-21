/**
 * PragatiPath — Role Context
 * Manages active role and user profile for frontend demo role-switching.
 */
import { createContext, useContext, useState } from 'react';

export const ROLES = {
  SITE_SUPERVISOR: 'site_supervisor',
  PLANNER: 'planner',
  PROJECT_MANAGER: 'project_manager',
  ADMIN: 'admin',
};

export const ROLE_PROFILES = {
  [ROLES.SITE_SUPERVISOR]: {
    roleKey: ROLES.SITE_SUPERVISOR,
    label: 'Site Supervisor',
    name: 'Suresh Patel',
    title: 'Site Supervisor · Unit 2',
    email: 'supervisor@pragatipath.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    primaryCTA: 'Submit DPR',
    tagline: 'Field Execution & Site Progress',
  },
  [ROLES.PLANNER]: {
    roleKey: ROLES.PLANNER,
    label: 'Project Planner',
    name: 'Raghav Sharma',
    title: 'Project Planner · Schedule Operations',
    email: 'planner@pragatipath.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    primaryCTA: 'Review Matches',
    tagline: 'Schedule Reconciliation & AI Validation',
  },
  [ROLES.PROJECT_MANAGER]: {
    roleKey: ROLES.PROJECT_MANAGER,
    label: 'Project Manager',
    name: 'Rahul Sharma',
    title: 'Project Manager · Portfolio Lead',
    email: 'manager@pragatipath.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    primaryCTA: 'View Project Health',
    tagline: 'Project Health & Executive Oversight',
  },
  [ROLES.ADMIN]: {
    roleKey: ROLES.ADMIN,
    label: 'System Administrator',
    name: 'Ananya Verma',
    title: 'System Administrator · IT & Governance',
    email: 'admin@pragatipath.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    primaryCTA: 'Manage Users',
    tagline: 'Platform Governance & Access Management',
  },
};

const RoleContext = createContext(null);

const STORAGE_KEY = 'pragatipath_demo_role';

export function RoleProvider({ children }) {
  const [currentRole, setCurrentRole] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && ROLE_PROFILES[stored]) {
        return stored;
      }
      // Check auth object as fallback
      const auth = localStorage.getItem('pragatipath_auth');
      if (auth) {
        const parsed = JSON.parse(auth);
        if (parsed?.role && ROLE_PROFILES[parsed.role]) {
          return parsed.role;
        }
      }
    } catch {
      // ignore
    }
    return ROLES.PROJECT_MANAGER; // Default matching initial screenshot
  });

  const setRole = (roleKey) => {
    if (ROLE_PROFILES[roleKey]) {
      setCurrentRole(roleKey);
      localStorage.setItem(STORAGE_KEY, roleKey);
      // Also update auth profile if present
      try {
        const auth = localStorage.getItem('pragatipath_auth');
        const current = auth ? JSON.parse(auth) : {};
        localStorage.setItem(
          'pragatipath_auth',
          JSON.stringify({
            ...current,
            role: roleKey,
            name: ROLE_PROFILES[roleKey].name,
            email: ROLE_PROFILES[roleKey].email,
          })
        );
      } catch {
        // ignore
      }
    }
  };

  const currentProfile = ROLE_PROFILES[currentRole] || ROLE_PROFILES[ROLES.PROJECT_MANAGER];

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setRole,
        currentProfile,
        availableRoles: Object.values(ROLE_PROFILES),
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

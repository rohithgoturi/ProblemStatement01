// ============================================================
// PRAGATIPATH — Demo Store (Zustand)
// Cross-screen frontend state. No backend dependency.
// Backend developer: replace service calls in services/ layer.
// ============================================================

import { create } from 'zustand';
import type { DemoRole, DemoUser, Project, Activity, MatchRecord, Exception } from '@/types';
import { MOCK_ACTIVITIES } from '@/data/mock/activities';
import { MOCK_PROJECTS, DEFAULT_PROJECT_ID } from '@/data/mock/projects';
import { MOCK_MATCHES } from '@/data/mock/matches';
import { MOCK_EXCEPTIONS } from '@/data/mock/exceptions';

interface DemoState {
  // Auth
  isAuthenticated: boolean;
  currentUser: DemoUser | null;

  // Selected project
  selectedProjectId: string;
  projects: Project[];

  // Mutable activities (updated when match confirmed)
  activities: Activity[];

  // Matches (updated when confirmed/rejected)
  matches: MatchRecord[];

  // Exceptions (EXC-002 resolves on match confirm)
  exceptions: Exception[];

  // Actions
  login: (user: DemoUser) => void;
  logout: () => void;
  setRole: (role: DemoRole) => void;
  setSelectedProject: (id: string) => void;

  confirmMatch: (matchId: string, reviewer: string) => void;
  rejectMatch: (matchId: string, reason: string) => void;

  resetDemo: () => void;
}

const INITIAL_USER: DemoUser = {
  id: 'demo-user-001',
  name: 'Rajiv Mehta',
  role: 'project-manager',
  email: 'rajiv.mehta@demo.pragatipath.in',
  department: 'Project Controls',
  avatarInitials: 'RM',
};

export const useDemoStore = create<DemoState>((set) => ({
  isAuthenticated: false,
  currentUser: null,
  selectedProjectId: DEFAULT_PROJECT_ID,
  projects: MOCK_PROJECTS,
  activities: [...MOCK_ACTIVITIES],
  matches: [...MOCK_MATCHES],
  exceptions: [...MOCK_EXCEPTIONS],

  login: (user) => set({ isAuthenticated: true, currentUser: user }),

  logout: () => set({ isAuthenticated: false, currentUser: null }),

  setRole: (role) =>
    set((state) => ({
      currentUser: state.currentUser
        ? { ...state.currentUser, role }
        : { ...INITIAL_USER, role },
    })),

  setSelectedProject: (id) => set({ selectedProjectId: id }),

  /**
   * WOW sequence: confirming a match updates the matched activity
   * actualProgress and sets matchStatus to verified.
   * Also resolves the unverified-update exception (EXC-002).
   */
  confirmMatch: (matchId, reviewer) =>
    set((state) => {
      const match = state.matches.find((m) => m.id === matchId);
      if (!match) return {};

      const now = new Date().toISOString();
      const activityId = match.topCandidate.activityId;

      // Update match status
      const updatedMatches = state.matches.map((m) => {
        if (m.id !== matchId) return m;
        return {
          ...m,
          status: 'verified' as const,
          reviewer,
          reviewedAt: now,
          topCandidate: { ...m.topCandidate, status: 'verified' as const },
        };
      });

      // Update activity: set matchStatus to verified, update actualProgress from observation
      const updatedActivities = state.activities.map((a) => {
        if (a.id !== activityId) return a;
        const newActual = match.topCandidate.confidence > 85 ? 64 : a.actualProgress;
        return {
          ...a,
          actualProgress: newActual,
          variance: newActual - a.plannedProgress,
          matchStatus: 'verified' as const,
          reviewer,
          lastUpdated: now,
          status: newActual >= a.plannedProgress ? ('on-track' as const) : a.status,
        };
      });

      // Resolve EXC-002 (unverified-update for this activity)
      const updatedExceptions = state.exceptions.map((e) => {
        if (e.type === 'unverified-update' && e.activityId === activityId) {
          return { ...e, resolved: true };
        }
        return e;
      });

      return {
        matches: updatedMatches,
        activities: updatedActivities,
        exceptions: updatedExceptions,
      };
    }),

  rejectMatch: (matchId, reason) =>
    set((state) => {
      const now = new Date().toISOString();
      const updatedMatches = state.matches.map((m) => {
        if (m.id !== matchId) return m;
        return {
          ...m,
          status: 'rejected' as const,
          rejectionReason: reason,
          reviewedAt: now,
          reviewer: state.currentUser?.name ?? 'Reviewer',
          topCandidate: { ...m.topCandidate, status: 'rejected' as const },
        };
      });
      return { matches: updatedMatches };
    }),

  resetDemo: () =>
    set({
      isAuthenticated: false,
      currentUser: null,
      activities: [...MOCK_ACTIVITIES],
      matches: [...MOCK_MATCHES],
      exceptions: [...MOCK_EXCEPTIONS],
    }),
}));

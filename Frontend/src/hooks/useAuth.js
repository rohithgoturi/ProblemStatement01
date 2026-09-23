/**
 * useAuth — Authenticated Identity & Session Management Hook
 * Integrates with live Express JWT authentication and authoritative user identity.
 */
import { useState, useEffect, useCallback } from 'react';
import {
  login as loginService,
  signup as signupService,
  logout as logoutService,
  getCurrentUser,
} from '../services/api';

const AUTH_KEY = 'pragatipath_auth';
const TOKEN_KEY = 'pragatipath_token';

function getStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Strictly sanitizes user data before persistent storage.
 * Security Policy: Never persist email, password, confirmPassword, or passwordHash to localStorage.
 */
function sanitizeUserForStorage(user) {
  if (!user) return null;
  return {
    id: user.id || user._id,
    name: user.name,
    role: user.role,
    avatar: user.avatar || null,
  };
}

export function useAuth() {
  const [user, setUser] = useState(() => getStoredAuth());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Synchronize and verify current user identity with backend on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    let isMounted = true;
    getCurrentUser().then((res) => {
      if (!isMounted) return;
      if (res.data && res.data.id) {
        setUser(res.data);
        localStorage.setItem(AUTH_KEY, JSON.stringify(sanitizeUserForStorage(res.data)));
      } else if (res.error) {
        // Token invalid or user no longer exists
        setUser(null);
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(TOKEN_KEY);
      }
    }).catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const signup = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await signupService(userData);
    if (err) {
      setError(err);
    } else if (data?.user) {
      if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
      }
      setUser(data.user);
      localStorage.setItem(AUTH_KEY, JSON.stringify(sanitizeUserForStorage(data.user)));
    }
    setLoading(false);
    return { data, error: err };
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await loginService(credentials);
    if (err) {
      setError(err);
    } else if (data?.user) {
      if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
      }
      setUser(data.user);
      localStorage.setItem(AUTH_KEY, JSON.stringify(sanitizeUserForStorage(data.user)));
    }
    setLoading(false);
    return { data, error: err };
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    await logoutService();
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('pragatipath_demo_role');
    setLoading(false);
  }, []);

  const refreshUser = useCallback(async () => {
    const res = await getCurrentUser();
    if (res.data && res.data.id) {
      setUser(res.data);
      localStorage.setItem(AUTH_KEY, JSON.stringify(sanitizeUserForStorage(res.data)));
    }
    return res;
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    loading,
    isLoading: loading,
    error,
    signup,
    login,
    logout,
    refreshUser,
  };
}

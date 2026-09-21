/**
 * useAuth — Frontend-only auth state hook
 * Replace with real session/JWT management when backend is ready
 */
import { useState, useCallback } from 'react';
import { login as loginService, logout as logoutService } from '../services/api';

// Mock persistent state via localStorage
const AUTH_KEY = 'pragatipath_auth';

function getStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState(() => getStoredAuth());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await loginService(credentials);
    if (err) {
      setError(err);
    } else {
      setUser(data.user);
      localStorage.setItem(AUTH_KEY, JSON.stringify(data.user));
    }
    setLoading(false);
    return { data, error: err };
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    await logoutService();
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
    setLoading(false);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    logout,
  };
}

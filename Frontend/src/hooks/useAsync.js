/**
 * useAsync — Generic async data fetching hook
 * Provides loading, error, and data state management
 */
import { useState, useEffect, useCallback } from 'react';

export function useAsync(asyncFn, deps = [], immediate = true) {
  const [state, setState] = useState({ data: null, loading: immediate, error: null });

  const execute = useCallback(async (...args) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { data, error } = await asyncFn(...args);
      if (error) {
        setState({ data: null, loading: false, error });
      } else {
        setState({ data, loading: false, error: null });
      }
      return { data, error };
    } catch (err) {
      const message = err?.message || 'An error occurred';
      setState({ data: null, loading: false, error: message });
      return { data: null, error: message };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate, ...deps]);

  return { ...state, execute };
}

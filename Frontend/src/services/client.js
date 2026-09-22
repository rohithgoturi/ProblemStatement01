import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: automatically attaches JWT Bearer token if present
client.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('pragatipath_token');
    if (!token) {
      try {
        const stored = localStorage.getItem('pragatipath_auth');
        if (stored) {
          const parsed = JSON.parse(stored);
          token = parsed?.token;
        }
      } catch {
        // ignore
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: normalizes error messages and handles session expiration
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';

    // If session expired / unauthorized and not logging in/signing up, clean up session
    if (status === 401 && !error.config?.url?.includes('/auth/login') && !error.config?.url?.includes('/auth/signup')) {
      console.warn('Session expired or unauthorized. Logging out.');
      localStorage.removeItem('pragatipath_token');
      localStorage.removeItem('pragatipath_auth');
      localStorage.removeItem('pragatipath_demo_role');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(new Error(message));
  }
);

export default client;

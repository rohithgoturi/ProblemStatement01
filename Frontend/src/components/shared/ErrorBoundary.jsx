import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { MdErrorOutline, MdRefresh, MdHome } from 'react-icons/md';

/**
 * Route-level Error Boundary for React Router 6 errorElement
 */
export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error('RouteErrorBoundary caught an error:', error);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto text-2xl shadow-sm">
          <MdErrorOutline />
        </div>

        <div className="space-y-1">
          <h1 className="text-lg font-black text-slate-900">Dashboard Render Error</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            {error?.message || 'An unexpected runtime error occurred while rendering this view.'}
          </p>
        </div>

        {error?.stack && process.env.NODE_ENV === 'development' && (
          <div className="text-left bg-slate-900 text-slate-200 p-3 rounded-xl text-[11px] font-mono max-h-36 overflow-auto">
            {error.stack}
          </div>
        )}

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
          >
            <MdRefresh size={16} />
            <span>Reload Page</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 rounded-xl bg-[#0056D2] text-white font-bold text-xs hover:bg-blue-700 cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
          >
            <MdHome size={16} />
            <span>Go to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Class-based Error Boundary for component tree safety
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-rose-50/70 border border-rose-200 rounded-2xl text-center space-y-3 font-sans my-4">
          <MdErrorOutline size={28} className="mx-auto text-rose-600" />
          <h3 className="text-sm font-bold text-rose-900">Component Error</h3>
          <p className="text-xs text-rose-700 max-w-md mx-auto">
            {this.state.error?.message || 'A problem occurred displaying this component.'}
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-3.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 cursor-pointer"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

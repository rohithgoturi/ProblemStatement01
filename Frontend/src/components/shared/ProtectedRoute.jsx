/**
 * PragatiPath — Protected Route Guard
 * Enforces authentication and Role-Based Access Control (RBAC) on client-side routes.
 */
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { MdSecurity, MdArrowBack } from 'react-icons/md';

export function ProtectedRoute({ children, allowedRoles = null, requiredPermission = null }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-[#0056D2]/20 border-t-[#0056D2] rounded-full animate-spin mb-4" />
        <p className="text-sm text-slate-500 font-medium">Verifying authorization...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && Array.isArray(allowedRoles) && !allowedRoles.includes(user.role)) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
        <div className="w-16 h-16 bg-amber-50 border border-amber-200 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MdSecurity size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Access Restricted (403 Forbidden)</h2>
        <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
          Your current account role (<span className="font-semibold text-slate-800">{user.role}</span>) does not have permission to access this module. Please contact your system administrator if you require access.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0056D2] hover:bg-[#1A73E8] text-white rounded-xl text-sm font-semibold transition-colors"
          >
            <MdArrowBack size={18} />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return children;
}

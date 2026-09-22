/**
 * PragatiPath — Login Page
 * Clienter-inspired split-screen design system:
 * Left: Visual panel with infrastructure image, warm orange-navy gradient, and civil engineering value propositions.
 * Right: Clean form area with warm cream palette, orange focus states, Google authentication button, and role quick-fills.
 */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MdOutlinePerson,
  MdLockOutline,
  MdVisibility,
  MdVisibilityOff,
  MdCheckCircle,
  MdClose,
  MdArrowForward,
  MdEngineering,
  MdAssignmentInd,
  MdBuild,
  MdAdminPanelSettings,
} from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { Logo } from '../../components/shared/Logo';
import { useAuth } from '../../hooks/useAuth';
import { useRole } from '../../context/RoleContext';
import { forgotPassword } from '../../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setRole } = useRole();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [googleNotice, setGoogleNotice] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Handle standard login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setGoogleNotice('');

    if (!identifier.trim()) {
      setErrorMsg('Please enter your email or username');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password');
      return;
    }

    setIsLoading(true);
    try {
      const res = await login({
        email: identifier.trim(),
        password: password,
      });
      if (res?.error) {
        setErrorMsg(res.error);
        setIsLoading(false);
      } else {
        navigate('/dashboard');
      }
    } catch {
      setErrorMsg('Authentication failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  // Google OAuth click handler
  const handleGoogleAuth = () => {
    setErrorMsg('');
    // Check if Google Client ID is configured in client environment
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (googleClientId) {
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/google/callback')}&response_type=code&scope=openid%20email%20profile`;
    } else {
      setGoogleNotice(
        'Google Single Sign-On requires VITE_GOOGLE_CLIENT_ID configuration. Please sign in with your email & password or configure Google credentials in your environment.'
      );
    }
  };

  // Quick Role Selection Handler — pre-fills email for standard roles
  const handleRoleSelect = (roleKey) => {
    const targetRole = roleKey === 'site_engineer' ? 'site_supervisor' : roleKey;
    setRole(targetRole);
    setErrorMsg('');
    setGoogleNotice('');

    const roleEmails = {
      planner: 'planner@pragatipath.com',
      site_supervisor: 'supervisor@pragatipath.com',
      project_manager: 'manager@pragatipath.com',
      admin: 'admin@pragatipath.com',
    };

    setIdentifier(roleEmails[targetRole] || 'user@pragatipath.com');
    setPassword('');
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.trim()) return;
    setIsForgotLoading(true);

    try {
      await forgotPassword({ email: forgotEmail.trim() });
      setForgotSuccess(true);
      setTimeout(() => {
        setShowForgotModal(false);
        setForgotSuccess(false);
        setForgotEmail('');
      }, 3500);
    } catch (err) {
      setForgotSuccess(true);
    } finally {
      setIsForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-3 sm:p-6 lg:p-8 font-sans antialiased text-[#0B1320] bg-technical-grid relative">
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF5500]/[0.04] rounded-full blur-3xl"
      />

      {/* Main Authentication Card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-[#E8E1D5] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px] relative z-10">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Visual & Brand Panel (lg:col-span-5 xl:col-span-5)          */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 xl:col-span-5 relative bg-[#0B1320] text-white p-6 sm:p-10 flex flex-col justify-between overflow-hidden">
          {/* Background Infrastructure Photograph */}
          <div className="absolute inset-0 z-0">
            <img
              src="/auth-engineer.jpg"
              alt="Civil Engineer Reviewing Infrastructure Project"
              className="w-full h-full object-cover object-center opacity-35 filter brightness-95"
              loading="eager"
            />
            {/* Warm Brand Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/80 to-[#FF5500]/30" />
            <div className="absolute inset-0 bg-technical-grid opacity-20" />
          </div>

          {/* Top Brand Logo */}
          <div className="relative z-10 flex items-center justify-between">
            <Logo size="md" variant="white" to="/" />
            <Link
              to="/"
              className="text-xs font-semibold text-stone-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full"
            >
              Back to Home
            </Link>
          </div>

          {/* Center Content: Mission & Core Value Propositions */}
          <div className="relative z-10 my-8 sm:my-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold uppercase tracking-wider text-[#FF5500] mb-4 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
              <span>Project Execution Intelligence</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-4 text-white">
              Track the work. <br />
              <span className="text-[#FF5500]">Stay connected</span> to the plan.
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
              Connect daily site progress with project schedule baselines for complete execution visibility.
            </p>

            {/* Supporting Concise Points */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="flex items-start gap-2.5 text-xs text-stone-200">
                <span className="w-4 h-4 rounded-full bg-[#FF5500]/20 text-[#FF5500] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </span>
                <span>Connect site updates with project activities</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-stone-200">
                <span className="w-4 h-4 rounded-full bg-[#FF5500]/20 text-[#FF5500] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </span>
                <span>Review progress before updating the plan</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-stone-200">
                <span className="w-4 h-4 rounded-full bg-[#FF5500]/20 text-[#FF5500] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </span>
                <span>Keep every important change traceable</span>
              </div>
            </div>
          </div>

          {/* Bottom Footnote */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
            <span>Civil & Infrastructure Systems</span>
            <span className="font-mono text-stone-500">v2.4</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Clean Login Form (lg:col-span-7 xl:col-span-7)              */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 xl:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div>
            {/* Welcome Titles */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0B1320] tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-[#475569] mt-1.5">
                Sign in to continue managing your project progress.
              </p>
            </div>

            {/* Error Message Banner */}
            {errorMsg && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center justify-between">
                <span>{errorMsg}</span>
                <button
                  type="button"
                  onClick={() => setErrorMsg('')}
                  className="text-red-400 hover:text-red-700"
                >
                  <MdClose size={16} />
                </button>
              </div>
            )}

            {/* Google Notice Banner */}
            {googleNotice && (
              <div className="mb-4 p-3.5 rounded-xl bg-[#FFF2EB] border border-[#FFD8C7] text-xs font-medium text-[#0B1320] flex items-start justify-between gap-2">
                <span>{googleNotice}</span>
                <button
                  type="button"
                  onClick={() => setGoogleNotice('')}
                  className="text-stone-400 hover:text-stone-700 shrink-0"
                >
                  <MdClose size={16} />
                </button>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email / Username Input */}
              <div>
                <label className="block text-xs font-bold text-[#0B1320] mb-1.5">
                  Email / Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <MdOutlinePerson size={18} />
                  </span>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="engineer@pragatipath.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] placeholder:text-stone-400 focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all shadow-2xs"
                    disabled={isLoading}
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#0B1320]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-xs font-semibold text-[#FF5500] hover:text-[#E64400] transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <MdLockOutline size={18} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] placeholder:text-stone-400 focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all shadow-2xs"
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#0B1320] hover:bg-[#1A2332] text-white text-sm font-bold tracking-tight shadow-md hover:shadow-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign in</span>
                    <MdArrowForward size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E8E1D5]" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-bold">
                <span className="bg-white px-3 text-stone-400">or</span>
              </div>
            </div>

            {/* Continue with Google Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-full bg-[#FAF8F5] hover:bg-stone-100 text-[#0B1320] border border-[#E8E1D5] text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer"
            >
              <FcGoogle size={20} />
              <span>Continue with Google</span>
            </button>

            {/* Role Quick Selector for Testing / Demonstration */}
            <div className="mt-5 pt-4 border-t border-[#E8E1D5]/70">
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                Quick fill demo credentials:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'planner', label: 'Planner', icon: <MdEngineering size={14} /> },
                  { key: 'project_manager', label: 'Manager', icon: <MdAssignmentInd size={14} /> },
                  { key: 'site_supervisor', label: 'Supervisor', icon: <MdBuild size={14} /> },
                  { key: 'admin', label: 'Admin', icon: <MdAdminPanelSettings size={14} /> },
                ].map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => handleRoleSelect(r.key)}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#FAF8F5] hover:bg-[#FFF2EB] border border-[#E8E1D5] hover:border-[#FFD8C7] text-[11px] font-semibold text-[#0B1320] transition-colors cursor-pointer"
                  >
                    <span className="text-[#FF5500]">{r.icon}</span>
                    <span>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-6 pt-4 border-t border-[#E8E1D5]/80 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-2">
            <span>
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-[#FF5500] hover:text-[#E64400] transition-colors">
                Create account
              </Link>
            </span>
            <span className="text-[11px] text-stone-400">
              © {new Date().getFullYear()} PragatiPath
            </span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E8E1D5] shadow-xl p-6 sm:p-8 max-w-md w-full relative">
            <button
              type="button"
              onClick={() => {
                setShowForgotModal(false);
                setForgotSuccess(false);
              }}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors p-1"
            >
              <MdClose size={20} />
            </button>

            <h3 className="text-xl font-bold text-[#0B1320] mb-2">Reset Password</h3>
            <p className="text-xs text-[#64748B] mb-5">
              Enter your registered work email address and we'll send you instructions to reset your password.
            </p>

            {forgotSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <MdCheckCircle size={18} className="text-emerald-600 shrink-0" />
                <span>Password reset link sent! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0B1320] mb-1">
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="engineer@pragatipath.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] placeholder:text-stone-400 focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 py-2.5 rounded-full border border-[#E8E1D5] text-xs font-bold text-stone-600 hover:bg-stone-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isForgotLoading}
                    className="flex-1 py-2.5 rounded-full bg-[#0B1320] hover:bg-[#1A2332] disabled:opacity-50 text-white text-xs font-bold tracking-tight shadow transition-colors flex items-center justify-center gap-2"
                  >
                    {isForgotLoading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Send Reset Link</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

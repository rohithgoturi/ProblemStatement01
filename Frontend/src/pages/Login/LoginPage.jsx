/**
 * PragatiPath — Login Page (Phase 1)
 * High-fidelity split-screen implementation reproducing the reference login screen.
 */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MdOutlinePerson,
  MdLockOutline,
  MdVisibility,
  MdVisibilityOff,
  MdEngineering,
  MdBuild,
  MdAssignmentInd,
  MdAdminPanelSettings,
  MdCheckCircle,
  MdClose,
} from 'react-icons/md';
import { Logo } from '../../components/shared/Logo';
import { useAuth } from '../../hooks/useAuth';
import { useRole } from '../../context/RoleContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setRole } = useRole();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Handle standard login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

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
        email: identifier,
        password: password,
        role: 'project_manager',
      });
      if (res?.error) {
        setErrorMsg(res.error);
        setIsLoading(false);
      } else {
        navigate('/dashboard');
      }
    } catch {
      setErrorMsg('Authentication failed. Please try again.');
      setIsLoading(false);
    }
  };

  // Quick Role Selection Handler — prefills email for the chosen role.
  // The user must still enter their real password and submit the form.
  const handleRoleSelect = (roleKey, roleName) => {
    const targetRole = roleKey === 'site_engineer' ? 'site_supervisor' : roleKey;
    setRole(targetRole);
    setErrorMsg('');

    // Pre-fill the email field to guide the user (typical credentials for each role)
    const roleEmails = {
      planner: 'planner@pragatipath.com',
      site_supervisor: 'supervisor@pragatipath.com',
      project_manager: 'manager@pragatipath.com',
      admin: 'admin@pragatipath.com',
    };

    const email = roleEmails[targetRole] || 'user@pragatipath.com';
    setIdentifier(email);
    setPassword(''); // Clear password — user must enter real credentials
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSuccess(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSuccess(false);
      setForgotEmail('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F9] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans antialiased text-ink-primary">
      
      {/* Central Login Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-card-lg border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Login Form & Role Selection (lg:col-span-6 or 7)            */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 xl:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Top Brand Logo */}
            <div className="flex items-center justify-between">
              <Logo size="md" to="/" />
              <Link to="/" className="text-xs font-semibold text-slate-400 hover:text-brand-blue transition-colors">
                Back to home
              </Link>
            </div>

            {/* Welcome Titles */}
            <div className="mt-8 mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2347] tracking-tight">
                Welcome Back
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Sign in to your account to continue
              </p>
            </div>

            {/* Form Error Banner */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                {errorMsg}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email / Username Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email / Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MdOutlinePerson size={18} />
                  </span>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter your email or username"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MdLockOutline size={18} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-start">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-semibold text-brand-blue hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login CTA Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-brand-blue hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Login'
                )}
              </button>
            </form>

            {/* Don't have an account Link */}
            <div className="mt-3 text-center text-xs text-slate-500">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-brand-blue hover:underline">
                Create an account
              </Link>
            </div>

            {/* Separator Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-slate-400 font-medium">
                  Quick-fill credentials by role
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 text-center -mt-4">
              Selects role &amp; pre-fills email — enter your real password to sign in
            </p>

            {/* 2x2 Grid of Role Cards */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* Role 1: Planner */}
              <button
                type="button"
                onClick={() => handleRoleSelect('planner', 'Planner')}
                className="p-3 bg-white hover:bg-emerald-50/40 border border-slate-200 hover:border-emerald-500 rounded-xl flex items-center gap-3 transition-all text-left group shadow-2xs hover:shadow-xs"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MdEngineering size={18} />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-900 leading-none">
                    Planner
                  </div>
                </div>
              </button>

              {/* Role 2: Site Supervisor */}
              <button
                type="button"
                onClick={() => handleRoleSelect('site_supervisor', 'Site Supervisor')}
                className="p-3 bg-white hover:bg-blue-50/40 border border-slate-200 hover:border-brand-blue rounded-xl flex items-center gap-3 transition-all text-left group shadow-2xs hover:shadow-xs"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MdBuild size={18} />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-900 leading-none">
                    Site Supervisor
                  </div>
                </div>
              </button>

              {/* Role 3: Project Manager */}
              <button
                type="button"
                onClick={() => handleRoleSelect('project_manager', 'Project Manager')}
                className="p-3 bg-white hover:bg-purple-50/40 border border-slate-200 hover:border-purple-500 rounded-xl flex items-center gap-3 transition-all text-left group shadow-2xs hover:shadow-xs"
              >
                <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MdAssignmentInd size={18} />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-purple-900 leading-none">
                    Project Manager
                  </div>
                </div>
              </button>

              {/* Role 4: Admin */}
              <button
                type="button"
                onClick={() => handleRoleSelect('admin', 'Admin')}
                className="p-3 bg-white hover:bg-rose-50/40 border border-slate-200 hover:border-rose-500 rounded-xl flex items-center gap-3 transition-all text-left group shadow-2xs hover:shadow-xs"
              >
                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MdAdminPanelSettings size={18} />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-rose-900 leading-none">
                    Admin
                  </div>
                </div>
              </button>

            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="mt-8 text-center text-xs text-slate-400">
            © 2025 PragatiPath. All rights reserved.
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Construction Site Visual & Slogan (lg:col-span-6)          */}
        {/* ========================================================================= */}
        <div className="hidden lg:block lg:col-span-6 xl:col-span-6 relative bg-slate-100">
          <img
            src="/login-hero.jpg"
            alt="Construction worker overlooking building site with cranes"
            className="w-full h-full object-cover"
          />
        </div>

      </div>

      {/* ========================================================================= */}
      {/* FORGOT PASSWORD MODAL                                                     */}
      {/* ========================================================================= */}
      {showForgotModal && (
        <div className="fixed inset-0 z-modal bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-fade-in">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-md"
            >
              <MdClose size={20} />
            </button>

            <h3 className="text-lg font-bold text-[#0B2347] mb-2">Reset Password</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your registered email address and we'll send you a password recovery link.
            </p>

            {forgotSuccess ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-700 font-semibold">
                <MdCheckCircle size={16} /> Recovery instructions dispatched to your email!
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold bg-brand-blue text-white rounded-lg hover:bg-blue-700"
                  >
                    Send Link
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

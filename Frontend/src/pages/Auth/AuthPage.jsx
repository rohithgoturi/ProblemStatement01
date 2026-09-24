/**
 * PragatiPath — Unified Animated Authentication Experience
 * Split-screen desktop layout with smooth animated panel exchange:
 * - SIGNUP: [ SIGNUP IMAGE ] [ SIGNUP FORM ]
 * - LOGIN:  [ LOGIN FORM ] [ LOGIN IMAGE ]
 * 
 * Powered by GPU-accelerated CSS transforms for 60fps performance without layout flash or page reloads.
 * Uses official assets: signup.jpg and login.jpg.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  MdOutlinePerson,
  MdOutlineEmail,
  MdLockOutline,
  MdVisibility,
  MdVisibilityOff,
  MdEngineering,
  MdBuild,
  MdAssignmentInd,
  MdAdminPanelSettings,
  MdCheckCircle,
  MdClose,
  MdArrowForward,
  MdHelpOutline,
} from 'react-icons/md';
import { Logo } from '../../components/shared/Logo';
import { useAuth } from '../../hooks/useAuth';
import { useRole } from '../../context/RoleContext';
import { forgotPassword } from '../../services/api';

import loginAsset from '../../assets/login.jpg';
import signupAsset from '../../assets/signup.jpg';

export default function AuthPage({ initialMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useAuth();
  const { setRole: setGlobalRole } = useRole();

  // Mode derived from route (/signup vs /login) or prop
  const isSignup = location.pathname.startsWith('/signup') || initialMode === 'signup';
  const mode = isSignup ? 'signup' : 'login';

  // -------------------------------------------------------------
  // LOGIN FORM STATE
  // -------------------------------------------------------------
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [loginRole, setLoginRole] = useState('project_manager');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // -------------------------------------------------------------
  // SIGNUP FORM STATE
  // -------------------------------------------------------------
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'project_manager',
  });
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  const [signupShowConfirmPassword, setSignupShowConfirmPassword] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Clear form state, errors, and passwords on mount and when switching between LOGIN and SIGNUP
  useEffect(() => {
    setLoginError('');
    setSignupError('');
    setLoginPassword('');
    setLoginIdentifier('');
    setLoginShowPassword(false);
    setSignupData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'project_manager',
    });
    setSignupShowPassword(false);
    setSignupShowConfirmPassword(false);
  }, [mode]);

  // Roles available for civil engineering teams
  const roles = [
    { id: 'project_manager', label: 'Project Manager', icon: <MdAssignmentInd size={16} /> },
    { id: 'planner', label: 'Planner', icon: <MdEngineering size={16} /> },
    { id: 'site_supervisor', label: 'Site Supervisor', icon: <MdBuild size={16} /> },
    { id: 'admin', label: 'Admin', icon: <MdAdminPanelSettings size={16} /> },
  ];

  // Quick Role Selection Handler for Login
  const handleRoleQuickSelect = (roleKey) => {
    setLoginRole(roleKey);
    setLoginError('');
    setLoginPassword('');
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginIdentifier.trim() || !loginPassword) {
      setLoginError('Please enter both your work email and password.');
      return;
    }

    setLoginLoading(true);

    try {
      const res = await login({
        email: loginIdentifier.trim(),
        password: loginPassword,
      });

      if (res?.error) {
        setLoginError(res.error || 'Authentication failed. Please verify credentials.');
        setLoginLoading(false);
      } else {
        const userRole = res?.data?.user?.role || loginRole || 'project_manager';
        setGlobalRole(userRole);
        navigate('/dashboard');
      }
    } catch {
      setLoginError('Authentication service is currently unavailable. Please try again.');
      setLoginLoading(false);
    }
  };

  // Handle Signup Submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError('');
    setSignupSuccess('');

    if (!signupData.name.trim()) {
      setSignupError('Please enter your full name');
      return;
    }

    if (!signupData.email.trim()) {
      setSignupError('Please enter your work email address');
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(signupData.email.trim())) {
      setSignupError('Please enter a valid work email address');
      return;
    }

    if (!signupData.password || signupData.password.length < 6) {
      setSignupError('Password must be at least 6 characters long');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }

    setSignupLoading(true);

    try {
      const res = await signup({
        name: signupData.name.trim(),
        email: signupData.email.trim(),
        password: signupData.password,
        role: signupData.role,
      });

      if (res?.error) {
        setSignupError(res.error);
        setSignupLoading(false);
      } else {
        setGlobalRole(signupData.role);
        setSignupSuccess('Account created successfully! Redirecting to workspace...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      }
    } catch {
      setSignupError('Registration failed. Please try again.');
      setSignupLoading(false);
    }
  };

  // Real Forgot Password Submit
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
    } catch {
      setForgotSuccess(true);
    } finally {
      setIsForgotLoading(false);
    }
  };

  // Smooth mode switcher without full page reload
  const switchToSignup = (e) => {
    e?.preventDefault();
    navigate('/signup');
  };

  const switchToLogin = (e) => {
    e?.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen min-h-dvh bg-[#FAF8F5] flex flex-col justify-start sm:justify-center items-center py-4 sm:py-8 px-3 sm:px-6 lg:px-8 font-sans antialiased text-[#0B1320] bg-technical-grid relative overflow-x-hidden selection:bg-[#FF5500] selection:text-white">
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF5500]/[0.05] rounded-full blur-3xl"
      />

      {/* Main Authentication Split-Screen Card */}
      <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-[#E8E1D5] overflow-hidden min-h-0 lg:min-h-[720px] relative z-10 flex flex-col lg:block my-auto">
        
        {/* ========================================================================= */}
        {/* PANEL 1: IMAGE PANEL (Slides between LEFT and RIGHT on Desktop)          */}
        {/* SIGNUP: Left (0%) | LOGIN: Right (100%)                                  */}
        {/* ========================================================================= */}
        <div
          className={`w-full lg:w-1/2 h-44 sm:h-60 lg:h-full lg:absolute lg:inset-y-0 lg:top-0 lg:bottom-0 bg-[#0B1320] text-white z-20 overflow-hidden flex flex-col justify-between transition-transform duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isSignup
              ? 'order-1 lg:translate-x-0'
              : 'order-1 lg:translate-x-full'
          }`}
        >
          {/* Background Images with smooth Cross-fade and subtle scale */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* 1. SIGNUP Image */}
            <img
              src={signupAsset}
              alt="Civil Infrastructure Planning and Construction Engineer"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out hover:scale-103 ${
                isSignup
                  ? 'opacity-85 scale-100 z-10'
                  : 'opacity-0 scale-105 pointer-events-none z-0'
              }`}
            />

            {/* 2. LOGIN Image */}
            <img
              src={loginAsset}
              alt="Site Engineer with Construction Blueprint"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out hover:scale-103 ${
                !isSignup
                  ? 'opacity-85 scale-100 z-10'
                  : 'opacity-0 scale-105 pointer-events-none z-0'
              }`}
            />

            {/* Localized Readability Gradients (preserves image vibrancy while ensuring crisp text contrast) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320]/85 via-[#0B1320]/45 to-transparent z-15" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1320]/30 via-transparent to-transparent z-15" />
            <div className="absolute inset-0 bg-technical-grid opacity-10 z-15" />
          </div>

          {/* Top Brand & Home Bar */}
          <div className="relative z-20 p-3.5 sm:p-6 lg:p-8 flex items-center justify-between">
            <Logo size="md" variant="white" to="/" />
            <Link
              to="/"
              className="text-xs font-semibold text-stone-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/10 backdrop-blur-xs"
            >
              Back to Home
            </Link>
          </div>

          {/* Center Brand Editorial Typography — Concise & High Contrast */}
          <div className="relative z-20 px-4 sm:px-8 lg:px-10 my-auto py-2 sm:py-4 lg:py-6">
            {isSignup ? (
              /* SIGNUP: Concise Editorial Message */
              <div className="space-y-1 sm:space-y-3 animate-in fade-in duration-500 max-w-sm">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/40 border border-white/20 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#FF5500] backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
                  <span>PRAGATIPATH</span>
                </div>

                <h2 className="text-xl sm:text-3xl lg:text-5xl font-black tracking-tight leading-tight lg:leading-[1.08] text-white drop-shadow-sm">
                  Build progress <br />
                  <span className="text-[#FF5500]">with clarity.</span>
                </h2>

                <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed font-medium line-clamp-1 sm:line-clamp-none">
                  Connect field updates with project schedules.
                </p>
              </div>
            ) : (
              /* LOGIN: Concise Editorial Message */
              <div className="space-y-1 sm:space-y-3 animate-in fade-in duration-500 max-w-sm">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/40 border border-white/20 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#FF5500] backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
                  <span>PRAGATIPATH</span>
                </div>

                <h2 className="text-xl sm:text-3xl lg:text-5xl font-black tracking-tight leading-tight lg:leading-[1.08] text-white drop-shadow-sm">
                  Welcome <br />
                  <span className="text-[#FF5500]">back.</span>
                </h2>

                <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed font-medium line-clamp-1 sm:line-clamp-none">
                  Continue tracking project progress with clarity.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Footnote Bar (hidden on small mobile to give priority to the form) */}
          <div className="relative z-20 hidden sm:flex lg:flex p-5 sm:p-8 pt-3 border-t border-white/15 items-center justify-between text-[11px] text-stone-400">
            <span>Team OG Developers &bull; PragatiPath</span>
            <span className="font-mono text-stone-400">Planning-to-Execution Bridge</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PANEL 2: FORM PANEL (Slides between RIGHT and LEFT on Desktop)           */}
        {/* SIGNUP: Right (0%) | LOGIN: Left (-100%)                                 */}
        {/* ========================================================================= */}
        <div
          className={`w-full lg:w-1/2 p-4 sm:p-8 lg:p-12 flex flex-col justify-between bg-white z-10 transition-transform duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isSignup
              ? 'order-2 lg:absolute lg:inset-y-0 lg:top-0 lg:bottom-0 lg:left-1/2 lg:translate-x-0'
              : 'order-2 lg:absolute lg:inset-y-0 lg:top-0 lg:bottom-0 lg:left-1/2 lg:-translate-x-full'
          }`}
        >
          {isSignup ? (
            /* ===================================================================== */
            /* SIGNUP FORM CONTENT                                                   */
            /* ===================================================================== */
            <div className="animate-in fade-in duration-400">
              <div className="mb-5">
                <h1 className="text-2xl sm:text-3xl font-black text-[#0B1320] tracking-tight">
                  Create your account
                </h1>
                <p className="text-xs sm:text-sm text-[#475569] mt-1">
                  Register to link site reports with project schedules.
                </p>
              </div>

              {/* Error Banner */}
              {signupError && (
                <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center justify-between">
                  <span>{signupError}</span>
                  <button
                    type="button"
                    onClick={() => setSignupError('')}
                    className="text-red-400 hover:text-red-700 cursor-pointer"
                  >
                    <MdClose size={16} />
                  </button>
                </div>
              )}

              {/* Success Banner */}
              {signupSuccess && (
                <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                  <MdCheckCircle size={18} className="text-emerald-600 shrink-0" />
                  <span>{signupSuccess}</span>
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1320] mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <MdOutlinePerson size={17} />
                      </span>
                      <input
                        type="text"
                        required
                        value={signupData.name}
                        onChange={(e) => setSignupData((p) => ({ ...p, name: e.target.value }))}
                        placeholder="e.g. Vikram Sharma"
                        className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] placeholder:text-stone-400 focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all shadow-2xs"
                        disabled={signupLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1320] mb-1">
                      Work Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <MdOutlineEmail size={17} />
                      </span>
                      <input
                        type="email"
                        name="email"
                        autoComplete="username"
                        required
                        value={signupData.email}
                        onChange={(e) => setSignupData((p) => ({ ...p, email: e.target.value }))}
                        placeholder=""
                        className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all shadow-2xs"
                        disabled={signupLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Role Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#0B1320] mb-1.5">
                    Project Role
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                    {roles.map((r) => {
                      const isSelected = signupData.role === r.id;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setSignupData((p) => ({ ...p, role: r.id }))}
                          className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-xl border text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#0B1320] text-white border-[#0B1320] shadow-xs'
                              : 'bg-[#FAF8F5] text-stone-600 border-[#E8E1D5] hover:bg-stone-50 hover:text-[#0B1320]'
                          }`}
                        >
                          <span className={isSelected ? 'text-[#FF5500]' : 'text-stone-400'}>
                            {r.icon}
                          </span>
                          <span className="truncate">{r.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1320] mb-1">
                      Password (min. 6 chars)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <MdLockOutline size={17} />
                      </span>
                      <input
                        type={signupShowPassword ? 'text' : 'password'}
                        name="password"
                        autoComplete="new-password"
                        required
                        value={signupData.password}
                        onChange={(e) => setSignupData((p) => ({ ...p, password: e.target.value }))}
                        placeholder=""
                        className="w-full pl-9 pr-9 py-2 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all shadow-2xs"
                        disabled={signupLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setSignupShowPassword(!signupShowPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer"
                        tabIndex={-1}
                      >
                        {signupShowPassword ? <MdVisibilityOff size={16} /> : <MdVisibility size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1320] mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <MdLockOutline size={17} />
                      </span>
                      <input
                        type={signupShowConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        autoComplete="new-password"
                        required
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData((p) => ({ ...p, confirmPassword: e.target.value }))}
                        placeholder=""
                        className="w-full pl-9 pr-9 py-2 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all shadow-2xs"
                        disabled={signupLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setSignupShowConfirmPassword(!signupShowConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer"
                        tabIndex={-1}
                      >
                        {signupShowConfirmPassword ? <MdVisibilityOff size={16} /> : <MdVisibility size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={signupLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#0B1320] hover:bg-[#1A2332] text-white text-sm font-bold tracking-tight shadow-md hover:shadow-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer mt-2"
                >
                  {signupLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <MdArrowForward size={16} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* ===================================================================== */
            /* LOGIN FORM CONTENT                                                    */
            /* ===================================================================== */
            <div className="animate-in fade-in duration-400">
              <div className="mb-5">
                <h1 className="text-2xl sm:text-3xl font-black text-[#0B1320] tracking-tight">
                  Welcome back
                </h1>
                <p className="text-xs sm:text-sm text-[#475569] mt-1">
                  Sign in to your PragatiPath civil project workspace.
                </p>
              </div>

              {/* Error Banner */}
              {loginError && (
                <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center justify-between">
                  <span>{loginError}</span>
                  <button
                    type="button"
                    onClick={() => setLoginError('')}
                    className="text-red-400 hover:text-red-700 cursor-pointer"
                  >
                    <MdClose size={16} />
                  </button>
                </div>
              )}

              {/* Quick Role Fill Pills */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                    Quick Role Access
                  </span>
                  <span className="text-[10px] text-stone-400">Select workspace role</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                  {roles.map((r) => {
                    const isSelected = loginRole === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleRoleQuickSelect(r.id)}
                        className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1.5 sm:px-2 rounded-xl border text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0B1320] text-white border-[#0B1320] shadow-xs'
                            : 'bg-[#FAF8F5] text-stone-600 border-[#E8E1D5] hover:bg-stone-50 hover:text-[#0B1320]'
                        }`}
                      >
                        <span className={isSelected ? 'text-[#FF5500]' : 'text-stone-400'}>
                          {r.icon}
                        </span>
                        <span className="truncate">{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#0B1320] mb-1">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <MdOutlineEmail size={18} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="username"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder=""
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all shadow-2xs"
                      disabled={loginLoading}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-[#0B1320]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs font-bold text-[#FF5500] hover:text-[#E04B00] transition-colors cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <MdLockOutline size={18} />
                    </span>
                    <input
                      type={loginShowPassword ? 'text' : 'password'}
                      name="password"
                      autoComplete="current-password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder=""
                      className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all shadow-2xs"
                      disabled={loginLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setLoginShowPassword(!loginShowPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer"
                      tabIndex={-1}
                    >
                      {loginShowPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#0B1320] hover:bg-[#1A2332] text-white text-sm font-bold tracking-tight shadow-md hover:shadow-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer mt-2"
                >
                  {loginLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In to Workspace</span>
                      <MdArrowForward size={16} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Bottom Switcher Navigation Strip */}
          <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-[#E8E1D5]/80 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-2">
            {isSignup ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={switchToLogin}
                  className="font-bold text-[#FF5500] hover:text-[#E64400] transition-colors cursor-pointer underline decoration-[#FF5500]/40 ml-1"
                >
                  Sign in
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={switchToSignup}
                  className="font-bold text-[#FF5500] hover:text-[#E64400] transition-colors cursor-pointer underline decoration-[#FF5500]/40 ml-1"
                >
                  Create account
                </button>
              </span>
            )}

            <div className="flex items-center gap-3 text-[11px] text-stone-400">
              <Link to="/help" className="hover:text-stone-600 transition-colors">Help</Link>
              <span>&bull;</span>
              <Link to="/privacy" className="hover:text-stone-600 transition-colors">Privacy</Link>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* REAL FORGOT PASSWORD MODAL (Connected to Backend Token Dispatcher)       */}
      {/* ========================================================================= */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E1D5] shadow-2xl p-5 sm:p-8 max-w-md w-full relative my-auto max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setShowForgotModal(false);
                setForgotSuccess(false);
              }}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors p-1 cursor-pointer"
            >
              <MdClose size={20} />
            </button>

            <div className="flex items-center gap-2 mb-2 text-[#FF5500]">
              <MdHelpOutline size={22} />
              <h3 className="text-xl font-bold text-[#0B1320]">Reset Password</h3>
            </div>
            
            <p className="text-xs text-[#64748B] mb-5 leading-relaxed">
              Enter your registered work email address and we'll dispatch a secure reset link valid for 60 minutes.
            </p>

            {forgotSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <MdCheckCircle size={18} className="text-emerald-600 shrink-0" />
                  <span>Password reset link sent!</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  If an account exists for this email, you will receive reset instructions shortly. Please check your inbox and spam folder.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(false);
                      setForgotSuccess(false);
                    }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-xs transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0B1320] mb-1">
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="username"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder=""
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 transition-all shadow-2xs"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 py-2.5 rounded-full border border-[#E8E1D5] text-xs font-bold text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isForgotLoading}
                    className="flex-1 py-2.5 rounded-full bg-[#0B1320] hover:bg-[#1A2332] disabled:opacity-50 text-white text-xs font-bold tracking-tight shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
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

                <div className="text-center pt-2">
                  <Link
                    to="/reset-password"
                    onClick={() => setShowForgotModal(false)}
                    className="text-[11px] font-semibold text-[#FF5500] hover:underline"
                  >
                    Already have a reset token? Enter it here &rarr;
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

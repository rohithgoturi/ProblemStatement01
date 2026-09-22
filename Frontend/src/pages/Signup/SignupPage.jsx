/**
 * PragatiPath — Sign Up / Create Account Page
 * Clienter-inspired split-screen design system:
 * Left: Visual panel with infrastructure photo, warm orange-navy gradient, and core engineering benefits.
 * Right: Clean form area with warm cream palette, role pills, orange focus states, and Google authentication.
 */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
} from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { Logo } from '../../components/shared/Logo';
import { useAuth } from '../../hooks/useAuth';
import { useRole } from '../../context/RoleContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { setRole: setGlobalRole } = useRole();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'project_manager',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [googleNotice, setGoogleNotice] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const roles = [
    { id: 'project_manager', label: 'Project Manager', icon: <MdAssignmentInd size={16} /> },
    { id: 'planner', label: 'Planner', icon: <MdEngineering size={16} /> },
    { id: 'site_supervisor', label: 'Site Supervisor', icon: <MdBuild size={16} /> },
    { id: 'admin', label: 'Admin', icon: <MdAdminPanelSettings size={16} /> },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMsg) setErrorMsg('');
    if (googleNotice) setGoogleNotice('');
  };

  const handleGoogleAuth = () => {
    setErrorMsg('');
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (googleClientId) {
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/google/callback')}&response_type=code&scope=openid%20email%20profile`;
    } else {
      setGoogleNotice(
        'Google Single Sign-On requires VITE_GOOGLE_CLIENT_ID configuration. Please sign up using email & password or configure Google credentials in your environment.'
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setGoogleNotice('');

    // Client-side validations
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    if (!formData.email.trim()) {
      setErrorMsg('Please enter your email address');
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg('Please enter a valid work email address');
      return;
    }

    if (!formData.password) {
      setErrorMsg('Please enter a password');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const res = await signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
      });

      if (res?.error) {
        setErrorMsg(res.error);
        setIsLoading(false);
      } else {
        setGlobalRole(formData.role);
        setSuccessMsg('Account created successfully! Redirecting to your workspace...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch {
      setErrorMsg('Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-3 sm:p-6 lg:p-8 font-sans antialiased text-[#0B1320] bg-technical-grid relative">
      {/* Background Soft Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF5500]/[0.04] rounded-full blur-3xl"
      />

      {/* Main Authentication Card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-[#E8E1D5] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[700px] relative z-10">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Visual & Brand Panel (lg:col-span-5 xl:col-span-5)          */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 xl:col-span-5 relative bg-[#0B1320] text-white p-6 sm:p-10 flex flex-col justify-between overflow-hidden">
          {/* Background Infrastructure Photograph */}
          <div className="absolute inset-0 z-0">
            <img
              src="/auth-engineer.jpg"
              alt="Civil Infrastructure Planning and Execution"
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

          {/* Center Content: Product Message & 3 Benefits */}
          <div className="relative z-10 my-8 sm:my-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold uppercase tracking-wider text-[#FF5500] mb-4 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
              <span>CREATE YOUR ACCOUNT</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-4 text-white">
              Start tracking project progress <br />
              <span className="text-[#FF5500]">in one connected</span> workspace.
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
              Join infrastructure project planners and site supervisors keeping schedules aligned with actual field delivery.
            </p>

            {/* 3 Concise Benefits */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="flex items-start gap-2.5 text-xs text-stone-200">
                <span className="w-4 h-4 rounded-full bg-[#FF5500]/20 text-[#FF5500] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </span>
                <span>Connect project schedules and site updates</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-stone-200">
                <span className="w-4 h-4 rounded-full bg-[#FF5500]/20 text-[#FF5500] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </span>
                <span>Review suggested activity matches</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-stone-200">
                <span className="w-4 h-4 rounded-full bg-[#FF5500]/20 text-[#FF5500] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </span>
                <span>Keep progress changes traceable</span>
              </div>
            </div>
          </div>

          {/* Bottom Footnote */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
            <span>Human-in-the-Loop Governance</span>
            <span className="font-mono text-stone-500">v2.4</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Clean Sign Up Form (lg:col-span-7 xl:col-span-7)           */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 xl:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div>
            {/* Header Titles */}
            <div className="mb-5">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0B1320] tracking-tight">
                Create your account
              </h1>
              <p className="text-sm text-[#475569] mt-1">
                Register to link site reports with project schedules.
              </p>
            </div>

            {/* Error Banner */}
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

            {/* Success Banner */}
            {successMsg && (
              <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                <MdCheckCircle size={18} className="text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name & Email (Two Column on Tablet/Desktop) */}
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
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] placeholder:text-stone-400 focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all shadow-2xs"
                      disabled={isLoading}
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
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="engineer@project.com"
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] placeholder:text-stone-400 focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all shadow-2xs"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Engineering Role Selector */}
              <div>
                <label className="block text-xs font-bold text-[#0B1320] mb-1.5">
                  Project Role
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {roles.map((r) => {
                    const isSelected = formData.role === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleChange('role', r.id)}
                        className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
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

              {/* Password & Confirm Password (Two Column) */}
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
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-9 py-2 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] placeholder:text-stone-400 focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all shadow-2xs"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700"
                      tabIndex={-1}
                    >
                      {showPassword ? <MdVisibilityOff size={16} /> : <MdVisibility size={16} />}
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
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-9 py-2 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-[#0B1320] placeholder:text-stone-400 focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all shadow-2xs"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <MdVisibilityOff size={16} /> : <MdVisibility size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#0B1320] hover:bg-[#1A2332] text-white text-sm font-bold tracking-tight shadow-md hover:shadow-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer mt-2"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <MdArrowForward size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E8E1D5]" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-bold">
                <span className="bg-white px-3 text-stone-400">or</span>
              </div>
            </div>

            {/* Google Signup Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-full bg-[#FAF8F5] hover:bg-stone-100 text-[#0B1320] border border-[#E8E1D5] text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer"
            >
              <FcGoogle size={20} />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Footer Navigation */}
          <div className="mt-5 pt-3 border-t border-[#E8E1D5]/80 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-2">
            <span>
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-[#FF5500] hover:text-[#E64400] transition-colors">
                Sign in
              </Link>
            </span>
            <span className="text-[11px] text-stone-400">
              © {new Date().getFullYear()} PragatiPath
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

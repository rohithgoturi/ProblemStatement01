/**
 * PragatiPath — Sign Up / Create Account Page
 * High-fidelity implementation matching the application's split-screen design system.
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
} from 'react-icons/md';
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
  const [successMsg, setSuccessMsg] = useState('');

  const roles = [
    { id: 'project_manager', label: 'Project Manager', icon: MdAssignmentInd, color: 'text-purple-600 bg-purple-100' },
    { id: 'planner', label: 'Planner', icon: MdEngineering, color: 'text-emerald-600 bg-emerald-100' },
    { id: 'site_supervisor', label: 'Site Supervisor', icon: MdBuild, color: 'text-brand-blue bg-blue-100' },
    { id: 'admin', label: 'Admin', icon: MdAdminPanelSettings, color: 'text-rose-600 bg-rose-100' },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

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
      setErrorMsg('Please enter a valid email address');
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
        setSuccessMsg('Account created successfully! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      }
    } catch {
      setErrorMsg('Failed to create account. Please check your connection and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F9] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans antialiased text-ink-primary">
      {/* Central Signup Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-card-lg border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Signup Form (lg:col-span-6)                                 */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 xl:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Top Brand Logo & Home Navigation */}
            <div className="flex items-center justify-between">
              <Logo size="md" to="/" />
              <Link to="/" className="text-xs font-semibold text-slate-400 hover:text-brand-blue transition-colors">
                Back to home
              </Link>
            </div>

            {/* Title & Subtitle */}
            <div className="mt-6 mb-5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2347] tracking-tight">
                Create Account
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Join PragatiPath for real-time progress tracking & schedule linking
              </p>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                {errorMsg}
              </div>
            )}

            {/* Success Banner */}
            {successMsg && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 flex items-center gap-2">
                <MdCheckCircle size={18} /> {successMsg}
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MdOutlinePerson size={18} />
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* Email Address Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MdOutlineEmail size={18} />
                  </span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* Role Selector Grid */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Project Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((r) => {
                    const Icon = r.icon;
                    const isSelected = formData.role === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleChange('role', r.id)}
                        className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'border-brand-blue bg-blue-50/50 shadow-2xs ring-1 ring-brand-blue'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${r.color}`}>
                          <Icon size={16} />
                        </div>
                        <span className={`text-xs font-bold ${isSelected ? 'text-brand-blue' : 'text-slate-700'}`}>
                          {r.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MdLockOutline size={18} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="At least 6 characters"
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

              {/* Confirm Password Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MdLockOutline size={18} />
                  </span>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 mt-2 bg-brand-blue hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Link to Login Page */}
            <div className="mt-5 text-center text-xs text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-brand-blue hover:underline">
                Sign in here
              </Link>
            </div>
          </div>

          {/* Copyright Footer */}
          <div className="mt-6 text-center text-xs text-slate-400">
            © 2025 PragatiPath. All rights reserved.
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Hero Visual Image (lg:col-span-6)                           */}
        {/* ========================================================================= */}
        <div className="hidden lg:block lg:col-span-6 xl:col-span-6 relative bg-slate-100">
          <img
            src="/login-hero.jpg"
            alt="Infrastructure construction site project management"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

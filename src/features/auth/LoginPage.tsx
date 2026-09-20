import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  HardHat,
  Wrench,
  Briefcase,
  ShieldAlert
} from 'lucide-react';
import { useDemoStore } from '@/store/demoStore';
import type { UserRole } from '@/types';
import { cn } from '@/lib/utils';

// ============================================================
// PROJECTAI BRIDGE — Login Page
// Primary Visual Reference: Reference Image 2
// Composition:
// - Left: Welcome Back, Email/Username, Password, Login button,
//   "Or continue with role" 4-card matrix (Planner, Site Engineer, Project Manager, Admin)
// - Right: Construction Site photo with Engineer holding tablet +
//   "Smarter Construction with AI" overlay text
// ============================================================

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useDemoStore();

  const [identifier, setIdentifier] = useState('raghav.sankar@projectaibridge.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('project-manager');

  const ROLE_USERS: Record<UserRole, { name: string; email: string }> = {
    'project-manager':   { name: 'Raghav Sankar', email: 'raghav.sankar@projectaibridge.com' },
    'planning-engineer': { name: 'Sunil Rao',     email: 'sunil.rao@projectaibridge.com' },
    'site-execution':    { name: 'Amit Verma',    email: 'amit.verma@projectaibridge.com' },
    'admin-auditor':     { name: 'Priya Sharma',  email: 'priya.sharma@projectaibridge.com' },
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const userMeta = ROLE_USERS[selectedRole];
    login({
      id: `user-${selectedRole}`,
      name: userMeta.name,
      role: selectedRole,
      email: userMeta.email,
    });
    navigate('/dashboard');
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const userMeta = ROLE_USERS[role];
    login({
      id: `user-${role}`,
      name: userMeta.name,
      role: role,
      email: userMeta.email,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8F9FF] items-center justify-center p-0 md:p-6 lg:p-8 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Central Split-Screen Card Container */}
      <div className="w-full max-w-7xl min-h-screen md:min-h-[840px] bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-200/80">
        
        {/* ============================================================
            LEFT PANEL: Login Form & Role Selection (Matches Image 2)
            ============================================================ */}
        <div className="w-full lg:w-[50%] p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-white overflow-y-auto">
          
          <div>
            {/* Logo */}
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
                  <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                    <path d="M6 31V10L14 5V31" stroke="#0062FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 12L22 7V31" stroke="#0062FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 14L30 9V31" stroke="#0062FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="6" y1="16" x2="14" y2="16" stroke="#0062FF" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="6" y1="21" x2="14" y2="21" stroke="#0062FF" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="6" y1="26" x2="14" y2="26" stroke="#0062FF" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="14" y1="18" x2="22" y2="18" stroke="#0062FF" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="14" y1="24" x2="22" y2="24" stroke="#0062FF" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="22" y1="19" x2="30" y2="19" stroke="#0062FF" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="22" y1="25" x2="30" y2="25" stroke="#0062FF" strokeWidth="1.6" strokeLinecap="round"/>
                    <path d="M3 31H33" stroke="#0062FF" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex items-baseline text-2xl font-bold tracking-tight">
                  <span className="text-[#0A1C36]">ProjectAI</span>
                  <span className="text-[#0062FF] ml-1.5">Bridge</span>
                </div>
              </Link>
            </div>

            {/* Welcome Headings */}
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-[#0B192C] tracking-tight">
                Welcome Back
              </h1>
              <p className="text-sm text-slate-500 mt-1.5">
                Sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Email / Username Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="email">
                  Email / Username
                </label>
                <div className="relative rounded-lg border border-slate-200 focus-within:border-[#0062FF] focus-within:ring-2 focus-within:ring-[#0062FF]/20 transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User size={16} />
                  </div>
                  <input
                    id="email"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter your email or username"
                    className="block w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-transparent placeholder-slate-400 focus:outline-none rounded-lg"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="password">
                  Password
                </label>
                <div className="relative rounded-lg border border-slate-200 focus-within:border-[#0062FF] focus-within:ring-2 focus-within:ring-[#0062FF]/20 transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock size={16} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="block w-full pl-10 pr-10 py-2.5 text-sm text-slate-900 bg-transparent placeholder-slate-400 focus:outline-none rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="pt-0.5">
                <a
                  href="#forgot"
                  onClick={(e) => { e.preventDefault(); alert('Demo: Password reset instructions sent.'); }}
                  className="text-xs font-semibold text-[#0062FF] hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 h-11 rounded-lg bg-[#0062FF] hover:bg-[#0051DC] active:scale-[0.99] text-white font-semibold text-sm shadow-sm transition-all"
              >
                Login
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 font-medium text-slate-400">
                  Or continue with role
                </span>
              </div>
            </div>

            {/* Role Cards Matrix (2x2 Grid matching Image 2) */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* Role 1: Planner */}
              <button
                type="button"
                onClick={() => handleRoleSelect('planning-engineer')}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-150',
                  selectedRole === 'planning-engineer'
                    ? 'border-[#0062FF] bg-[#EAF2FE]/50 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                )}
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <HardHat size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Planner</h4>
                </div>
              </button>

              {/* Role 2: Site Engineer */}
              <button
                type="button"
                onClick={() => handleRoleSelect('site-execution')}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-150',
                  selectedRole === 'site-execution'
                    ? 'border-[#0062FF] bg-[#EAF2FE]/50 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                )}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Wrench size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Site Engineer</h4>
                </div>
              </button>

              {/* Role 3: Project Manager */}
              <button
                type="button"
                onClick={() => handleRoleSelect('project-manager')}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-150',
                  selectedRole === 'project-manager'
                    ? 'border-[#0062FF] bg-[#EAF2FE]/50 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                )}
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Project Manager</h4>
                </div>
              </button>

              {/* Role 4: Admin */}
              <button
                type="button"
                onClick={() => handleRoleSelect('admin-auditor')}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-150',
                  selectedRole === 'admin-auditor'
                    ? 'border-[#0062FF] bg-[#EAF2FE]/50 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                )}
              >
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                  <ShieldAlert size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Admin</h4>
                </div>
              </button>

            </div>

          </div>

          {/* Footer Copyright */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              © 2025 ProjectAI Bridge. All rights reserved.
            </p>
          </div>

        </div>

        {/* ============================================================
            RIGHT PANEL: Hero Construction Image + Text (Matches Image 2)
            ============================================================ */}
        <div className="hidden lg:flex w-[50%] relative overflow-hidden bg-slate-900 flex-col justify-between p-12">
          {/* Background Construction Photo */}
          <img
            src="/hero-construction.jpg"
            alt="Engineer on site with digital tablet"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          
          {/* Subtle lighting gradient to ensure crisp typography */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-transparent pointer-events-none" />

          {/* Top Text Content (Matches Image 2) */}
          <div className="relative z-10 pt-4">
            <h2 className="text-4xl font-extrabold text-[#0B192C] tracking-tight leading-[1.2]">
              Smarter Construction <br />
              with AI
            </h2>
            <p className="text-base text-slate-600 mt-3 font-medium max-w-sm">
              Connect people, data and progress — all in one place.
            </p>
          </div>

          <div className="relative z-10" />
        </div>

      </div>

    </div>
  );
}

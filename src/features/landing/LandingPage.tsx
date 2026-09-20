import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Link2,
  Crosshair,
  Clock,
  Users,
  Brain,
  Timer,
  Target,
  Play,
  Sun,
  Moon,
  X,
  Cpu,
  ArrowRight,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================
// PROJECTAI BRIDGE — Landing Page
// Primary Visual Reference: Reference Image 3
// Composition:
// 1. Navigation Header
// 2. Hero with background site engineer photo + Floating "AI Matching" Card
// 3. 4 Feature Cards Row
// 4. Midnight Navy 5-Metric Impact Banner
// 5. "Trusted by Leading Construction & Infrastructure Companies" Logos Bar
// ============================================================

export default function LandingPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  return (
    <div className={cn(
      'min-h-screen flex flex-col font-sans transition-colors duration-200 selection:bg-blue-100 selection:text-blue-900',
      isDarkMode ? 'bg-[#0B1528] text-slate-100' : 'bg-white text-slate-900'
    )}>

      {/* ============================================================
          TOP NAVIGATION BAR (Matches Image 3)
          ============================================================ */}
      <header className={cn(
        'w-full sticky top-0 z-40 backdrop-blur-md transition-colors border-b',
        isDarkMode
          ? 'bg-[#0B1528]/95 border-slate-800'
          : 'bg-white/95 border-neutral-100'
      )}>
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 h-[76px] flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
              <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
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
              <span className={cn(isDarkMode ? 'text-white' : 'text-[#0A1C36]')}>
                ProjectAI
              </span>
              <span className="text-[#0062FF] ml-1.5">
                Bridge
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium" aria-label="Main Navigation">
            <button
              onClick={() => { setActiveNav('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={cn(
                'relative py-2 transition-colors',
                activeNav === 'home'
                  ? 'text-[#0062FF] font-semibold'
                  : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              )}
            >
              Home
              {activeNav === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0062FF] rounded-full" />
              )}
            </button>

            <button
              onClick={() => {
                setActiveNav('features');
                document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={cn(
                'py-2 transition-colors',
                activeNav === 'features'
                  ? 'text-[#0062FF] font-semibold'
                  : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              )}
            >
              Features
            </button>

            <button
              onClick={() => {
                setActiveNav('how-it-works');
                setDemoModalOpen(true);
              }}
              className={cn(
                'py-2 transition-colors',
                activeNav === 'how-it-works'
                  ? 'text-[#0062FF] font-semibold'
                  : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              )}
            >
              How It Works
            </button>

            <button
              onClick={() => {
                setActiveNav('about');
                document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={cn(
                'py-2 transition-colors',
                activeNav === 'about'
                  ? 'text-[#0062FF] font-semibold'
                  : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              )}
            >
              About
            </button>
          </nav>

          {/* Right Controls: Theme Toggle + Login + Get Started */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle Pill */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle theme"
              className={cn(
                'h-9 px-2.5 rounded-full flex items-center gap-2 border transition-all',
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-300'
              )}
            >
              <span className={cn(
                'p-1 rounded-full flex items-center justify-center transition-colors',
                !isDarkMode ? 'bg-white shadow-xs text-amber-500' : 'text-slate-400'
              )}>
                <Sun size={14} />
              </span>
              <span className={cn(
                'p-1 rounded-full flex items-center justify-center transition-colors',
                isDarkMode ? 'bg-slate-700 shadow-xs text-blue-400' : 'text-slate-400'
              )}>
                <Moon size={14} />
              </span>
            </button>

            {/* Login Button */}
            <Link
              to="/login"
              className={cn(
                'hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-lg text-sm font-semibold border transition-all duration-150',
                isDarkMode
                  ? 'border-slate-700 bg-slate-800/80 text-white hover:bg-slate-700'
                  : 'border-neutral-300 bg-white text-[#0A1C36] hover:bg-neutral-50 hover:border-neutral-400 shadow-xs'
              )}
            >
              Login
            </Link>

            {/* Get Started Button */}
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center h-10 px-5 sm:px-6 rounded-lg text-sm font-semibold text-white bg-[#0062FF] hover:bg-[#0051DC] active:scale-[0.98] shadow-sm transition-all duration-150"
            >
              Get Started
            </Link>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-neutral-100"
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className={cn(
            'md:hidden border-b px-6 py-4 space-y-3 transition-colors',
            isDarkMode ? 'bg-[#0B1528] border-slate-800' : 'bg-white border-neutral-200'
          )}>
            <div className="flex flex-col gap-2 font-medium">
              <button
                onClick={() => { setActiveNav('home'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left py-2 text-[#0062FF] font-semibold"
              >
                Home
              </button>
              <button
                onClick={() => { setActiveNav('features'); setMobileMenuOpen(false); document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-left py-2 text-slate-600 hover:text-slate-900"
              >
                Features
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); setDemoModalOpen(true); }}
                className="text-left py-2 text-slate-600 hover:text-slate-900"
              >
                How It Works
              </button>
              <button
                onClick={() => { setActiveNav('about'); setMobileMenuOpen(false); document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-left py-2 text-slate-600 hover:text-slate-900"
              >
                About
              </button>
            </div>
            <div className="pt-3 border-t border-neutral-200/80 flex gap-2">
              <Link
                to="/login"
                className="flex-1 text-center py-2.5 rounded-lg border border-neutral-300 font-semibold text-sm"
              >
                Login
              </Link>
              <Link
                to="/dashboard"
                className="flex-1 text-center py-2.5 rounded-lg bg-[#0062FF] text-white font-semibold text-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================
          HERO SECTION (Exact Match to Reference Image 3)
          ============================================================ */}
      <section className="relative w-full overflow-hidden pt-4 pb-10 sm:py-8 lg:py-12">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="relative rounded-3xl overflow-hidden min-h-[520px] lg:min-h-[580px] flex items-center">
            
            {/* Background Image on Right with Seamless Fade to Left */}
            <div className="absolute inset-0 z-0">
              <img
                src="/hero-construction.jpg"
                alt="Construction engineer on site holding tablet"
                className="w-full h-full object-cover object-right md:object-[center_right]"
              />
              
              <div
                className={cn(
                  'absolute inset-0 transition-colors duration-200',
                  isDarkMode
                    ? 'bg-gradient-to-r from-[#0B1528] via-[#0B1528]/95 via-45% to-transparent lg:to-transparent/20'
                    : 'bg-gradient-to-r from-white via-white/95 via-45% to-transparent lg:to-transparent/10'
                )}
              />
              
              <div
                className={cn(
                  'absolute inset-0 md:hidden',
                  isDarkMode ? 'bg-[#0B1528]/70' : 'bg-white/70'
                )}
              />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full py-8 lg:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column: Text & Actions */}
                <div className="lg:col-span-7 xl:col-span-7 pr-0 lg:pr-6">
                  
                  {/* Pill Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F1FD] border border-[#D0E2FB] mb-5">
                    <span className="text-[11px] sm:text-xs font-bold tracking-wide text-[#0056D2] uppercase">
                      AI-POWERED PROJECT PROGRESS INTELLIGENCE
                    </span>
                  </div>

                  {/* Main Display Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold leading-[1.12] tracking-tight mb-5">
                    <span className={isDarkMode ? 'text-white' : 'text-[#0A1C36]'}>
                      Bridge the Gap Between
                    </span>
                    <br />
                    <span className="text-[#0062FF]">
                      Plan and Execution
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className={cn(
                    'text-base sm:text-lg leading-relaxed max-w-xl mb-8',
                    isDarkMode ? 'text-slate-300' : 'text-[#475569]'
                  )}>
                    An intelligent layer that captures site progress, understands it with AI,
                    and links it to the right activities in your project schedule.
                    <br />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 mt-1 inline-block">
                      Real-time. Accurate. Actionable.
                    </span>
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Primary Button: Get Started */}
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-lg bg-[#0062FF] hover:bg-[#0051DC] active:scale-[0.98] text-white font-semibold text-base shadow-sm transition-all duration-150"
                    >
                      <Play size={15} className="fill-white" />
                      <span>Get Started</span>
                    </Link>

                    {/* Secondary Button: Watch Demo */}
                    <button
                      onClick={() => setDemoModalOpen(true)}
                      className={cn(
                        'inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-lg font-semibold text-base border transition-all duration-150',
                        isDarkMode
                          ? 'border-slate-700 bg-slate-800/90 text-white hover:bg-slate-700'
                          : 'border-[#93C5FD] bg-white hover:bg-neutral-50 text-[#0A1C36] shadow-xs'
                      )}
                    >
                      <Play size={15} className="text-[#0062FF] fill-[#0062FF]" />
                      <span>Watch Demo</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Floating AI Matching Card over the Engineer Scene */}
                <div className="lg:col-span-5 xl:col-span-5 relative min-h-[140px] sm:min-h-[220px] lg:min-h-[400px]">
                  <div className={cn(
                    'absolute top-4 sm:top-12 lg:top-24 left-0 sm:left-4 z-20',
                    'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md',
                    'border border-white/80 dark:border-slate-700',
                    'rounded-2xl p-3.5 shadow-xl flex items-center gap-3.5',
                    'max-w-[280px]'
                  )}>
                    <div className="w-10 h-10 rounded-xl bg-[#0062FF] flex items-center justify-center text-white shrink-0 shadow-sm">
                      <div className="relative flex items-center justify-center">
                        <Cpu size={20} strokeWidth={1.75} />
                        <span className="absolute text-[8px] font-black tracking-tighter text-white">AI</span>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        AI Matching
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        Finding the right activities from your schedule...
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          4 FEATURE HIGHLIGHT CARDS ROW (Exact Match to Image 3)
          ============================================================ */}
      <section id="features-section" className="w-full py-4 sm:py-6">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Feature 1 */}
            <div className={cn(
              'p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4',
              isDarkMode
                ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                : 'bg-white border-neutral-150 hover:border-neutral-250 shadow-xs'
            )}>
              <div className="w-12 h-12 rounded-xl bg-[#EAF2FE] dark:bg-blue-950/60 flex items-center justify-center text-[#0062FF] shrink-0">
                <FileText size={22} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                  AI-Powered Matching
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Automatically links site reports to schedule activities.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className={cn(
              'p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4',
              isDarkMode
                ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                : 'bg-white border-neutral-150 hover:border-neutral-250 shadow-xs'
            )}>
              <div className="w-12 h-12 rounded-xl bg-[#EAF2FE] dark:bg-blue-950/60 flex items-center justify-center text-[#0062FF] shrink-0">
                <Brain size={22} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                  Human-in-the-Loop
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Engineers validate and correct for higher accuracy.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className={cn(
              'p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4',
              isDarkMode
                ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                : 'bg-white border-neutral-150 hover:border-neutral-250 shadow-xs'
            )}>
              <div className="w-12 h-12 rounded-xl bg-[#EAF2FE] dark:bg-blue-950/60 flex items-center justify-center text-[#0062FF] shrink-0">
                <Timer size={22} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                  Real-time Insights
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Track progress, delays and risks instantly.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className={cn(
              'p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4',
              isDarkMode
                ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                : 'bg-white border-neutral-150 hover:border-neutral-250 shadow-xs'
            )}>
              <div className="w-12 h-12 rounded-xl bg-[#EAF2FE] dark:bg-blue-950/60 flex items-center justify-center text-[#0062FF] shrink-0">
                <Target size={22} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                  End-to-End Visibility
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  From <span className="font-semibold text-slate-700 dark:text-slate-300">DPR</span> to reports — <span className="text-[#0062FF] font-medium">all in one</span> platform.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          METRICS & IMPACT BANNER (Exact Match to Image 3)
          ============================================================ */}
      <section id="stats-section" className="w-full py-4 sm:py-6">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="relative rounded-2xl bg-[#08234D] text-white py-8 px-6 sm:px-10 lg:px-12 shadow-xl overflow-hidden">
            
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 items-center">
              
              {/* Stat 1: 1,240+ Reports Processed */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center shrink-0 bg-white/5">
                  <FileText size={20} className="text-white" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                    1,240+
                  </div>
                  <div className="text-xs text-blue-200/90 font-medium mt-1">
                    Reports Processed
                  </div>
                </div>
              </div>

              {/* Stat 2: 980+ Activities Linked */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center shrink-0 bg-white/5">
                  <Link2 size={20} className="text-white" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                    980+
                  </div>
                  <div className="text-xs text-blue-200/90 font-medium mt-1">
                    Activities Linked
                  </div>
                </div>
              </div>

              {/* Stat 3: 92% Matching Accuracy */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center shrink-0 bg-white/5">
                  <Crosshair size={20} className="text-white" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                    92%
                  </div>
                  <div className="text-xs text-blue-200/90 font-medium mt-1">
                    Matching Accuracy
                  </div>
                </div>
              </div>

              {/* Stat 4: 350+ Hours Saved */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center shrink-0 bg-white/5">
                  <Clock size={20} className="text-white" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                    350+
                  </div>
                  <div className="text-xs text-blue-200/90 font-medium mt-1">
                    Hours Saved
                  </div>
                </div>
              </div>

              {/* Stat 5: 25+ Active Projects */}
              <div className="flex items-center gap-3.5 col-span-2 md:col-span-1">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center shrink-0 bg-white/5">
                  <Users size={20} className="text-white" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                    25+
                  </div>
                  <div className="text-xs text-blue-200/90 font-medium mt-1">
                    Active Projects
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          TRUSTED BY LOGOS BAR (Exact Match to Image 3)
          ============================================================ */}
      <section className="w-full py-10 sm:py-12 border-t border-neutral-100 dark:border-slate-800">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] bg-neutral-200 dark:bg-slate-800 flex-1 max-w-[120px] hidden sm:block" />
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 text-center tracking-wide">
              Trusted by Leading Construction &amp; Infrastructure Companies
            </p>
            <div className="h-[1px] bg-neutral-200 dark:bg-slate-800 flex-1 max-w-[120px] hidden sm:block" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 sm:gap-8 items-center justify-items-center opacity-85 hover:opacity-100 transition-opacity">
            {/* 1. L&T Construction */}
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <div className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center font-black text-[10px] tracking-tighter">
                L&T
              </div>
              <div className="text-left font-bold text-xs tracking-tight leading-tight">
                L&T Construction
              </div>
            </div>

            {/* 2. Reliance Infrastructure */}
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <div className="w-5 h-5 rounded-full bg-current flex items-center justify-center text-white dark:text-slate-900 text-[10px] font-bold">
                R
              </div>
              <div className="text-left">
                <div className="font-bold text-xs tracking-tight leading-none">Reliance</div>
                <div className="text-[9px] tracking-tighter text-slate-500 leading-none mt-0.5">Infrastructure</div>
              </div>
            </div>

            {/* 3. TATA PROJECTS */}
            <div className="text-slate-600 dark:text-slate-400 font-bold text-xs tracking-widest uppercase">
              <span className="font-black text-sm tracking-wider">TATA</span> PROJECTS
            </div>

            {/* 4. IRB INFRASTRUCTURE */}
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <div className="px-1.5 py-0.5 bg-slate-700 dark:bg-slate-400 text-white dark:text-slate-900 text-[10px] font-black rounded-xs">
                IRB
              </div>
              <div className="text-[10px] font-bold tracking-tighter uppercase">
                INFRASTRUCTURE
              </div>
            </div>

            {/* 5. JSW */}
            <div className="text-slate-700 dark:text-slate-300 font-black text-lg tracking-tight italic">
              JSW
            </div>

            {/* 6. adani */}
            <div className="text-slate-600 dark:text-slate-400 font-semibold text-base tracking-tight">
              adani
            </div>

            {/* 7. UltraTech */}
            <div className="text-left text-slate-600 dark:text-slate-400 col-span-2 sm:col-span-1">
              <div className="font-extrabold text-xs tracking-tight">UltraTech</div>
              <div className="text-[8px] italic text-slate-500 tracking-tighter">The Engineer's Choice</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          INTERACTIVE DEMO MODAL ("Watch Demo")
          ============================================================ */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-neutral-200 dark:border-slate-800 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0062FF]/10 text-[#0062FF] flex items-center justify-center">
                <Play size={18} className="fill-current ml-0.5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  ProjectAI Bridge — Interactive Walkthrough
                </h3>
                <p className="text-xs text-slate-500">
                  Automated field progress understanding in 3 simple steps
                </p>
              </div>
            </div>

            <div className="space-y-4 my-6">
              <div className="p-3.5 rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/30 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0062FF] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Capture Unstructured Site Data</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Engineers submit field notes in natural language, Hinglish, voice memos, or daily PDF logs directly from site.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/30 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0062FF] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">AI Multi-Factor Reasoning</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Our engine cross-checks linear chainage, WBS activity codes, crew rosters, and timestamps with 92%+ confidence.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/30 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0062FF] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Instant Schedule S-Curve Alignment</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Progress flows automatically into the Primavera/MS Project schedule, clearing delay flags and notifying directors.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-slate-800">
              <button
                onClick={() => setDemoModalOpen(false)}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setDemoModalOpen(false);
                  navigate('/dashboard');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0062FF] hover:bg-[#0051DC] text-white text-xs font-semibold"
              >
                <span>Launch Interactive Dashboard</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className={cn(
        'mt-auto py-6 border-t text-xs transition-colors',
        isDarkMode
          ? 'bg-[#081020] border-slate-800 text-slate-500'
          : 'bg-neutral-50 border-neutral-200 text-slate-500'
      )}>
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">ProjectAI Bridge</span>
            <span>—</span>
            <span>Intelligent Linear Infrastructure Progress Tracking</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="hover:text-[#0062FF]">Dashboard</Link>
            <Link to="/login" className="hover:text-[#0062FF]">Login</Link>
            <Link to="/help" className="hover:text-[#0062FF]">Documentation</Link>
            <span>© 2026 ProjectAI Bridge. All rights reserved.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

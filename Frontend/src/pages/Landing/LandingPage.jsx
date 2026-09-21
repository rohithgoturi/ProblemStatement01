/**
 * PragatiPath — Landing Page (Phase 1)
 * High-fidelity implementation reproducing the reference marketing screen.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdPlayArrow,
  MdDescription,
  MdPsychology,
  MdAccessTime,
  MdTrackChanges,
  MdArticle,
  MdLink,
  MdPeopleOutline,
  MdWbSunny,
  MdNightlightRound,
  MdClose,
  MdCheckCircle,
  MdArrowForward,
  MdMemory,
} from 'react-icons/md';
import { Logo } from '../../components/shared/Logo';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    // Visual toggle for the pill switch matching the reference UI
  };

  return (
    <div className="min-h-screen bg-white text-ink-primary font-sans antialiased selection:bg-brand-blue selection:text-white flex flex-col">
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR                                                             */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Logo size="md" to="/" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            <button
              onClick={() => setActiveTab('home')}
              className="relative py-2 text-sm font-semibold transition-colors flex flex-col items-center"
            >
              <span className={activeTab === 'home' ? 'text-brand-blue' : 'text-slate-600 hover:text-slate-900'}>
                Home
              </span>
              {activeTab === 'home' && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-brand-blue rounded-full transition-all" />
              )}
            </button>

            <a
              href="#features"
              onClick={() => setActiveTab('features')}
              className="relative py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={() => setActiveTab('how-it-works')}
              className="relative py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              How It Works
            </a>

            <a
              href="#about"
              onClick={() => setActiveTab('about')}
              className="relative py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              About
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Light / Dark Mode Toggle Pill */}
            <button
              type="button"
              onClick={toggleDarkMode}
              title="Toggle theme appearance"
              className="flex items-center bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-full px-2.5 py-1.5 transition-all text-slate-500"
            >
              <span className={`p-1 rounded-full ${!isDarkMode ? 'bg-white shadow-xs text-amber-500' : 'text-slate-400'}`}>
                <MdWbSunny size={14} />
              </span>
              <span className={`p-1 rounded-full ${isDarkMode ? 'bg-slate-800 shadow-xs text-sky-400' : 'text-slate-400'} ml-0.5`}>
                <MdNightlightRound size={14} />
              </span>
            </button>

            {/* Login Button (Outline style) */}
            <Link
              to="/login"
              className="px-4 sm:px-5 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 transition-all duration-150"
            >
              Login
            </Link>

            {/* Get Started Button (Solid Brand Blue) */}
            <Link
              to="/login"
              className="px-4 sm:px-5 py-2 rounded-lg bg-brand-blue text-white font-semibold text-sm hover:bg-blue-700 shadow-sm hover:shadow transition-all duration-150"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 sm:pt-12 pb-16 lg:pb-20 bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Headline & Call To Action */}
            <div className="lg:col-span-6 xl:col-span-7 z-10">
              {/* Badge Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3FE] border border-blue-100 text-[#1D4ED8] text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-5">
                AI-POWERED PROJECT PROGRESS INTELLIGENCE
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-[#0B2347] leading-[1.12] tracking-tight mb-5">
                Bridge the Gap Between <br className="hidden sm:inline" />
                <span className="text-brand-blue">Plan and Execution</span>
              </h1>

              {/* Subheading / Value Proposition */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8 font-normal">
                An intelligent layer that captures site progress, understands it with AI, and links it to the right activities in your project schedule. Real-time. Accurate. Actionable.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 group"
                >
                  <MdPlayArrow className="text-xl transition-transform group-hover:scale-110" />
                  <span>Get Started</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setShowDemoModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-base shadow-xs hover:border-slate-400 transition-all duration-200"
                >
                  <MdPlayArrow className="text-xl text-brand-blue" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Visual & Construction Scene */}
            <div className="lg:col-span-6 xl:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-card-lg border border-slate-100/90 bg-slate-100 group">
                {/* Construction Hero Photo */}
                <img
                  src="/construction-hero.jpg"
                  alt="Construction engineer monitoring site progress with AI"
                  className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-[1.01]"
                  loading="eager"
                />

                {/* Subtle soft gradient fade on left for smooth blend */}
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/30 to-transparent pointer-events-none hidden sm:block" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURE STRIP (4 Pillars)                                              */}
      {/* ========================================================================= */}
      <section id="features" className="py-10 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Feature 1 */}
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50/70 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-brand-blue flex items-center justify-center flex-shrink-0 shadow-xs">
                <MdDescription size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0B2347] mb-1">
                  AI-Powered Matching
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Automatically links site reports to schedule activities.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50/70 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-brand-blue flex items-center justify-center flex-shrink-0 shadow-xs">
                <MdPsychology size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0B2347] mb-1">
                  Human-in-the-Loop
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Engineers validate and correct for higher accuracy.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50/70 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-brand-blue flex items-center justify-center flex-shrink-0 shadow-xs">
                <MdAccessTime size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0B2347] mb-1">
                  Real-time Insights
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Track progress, delays and risks instantly.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50/70 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-brand-blue flex items-center justify-center flex-shrink-0 shadow-xs">
                <MdTrackChanges size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0B2347] mb-1">
                  End-to-End Visibility
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  From <span className="font-semibold text-brand-blue">DPR</span> to reports — <span className="font-semibold text-brand-blue">all in one</span> platform.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. METRICS / STATISTICS BANNER                                            */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Deep Navy Curved Container */}
          <div className="relative rounded-2xl bg-[#091D3C] text-white p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden">
            {/* Subtle blueprint pattern background */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#60A5FA 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-blue-900/40">
              
              {/* Stat 1 */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-3 lg:px-4">
                <div className="w-11 h-11 rounded-full border border-blue-400/30 flex items-center justify-center text-blue-300 flex-shrink-0">
                  <MdArticle size={22} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    1,240+
                  </div>
                  <div className="text-xs sm:text-sm text-blue-200/80 font-medium">
                    Reports Processed
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-3 lg:px-4">
                <div className="w-11 h-11 rounded-full border border-blue-400/30 flex items-center justify-center text-blue-300 flex-shrink-0">
                  <MdLink size={22} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    980+
                  </div>
                  <div className="text-xs sm:text-sm text-blue-200/80 font-medium">
                    Activities Linked
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-3 lg:px-4">
                <div className="w-11 h-11 rounded-full border border-blue-400/30 flex items-center justify-center text-blue-300 flex-shrink-0">
                  <MdTrackChanges size={22} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    92%
                  </div>
                  <div className="text-xs sm:text-sm text-blue-200/80 font-medium">
                    Matching Accuracy
                  </div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-3 lg:px-4">
                <div className="w-11 h-11 rounded-full border border-blue-400/30 flex items-center justify-center text-blue-300 flex-shrink-0">
                  <MdAccessTime size={22} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    350+
                  </div>
                  <div className="text-xs sm:text-sm text-blue-200/80 font-medium">
                    Hours Saved
                  </div>
                </div>
              </div>

              {/* Stat 5 */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-3 lg:px-4 col-span-2 sm:col-span-1">
                <div className="w-11 h-11 rounded-full border border-blue-400/30 flex items-center justify-center text-blue-300 flex-shrink-0">
                  <MdPeopleOutline size={22} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    25+
                  </div>
                  <div className="text-xs sm:text-sm text-blue-200/80 font-medium">
                    Active Projects
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TRUSTED COMPANIES SECTION                                              */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Divider & Title */}
          <div className="text-center mb-10">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
              Trusted by Leading Construction & Infrastructure Companies
            </p>
            <div className="w-16 h-0.5 bg-blue-100 mx-auto mt-2.5 rounded-full" />
          </div>

          {/* Logo Row matching the reference companies */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-8 sm:gap-6 items-center justify-items-center opacity-85">
            {/* L&T Construction */}
            <div className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 transition-colors">
              <div className="w-7 h-7 rounded-full border-2 border-slate-700 flex items-center justify-center font-bold text-[10px] tracking-tighter">
                L&T
              </div>
              <span className="text-xs sm:text-sm font-semibold tracking-tight">Construction</span>
            </div>

            {/* Reliance Infrastructure */}
            <div className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 transition-colors">
              <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-white text-[9px] font-bold">
                R
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-xs font-bold tracking-tight">Reliance</span>
                <span className="text-[9px] text-slate-500 font-medium">Infrastructure</span>
              </div>
            </div>

            {/* TATA PROJECTS */}
            <div className="flex flex-col items-center justify-center text-slate-700 hover:text-slate-900 transition-colors">
              <span className="text-sm font-black tracking-widest uppercase">TATA</span>
              <span className="text-[9px] font-semibold tracking-wider uppercase text-slate-500">PROJECTS</span>
            </div>

            {/* IRB INFRASTRUCTURE */}
            <div className="flex flex-col items-center justify-center text-slate-700 hover:text-slate-900 transition-colors">
              <span className="text-base font-black tracking-tight uppercase">IRB</span>
              <span className="text-[8px] font-semibold tracking-widest uppercase text-slate-500">INFRASTRUCTURE</span>
            </div>

            {/* JSW */}
            <div className="text-slate-800 hover:text-slate-900 transition-colors">
              <span className="text-lg font-black italic tracking-tighter text-[#1e3a8a]">JSW</span>
            </div>

            {/* adani */}
            <div className="text-slate-700 hover:text-slate-900 transition-colors">
              <span className="text-base font-extrabold tracking-tight">adani</span>
            </div>

            {/* UltraTech */}
            <div className="flex flex-col items-center text-slate-700 hover:text-slate-900 transition-colors">
              <span className="text-xs sm:text-sm font-extrabold tracking-tight">UltraTech</span>
              <span className="text-[8px] italic text-slate-500 font-serif">The Engineer's Choice</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOW IT WORKS / VALUE HIGHLIGHT                                         */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-16 bg-slate-50/70 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">How PragatiPath Works</span>
            <h2 className="text-3xl font-extrabold text-[#0B2347] mt-2 mb-4 tracking-tight">
              From Site Reports to Verified Schedule Updates
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A 3-step intelligent pipeline bridging ground reality with Primavera and MS Project schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue font-bold flex items-center justify-center mb-5 text-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-[#0B2347] mb-2">Ingest Unstructured Progress</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Site teams submit Daily Progress Reports (DPR), spreadsheets, diary photos, or notes in any natural format.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue font-bold flex items-center justify-center mb-5 text-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-[#0B2347] mb-2">AI Extraction & Schedule Match</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The NLP engine extracts discipline, activity description, and actual dates, then matches against L5/L6 schedule WBS.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue font-bold flex items-center justify-center mb-5 text-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-[#0B2347] mb-2">Human Validation & Audit Trail</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Planners verify confidence scores, confirm activity links, and sync verified updates with full historical traceability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. COMPREHENSIVE FOOTER                                                   */}
      {/* ========================================================================= */}
      <footer id="about" className="bg-[#07172E] text-slate-400 pt-14 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold">
                  <MdMemory size={20} />
                </div>
                <span className="text-xl font-extrabold text-white tracking-tight">PragatiPath</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
                Intelligent data capture and schedule-linking layer for infrastructure project management. Real-time actual progress tracking.
              </p>
              <div className="text-xs text-slate-500">
                Problem Statement ID: 26122 • Infrastructure Project Intelligence
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase text-[11px]">Product</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/login" className="hover:text-white transition-colors">AI Schedule Matching</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">DPR Ingestion Engine</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Progress Analytics</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Audit & Verification</Link></li>
              </ul>
            </div>

            {/* Solutions Links */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase text-[11px]">Solutions</h4>
              <ul className="space-y-2.5 text-sm">
                <li><span className="text-slate-400">Civil & Structural</span></li>
                <li><span className="text-slate-400">Mechanical & Piping</span></li>
                <li><span className="text-slate-400">Electrical & Instrumentation</span></li>
                <li><span className="text-slate-400">Highways & Infrastructure</span></li>
              </ul>
            </div>

            {/* Compliance & Legal */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase text-[11px]">Legal & Trust</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Security & Compliance</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Audit Trail Standards</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom copyright row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2025 PragatiPath. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#about" className="hover:text-slate-300 transition-colors">Privacy</a>
              <a href="#about" className="hover:text-slate-300 transition-colors">Terms</a>
              <a href="#about" className="hover:text-slate-300 transition-colors">Documentation</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 8. WATCH DEMO MODAL                                                       */}
      {/* ========================================================================= */}
      {showDemoModal && (
        <div className="fixed inset-0 z-modal bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 relative animate-fade-in">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <MdClose size={20} />
            </button>

            <div className="flex items-center gap-2 text-brand-blue text-xs font-bold uppercase tracking-wider mb-2">
              <MdCheckCircle /> PragatiPath Platform Demo
            </div>
            <h3 className="text-xl font-bold text-[#0B2347] mb-3">
              AI-Powered Progress Intelligence in Action
            </h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              PragatiPath connects unformatted site progress reports directly to Primavera P6 and MS Project schedule activities using LLM-assisted entity recognition and confidence ranking.
            </p>

            <div className="bg-slate-900 rounded-xl p-4 text-white text-xs font-mono mb-6 overflow-x-auto">
              <div className="text-slate-400">// Sample DPR Ground Ingestion</div>
              <div className="text-emerald-400 mt-1">✓ DPR Received: "Unit 3 - completed 140m piping hydrotest at 4pm"</div>
              <div className="text-blue-300 mt-1">✓ AI Match Suggestion: ACT-003 "Piping Hydrotest - Unit 3" (Confidence 94%)</div>
              <div className="text-amber-300 mt-1">✓ Verification: Planner Review Queue Updated</div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDemoModal(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Close
              </button>
              <Link
                to="/login"
                className="px-5 py-2 text-sm font-semibold bg-brand-blue text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Try Live Platform</span>
                <MdArrowForward />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * PragatiPath — Enterprise Landing Page (Phase 1)
 * Built with Stitch MCP background image asset and reproducing the exact reference screen.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdPlayArrow,
  MdCheckCircle,
  MdClose,
  MdArrowForward,
  MdMic,
  MdVerified,
  MdTrendingUp,
  MdWarningAmber,
  MdSpeed,
  MdInsertDriveFile,
  MdMemory,
  MdDescription,
  MdPsychology,
  MdAccessTime,
  MdTrackChanges,
  MdArticle,
  MdLink,
  MdPeopleOutline,
  MdWbSunny,
  MdNightlightRound,
} from 'react-icons/md';
import { Logo, PragatiPathIcon } from '../../components/shared/Logo';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('hero');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedPipelineStep, setSelectedPipelineStep] = useState(3);

  return (
    <div className="min-h-screen bg-white text-[#0B192C] font-sans antialiased selection:bg-[#0056D2] selection:text-white flex flex-col">
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR (Faithfully matching Reference Image 1)                     */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo with Proprietary PragatiPath Symbol */}
          <div className="flex items-center">
            <Logo size="md" to="/" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            <a
              href="#hero"
              onClick={() => setActiveTab('hero')}
              className="relative py-2 text-sm font-semibold transition-colors flex flex-col items-center"
            >
              <span className={activeTab === 'hero' ? 'text-[#0056D2] font-bold' : 'text-slate-600 hover:text-slate-900'}>
                Home
              </span>
              {activeTab === 'hero' && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-[#0056D2] rounded-full transition-all" />
              )}
            </a>

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
              href="#identity"
              onClick={() => setActiveTab('identity')}
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
              onClick={() => setIsDarkMode(prev => !prev)}
              title="Toggle theme appearance"
              className="flex items-center bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full px-2.5 py-1.5 transition-all text-slate-500"
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
              className="px-4 sm:px-5 py-2 rounded-lg bg-[#0056D2] text-white font-semibold text-sm hover:bg-[#1A73E8] shadow-sm hover:shadow transition-all duration-150"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        
        {/* ========================================================================= */}
        {/* 2. HERO SECTION WITH STITCH BACKGROUND IMAGE                              */}
        {/* ========================================================================= */}
        <section
          id="hero"
          className="relative min-h-[580px] lg:min-h-[660px] flex items-center border-b border-slate-100 overflow-hidden bg-white"
        >
          {/* Construction & Site Engineer Background Scene from Stitch MCP */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 0%, #ffffff 32%, rgba(255, 255, 255, 0.96) 46%, rgba(255, 255, 255, 0.42) 66%, transparent 86%), url('/stitch-hero-bg.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'right bottom',
              backgroundRepeat: 'no-repeat',
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Headline & Action Buttons */}
              <div className="lg:col-span-7 z-10">
                
                {/* Pill Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3FE] border border-blue-200/80 text-[#0056D2] text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-5 shadow-xs">
                  AI-POWERED PROJECT PROGRESS INTELLIGENCE
                </div>

                {/* Giant Bold Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold text-[#0B192C] leading-[1.12] tracking-tight mb-5">
                  Bridge the Gap Between <br />
                  <span className="text-[#0056D2]">Plan and Execution</span>
                </h1>

                {/* Value Subheading */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8 font-normal">
                  An intelligent layer that captures site progress, understands it with AI, and links it to the right activities in your project schedule. Real-time. Accurate. Actionable.
                </p>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0056D2] hover:bg-[#1A73E8] text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 group"
                  >
                    <MdPlayArrow className="text-xl transition-transform group-hover:scale-110" />
                    <span>Get Started</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setShowDemoModal(true)}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-base shadow-xs hover:border-slate-400 transition-all duration-200"
                  >
                    <MdPlayArrow className="text-xl text-[#0056D2]" />
                    <span>Watch Demo</span>
                  </button>
                </div>

              </div>

              {/* Right Column: Floating AI Matching Callout positioned in open sky area to left of engineer */}
              <div className="lg:col-span-5 relative flex justify-start lg:pl-6 z-20">
                <div className="hidden lg:flex items-center gap-3.5 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-card-lg border border-white/90 max-w-xs transition-all hover:scale-105 duration-300">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0056D2] shrink-0 shadow-xs">
                    <MdMemory size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B192C] flex items-center gap-1.5">
                      AI Matching
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5 font-medium">
                      Finding the right activities from your schedule...
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. FEATURE STRIP (4 Pillars matching Reference Screen 1)                 */}
        {/* ========================================================================= */}
        <section className="py-10 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              
              {/* Feature 1 */}
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50/70 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#0056D2] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <MdDescription size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B192C] mb-1">
                    AI-Powered Matching
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Automatically links site reports to schedule activities.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50/70 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#0056D2] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <MdPsychology size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B192C] mb-1">
                    Human-in-the-Loop
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Engineers validate and correct for higher accuracy.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50/70 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#0056D2] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <MdAccessTime size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B192C] mb-1">
                    Real-time Insights
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Track progress, delays and risks instantly.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50/70 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#0056D2] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <MdTrackChanges size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B192C] mb-1">
                    End-to-End Visibility
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    From <span className="font-semibold text-[#0056D2]">DPR</span> to reports — <span className="font-semibold text-[#0056D2]">all in one</span> platform.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. METRICS / STATISTICS BANNER (Dark Navy with Faint Blueprint)          */}
        {/* ========================================================================= */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl bg-[#091D3C] text-white p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden">
              
              {/* Subtle background blueprint watermark */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#60A5FA 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Crane Silhouette Watermark on Right Edge matching Reference */}
              <div className="absolute right-0 top-0 bottom-0 w-80 opacity-[0.07] pointer-events-none flex items-center justify-end pr-4 text-sky-300">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-56 h-56">
                  <line x1="25" y1="95" x2="25" y2="10" />
                  <line x1="30" y1="95" x2="30" y2="10" />
                  <line x1="15" y1="20" x2="95" y2="20" />
                  <line x1="25" y1="10" x2="95" y2="20" />
                  <line x1="25" y1="10" x2="15" y2="20" />
                  <line x1="25" y1="95" x2="30" y2="85" />
                  <line x1="25" y1="75" x2="30" y2="65" />
                  <line x1="25" y1="55" x2="30" y2="45" />
                  <line x1="25" y1="35" x2="30" y2="25" />
                  <line x1="75" y1="20" x2="75" y2="60" />
                  <rect x="71" y="60" width="8" height="6" />
                </svg>
              </div>

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
        {/* 5. TRUSTED COMPANIES SECTION (Faithfully matching Reference Screen 1)     */}
        {/* ========================================================================= */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
                Trusted by Leading Construction & Infrastructure Companies
              </p>
              <div className="w-16 h-0.5 bg-blue-100 mx-auto mt-2.5 rounded-full" />
            </div>

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
        {/* 6. LIVE PIPELINE DEMO & WORKFLOW ORCHESTRATION (FROM STITCH)              */}
        {/* ========================================================================= */}
        <section id="how-it-works" className="py-20 bg-[#F8F9FF] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-[#0056D2] uppercase tracking-wider">
                End-to-End Orchestration
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] mt-2 mb-4 tracking-tight">
                The 5-Step Progress Intelligence Pipeline
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                From raw field observations to auditable Primavera P6 schedule actuals in under five minutes.
              </p>
            </div>

            {/* Interactive Pipeline Card */}
            <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden mb-12">
              <div className="bg-[#0B192C] px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-3">
                    PragatiPath // Pipeline Orchestrator v2.4
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Engine Active
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-300">Project: Package 4B Express Corridor</span>
                </div>
              </div>

              {/* 5 Pipeline Stages */}
              <div className="p-6 sm:p-8 bg-slate-50/50">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  
                  {/* Stage 1 */}
                  <div
                    onClick={() => setSelectedPipelineStep(1)}
                    className={`bg-white p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedPipelineStep === 1
                        ? 'border-[#0056D2] shadow-md ring-2 ring-blue-100'
                        : 'border-slate-200 shadow-xs hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase text-[#0056D2] bg-blue-50 px-2 py-0.5 rounded">
                          01 Ingest
                        </span>
                        <span className="text-xs text-slate-400 font-mono">08:42 AM</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mb-2">Field Capture (Voice + DPR)</h4>
                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 mb-2">
                        <div className="flex items-center gap-1.5 text-[#0056D2] mb-1">
                          <MdMic size={16} />
                          <span className="text-[11px] font-mono font-medium text-slate-700">Audio (0:48)</span>
                        </div>
                        <div className="h-3 flex items-center gap-0.5">
                          <span className="h-2 w-1 bg-[#0056D2] rounded" />
                          <span className="h-3 w-1 bg-[#0056D2] rounded" />
                          <span className="h-2 w-1 bg-[#0056D2] rounded" />
                          <span className="h-1 w-1 bg-[#0056D2] rounded" />
                          <span className="h-3 w-1 bg-[#0056D2] rounded" />
                          <span className="h-2 w-1 bg-[#0056D2] rounded" />
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 italic leading-snug">
                        "Pump P-101 base grouting completed by Team Bravo at Ch. 12+400"
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                      <span>GPS: 19.076, 72.877</span>
                      <span className="text-emerald-600 font-semibold">Verified</span>
                    </div>
                  </div>

                  {/* Stage 2 */}
                  <div
                    onClick={() => setSelectedPipelineStep(2)}
                    className={`bg-white p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedPipelineStep === 2
                        ? 'border-[#0056D2] shadow-md ring-2 ring-blue-100'
                        : 'border-slate-200 shadow-xs hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                          02 Understand
                        </span>
                        <span className="text-xs text-purple-600 font-mono">LLM-EPC</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mb-2">Entity Extraction</h4>
                      <div className="bg-slate-900 rounded-lg p-2.5 font-mono text-[10px] leading-relaxed text-slate-200 overflow-hidden">
                        <div className="text-amber-400">"tag": <span className="text-emerald-300">"P-101"</span>,</div>
                        <div className="text-amber-400">"action": <span className="text-emerald-300">"grouting"</span>,</div>
                        <div className="text-amber-400">"loc": <span className="text-emerald-300">"CH 12+400"</span>,</div>
                        <div className="text-amber-400">"qty_status": <span className="text-sky-300">"100%"</span></div>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
                      Confidence: <span className="text-slate-900 font-bold">98.2%</span>
                    </div>
                  </div>

                  {/* Stage 3 */}
                  <div
                    onClick={() => setSelectedPipelineStep(3)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                      selectedPipelineStep === 3
                        ? 'border-[#0056D2] bg-blue-50/30 shadow-md ring-2 ring-blue-200'
                        : 'border-blue-200 bg-white shadow-xs'
                    }`}
                  >
                    <div className="absolute -top-2.5 right-3 bg-[#0056D2] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Matched
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase text-[#0056D2] bg-blue-100/80 px-2 py-0.5 rounded">
                          03 Match
                        </span>
                        <span className="text-xs text-slate-500 font-mono">P6-WBS</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mb-1">Candidate Link</h4>
                      <p className="text-[11px] font-mono text-[#0056D2] font-bold">ACT-M-44021</p>
                      <p className="text-[11px] text-slate-700 font-medium leading-tight mb-2">
                        Submersible Pump P-101 Installation & Grout
                      </p>
                      <div className="space-y-1 text-[10px]">
                        <div className="flex justify-between text-slate-500 font-semibold">
                          <span>Semantic Fit</span>
                          <span className="text-[#0B192C] font-bold">96%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#0056D2] h-full rounded-full w-[96%]" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Timing window:</span>
                      <span className="text-emerald-600 font-semibold">In Window</span>
                    </div>
                  </div>

                  {/* Stage 4 */}
                  <div
                    onClick={() => setSelectedPipelineStep(4)}
                    className={`bg-white p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedPipelineStep === 4
                        ? 'border-[#0056D2] shadow-md ring-2 ring-blue-100'
                        : 'border-slate-200 shadow-xs hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          04 Validate
                        </span>
                        <span className="text-xs text-emerald-600 font-bold">1-Click</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mb-1">Human-in-the-Loop</h4>
                      <p className="text-[11px] text-slate-600 mb-2">Responsible Engineer validation</p>
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 flex items-center gap-2 mb-1">
                        <MdVerified className="text-emerald-600 text-sm shrink-0" />
                        <div className="text-[10px] text-emerald-900 font-medium leading-tight">
                          Approved by <span className="font-bold">R. Sharma (RE)</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono truncate">
                      SHA256: 8fbc4...e92d
                    </div>
                  </div>

                  {/* Stage 5 */}
                  <div
                    onClick={() => setSelectedPipelineStep(5)}
                    className={`bg-white p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedPipelineStep === 5
                        ? 'border-[#0056D2] shadow-md ring-2 ring-blue-100'
                        : 'border-slate-200 shadow-xs hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          05 Live P6
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Synced</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mb-1">Schedule Impact</h4>
                      <div className="text-[11px] space-y-1 text-slate-600">
                        <div className="flex justify-between">
                          <span>Physical %:</span>
                          <span className="font-bold text-[#0B192C]">100% (+15%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Activity Var:</span>
                          <span className="text-emerald-600 font-bold">+1 Day Ahead</span>
                        </div>
                        <div className="flex justify-between">
                          <span>EVM SPI:</span>
                          <span className="font-bold text-[#0B192C]">1.04</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        Primavera Updated
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. THE FUNDAMENTAL EPC DISCONNECT (PROBLEM SECTION)                       */}
        {/* ========================================================================= */}
        <section id="problem" className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs font-bold tracking-widest text-[#0056D2] uppercase mb-2">
                The Fundamental EPC Disconnect
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
                Plans are structured. Field execution isn't.
              </h3>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                Mega-projects don't fail in planning. They fail in the information latency between what happens at the pour and what gets keyed into Primavera P6 three weeks later.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Legacy Disconnect */}
              <div className="bg-rose-50/40 border border-rose-200/80 rounded-2xl p-8 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-6">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  The Legacy Disconnect
                </div>
                <ul className="space-y-5 text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <MdWarningAmber className="text-rose-500 text-lg shrink-0 mt-0.5" />
                    <span><strong>Chaotic Field Reporting:</strong> Unstructured WhatsApp audio notes, handwritten site registers, and fragmented paper delivery challans.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MdWarningAmber className="text-rose-500 text-lg shrink-0 mt-0.5" />
                    <span><strong>Scheduler Bottleneck:</strong> Planners spend 15+ hours weekly deciphering site jargon and trying to find matching WBS activities.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MdWarningAmber className="text-rose-500 text-lg shrink-0 mt-0.5" />
                    <span><strong>Compounding Delay Latency:</strong> Critical path slips go undetected for 21 days until formal monthly reconciliation meetings.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MdWarningAmber className="text-rose-500 text-lg shrink-0 mt-0.5" />
                    <span><strong>Vulnerable to Claims:</strong> Lack of time-stamped, geotagged evidence leads to contractor disputes and liquidated damages.</span>
                  </li>
                </ul>
              </div>

              {/* The PragatiPath Way */}
              <div className="bg-blue-50/40 border-2 border-blue-200 rounded-2xl p-8 relative shadow-card-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0056D2] text-xs font-bold uppercase tracking-wider mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#0056D2]" />
                  The PragatiPath Way
                </div>
                <ul className="space-y-5 text-sm text-slate-800">
                  <li className="flex items-start gap-3">
                    <MdCheckCircle className="text-[#0056D2] text-lg shrink-0 mt-0.5" />
                    <span><strong>Multi-Modal Field Ingestion:</strong> Site supervisors speak or text naturally. AI structures domain jargon into standardized progress data in 2.3 seconds.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MdCheckCircle className="text-[#0056D2] text-lg shrink-0 mt-0.5" />
                    <span><strong>Explainable AI Matching:</strong> Neural engine automatically pairs field updates with the exact Primavera activity ID with transparent confidence scores.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MdCheckCircle className="text-[#0056D2] text-lg shrink-0 mt-0.5" />
                    <span><strong>Human-in-the-Loop Audit:</strong> 1-click verification by Project Engineers guarantees pristine schedule integrity with cryptographic log.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MdCheckCircle className="text-[#0056D2] text-lg shrink-0 mt-0.5" />
                    <span><strong>Immediate Early Warning:</strong> Slippages surface in real-time on actual execution days, not month-end reporting cycles.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. ENTERPRISE EPC CAPABILITIES (6 Grid Modules)                           */}
        {/* ========================================================================= */}
        <section id="features" className="py-20 bg-[#F8F9FF] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs font-bold tracking-widest text-[#0056D2] uppercase mb-2">
                Built for Heavy Civil & EPC
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
                Enterprise Progress Intelligence Capabilities
              </h3>
              <p className="mt-4 text-slate-600 text-base">
                Engineered specifically to solve the complexities of airports, highways, metros, refineries, and mega-power installations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl border border-slate-200 hover:border-[#0056D2] transition-colors bg-white shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center mb-5">
                    <MdMic size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-[#0B192C] mb-2">Multi-Format Field Capture</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Ingest natural speech in English and regional vernacular (including Hinglish), WhatsApp logs, site photos, and paper challan OCR with millimeter coordinates.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#0056D2]">
                  Audio • WhatsApp • Camera • OCR
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 hover:border-[#0056D2] transition-colors bg-white shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center mb-5">
                    <MdSpeed size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-[#0B192C] mb-2">Explainable Neural Matching</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Evaluates four distinct criteria: Equipment Tag match, WBS hierarchy context, physical location proximity, and scheduled start/finish time window.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#0056D2]">
                  Transparent Confidence Scoring
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 hover:border-[#0056D2] transition-colors bg-white shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center mb-5">
                    <MdVerified size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-[#0B192C] mb-2">Strict Human-in-the-Loop</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Zero unsupervised database writes. AI pre-fills candidate matches; project engineers retain absolute authority to approve, edit, or redirect before updates publish.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#0056D2]">
                  ISO 19650 Audit Compliant
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 hover:border-[#0056D2] transition-colors bg-white shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center mb-5">
                    <MdTrendingUp size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-[#0B192C] mb-2">Dual Planned vs Actual EVM</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Continuously track Schedule Performance Index (SPI), Cost Performance Index (CPI), and physical percent complete against your target baselines.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#0056D2]">
                  Automated Earned Value Metrics
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 hover:border-[#0056D2] transition-colors bg-white shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center mb-5">
                    <MdWarningAmber size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-[#0B192C] mb-2">Early Slippage Detection</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Predictive algorithms identify micro-delays on predecessor critical tasks up to 18 days before they impact commercial milestones.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#0056D2]">
                  Float Erosion Forecasting
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 hover:border-[#0056D2] transition-colors bg-white shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center mb-5">
                    <MdInsertDriveFile size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-[#0B192C] mb-2">Claim-Defensible Dossiers</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Export complete evidentiary audit packs for dispute resolution with timestamped site photos, engineer approvals, and linked weather observations.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#0056D2]">
                  1-Click Contractual Evidence
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. PROPRIETARY BRAND IDENTITY SHOWCASE (4 VARIATIONS)                     */}
        {/* ========================================================================= */}
        <section id="identity" className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-[#0056D2] uppercase tracking-wider">
                Proprietary Brand Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] mt-2 mb-4 tracking-tight">
                Designed for Progress: Plan → Progress → Completion
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                A custom geometric symbol engineered specifically for PragatiPath. Three interlocking segments form an architectural framework, a continuous forward path, and an upward monogram <strong>P</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Variation 1: Primary Lockup */}
              <div className="bg-[#F8F9FF] p-6 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0056D2] mb-4 block">
                    01. Primary Lockup
                  </span>
                  <div className="h-28 flex items-center justify-center bg-white rounded-xl border border-slate-100 p-4">
                    <Logo size="lg" to={null} />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                  Two-color primary mark with custom geometric wordmark on transparent/white ground.
                </p>
              </div>

              {/* Variation 2: Standalone Symbol */}
              <div className="bg-[#F8F9FF] p-6 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0056D2] mb-4 block">
                    02. Standalone Symbol
                  </span>
                  <div className="h-28 flex items-center justify-center gap-4 bg-white rounded-xl border border-slate-100 p-4">
                    <div title="16px Favicon"><PragatiPathIcon size={16} /></div>
                    <div title="24px Icon"><PragatiPathIcon size={24} /></div>
                    <div title="36px App Icon"><PragatiPathIcon size={36} /></div>
                    <div title="48px Display"><PragatiPathIcon size={48} /></div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                  Proprietary geometric monogram. Identifiable and sharp from 16×16 favicon to 64×64 app icons.
                </p>
              </div>

              {/* Variation 3: Monochrome Dark */}
              <div className="bg-[#F8F9FF] p-6 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-4 block">
                    03. Monochrome Dark
                  </span>
                  <div className="h-28 flex items-center justify-center bg-white rounded-xl border border-slate-100 p-4">
                    <Logo size="lg" variant="monochrome" to={null} />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                  Single ink execution for engineering drawings, black & white tenders, and physical stamps.
                </p>
              </div>

              {/* Variation 4: Reversed / Dark Mode */}
              <div className="bg-[#F8F9FF] p-6 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4 block">
                    04. Reversed / Dark Mode
                  </span>
                  <div className="h-28 flex items-center justify-center bg-[#0B192C] rounded-xl p-4 shadow-inner">
                    <Logo size="lg" variant="reversed" to={null} />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                  Luminous reversed treatment for dark command centers, field night shifts, and dark themes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. FINAL CTA BANNER (ENTERPRISE PILOT)                                   */}
        {/* ========================================================================= */}
        <section className="py-20 bg-[#F8F9FF]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#0B192C] to-slate-900 rounded-3xl p-10 sm:p-16 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#0056D2]/30 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
                  Turn Raw Field Data Into Defensible Schedule Intelligence.
                </h3>
                <p className="text-slate-300 text-base mb-8 leading-relaxed">
                  Deploy PragatiPath alongside your existing Primavera P6 and MS Project environments in less than 72 hours.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/login"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0056D2] hover:bg-[#1A73E8] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all"
                  >
                    Request Enterprise Pilot
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowDemoModal(true)}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 transition-colors"
                  >
                    Explore Sample Workspace
                  </button>
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MdCheckCircle className="text-emerald-400 text-sm" />
                    Zero agent installation on desktop
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MdCheckCircle className="text-emerald-400 text-sm" />
                    Primavera P6 EPPM / XER Compatible
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* 11. SITE FOOTER                                                           */}
      {/* ========================================================================= */}
      <footer className="bg-[#0B192C] border-t border-slate-800 text-slate-400 text-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Logo size="md" variant="reversed" to="/" />
              </div>
              <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed">
                AI-powered progress intelligence connecting unstructured site execution directly to Primavera P6 and enterprise WBS schedules. Built specifically for EPC mega-projects.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-300">
                <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700">
                  ISO 19650 Compliant
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700">
                  SOC2 Type II Ready
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700">
                  Encrypted AES-256
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#features" className="hover:text-white transition-colors">Neural Matching Engine</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Multi-Modal Ingestion</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Primavera P6 Bi-directional Sync</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Dispute Resolution Dossiers</a></li>
                <li><button onClick={() => setShowDemoModal(true)} className="hover:text-white transition-colors">Interactive Demo</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Solutions</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#features" className="hover:text-white transition-colors">Highways & Expressways</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Metro Rail & Tunnels</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Hydrocarbon & Refineries</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Commercial PMCs</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Airports & Harbors</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Company & Legal</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#hero" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#problem" className="hover:text-white transition-colors">Engineering Principles</a></li>
                <li><a href="#identity" className="hover:text-white transition-colors">Brand Architecture</a></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © 2026 PragatiPath Technologies. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/login" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
              <Link to="/login" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link to="/login" className="hover:text-slate-300 transition-colors">Security Disclosures</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 12. INTERACTIVE DEMO MODAL                                                */}
      {/* ========================================================================= */}
      {showDemoModal && (
        <div className="fixed inset-0 z-modal bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-fade-in">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <MdClose size={20} />
            </button>

            <div className="flex items-center gap-2 text-[#0056D2] text-xs font-bold uppercase tracking-wider mb-2">
              <MdCheckCircle /> PragatiPath Platform Demo
            </div>
            <h3 className="text-xl font-bold text-[#0B192C] mb-3">
              AI-Powered Progress Intelligence in Action
            </h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              PragatiPath connects unformatted site progress reports directly to Primavera P6 and MS Project schedule activities using LLM-assisted entity recognition and confidence ranking.
            </p>

            <div className="bg-[#0B192C] rounded-xl p-4 text-white text-xs font-mono mb-6 overflow-x-auto">
              <div className="text-slate-400">// Sample Ground DPR Ingestion</div>
              <div className="text-emerald-400 mt-1">✓ DPR Received: "Unit 3 - completed 140m piping hydrotest at 4pm"</div>
              <div className="text-sky-300 mt-1">✓ AI Match Suggestion: ACT-003 "Piping Hydrotest - Unit 3" (Confidence 94%)</div>
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
                className="px-5 py-2 text-sm font-semibold bg-[#0056D2] text-white rounded-lg hover:bg-[#1A73E8] transition-colors inline-flex items-center gap-1.5"
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

/**
 * PragatiPath — Public Home Page (Clienter-inspired UI Redesign)
 * Warm cream background, technical engineering grid, subtle network lines, orange accents,
 * large bold typography, and human civil-engineering language.
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NetworkLines } from '../../components/shared/NetworkLines';
import {
  MdArrowForward,
  MdCalendarToday,
  MdDescription,
  MdSearch,
  MdLink,
  MdAssignmentTurnedIn,
  MdTrendingUp,
  MdCheckCircle,
  MdClose,
  MdEngineering,
  MdBusiness,
  MdSupervisorAccount,
  MdConstruction,
  MdLayers,
  MdShield,
  MdHistoryEdu,
  MdInsertDriveFile,
  MdCheck,
  MdSpeed,
  MdTableChart,
  MdPictureAsPdf,
  MdMic,
  MdGraphicEq,
  MdPlayArrow,
  MdPause,
  MdFactCheck,
  MdEdit,
} from 'react-icons/md';

export default function LandingPage() {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState(3); // 0 to 5 (Hero workflow card)
  const [activeInputType, setActiveInputType] = useState('csv'); // 'csv' | 'pdf' | 'txt' | 'voice'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeFlowStep, setActiveFlowStep] = useState(0); // 0 to 5 (Flowchart step)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorTrailingPos, setCursorTrailingPos] = useState({ x: -100, y: -100 });
  const [isCursorHovered, setIsCursorHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isTouch || prefersReducedMotion) {
        setIsTouchDevice(true);
        return;
      }
    }

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      requestAnimationFrame(() => {
        setCursorTrailingPos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const heroRef = useRef(null);

  // Localized cursor grid magnification handler (uses CSS variables for 60fps without React re-renders)
  const handleHeroPointerMove = (e) => {
    if (isTouchDevice || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroRef.current.style.setProperty('--hero-mouse-x', `${x}px`);
    heroRef.current.style.setProperty('--hero-mouse-y', `${y}px`);
    heroRef.current.style.setProperty('--hero-grid-opacity', '1');
  };

  const handleHeroPointerLeave = () => {
    if (!heroRef.current) return;
    heroRef.current.style.setProperty('--hero-grid-opacity', '0');
  };

  const workflowSteps = [
    {
      step: '01',
      title: 'Add Schedule',
      badge: 'Baseline',
      desc: 'Import project activities, dates, and WBS codes (L1 to L6) from spreadsheets or JSON.',
      icon: <MdCalendarToday size={20} />,
      sampleData: {
        label: 'Planned Activity',
        title: 'P-101 Pump House Raft Concreting',
        id: 'ACT-1042',
        discipline: 'Civil',
        date: '10 Sept 2026',
      },
    },
    {
      step: '02',
      title: 'Add Site Updates',
      badge: 'Field Ingestion',
      desc: 'Supervisors upload daily progress reports (DPRs), contractor logs, or site notes.',
      icon: <MdDescription size={20} />,
      sampleData: {
        label: 'Raw Field Report',
        title: 'Completed 45m³ raft pour at Unit 2 Pump House',
        id: 'DPR-2026-09-10',
        discipline: 'Civil',
        source: 'Supervisor Log',
      },
    },
    {
      step: '03',
      title: 'Extract Progress',
      badge: 'Extraction',
      desc: 'System reads the report to extract work descriptions, quantities, locations, and dates.',
      icon: <MdSearch size={20} />,
      sampleData: {
        label: 'Extracted Event',
        title: 'Concrete Pouring · 45 m³',
        location: 'Unit 2 Pump House',
        date: '10 Sept 2026',
        status: 'Extracted',
      },
    },
    {
      step: '04',
      title: 'Match Activities',
      badge: 'AI Candidate Match',
      desc: 'Compares extracted work with schedule activities and suggests candidate matches.',
      icon: <MdLink size={20} />,
      sampleData: {
        label: 'Suggested Candidate',
        title: 'ACT-1042: P-101 Foundation Bay 3 Pouring',
        confidence: '94% Match',
        flag: 'High Confidence',
      },
    },
    {
      step: '05',
      title: 'Planner Review',
      badge: 'Human Governance',
      desc: 'The project planner checks the suggestion, adjusts dates if needed, and clicks approve.',
      icon: <MdAssignmentTurnedIn size={20} />,
      sampleData: {
        label: 'Planner Decision',
        action: 'Approve & Link to Schedule',
        reviewer: 'Chief Project Planner',
        notes: 'Verified against batching plant slip',
      },
    },
    {
      step: '06',
      title: 'Track Actual Progress',
      badge: 'Live Progress',
      desc: 'Approved work becomes part of the permanent project record and historical audit trail.',
      icon: <MdTrendingUp size={20} />,
      sampleData: {
        label: 'Updated Activity Record',
        title: 'ACT-1042 Progress: 100% Complete',
        actualFinish: '10 Sept 2026',
        audit: 'Audit Log #849 Recorded',
      },
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#0B1320] min-h-screen selection:bg-[#FF5500] selection:text-white">
      {/* Subtle Live Cursor Follower (Desktop only, respects reduced-motion) */}
      {!isTouchDevice && cursorPos.x > 0 && (
        <>
          <div
            className="pointer-events-none fixed z-50 rounded-full bg-[#FF5500] transition-transform duration-75 ease-out shadow-xs"
            style={{
              width: isCursorHovered ? 18 : 10,
              height: isCursorHovered ? 18 : 10,
              left: cursorPos.x,
              top: cursorPos.y,
              transform: 'translate(-50%, -50%)',
              opacity: 0.9,
            }}
          />
          <div
            className="pointer-events-none fixed z-40 rounded-full bg-[#FF5500]/25 blur-sm transition-all duration-300 ease-out"
            style={{
              width: isCursorHovered ? 44 : 28,
              height: isCursorHovered ? 44 : 28,
              left: cursorTrailingPos.x,
              top: cursorTrailingPos.y,
              transform: 'translate(-50%, -50%)',
              opacity: 0.6,
            }}
          />
        </>
      )}

      {/* ========================================================================= */}
      {/* SECTION 1 — HERO SECTION                                                  */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={handleHeroPointerLeave}
        className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 border-b border-[#E8E1D5] bg-technical-grid overflow-hidden"
      >
        {/* Subtle decorative fiber network lines */}
        <NetworkLines variant="orange" />

        {/* Localized Cursor-Reactive Magnified Grid Overlay (Desktop only, respects reduced-motion) */}
        {!isTouchDevice && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ease-out"
            style={{
              opacity: 'var(--hero-grid-opacity, 0)',
              backgroundImage: `linear-gradient(to right, rgba(255, 85, 0, 0.20) 1.5px, transparent 1.5px),
                                linear-gradient(to bottom, rgba(255, 85, 0, 0.20) 1.5px, transparent 1.5px)`,
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(circle 240px at var(--hero-mouse-x, -500px) var(--hero-mouse-y, -500px), black 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle 240px at var(--hero-mouse-x, -500px) var(--hero-mouse-y, -500px), black 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
            }}
          />
        )}

        {/* Soft Warm Radial Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF5500]/[0.05] rounded-full blur-3xl"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            
            {/* Small uppercase category pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] text-[#0B1320] text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
              <span>Intelligent Project Progress Tracking</span>
            </div>

            {/* Giant bold headline with tight leading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0B1320] tracking-[-0.035em] leading-[1.08] mb-6">
              Connect Project Plans <br className="hidden sm:inline" />
              <span className="text-[#FF5500]">With Real Progress</span>
            </h1>

            {/* Supporting human text */}
            <p className="text-base sm:text-lg lg:text-xl text-[#475569] leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
              PragatiPath connects project schedules with real site updates, helping planners track actual progress with less manual work.
            </p>

            {/* Pill CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B1320] hover:bg-[#1A2332] text-white text-sm sm:text-base font-bold tracking-tight shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <span>Get Started</span>
                <MdArrowForward size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FAF8F5] hover:bg-white text-[#0B1320] border border-[#E8E1D5] hover:border-[#D5CBB9] text-sm sm:text-base font-bold tracking-tight shadow-xs transition-all duration-200"
              >
                <span>See How It Works</span>
                <MdArrowForward size={16} className="text-[#64748B]" />
              </a>
            </div>
          </div>

          {/* Hero Visual: Interactive Real-Time Product Workflow Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#E8E1D5] p-5 sm:p-8 warm-card-shadow relative overflow-hidden">
            {/* Top Bar inside card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#E8E1D5]/80 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF2EB] border border-[#FFD8C7] flex items-center justify-center text-[#FF5500]">
                  <MdConstruction size={22} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#0B1320]">
                    Live Progress Linking Workflow
                  </h2>
                  <p className="text-xs text-[#64748B]">
                    Click any step below to trace data movement from site to schedule
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold self-start sm:self-auto">
                <span className="px-2.5 py-1 rounded-full bg-[#FFF2EB] text-[#FF5500] border border-[#FFD8C7]">
                  Civil Project PS-26122
                </span>
              </div>
            </div>

            {/* Stepper Tabs */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 my-5">
              {workflowSteps.map((ws, i) => (
                <button
                  key={ws.step}
                  type="button"
                  onClick={() => setActiveWorkflowTab(i)}
                  className={`p-2.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                    activeWorkflowTab === i
                      ? 'bg-[#0B1320] text-white border-[#0B1320] shadow-sm'
                      : 'bg-[#FAF8F5] text-[#475569] border-[#E8E1D5] hover:bg-white hover:text-[#0B1320]'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold block ${activeWorkflowTab === i ? 'text-[#FF5500]' : 'text-[#94A3B8]'}`}>
                    {ws.step}
                  </span>
                  <span className="font-bold truncate mt-0.5">{ws.title}</span>
                </button>
              ))}
            </div>

            {/* Active Workflow Stage Presentation Card */}
            <div className="bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] p-5 sm:p-6 transition-all">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B1320] text-[#FF5500] flex items-center justify-center">
                    {workflowSteps[activeWorkflowTab].icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5500]">
                      Step {workflowSteps[activeWorkflowTab].step} · {workflowSteps[activeWorkflowTab].badge}
                    </span>
                    <h3 className="text-base font-black text-[#0B1320]">
                      {workflowSteps[activeWorkflowTab].title}
                    </h3>
                  </div>
                </div>

                <span className="text-xs text-[#64748B] max-w-sm md:text-right">
                  {workflowSteps[activeWorkflowTab].desc}
                </span>
              </div>

              {/* Sample Workflow Card Content */}
              <div className="bg-white rounded-xl border border-[#E8E1D5] p-4 text-xs space-y-2">
                <div className="flex items-center justify-between text-[#64748B] text-[11px] pb-2 border-b border-[#E8E1D5]/60">
                  <span className="font-bold uppercase tracking-wider text-[#0B1320]">
                    {workflowSteps[activeWorkflowTab].sampleData.label}
                  </span>
                  <span className="text-[#FF5500] font-semibold">Active Record</span>
                </div>

                {workflowSteps[activeWorkflowTab].sampleData.title && (
                  <p className="text-sm font-bold text-[#0B1320]">
                    {workflowSteps[activeWorkflowTab].sampleData.title}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-600 text-[11px] pt-1">
                  {workflowSteps[activeWorkflowTab].sampleData.id && (
                    <span>ID: <strong className="text-[#0B1320]">{workflowSteps[activeWorkflowTab].sampleData.id}</strong></span>
                  )}
                  {workflowSteps[activeWorkflowTab].sampleData.location && (
                    <span>Location: <strong className="text-[#0B1320]">{workflowSteps[activeWorkflowTab].sampleData.location}</strong></span>
                  )}
                  {workflowSteps[activeWorkflowTab].sampleData.confidence && (
                    <span className="text-[#FF5500] font-bold">
                      Confidence: {workflowSteps[activeWorkflowTab].sampleData.confidence}
                    </span>
                  )}
                  {workflowSteps[activeWorkflowTab].sampleData.action && (
                    <span className="text-emerald-700 font-bold">
                      Action: {workflowSteps[activeWorkflowTab].sampleData.action}
                    </span>
                  )}
                  {workflowSteps[activeWorkflowTab].sampleData.notes && (
                    <span className="text-slate-500 italic">
                      "{workflowSteps[activeWorkflowTab].sampleData.notes}"
                    </span>
                  )}
                  {workflowSteps[activeWorkflowTab].sampleData.audit && (
                    <span className="text-[#0B1320] font-semibold">
                      {workflowSteps[activeWorkflowTab].sampleData.audit}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 — PRODUCT FACT STRIP (COMPACT BELOW HERO)                       */}
      {/* ========================================================================= */}
      <section className="py-6 sm:py-8 bg-[#F5F1E8] border-b border-[#E8E1D5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { icon: <MdLayers size={16} />, text: 'L1–L6 Structure' },
              { icon: <MdDescription size={16} />, text: 'Real Site Updates' },
              { icon: <MdSearch size={16} />, text: 'Progress Extraction' },
              { icon: <MdLink size={16} />, text: 'Activity Matching' },
              { icon: <MdAssignmentTurnedIn size={16} />, text: 'Planner Review' },
              { icon: <MdHistoryEdu size={16} />, text: 'Full Audit Trail' },
            ].map((fact, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-[#E8E1D5] text-[#0B1320] text-xs font-bold shadow-2xs hover:bg-white hover:-translate-y-0.5 transition-all"
              >
                <span className="text-[#FF5500] flex-shrink-0">{fact.icon}</span>
                <span className="truncate">{fact.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — DATA INPUT VISUALIZATION (90% SCREEN-WIDTH CARDS)              */}
      {/* Inspired by Reference Image 2: Multi-format data processing                */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E1D5] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] text-[11px] font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
            <span>Multi-Format Ingestion</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B1320] tracking-tight">
            From Raw Project Data to Usable Progress
          </h2>
          <p className="text-base sm:text-lg text-[#475569] mt-3 max-w-2xl mx-auto leading-relaxed">
            PragatiPath works with different forms of project information and turns field updates into structured progress data.
          </p>

          {/* Interactive Format Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {[
              { id: 'csv', label: 'Excel & CSV Spreadsheets', icon: <MdTableChart size={16} /> },
              { id: 'pdf', label: 'PDF Daily Reports', icon: <MdPictureAsPdf size={16} /> },
              { id: 'txt', label: 'Site Diaries & Text Notes', icon: <MdDescription size={16} /> },
              { id: 'voice', label: 'Voice & Audio Notes', icon: <MdMic size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveInputType(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeInputType === tab.id
                    ? 'bg-[#0B1320] text-white shadow-md scale-102'
                    : 'bg-white text-[#475569] border border-[#E8E1D5] hover:border-[#FF5500]/50 hover:text-[#0B1320]'
                }`}
              >
                <span className={activeInputType === tab.id ? 'text-[#FF5500]' : 'text-stone-400'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 90% Screen-Width Visual Data Card */}
        <div className="w-[92vw] max-w-6xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl border border-[#E8E1D5] shadow-xl p-5 sm:p-8 lg:p-10 transition-all duration-300">
          {/* SPREADSHEET (CSV/XLSX) VIEW */}
          {activeInputType === 'csv' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  <MdTableChart className="text-emerald-600" />
                  <span>Structured Schedule Data</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0B1320]">
                  Excel & CSV Schedule Baselines
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Import schedules exported from Primavera P6, Microsoft Project, or custom contractor tracking sheets. Automatic header mapping recognizes activity IDs, planned dates, and WBS tiers.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-semibold">
                  <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5] text-[#0B1320]">.xlsx</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5] text-[#0B1320]">.csv</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5] text-[#0B1320]">.xls</span>
                  <span className="text-[#FF5500] font-bold">Automatic Column Mapping ✓</span>
                </div>
              </div>

              {/* Realistic Spreadsheet Preview */}
              <div className="lg:col-span-7 bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-xs">
                <div className="bg-[#0B1320] text-white px-4 py-2.5 flex items-center justify-between text-xs font-bold font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span>Schedule_Baseline_Rev4.xlsx</span>
                  </div>
                  <span className="text-stone-400 text-[11px]">Sheet: Master_WBS</span>
                </div>
                <div className="overflow-x-auto text-[11px] font-mono">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F5F1E8] border-b border-[#E8E1D5] text-stone-600">
                        <th className="p-2.5 text-center w-8 text-stone-400">#</th>
                        <th className="p-2.5 font-bold">Activity ID</th>
                        <th className="p-2.5 font-bold">Activity Name</th>
                        <th className="p-2.5 font-bold">Start Date</th>
                        <th className="p-2.5 font-bold">Finish Date</th>
                        <th className="p-2.5 font-bold text-right">Progress</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E1D5]/60 bg-white">
                      <tr className="hover:bg-[#FFF2EB]/50 transition-colors">
                        <td className="p-2.5 text-center text-stone-400">1</td>
                        <td className="p-2.5 font-bold text-[#FF5500]">ACT-1042</td>
                        <td className="p-2.5 text-[#0B1320] font-semibold">P-101 Foundation Bay 3 Raft Concrete</td>
                        <td className="p-2.5 text-stone-600">01-Sep-2026</td>
                        <td className="p-2.5 text-stone-600">12-Sep-2026</td>
                        <td className="p-2.5 text-right font-bold text-emerald-700">100%</td>
                      </tr>
                      <tr className="hover:bg-[#FFF2EB]/50 transition-colors">
                        <td className="p-2.5 text-center text-stone-400">2</td>
                        <td className="p-2.5 font-bold text-[#FF5500]">ACT-1043</td>
                        <td className="p-2.5 text-[#0B1320] font-semibold">Pier P-42 Rebar Cage Binding</td>
                        <td className="p-2.5 text-stone-600">05-Sep-2026</td>
                        <td className="p-2.5 text-stone-600">18-Sep-2026</td>
                        <td className="p-2.5 text-right font-bold text-[#FF5500]">65%</td>
                      </tr>
                      <tr className="hover:bg-[#FFF2EB]/50 transition-colors">
                        <td className="p-2.5 text-center text-stone-400">3</td>
                        <td className="p-2.5 font-bold text-[#FF5500]">ACT-1044</td>
                        <td className="p-2.5 text-[#0B1320] font-semibold">Viaduct Precast Girder Launching Span 14</td>
                        <td className="p-2.5 text-stone-600">10-Sep-2026</td>
                        <td className="p-2.5 text-stone-600">24-Sep-2026</td>
                        <td className="p-2.5 text-right font-bold text-stone-500">20%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-2.5 bg-[#FAF8F5] border-t border-[#E8E1D5] flex items-center justify-between text-[11px] text-[#64748B]">
                  <span>Showing 3 of 1,248 activities</span>
                  <span className="font-bold text-emerald-700">100% Validated Data</span>
                </div>
              </div>
            </div>
          )}

          {/* PDF REPORT VIEW */}
          {activeInputType === 'pdf' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold">
                  <MdPictureAsPdf className="text-rose-600" />
                  <span>Site Document Parsing</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0B1320]">
                  PDF Daily Progress Reports (DPR)
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Upload official contractor daily reports, consultant logs, and inspection sheets in PDF. The system extracts headings, work quantities, weather conditions, and site observations.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-semibold">
                  <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5] text-[#0B1320]">PDF Documents</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5] text-[#0B1320]">Scanned DPRs</span>
                  <span className="text-[#FF5500] font-bold">Entity Extraction Engine ✓</span>
                </div>
              </div>

              {/* Realistic PDF Document Preview */}
              <div className="lg:col-span-7 bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] p-5 shadow-xs">
                <div className="bg-white rounded-xl border border-[#E8E1D5] p-5 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-black text-[10px]">PDF</span>
                      <strong className="text-xs text-[#0B1320]">Daily_Progress_Report_284.pdf</strong>
                    </div>
                    <span className="text-[11px] text-stone-500 font-mono">Date: 22-Sep-2026</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                      <span>Project: Metro Rail Viaduct Package 04</span>
                      <span>Site In-Charge: Er. Rajiv M.</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#FAF8F5] border-l-4 border-l-[#FF5500] text-[#0B1320]">
                      <span className="font-bold block mb-1">Extracted Site Execution Paragraph:</span>
                      <p className="text-[11px] leading-relaxed text-stone-700">
                        “Completed 64 m³ Pier Cap concrete pouring at Pier P-42 using Boom Placer #2. Batching slip #940 verified. Concrete slump 125mm compliant with design mix.”
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-1">
                      <div className="p-2 rounded bg-stone-50 border border-[#E8E1D5]">
                        <span className="text-stone-400 block">Identified Item</span>
                        <strong className="text-[#0B1320] text-xs">Pier Cap Concrete</strong>
                      </div>
                      <div className="p-2 rounded bg-stone-50 border border-[#E8E1D5]">
                        <span className="text-stone-400 block">Extracted Quantity</span>
                        <strong className="text-[#FF5500] text-xs">64 m³</strong>
                      </div>
                      <div className="p-2 rounded bg-stone-50 border border-[#E8E1D5]">
                        <span className="text-stone-400 block">Location Front</span>
                        <strong className="text-emerald-700 text-xs">Pier P-42</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TXT / SITE DIARY VIEW */}
          {activeInputType === 'txt' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                  <MdDescription className="text-amber-600" />
                  <span>Field Note Input</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0B1320]">
                  Site Diaries & Field Notes
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Field engineers don't need complex scheduling tools. They simply type or paste raw field logs, shift summaries, or WhatsApp updates into the submission box.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-semibold">
                  <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5] text-[#0B1320]">Plain Text</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5] text-[#0B1320]">Shift Logs</span>
                  <span className="text-[#FF5500] font-bold">Instant Normalization ✓</span>
                </div>
              </div>

              {/* Realistic Site Diary Preview */}
              <div className="lg:col-span-7 bg-[#0B1320] text-white rounded-2xl p-5 shadow-xs font-mono text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-stone-400 text-[11px]">
                  <span>FIELD_LOG_SUPERVISOR.txt</span>
                  <span className="text-emerald-400 font-bold">● INGESTION READY</span>
                </div>
                <div className="p-3.5 bg-black/40 rounded-xl border border-white/10 space-y-1 text-stone-200 leading-relaxed text-[11px]">
                  <p><span className="text-stone-400">Date:</span> 22 Sept 2026 | Shift: Day</p>
                  <p><span className="text-stone-400">Area:</span> Block A Substructure</p>
                  <p><span className="text-stone-400">Log:</span> Completed raft foundation concrete at Bay 3.</p>
                  <p><span className="text-stone-400">Quantity:</span> 45 m³ poured, 6 cube specimens molded.</p>
                  <p><span className="text-stone-400">Equipment:</span> 1 Boom Placer, 4 Transit Mixers on site.</p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
                  <span>Direct submission via Web or Supervisor Portal</span>
                  <span className="text-[#FF5500] font-bold">Extracted in &lt; 1s</span>
                </div>
              </div>
            </div>
          )}

          {/* VOICE & AUDIO NOTE VIEW */}
          {activeInputType === 'voice' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF2EB] text-[#FF5500] border border-[#FFD8C7] text-xs font-bold">
                  <MdMic />
                  <span>Audio & Voice Updates</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0B1320]">
                  Voice Notes From the Job Site
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Supervisors wearing safety gloves on noisy active sites can speak their daily progress. Voice recordings are transcribed and converted into verified progress items.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-semibold">
                  <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5] text-[#0B1320]">Voice Recording</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5] text-[#0B1320]">Speech-to-Text</span>
                  <span className="text-[#FF5500] font-bold">Automated Entity Parsing ✓</span>
                </div>
              </div>

              {/* Realistic Audio Player & Waveform Preview */}
              <div className="lg:col-span-7 bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] p-5 sm:p-6 shadow-xs space-y-4">
                {/* Audio Player Card */}
                <div className="bg-white rounded-xl border border-[#E8E1D5] p-4 sm:p-5 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-12 h-12 rounded-full bg-[#FF5500] hover:bg-[#E64400] text-white flex items-center justify-center shrink-0 shadow-md transition-all cursor-pointer"
                    title={isPlayingAudio ? 'Pause Voice Note' : 'Play Voice Note'}
                  >
                    {isPlayingAudio ? <MdPause size={24} /> : <MdPlayArrow size={24} className="ml-0.5" />}
                  </button>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-[#0B1320]">
                      <span>Site_Voice_Log_BlockA.m4a</span>
                      <span className="text-stone-400 font-mono text-[11px]">{isPlayingAudio ? '00:18 / 00:42' : '00:00 / 00:42'}</span>
                    </div>

                    {/* Dynamic Sound Waveform */}
                    <div className="flex items-center gap-1 h-8">
                      {[35, 60, 85, 45, 95, 75, 40, 90, 100, 65, 50, 90, 80, 55, 85, 45, 70, 95, 60, 40, 75, 50].map((h, i) => (
                        <span
                          key={i}
                          style={{ height: isPlayingAudio ? `${Math.max(25, (h + (i % 4) * 20) % 100)}%` : `${h}%` }}
                          className={`flex-1 rounded-full transition-all duration-300 ${
                            i < 9 ? 'bg-[#FF5500]' : 'bg-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Real-time Transcription Display */}
                <div className="p-3.5 bg-white rounded-xl border border-[#E8E1D5] text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5500] block">
                    Speech-to-Text Transcription:
                  </span>
                  <p className="text-stone-700 italic">
                    “Foundation work completed today in Block A. Pouring finished at 4:30 PM, testing cubes taken for lab verification.”
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — RAW → STRUCTURED PROGRESS TRANSFORMATION                       */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#F5F1E8] border-b border-[#E8E1D5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
              Data Transformation
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1320] tracking-tight mt-1">
              Raw Field Notes → Structured Progress Data
            </h2>
            <p className="text-base text-[#475569] mt-2">
              How PragatiPath converts unstructured site updates into verified operational records.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Raw Unstructured Field Update */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] warm-card-shadow space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                  01 · Raw Field Input
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-bold">
                  Unstructured Text
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] font-mono text-xs text-stone-800 leading-relaxed">
                “Block A foundation concrete completed today. Column work started near the east side with 12 men.”
              </div>
              <ul className="text-xs text-stone-500 space-y-1.5 pt-1">
                <li>• No standard activity ID mentioned</li>
                <li>• Informal location description</li>
                <li>• Cannot link directly to CPM schedules</li>
              </ul>
            </div>

            {/* Center: Processing Node */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center py-2 text-center">
              <div className="w-12 h-12 rounded-full bg-[#0B1320] text-[#FF5500] flex items-center justify-center shadow-md animate-pulse">
                <MdArrowForward size={22} className="rotate-90 lg:rotate-0" />
              </div>
              <span className="text-[10px] font-bold text-[#FF5500] uppercase tracking-wider mt-2">
                Entity Parsing
              </span>
            </div>

            {/* Right: Structured Progress Record */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-500/30 warm-card-shadow space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  02 · Structured Progress
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                  Normalized Event
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5]">
                  <span className="text-stone-400 block text-[10px]">Activity</span>
                  <strong className="text-[#0B1320]">Foundation Concrete</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5]">
                  <span className="text-stone-400 block text-[10px]">Location</span>
                  <strong className="text-[#0B1320]">Block A</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5]">
                  <span className="text-stone-400 block text-[10px]">Status</span>
                  <strong className="text-emerald-700">Completed</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5]">
                  <span className="text-stone-400 block text-[10px]">Reported Date</span>
                  <strong className="text-[#0B1320]">22-Sep-2026</strong>
                </div>
              </div>
              <div className="text-xs text-emerald-800 font-bold flex items-center gap-1.5 pt-1">
                <MdCheckCircle size={16} className="text-emerald-600" />
                <span>Ready for Schedule Activity Matching</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 — CONNECTED WORKFLOW FLOWCHART (CURVED ROAD / PATH ROADMAP)     */}
      {/* Inspired by Roadmap Reference: Physical asphalt road connecting 01 to 06    */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-16 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E1D5] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] text-[11px] font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
              <span>01 TO 06 CONNECTED JOURNEY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1320] tracking-tight">
              The PragatiPath Flow Road
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              A continuous physical road connecting raw field notes to audited schedule baselines — with human planner review at the center.
            </p>

            {/* Quick interactive stage jumper */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                { idx: 0, num: '01', name: 'CAPTURE' },
                { idx: 1, num: '02', name: 'EXTRACT' },
                { idx: 2, num: '03', name: 'STRUCTURE' },
                { idx: 3, num: '04', name: 'MATCH' },
                { idx: 4, num: '05', name: 'REVIEW' },
                { idx: 5, num: '06', name: 'PROGRESS' },
              ].map((step) => (
                <button
                  key={step.idx}
                  type="button"
                  onClick={() => setActiveFlowStep(step.idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeFlowStep === step.idx
                      ? 'bg-[#FF5500] text-white shadow-sm'
                      : 'bg-white border border-[#E8E1D5] text-[#475569] hover:text-[#0B1320]'
                  }`}
                >
                  <span className="font-mono">{step.num}</span>
                  <span>{step.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* DESKTOP CURVED ROADMAP (SVG Highway with connected checkpoints & cards) */}
          {/* ===================================================================== */}
          <div className="hidden lg:block relative min-h-[1420px] w-full select-none">
            {/* SVG Highway Layer */}
            <svg
              viewBox="0 0 1000 1380"
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="roadShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0B1320" floodOpacity="0.12" />
                </filter>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0B1320" />
                  <stop offset="50%" stopColor="#111B2B" />
                  <stop offset="100%" stopColor="#0B1320" />
                </linearGradient>
              </defs>

              {/* Highway Kerb / Outer Cushion */}
              <path
                d="M 280 80 C 480 80, 720 180, 720 320 C 720 460, 280 480, 280 620 C 280 760, 720 780, 720 920 C 720 1020, 500 1060, 500 1140 L 500 1280"
                fill="none"
                stroke="#E2D9CC"
                strokeWidth="62"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Main Dark Asphalt Roadway */}
              <path
                d="M 280 80 C 480 80, 720 180, 720 320 C 720 460, 280 480, 280 620 C 280 760, 720 780, 720 920 C 720 1020, 500 1060, 500 1140 L 500 1280"
                fill="none"
                stroke="url(#roadGradient)"
                strokeWidth="52"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#roadShadow)"
              />

              {/* Light Dashed Center Lane Marking */}
              <path
                d="M 280 80 C 480 80, 720 180, 720 320 C 720 460, 280 480, 280 620 C 280 760, 720 780, 720 920 C 720 1020, 500 1060, 500 1140 L 500 1280"
                fill="none"
                stroke="#FAF8F5"
                strokeWidth="3.5"
                strokeDasharray="14 12"
                strokeLinecap="round"
              />

              {/* Active Orange Progress Highlight Layer */}
              <path
                d="M 280 80 C 480 80, 720 180, 720 320 C 720 460, 280 480, 280 620 C 280 760, 720 780, 720 920 C 720 1020, 500 1060, 500 1140 L 500 1280"
                fill="none"
                stroke="#FF5500"
                strokeWidth="6"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 2600,
                  strokeDashoffset: 2600 - ((activeFlowStep + 1) / 6) * 2600,
                  transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />

              {/* Moving Progress Vehicle / Node */}
              {[
                { x: 280, y: 80 },
                { x: 720, y: 320 },
                { x: 280, y: 620 },
                { x: 720, y: 920 },
                { x: 500, y: 1140 },
                { x: 500, y: 1280 },
              ].map((pos, idx) => {
                if (idx !== activeFlowStep) return null;
                return (
                  <g key={idx}>
                    <circle cx={pos.x} cy={pos.y} r="18" fill="#FF5500" opacity="0.3" className="animate-ping" />
                    <circle cx={pos.x} cy={pos.y} r="9" fill="#FF5500" stroke="#FFFFFF" strokeWidth="2.5" />
                  </g>
                );
              })}
            </svg>

            {/* Checkpoint 01 — CAPTURE (Node at 280, 80 | Card at Right 370px) */}
            <div className="absolute top-[50px] left-[252px] z-10">
              <button
                type="button"
                onClick={() => setActiveFlowStep(0)}
                className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-black text-sm transition-transform duration-300 shadow-lg cursor-pointer ${
                  activeFlowStep === 0
                    ? 'bg-[#FF5500] text-white ring-4 ring-[#FF5500]/30 scale-110'
                    : 'bg-white text-[#0B1320] border-2 border-[#0B1320] hover:scale-105'
                }`}
              >
                01
              </button>
            </div>
            <div className="absolute top-[28px] left-[350px] w-[580px] z-10">
              <div
                onClick={() => setActiveFlowStep(0)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  activeFlowStep === 0
                    ? 'bg-white shadow-xl border-[#FF5500]/50 -translate-y-1'
                    : 'bg-white/85 backdrop-blur-sm border-[#E8E1D5] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500]">01 · Field Ingestion</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F5] text-stone-600 text-[11px] font-semibold border border-[#E8E1D5]">Multi-Source</span>
                </div>
                <h3 className="text-xl font-bold text-[#0B1320]">CAPTURE</h3>
                <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                  Collect daily project updates into a single pipeline from site diaries, contractor logs, spreadsheets, PDFs, or supervisor voice notes.
                </p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E8E1D5]/60 text-[11px] text-stone-500">
                  <span className="px-2 py-0.5 rounded bg-stone-100 font-mono">DPRs</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 font-mono">.xlsx</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 font-mono">.pdf</span>
                  <span className="px-2 py-0.5 rounded bg-[#FFF2EB] text-[#FF5500] font-semibold">🎙 Voice Notes</span>
                </div>
              </div>
            </div>

            {/* Checkpoint 02 — EXTRACT (Node at 720, 320 | Card at Left 80px) */}
            <div className="absolute top-[292px] left-[692px] z-10">
              <button
                type="button"
                onClick={() => setActiveFlowStep(1)}
                className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-black text-sm transition-transform duration-300 shadow-lg cursor-pointer ${
                  activeFlowStep === 1
                    ? 'bg-[#FF5500] text-white ring-4 ring-[#FF5500]/30 scale-110'
                    : 'bg-white text-[#0B1320] border-2 border-[#0B1320] hover:scale-105'
                }`}
              >
                02
              </button>
            </div>
            <div className="absolute top-[260px] left-[70px] w-[580px] z-10">
              <div
                onClick={() => setActiveFlowStep(1)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  activeFlowStep === 1
                    ? 'bg-white shadow-xl border-[#FF5500]/50 -translate-y-1'
                    : 'bg-white/85 backdrop-blur-sm border-[#E8E1D5] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500]">02 · Information Parsing</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F5] text-stone-600 text-[11px] font-semibold border border-[#E8E1D5]">Automated Extraction</span>
                </div>
                <h3 className="text-xl font-bold text-[#0B1320]">EXTRACT</h3>
                <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                  Read raw site reports and extract work items, executed quantities, work front locations, and reported completion dates without manual typing.
                </p>
                <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E1D5] mt-3 text-[11px] font-mono text-stone-600">
                  <span className="text-[#FF5500] font-bold">Identified:</span> Raft Foundation Bay 3 · 45 m³ poured · Block A
                </div>
              </div>
            </div>

            {/* Checkpoint 03 — STRUCTURE (Node at 280, 620 | Card at Right 370px) */}
            <div className="absolute top-[592px] left-[252px] z-10">
              <button
                type="button"
                onClick={() => setActiveFlowStep(2)}
                className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-black text-sm transition-transform duration-300 shadow-lg cursor-pointer ${
                  activeFlowStep === 2
                    ? 'bg-[#FF5500] text-white ring-4 ring-[#FF5500]/30 scale-110'
                    : 'bg-white text-[#0B1320] border-2 border-[#0B1320] hover:scale-105'
                }`}
              >
                03
              </button>
            </div>
            <div className="absolute top-[560px] left-[350px] w-[580px] z-10">
              <div
                onClick={() => setActiveFlowStep(2)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  activeFlowStep === 2
                    ? 'bg-white shadow-xl border-[#FF5500]/50 -translate-y-1'
                    : 'bg-white/85 backdrop-blur-sm border-[#E8E1D5] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500]">03 · Normalization</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F5] text-stone-600 text-[11px] font-semibold border border-[#E8E1D5]">Standardized Record</span>
                </div>
                <h3 className="text-xl font-bold text-[#0B1320]">STRUCTURE</h3>
                <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                  Convert messy narrative field notes into standardized progress data points: Activity Name, Work Front, Quantity, Unit, and Execution Date.
                </p>
                <div className="grid grid-cols-3 gap-2 mt-3 text-[11px]">
                  <div className="p-2 bg-[#FAF8F5] rounded-lg border border-[#E8E1D5]">
                    <span className="text-stone-400 block text-[9px]">Activity</span>
                    <strong className="text-[#0B1320]">Foundation Raft</strong>
                  </div>
                  <div className="p-2 bg-[#FAF8F5] rounded-lg border border-[#E8E1D5]">
                    <span className="text-stone-400 block text-[9px]">Location</span>
                    <strong className="text-[#0B1320]">Block A</strong>
                  </div>
                  <div className="p-2 bg-[#FAF8F5] rounded-lg border border-[#E8E1D5]">
                    <span className="text-stone-400 block text-[9px]">Status</span>
                    <strong className="text-emerald-700">Completed</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkpoint 04 — MATCH (Node at 720, 920 | Card at Left 80px) */}
            <div className="absolute top-[892px] left-[692px] z-10">
              <button
                type="button"
                onClick={() => setActiveFlowStep(3)}
                className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-black text-sm transition-transform duration-300 shadow-lg cursor-pointer ${
                  activeFlowStep === 3
                    ? 'bg-[#FF5500] text-white ring-4 ring-[#FF5500]/30 scale-110'
                    : 'bg-white text-[#0B1320] border-2 border-[#0B1320] hover:scale-105'
                }`}
              >
                04
              </button>
            </div>
            <div className="absolute top-[860px] left-[70px] w-[580px] z-10">
              <div
                onClick={() => setActiveFlowStep(3)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  activeFlowStep === 3
                    ? 'bg-white shadow-xl border-[#FF5500]/50 -translate-y-1'
                    : 'bg-white/85 backdrop-blur-sm border-[#E8E1D5] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500]">04 · Schedule Linking</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">94% Confidence</span>
                </div>
                <h3 className="text-xl font-bold text-[#0B1320]">MATCH</h3>
                <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                  Correlate extracted progress items with master schedule baseline activities (Primavera P6 / Excel WBS), resolving contractor terminology gaps.
                </p>
                <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-200 mt-3 text-[11px] text-emerald-900 font-medium flex items-center justify-between">
                  <span>Matched: <strong>ACT-1042: Raft Concrete Bay 3</strong></span>
                  <span className="text-[#FF5500] font-bold">Candidate Ready</span>
                </div>
              </div>
            </div>

            {/* Checkpoint 05 — REVIEW (Node at 500, 1140 | Centered Highlight Card) */}
            <div className="absolute top-[1112px] left-[472px] z-20">
              <button
                type="button"
                onClick={() => setActiveFlowStep(4)}
                className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-black text-sm transition-transform duration-300 shadow-xl cursor-pointer ${
                  activeFlowStep === 4
                    ? 'bg-[#FF5500] text-white ring-4 ring-[#FF5500]/40 scale-110'
                    : 'bg-[#0B1320] text-white border-2 border-[#FF5500] hover:scale-105'
                }`}
              >
                05
              </button>
            </div>
            <div className="absolute top-[1080px] left-[60px] right-[60px] z-10">
              <div
                onClick={() => setActiveFlowStep(4)}
                className={`p-6 sm:p-7 rounded-3xl border-2 transition-all duration-300 bg-[#0B1320] text-white cursor-pointer shadow-2xl relative overflow-hidden ${
                  activeFlowStep === 4 ? 'border-[#FF5500] ring-4 ring-[#FF5500]/20' : 'border-white/20'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-2.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5500]/20 text-[#FF5500] border border-[#FF5500]/30 text-xs font-bold uppercase tracking-wider">
                      <MdFactCheck size={16} />
                      <span>CRITICAL HUMAN GOVERNANCE</span>
                    </div>
                    <h3 className="text-2xl font-black text-white">05 · PLANNER REVIEW</h3>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      <strong>AI Suggests. The Human Planner Decides.</strong> No progress record updates the schedule without authorized review. Planners check suggested matches and make one-click decisions.
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold">
                      <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">✓ Approve Match</span>
                      <span className="px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">✎ Edit Quantities</span>
                      <span className="px-3 py-1.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">✕ Reject Link</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-[10px] text-stone-400">
                      <span>SYSTEM SUGGESTION</span>
                      <span className="text-[#FF5500] font-bold">94% MATCH</span>
                    </div>
                    <div className="p-2 rounded bg-black/40 text-stone-200">
                      ACT-1042: Raft Foundation Bay 3 (Finish: 22-Sep-2026)
                    </div>
                    <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <MdCheck size={14} /> Planner Approval Pending Decision
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkpoint 06 — SAVE PROGRESS (Node at 500, 1280 | Bottom Verified Card) */}
            <div className="absolute top-[1252px] left-[472px] z-20">
              <button
                type="button"
                onClick={() => setActiveFlowStep(5)}
                className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-black text-sm transition-transform duration-300 shadow-xl cursor-pointer ${
                  activeFlowStep === 5
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/40 scale-110'
                    : 'bg-white text-emerald-700 border-2 border-emerald-600 hover:scale-105'
                }`}
              >
                06
              </button>
            </div>
            <div className="absolute top-[1240px] left-[120px] right-[120px] z-10">
              <div
                onClick={() => setActiveFlowStep(5)}
                className={`p-5 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  activeFlowStep === 5
                    ? 'bg-white shadow-xl border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white/85 backdrop-blur-sm border-[#E8E1D5] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">06 · Permanent Schedule Record</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">100% Audit Logged</span>
                    </div>
                    <h4 className="text-base font-bold text-[#0B1320]">PROGRESS SAVED</h4>
                    <p className="text-xs text-stone-600">
                      Approved updates become immutable project history with user stamp, time record, and live progress percentage update.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <MdCheckCircle size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* MOBILE RESPONSIVE ROADMAP (Vertical Highway with nodes and cards)     */}
          {/* ===================================================================== */}
          <div className="lg:hidden relative pl-12 sm:pl-16 space-y-6">
            {/* Vertical Highway Road Strip */}
            <div className="absolute left-4 sm:left-6 top-4 bottom-4 w-9 bg-[#0B1320] rounded-full shadow-inner flex justify-center">
              <div className="w-0 border-r-2 border-dashed border-[#FAF8F5]/80 h-full" />
            </div>

            {[
              {
                step: '01',
                title: 'CAPTURE',
                badge: 'Multi-Source',
                desc: 'Collect project updates from daily reports, spreadsheets, PDFs, or site voice notes.',
              },
              {
                step: '02',
                title: 'EXTRACT',
                badge: 'Automated Extraction',
                desc: 'Read raw site reports and identify work descriptions, quantities, locations, and dates.',
              },
              {
                step: '03',
                title: 'STRUCTURE',
                badge: 'Normalization',
                desc: 'Convert unstructured updates into standardized progress records ready for linking.',
              },
              {
                step: '04',
                title: 'MATCH',
                badge: 'AI Candidate Match',
                desc: 'Correlate extracted progress items with project schedule baseline activities.',
              },
              {
                step: '05',
                title: 'PLANNER REVIEW',
                badge: 'Human Governance',
                desc: 'System suggests. Authorized planning engineer approves, edits, or rejects.',
                highlight: true,
              },
              {
                step: '06',
                title: 'SAVE PROGRESS',
                badge: 'Audit Baseline',
                desc: 'Approved actuals recorded into schedule baseline with permanent audit logging.',
              },
            ].map((st, idx) => (
              <div key={st.step} className="relative">
                {/* Road Checkpoint Node */}
                <div
                  className={`absolute -left-12 sm:-left-16 top-4 w-10 h-10 rounded-full flex items-center justify-center font-mono font-black text-xs shadow-md z-10 ${
                    st.highlight
                      ? 'bg-[#FF5500] text-white ring-2 ring-white'
                      : 'bg-white text-[#0B1320] border-2 border-[#0B1320]'
                  }`}
                >
                  {st.step}
                </div>

                {/* Card */}
                <div
                  className={`p-5 rounded-2xl border ${
                    st.highlight
                      ? 'bg-[#0B1320] text-white border-[#FF5500]/50 shadow-md'
                      : 'bg-white border-[#E8E1D5] shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-[#FF5500] uppercase tracking-wider">{st.step} · {st.badge}</span>
                  </div>
                  <h4 className={`text-base font-bold ${st.highlight ? 'text-white' : 'text-[#0B1320]'}`}>{st.title}</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${st.highlight ? 'text-stone-300' : 'text-stone-600'}`}>{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5B — REAL PROJECT PROGRESS GRAPHICAL INTELLIGENCE                   */}
      {/* Visual Charts demonstrating civil progress understanding                 */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E8E1D5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] text-[#0B1320] text-xs font-bold uppercase tracking-wider mb-2">
              <MdTrendingUp className="text-[#FF5500]" />
              <span>Project Analytics Preview</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-[#0B1320] tracking-tight">
              Actionable Progress Data, Not Decorative Charts
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] mt-2">
              Visual metrics based on real schedule activities, approved site quantities, and planner review decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Visual 1: Activity Status Donut Representation */}
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
                <span className="text-xs font-bold text-[#0B1320]">Activity Status Distribution</span>
                <span className="text-[10px] font-mono text-stone-400">Sample WBS</span>
              </div>
              <div className="flex items-center justify-center py-4">
                <div className="relative w-36 h-36 rounded-full flex items-center justify-center shadow-inner"
                  style={{
                    background: 'conic-gradient(#10B981 0% 64%, #F59E0B 64% 88%, #FF5500 88% 100%)',
                  }}
                >
                  <div className="w-24 h-24 rounded-full bg-[#FAF8F5] flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-[#0B1320]">100%</span>
                    <span className="text-[9px] font-bold text-stone-400 uppercase">Tracked</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-stone-600">Completed</span>
                  </div>
                  <strong className="text-[#0B1320]">64%</strong>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-stone-600">In Progress</span>
                  </div>
                  <strong className="text-[#0B1320]">24%</strong>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500]" />
                    <span className="text-stone-600">Pending Review</span>
                  </div>
                  <strong className="text-[#FF5500]">12%</strong>
                </div>
              </div>
            </div>

            {/* Visual 2: Progress by Civil Discipline */}
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
                <span className="text-xs font-bold text-[#0B1320]">Discipline Actuals</span>
                <span className="text-[10px] font-mono text-stone-400">vs Planned</span>
              </div>
              <div className="space-y-3 pt-2">
                {[
                  { name: 'Substructure & Raft', pct: 100, color: 'bg-emerald-600' },
                  { name: 'Pier Columns & Caps', pct: 65, color: 'bg-[#FF5500]' },
                  { name: 'Viaduct Girder Launching', pct: 28, color: 'bg-amber-500' },
                  { name: 'Track Bed Concrete', pct: 14, color: 'bg-stone-400' },
                ].map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-[#0B1320]">{item.name}</span>
                      <strong className="font-mono text-stone-700">{item.pct}%</strong>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2 text-[11px] text-stone-500 text-center font-medium">
                Automatic schedule recalculation on planner approval
              </div>
            </div>

            {/* Visual 3: Human Review Verification Rate */}
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
                <span className="text-xs font-bold text-[#0B1320]">Planner Governance Ratio</span>
                <span className="text-[10px] font-mono text-stone-400">Audit History</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] space-y-2 text-center">
                <span className="text-4xl font-black text-emerald-700 font-mono">92.4%</span>
                <p className="text-xs font-bold text-[#0B1320]">First-Pass Match Accuracy</p>
                <p className="text-[11px] text-stone-500">Extracted progress correctly linked to schedule activity on first presentation</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-[#E8E1D5]">
                  <span className="text-stone-400 block text-[10px]">Adjusted by Planner</span>
                  <strong className="text-amber-600">6.8%</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E8E1D5]">
                  <span className="text-stone-400 block text-[10px]">Rejected Links</span>
                  <strong className="text-rose-600">0.8%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 — FLOWING ORANGE VISUAL STORY: THE PLANNING-TO-EXECUTION BRIDGE  */}
      {/* ========================================================================= */}
      <section className="relative bg-[#FAF8F5] overflow-hidden text-white">
        
        {/* Subtle Organic Wave — Top Transition from Cream (#FAF8F5) into Orange */}
        <div className="w-full overflow-hidden leading-none relative z-20">
          <svg
            viewBox="0 0 1440 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-10 sm:h-14 lg:h-16 block"
            preserveAspectRatio="none"
          >
            <path
              d="M0,24 C320,68 640,72 960,32 C1160,8 1320,28 1440,48 L1440,72 L0,72 Z"
              fill="#FF4500"
            />
          </svg>
        </div>

        {/* Large Flowing Orange-Red Visual Canvas */}
        <div className="bg-gradient-to-b from-[#FF4500] via-[#E83E00] to-[#B82E00] relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          
          {/* Subtle background technical grid */}
          <div className="absolute inset-0 bg-orange-grid opacity-20 pointer-events-none" />

          {/* Ambient lighting glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.08] rounded-full blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[300px] bg-amber-300/[0.08] rounded-full blur-3xl"
          />

          <div className="max-w-6xl mx-auto relative z-10">

            {/* Floating Glassmorphic Context Chips (Visual storytelling elements) */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
              <span className="animate-float-slow px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 hover:bg-white/25 transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                DPR Report
              </span>
              <span className="animate-float-reverse px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 hover:bg-white/25 transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Schedule Activity
              </span>
              <span className="animate-float-slow px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 hover:bg-white/25 transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-200 animate-pulse" />
                Voice Update
              </span>
              <span className="animate-float-reverse px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 hover:bg-white/25 transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Progress Event
              </span>
              <span className="animate-float-slow px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 hover:bg-white/25 transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-200 animate-pulse" />
                Planner Review
              </span>
              <span className="animate-float-reverse px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/35 text-white text-xs font-bold shadow-sm inline-flex items-center gap-1.5 hover:bg-white/30 transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Approved
              </span>
            </div>

            {/* Editorial Typography & Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-xs text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4 border border-white/25 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
                <span>The Planning &rarr; Execution Gap</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.035em] leading-[1.08] mb-4 text-white">
                From field updates <br className="hidden sm:inline" />
                <span className="text-amber-200">to approved progress.</span>
              </h2>

              <p className="text-base sm:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed font-medium mb-3">
                PragatiPath connects real project updates with planned activities.
              </p>
              
              <p className="text-xs sm:text-sm text-white/80 font-mono">
                Your schedule is structured. Your field updates aren't. <span className="text-white font-bold underline decoration-amber-300 underline-offset-4">PragatiPath connects them.</span>
              </p>
            </div>

            {/* ===================================================================== */}
            {/* 6-STEP CONNECTED FLOWING DATA PATH WITH ANIMATED SVG LINE & PULSE DOT */}
            {/* ===================================================================== */}
            <div className="mb-16 relative">
              
              {/* Desktop Curved Connected SVG Flow Line (Visible lg and above) */}
              <div className="hidden lg:block absolute top-[52px] left-[5%] right-[5%] h-12 pointer-events-none z-0">
                <svg
                  viewBox="0 0 1000 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  {/* Base glowing line */}
                  <path
                    d="M 20 30 Q 250 10, 500 30 T 980 30"
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="3"
                    fill="none"
                  />
                  {/* Flowing animated dash line */}
                  <path
                    d="M 20 30 Q 250 10, 500 30 T 980 30"
                    stroke="#FFD580"
                    strokeWidth="3"
                    className="animate-flow-dash"
                    fill="none"
                  />
                  {/* Moving traveling data dot */}
                  <circle r="5" fill="#FFFFFF" className="filter drop-shadow-[0_0_8px_#FFFFFF]">
                    <animateMotion
                      path="M 20 30 Q 250 10, 500 30 T 980 30"
                      dur="5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="3" fill="#FF4500">
                    <animateMotion
                      path="M 20 30 Q 250 10, 500 30 T 980 30"
                      dur="5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </div>

              {/* The 6 Flow Steps Grid (Responsive: 1 col on mobile, 2 on sm, 3 on md, 6 on lg) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 relative z-10">
                
                {/* 01 CAPTURE */}
                <div className="bg-[#0B1320]/80 hover:bg-[#0B1320]/95 transition-all duration-300 rounded-2xl p-4 border border-white/20 backdrop-blur-md flex flex-col justify-between shadow-xl group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-8 h-8 rounded-full bg-white/10 text-amber-300 font-mono font-black text-xs flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                        01
                      </span>
                      <span className="text-[10px] font-bold text-amber-300/80 uppercase tracking-wider">Input</span>
                    </div>
                    <h3 className="text-sm font-black text-white tracking-wide mb-1">
                      CAPTURE
                    </h3>
                    <p className="text-xs text-stone-300 leading-snug">
                      Field reports, files and voice
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[10px] font-mono text-stone-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Raw updates</span>
                  </div>
                </div>

                {/* 02 EXTRACT */}
                <div className="bg-[#0B1320]/80 hover:bg-[#0B1320]/95 transition-all duration-300 rounded-2xl p-4 border border-white/20 backdrop-blur-md flex flex-col justify-between shadow-xl group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-8 h-8 rounded-full bg-white/10 text-amber-300 font-mono font-black text-xs flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                        02
                      </span>
                      <span className="text-[10px] font-bold text-amber-300/80 uppercase tracking-wider">Parser</span>
                    </div>
                    <h3 className="text-sm font-black text-white tracking-wide mb-1">
                      EXTRACT
                    </h3>
                    <p className="text-xs text-stone-300 leading-snug">
                      Find useful progress details
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[10px] font-mono text-stone-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Key parameters</span>
                  </div>
                </div>

                {/* 03 STRUCTURE */}
                <div className="bg-[#0B1320]/80 hover:bg-[#0B1320]/95 transition-all duration-300 rounded-2xl p-4 border border-white/20 backdrop-blur-md flex flex-col justify-between shadow-xl group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-8 h-8 rounded-full bg-white/10 text-amber-300 font-mono font-black text-xs flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                        03
                      </span>
                      <span className="text-[10px] font-bold text-amber-300/80 uppercase tracking-wider">Schema</span>
                    </div>
                    <h3 className="text-sm font-black text-white tracking-wide mb-1">
                      STRUCTURE
                    </h3>
                    <p className="text-xs text-stone-300 leading-snug">
                      Convert raw updates into usable data
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[10px] font-mono text-stone-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Qty &bull; Unit &bull; Date</span>
                  </div>
                </div>

                {/* 04 MATCH */}
                <div className="bg-[#0B1320]/80 hover:bg-[#0B1320]/95 transition-all duration-300 rounded-2xl p-4 border border-white/20 backdrop-blur-md flex flex-col justify-between shadow-xl group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-8 h-8 rounded-full bg-white/10 text-amber-300 font-mono font-black text-xs flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                        04
                      </span>
                      <span className="text-[10px] font-bold text-amber-300/80 uppercase tracking-wider">Linking</span>
                    </div>
                    <h3 className="text-sm font-black text-white tracking-wide mb-1">
                      MATCH
                    </h3>
                    <p className="text-xs text-stone-300 leading-snug">
                      Connect updates to schedule activities
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[10px] font-mono text-stone-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Confidence score</span>
                  </div>
                </div>

                {/* 05 REVIEW */}
                <div className="bg-[#0B1320]/80 hover:bg-[#0B1320]/95 transition-all duration-300 rounded-2xl p-4 border border-white/20 backdrop-blur-md flex flex-col justify-between shadow-xl group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-8 h-8 rounded-full bg-white/10 text-amber-300 font-mono font-black text-xs flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                        05
                      </span>
                      <span className="text-[10px] font-bold text-amber-300/80 uppercase tracking-wider">Human Control</span>
                    </div>
                    <h3 className="text-sm font-black text-white tracking-wide mb-1">
                      REVIEW
                    </h3>
                    <p className="text-xs text-stone-300 leading-snug">
                      Planner approves or edits
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[10px] font-mono text-stone-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Planner in charge</span>
                  </div>
                </div>

                {/* 06 PROGRESS */}
                <div className="bg-[#FAF8F5] text-[#0B1320] hover:bg-white transition-all duration-300 rounded-2xl p-4 border-2 border-white shadow-2xl flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-8 h-8 rounded-full bg-[#FF4500] text-white font-mono font-black text-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                        06
                      </span>
                      <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">Verified</span>
                    </div>
                    <h3 className="text-sm font-black text-[#0B1320] tracking-wide mb-1">
                      PROGRESS
                    </h3>
                    <p className="text-xs text-[#475569] leading-snug font-medium">
                      Approved progress is saved
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone-200 flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>Permanent audit log</span>
                  </div>
                </div>

              </div>

              {/* Data Flow Caption */}
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-2 text-xs font-mono text-white/80 bg-black/20 px-3 py-1 rounded-full border border-white/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                  Data is moving through PragatiPath: raw updates &rarr; verified baseline record
                </span>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* VISUAL STORY CONNECTOR PIPELINE                                       */}
            {/* ===================================================================== */}
            <div className="mb-14 p-5 sm:p-6 rounded-2xl bg-black/25 backdrop-blur-md border border-white/20">
              <div className="text-center text-[11px] font-mono uppercase tracking-widest text-amber-200 mb-4">
                HOW PRAGATIPATH CONNECTS THE PROJECT STORY
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
                <div className="flex-1 w-full bg-white/10 rounded-xl p-3 border border-white/15">
                  <div className="text-[10px] text-amber-300 uppercase font-mono font-bold">Planned Schedule</div>
                  <div className="text-xs font-black text-white mt-0.5">Primavera / MS Project</div>
                </div>
                <div className="text-white/60 font-black text-lg">&darr; <span className="hidden sm:inline">&rarr;</span></div>
                <div className="flex-1 w-full bg-white/10 rounded-xl p-3 border border-white/15">
                  <div className="text-[10px] text-amber-300 uppercase font-mono font-bold">Field Information</div>
                  <div className="text-xs font-black text-white mt-0.5">Reports &bull; PDFs &bull; CSV &bull; Text &bull; Voice</div>
                </div>
                <div className="text-white/60 font-black text-lg">&darr; <span className="hidden sm:inline">&rarr;</span></div>
                <div className="flex-1 w-full bg-[#FF4500] text-white rounded-xl p-3 border border-white/30 shadow-md">
                  <div className="text-[10px] text-white/90 uppercase font-mono font-black">PragatiPath</div>
                  <div className="text-xs font-black text-white mt-0.5">Extract &rarr; Structure &rarr; Match &rarr; Review</div>
                </div>
                <div className="text-white/60 font-black text-lg">&darr; <span className="hidden sm:inline">&rarr;</span></div>
                <div className="flex-1 w-full bg-white text-[#0B1320] rounded-xl p-3 border border-white shadow-md">
                  <div className="text-[10px] text-emerald-700 uppercase font-mono font-extrabold">Final Outcome</div>
                  <div className="text-xs font-black text-[#0B1320] mt-0.5">Approved Progress</div>
                </div>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* SHORT PRIMAVERA / MS PROJECT vs PRAGATIPATH COMPARISON (NO PARAGRAPHS) */}
            {/* ===================================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
              
              {/* Planning Tools (Primavera P6 / MS Project) */}
              <div className="bg-[#FAF8F5] text-[#0B1320] rounded-2xl p-5 sm:p-7 border border-[#E8E1D5] shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E8E1D5]">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] block">
                        PLANNING TOOLS
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-[#0B1320] mt-0.5">
                        PRIMAVERA P6 / MS PROJECT
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#EAE2D5] text-[#0B1320] text-[11px] font-bold">
                      Master Plan
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#334155] font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B1320]" />
                      <span>Plan activities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B1320]" />
                      <span>Manage schedules</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B1320]" />
                      <span>Track dependencies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B1320]" />
                      <span>Manage baselines</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E8E1D5] text-[11px] font-mono text-[#64748B]">
                  Role: Schedule & Dependency Modeling
                </div>
              </div>

              {/* PragatiPath Bridge */}
              <div className="bg-white text-[#0B1320] rounded-2xl p-5 sm:p-7 border-2 border-white shadow-2xl flex flex-col justify-between ring-2 ring-white/40">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E8E1D5]">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF4500] block">
                        EXECUTION LAYER
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-[#0B1320] mt-0.5">
                        PRAGATIPATH
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#FFF2EB] text-[#FF4500] text-[11px] font-bold border border-[#FFD8C7]">
                      Bridge
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#0B1320] font-semibold">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]" />
                      <span>Capture field updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]" />
                      <span>Process raw information</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]" />
                      <span>Match updates to activities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]" />
                      <span>Review before saving</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>Track actual progress</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E8E1D5] text-[11px] font-mono text-[#FF4500] font-bold">
                  Role: Field Capture & Schedule-Linking Layer
                </div>
              </div>

            </div>

            {/* Bottom Clarifying Callout (Factual bridge statement) */}
            <div className="mt-8 text-center">
              <p className="text-xs sm:text-sm text-white/95 font-medium bg-black/20 backdrop-blur-xs py-2.5 px-4 rounded-full inline-block border border-white/15">
                <strong>PragatiPath connects field updates with the planned schedule.</strong> It does not replace your planning engine.
              </p>
            </div>

          </div>
        </div>

        {/* Subtle Organic Wave — Bottom Transition from Warm Red-Orange (#B82E00) into Cream (#FAF8F5) */}
        <div className="w-full overflow-hidden leading-none relative z-20">
          <svg
            viewBox="0 0 1440 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-10 sm:h-14 lg:h-16 block"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 L1440,0 L1440,24 C1200,64 880,72 560,28 C340,0 160,20 0,44 Z"
              fill="#B82E00"
            />
          </svg>
        </div>

      </section>


      {/* ========================================================================= */}
      {/* SECTION 7 — PLANNING OFFICE & VERIFIED ARCHITECTURE NUMBERS               */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E1D5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Planning Desk Image Callout */}
          <div className="mb-14 rounded-3xl overflow-hidden border border-[#E8E1D5] warm-card-shadow bg-white grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 h-64 sm:h-80 overflow-hidden relative">
              <img
                src="/planning-desk.jpg"
                alt="Civil engineering project planning office desk with blueprints and schedule Gantt charts"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0B1320]/80 backdrop-blur-xs text-white text-[11px] font-bold">
                Planning Office Workspace
              </div>
            </div>
            <div className="lg:col-span-6 p-6 sm:p-10 space-y-3">
              <span className="text-[11px] font-bold text-[#FF5500] uppercase tracking-wider">
                Engineering Governance
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0B1320]">
                Built for Planners in the Office & Supervisors on Site
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Connect schedule activities (Primavera P6, MS Project) with daily site reports without disrupting the engineering workflow.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-bold text-[#0B1320]">
                <span className="flex items-center gap-1 text-emerald-600">✓ Zero Schedule Overwrites</span>
                <span className="flex items-center gap-1 text-emerald-600">✓ 100% Audit Logging</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow text-center hover:-translate-y-1 transition-all">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1320] tracking-tight font-mono">
                L1–L6
              </span>
              <h4 className="text-sm font-bold text-[#0B1320] mt-3">WBS Hierarchy</h4>
              <p className="text-xs text-[#64748B] mt-1">From project summary down to detailed activity packages</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow text-center hover:-translate-y-1 transition-all">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black text-[#FF5500] tracking-tight font-mono">
                1
              </span>
              <h4 className="text-sm font-bold text-[#0B1320] mt-3">Planner Approval</h4>
              <p className="text-xs text-[#64748B] mt-1">Authorized human engineer verifies every schedule change</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow text-center hover:-translate-y-1 transition-all">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1320] tracking-tight font-mono">
                5+
              </span>
              <h4 className="text-sm font-bold text-[#0B1320] mt-3">Input Formats</h4>
              <p className="text-xs text-[#64748B] mt-1">Spreadsheets, CSV, JSON, daily report text, and PDFs</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow text-center hover:-translate-y-1 transition-all">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black text-[#FF5500] tracking-tight font-mono">
                100%
              </span>
              <h4 className="text-sm font-bold text-[#0B1320] mt-3">Audit Trail</h4>
              <p className="text-xs text-[#64748B] mt-1">Server-side logged history of every reviewer decision</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8 — WHO IS IT FOR? (ROLE CARDS)                                   */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#F5F1E8] border-b border-[#E8E1D5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
              Project Roles
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1320] tracking-tight mt-1 mb-3">
              Tailored for Every Project Team Member
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              PragatiPath provides specific capabilities matching each team member’s role on site and in the planning office.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1320] text-[#FF5500] flex items-center justify-center mb-4">
                <MdBusiness size={22} />
              </div>
              <h3 className="text-base font-bold text-[#0B1320] mb-1">Project Managers</h3>
              <p className="text-xs text-[#FF5500] font-bold mb-3">Executive Oversight</p>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                See real progress against schedule baselines, track delayed activities, and confirm reported field milestones.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1320] text-[#FF5500] flex items-center justify-center mb-4">
                <MdEngineering size={22} />
              </div>
              <h3 className="text-base font-bold text-[#0B1320] mb-1">Project Planners</h3>
              <p className="text-xs text-[#FF5500] font-bold mb-3">Schedule Reconciliation</p>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Import schedules, review candidate matches, approve actual dates, and keep records up to date without manual searches.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1320] text-[#FF5500] flex items-center justify-center mb-4">
                <MdSupervisorAccount size={22} />
              </div>
              <h3 className="text-base font-bold text-[#0B1320] mb-1">Site Supervisors</h3>
              <p className="text-xs text-[#FF5500] font-bold mb-3">Field Execution</p>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Submit daily progress reports, log work quantities, and confirm field completion without learning complex scheduling tools.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1320] text-[#FF5500] flex items-center justify-center mb-4">
                <MdConstruction size={22} />
              </div>
              <h3 className="text-base font-bold text-[#0B1320] mb-1">Contractors</h3>
              <p className="text-xs text-[#FF5500] font-bold mb-3">Subcontractor Updates</p>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Provide structured progress notes, daily quantities, and location logs aligned with the main schedule requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9 — FINAL CALL TO ACTION (WARM PILL / CARD DESIGN)                */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-14 rounded-3xl bg-[#0B1320] text-white warm-card-shadow relative overflow-hidden">
            <NetworkLines variant="white" className="opacity-25" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
                Ready to connect your project plan with site progress?
              </h2>
              <p className="text-base sm:text-lg text-[#DDD3C1] mb-8 leading-relaxed font-normal">
                Give your project planners and site supervisors a clear, unified bridge between daily field reports and scheduled activities.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF5500] hover:bg-[#E64D00] text-white font-bold text-sm sm:text-base shadow-md transition-all group"
                >
                  <span>Get Started</span>
                  <MdArrowForward size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm sm:text-base font-bold transition-colors"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

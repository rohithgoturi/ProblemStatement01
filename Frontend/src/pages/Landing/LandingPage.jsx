/**
 * PragatiPath — Public Home Page (Clienter-inspired UI Redesign)
 * Warm cream background, technical engineering grid, subtle network lines, orange accents,
 * large bold typography, and human civil-engineering language.
 */
import { useState } from 'react';
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
} from 'react-icons/md';

export default function LandingPage() {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState(3); // 0 to 5

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
      
      {/* ========================================================================= */}
      {/* SECTION 1 — HERO SECTION                                                  */}
      {/* ========================================================================= */}
      <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 border-b border-[#E8E1D5] bg-technical-grid overflow-hidden">
        {/* Subtle decorative fiber network lines */}
        <NetworkLines variant="orange" />

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
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-[#E8E1D5] text-[#0B1320] text-xs font-bold shadow-2xs hover:bg-white transition-colors"
              >
                <span className="text-[#FF5500] flex-shrink-0">{fact.icon}</span>
                <span className="truncate">{fact.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — LARGE ORANGE FEATURE SECTION (CLIENTER-INSPIRED)              */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#FF5500] via-[#F94D00] to-[#E64400] text-white relative overflow-hidden">
        {/* Subtle white grid overlay */}
        <div className="absolute inset-0 bg-orange-grid opacity-30 pointer-events-none" />

        {/* Decorative Floating Badges */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden select-none">
          <span className="absolute top-12 left-10 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold animate-pulse-subtle">
            DPR Reports
          </span>
          <span className="absolute top-24 right-16 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold animate-pulse-subtle" style={{ animationDelay: '1s' }}>
            Site Diaries
          </span>
          <span className="absolute bottom-20 left-16 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold animate-pulse-subtle" style={{ animationDelay: '2s' }}>
            Schedule Activities
          </span>
          <span className="absolute bottom-16 right-12 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold animate-pulse-subtle" style={{ animationDelay: '1.5s' }}>
            Planner Review
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
              The Real Project Challenge
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.03em] leading-tight">
              Project updates should not stay disconnected from the plan.
            </h2>
            <p className="text-base sm:text-lg text-white/90 mt-4 leading-relaxed font-normal">
              When site reports arrive in spreadsheets, text notes, and daily diaries, connecting them to scheduled activities takes hours of manual guesswork. PragatiPath builds the bridge.
            </p>
          </div>

          {/* The Old Way vs The PragatiPath Way Cards (Clienter Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            
            {/* The Old Way Card */}
            <div className="bg-[#FAF8F5] text-[#0B1320] rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E8E1D5]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                    Traditional Method
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#EAE2D5] text-[#475569] text-xs font-bold">
                    The Old Way
                  </span>
                </div>

                <ul className="space-y-4 text-sm text-[#475569]">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                      ✕
                    </span>
                    <span><strong>Information across different files:</strong> DPRs, site diaries, and spreadsheets stored in separate folders and emails.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                      ✕
                    </span>
                    <span><strong>Different names for activities:</strong> Site supervisors describe work in everyday terms that do not match schedule activity IDs.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                      ✕
                    </span>
                    <span><strong>Manual progress checking:</strong> Planners spend days cross-referencing text notes against critical path schedules.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                      ✕
                    </span>
                    <span><strong>Updates disconnected from schedules:</strong> Unmatched field updates get overlooked, causing surprise delays at milestones.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E1D5] text-xs text-[#64748B]">
                Result: Delayed progress visibility and slow milestone tracking.
              </div>
            </div>

            {/* The PragatiPath Way Card */}
            <div className="bg-white text-[#0B1320] rounded-3xl p-6 sm:p-8 border-2 border-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E8E1D5]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                    Schedule-Linking Layer
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#FFF2EB] text-[#FF5500] text-xs font-bold border border-[#FFD8C7]">
                    The PragatiPath Way
                  </span>
                </div>

                <ul className="space-y-4 text-sm text-[#0B1320]">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span><strong>Project updates in one workflow:</strong> Upload daily reports, spreadsheets, or notes directly into a central inbox.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span><strong>Extracted progress details:</strong> Automatically captures completed quantities, locations, and reported dates.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span><strong>Suggested activity matches:</strong> System proposes candidate schedule activities with clear confidence ratings.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span><strong>Planner reviews & full audit trail:</strong> The project planner reviews, adjusts, and approves before the schedule updates.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E1D5] text-xs text-emerald-700 font-bold">
                Result: Continuous, verified alignment between site execution and schedule baseline.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — HOW PRAGATIPATH WORKS (CONNECTED WORKFLOW)                    */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E1D5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
              Step-by-Step Workflow
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1320] tracking-tight mt-2 mb-4">
              How PragatiPath Works
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              A transparent, connected 6-step workflow built around how civil engineering teams already operate.
            </p>
          </div>

          {/* Connected Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Add Schedule',
                desc: 'Import project baseline activities, WBS structure (L1–L6), and planned dates from standard files.',
                icon: <MdCalendarToday size={22} />,
              },
              {
                step: '02',
                title: 'Add Site Updates',
                desc: 'Upload daily progress reports (DPRs), supervisor updates, contractor spreadsheets, or text notes.',
                icon: <MdDescription size={22} />,
              },
              {
                step: '03',
                title: 'Extract Progress',
                desc: 'The system reads the text to identify work done, locations, completed quantities, and dates.',
                icon: <MdSearch size={22} />,
              },
              {
                step: '04',
                title: 'Match Activities',
                desc: 'Compares extracted work descriptions with scheduled activities and suggests the best-fitting match.',
                icon: <MdLink size={22} />,
              },
              {
                step: '05',
                title: 'Planner Reviews',
                desc: 'The authorized planner reviews suggestions, adjusts progress values if needed, and clicks approve.',
                icon: <MdAssignmentTurnedIn size={22} />,
              },
              {
                step: '06',
                title: 'Track Actual Progress',
                desc: 'Approved updates update the project status and are permanently preserved in the audit log.',
                icon: <MdTrendingUp size={22} />,
              },
            ].map((st, i) => (
              <div
                key={st.step}
                className="bg-white rounded-3xl p-6 border border-[#E8E1D5] hover:border-[#FF5500]/40 warm-card-shadow transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] flex items-center justify-center group-hover:scale-105 transition-transform">
                      {st.icon}
                    </div>
                    <span className="text-sm font-mono font-black text-[#94A3B8] group-hover:text-[#FF5500] transition-colors">
                      {st.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#0B1320] mb-2">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{st.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E8E1D5]/60 flex items-center justify-between text-[11px] text-[#94A3B8]">
                  <span>Step {i + 1} of 6</span>
                  {i < 5 && <span className="text-[#FF5500] font-bold">Next →</span>}
                  {i === 5 && <span className="text-emerald-600 font-bold">Complete ✓</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 — DATA TYPES (BRING UPDATES FROM DIFFERENT SOURCES)             */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#F5F1E8] border-b border-[#E8E1D5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
              Supported Input Types
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1320] tracking-tight mt-2 mb-4">
              Bring Project Updates From Different Sources
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              We work with formats your planning office and field supervisors already generate every day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Daily Progress Reports (DPR)',
                desc: 'Upload structured daily progress report documents containing descriptions, quantities, and site conditions.',
                icon: <MdDescription size={22} />,
              },
              {
                title: 'Site Diaries & Field Logs',
                desc: 'Capture shift updates, supervisor diaries, and daily contractor logs directly without reformatting.',
                icon: <MdHistoryEdu size={22} />,
              },
              {
                title: 'Excel & CSV Spreadsheets',
                desc: 'Import schedule baselines or progress lists in .xlsx, .xls, or .csv with automatic column mapping.',
                icon: <MdInsertDriveFile size={22} />,
              },
              {
                title: 'Schedule Activities & Baselines',
                desc: 'Load multi-level WBS activities with planned start and finish dates, activity IDs, and disciplines.',
                icon: <MdCalendarToday size={22} />,
              },
              {
                title: 'Supervisor Progress Notes',
                desc: 'Enter plain text notes and observations from field engineers directly into the submission inbox.',
                icon: <MdSupervisorAccount size={22} />,
              },
              {
                title: 'PDF & Text Documents',
                desc: 'Accept PDF and plain text progress reports for automated progress quantity and date extraction.',
                icon: <MdInsertDriveFile size={22} />,
              },
            ].map((dt, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white border border-[#E8E1D5] hover:border-[#D5CBB9] warm-card-shadow transition-all"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] flex items-center justify-center mb-4">
                  {dt.icon}
                </div>
                <h3 className="text-base font-bold text-[#0B1320] mb-2">{dt.title}</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{dt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 — NUMERICAL PRODUCT FACTS (LARGE TYPOGRAPHY, NO FAKE STATS)    */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E1D5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
              Architecture Facts
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1320] tracking-tight mt-2 mb-3">
              Verified Project Architecture Numbers
            </h2>
            <p className="text-sm text-[#475569]">
              Measurable system capabilities tested and proven on infrastructure schedules and reports.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow text-center">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1320] tracking-tight font-mono">
                L1–L6
              </span>
              <h4 className="text-sm font-bold text-[#0B1320] mt-3">WBS Hierarchy</h4>
              <p className="text-xs text-[#64748B] mt-1">From project summary down to detailed activity packages</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow text-center">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black text-[#FF5500] tracking-tight font-mono">
                1
              </span>
              <h4 className="text-sm font-bold text-[#0B1320] mt-3">Planner Approval</h4>
              <p className="text-xs text-[#64748B] mt-1">Authorized human engineer verifies every schedule change</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow text-center">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1320] tracking-tight font-mono">
                5+
              </span>
              <h4 className="text-sm font-bold text-[#0B1320] mt-3">Input Formats</h4>
              <p className="text-xs text-[#64748B] mt-1">Spreadsheets, CSV, JSON, daily report text, and PDFs</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow text-center">
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
      {/* SECTION 7 — WHY PRAGATIPATH?                                              */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#F5F1E8] border-b border-[#E8E1D5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
              Operational Benefits
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1320] tracking-tight mt-2 mb-4">
              Why Project Teams Use PragatiPath
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              Designed to help civil engineering planners and site engineers work together with clear accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Built Around Real Project Updates',
                desc: 'Works with daily site logs, DPRs, and spreadsheets that your field team already creates.',
              },
              {
                num: '02',
                title: 'AI Suggests — Planner Decides',
                desc: 'Automated matching suggests linkages, but the authorized planner reviews and approves every record.',
              },
              {
                num: '03',
                title: 'Connect Reports With Schedule Activities',
                desc: 'Removes the guesswork of identifying which daily field entry belongs to which schedule activity ID.',
              },
              {
                num: '04',
                title: 'Catch Unmatched Updates',
                desc: 'Site updates that do not match planned items are clearly flagged instead of being lost in email threads.',
              },
              {
                num: '05',
                title: 'Confidence Before Action',
                desc: 'Candidate matches display similarity scores so planners immediately know which items need close checking.',
              },
              {
                num: '06',
                title: 'Track What Changed',
                desc: 'Every approval, adjustment, and rejection is saved with timestamps and reviewer notes for permanent audit.',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] warm-card-shadow flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-black text-[#FF5500] mb-2 block">
                    {item.num}
                  </span>
                  <h3 className="text-base font-bold text-[#0B1320] mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8 — WHO IS IT FOR?                                                */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E1D5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
              Project Roles
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1320] tracking-tight mt-2 mb-4">
              Tailored for Every Project Team Member
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              PragatiPath provides specific capabilities matching each team member’s role on site and in the planning office.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1320] text-[#FF5500] flex items-center justify-center mb-4">
                <MdBusiness size={22} />
              </div>
              <h3 className="text-base font-bold text-[#0B1320] mb-1">Project Managers</h3>
              <p className="text-xs text-[#FF5500] font-bold mb-3">Executive Oversight</p>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                See real progress against schedule baselines, track delayed activities, and confirm reported field milestones.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1320] text-[#FF5500] flex items-center justify-center mb-4">
                <MdEngineering size={22} />
              </div>
              <h3 className="text-base font-bold text-[#0B1320] mb-1">Project Planners</h3>
              <p className="text-xs text-[#FF5500] font-bold mb-3">Schedule Reconciliation</p>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Import schedules, review candidate matches, approve actual dates, and keep records up to date without manual searches.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1320] text-[#FF5500] flex items-center justify-center mb-4">
                <MdSupervisorAccount size={22} />
              </div>
              <h3 className="text-base font-bold text-[#0B1320] mb-1">Site Supervisors</h3>
              <p className="text-xs text-[#FF5500] font-bold mb-3">Field Execution</p>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Submit daily progress reports, log work quantities, and confirm field completion without learning complex scheduling tools.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] warm-card-shadow">
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
            {/* Subtle fiber line inside CTA card */}
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

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
      {/* SECTION 5 — CONNECTED WORKFLOW FLOWCHART (CURVED PATH ROADMAP)            */}
      {/* Inspired by Reference Image 1: Curved road connecting numbered steps       */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-16 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E1D5] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] text-[11px] font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
              <span>Connected Product Journey</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1320] tracking-tight">
              How PragatiPath Works
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              A visual path connecting messy site updates to verified project schedule records.
            </p>
          </div>

          {/* ROADMAP FLOWCHART: 6 CONNECTED STAGES */}
          <div className="space-y-6 lg:space-y-8 relative">
            
            {/* STEP 01 — CAPTURE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-5 bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] warm-card-shadow hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#FF5500] font-mono">01</span>
                  <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] text-[11px] font-bold text-[#0B1320]">
                    Field Ingestion
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B1320] mb-1">CAPTURE</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Bring daily project updates into one central inbox. Works with daily reports, site diaries, spreadsheets, PDFs, or voice notes.
                </p>
              </div>
              <div className="hidden lg:flex lg:col-span-2 justify-center">
                <div className="w-4 h-4 rounded-full bg-[#FF5500] ring-4 ring-[#FF5500]/20 shadow-md" />
              </div>
              <div className="hidden lg:block lg:col-span-5 text-xs text-stone-400 italic">
                “DPRs, WhatsApp notes, spreadsheets collected across work fronts”
              </div>
            </div>

            {/* STEP 02 — EXTRACT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div className="hidden lg:block lg:col-span-5 text-xs text-stone-400 italic text-right">
                “Reads descriptions, completed quantities, dates and work fronts”
              </div>
              <div className="hidden lg:flex lg:col-span-2 justify-center">
                <div className="w-4 h-4 rounded-full bg-[#FF5500] ring-4 ring-[#FF5500]/20 shadow-md" />
              </div>
              <div className="lg:col-span-5 bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] warm-card-shadow hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#FF5500] font-mono">02</span>
                  <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] text-[11px] font-bold text-[#0B1320]">
                    AI Extraction
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B1320] mb-1">EXTRACT</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Raw project information is read and important progress details are identified without manual data entry.
                </p>
              </div>
            </div>

            {/* STEP 03 — STRUCTURE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-5 bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] warm-card-shadow hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#FF5500] font-mono">03</span>
                  <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] text-[11px] font-bold text-[#0B1320]">
                    Standardization
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B1320] mb-1">STRUCTURE</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Unstructured notes are organized into standardized progress items (Activity, Location, Quantity, Discipline, Date).
                </p>
              </div>
              <div className="hidden lg:flex lg:col-span-2 justify-center">
                <div className="w-4 h-4 rounded-full bg-[#FF5500] ring-4 ring-[#FF5500]/20 shadow-md" />
              </div>
              <div className="hidden lg:block lg:col-span-5 text-xs text-stone-400 italic">
                “Normalized progress events ready for schedule linkage”
              </div>
            </div>

            {/* STEP 04 — MATCH */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div className="hidden lg:block lg:col-span-5 text-xs text-stone-400 italic text-right">
                “Compensates for terminology differences between site and CPM schedules”
              </div>
              <div className="hidden lg:flex lg:col-span-2 justify-center">
                <div className="w-4 h-4 rounded-full bg-[#FF5500] ring-4 ring-[#FF5500]/20 shadow-md" />
              </div>
              <div className="lg:col-span-5 bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] warm-card-shadow hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#FF5500] font-mono">04</span>
                  <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] text-[11px] font-bold text-[#0B1320]">
                    AI Candidate Matching
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B1320] mb-1">MATCH</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  The extracted progress is matched with candidate activities from the imported project schedule, with clear confidence scores.
                </p>
              </div>
            </div>

            {/* STEP 05 — REVIEW (HUMAN-IN-THE-LOOP HIGHLIGHT) */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#0B1320] text-white border-2 border-[#FF5500]/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5500]/20 text-[#FF5500] border border-[#FF5500]/30 text-xs font-bold uppercase tracking-wider">
                    <MdFactCheck size={16} />
                    <span>CRITICAL GOVERNANCE CHECKPOINT</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    05 · PLANNER REVIEW
                  </h3>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    <strong>AI Suggests. The Human Planner Decides.</strong> PragatiPath never silently alters master schedule baselines. The authorized planning engineer reviews candidate matches and chooses to Approve, Edit, or Reject.
                  </p>
                  <div className="flex items-center gap-2 pt-2 text-xs font-bold">
                    <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">✓ Approve</span>
                    <span className="px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">✎ Edit Quantities</span>
                    <span className="px-3 py-1.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">✕ Reject Match</span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-2.5 text-xs">
                  <span className="text-[10px] uppercase font-bold text-[#FF5500] tracking-wider block">
                    Planner Review Console
                  </span>
                  <div className="p-2.5 rounded-lg bg-white/10 border border-white/10">
                    <span className="text-[10px] text-stone-400">Site Update:</span>
                    <p className="font-bold text-white">Raft Concrete 45m³ at Unit 2</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FF5500]/20 border border-[#FF5500]/30">
                    <span className="text-[10px] text-[#FF5500] font-bold">Suggested Match (94% Confidence):</span>
                    <p className="font-bold text-white">ACT-1042: Pump House Foundation Raft</p>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 06 — SAVE PROGRESS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-5 bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] warm-card-shadow hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-600 font-mono">06</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800">
                    Audit Logging
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B1320] mb-1">SAVE PROGRESS</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Only approved information becomes part of the permanent project record, updating progress percentages with complete historical traceability.
                </p>
              </div>
              <div className="hidden lg:flex lg:col-span-2 justify-center">
                <div className="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 shadow-md" />
              </div>
              <div className="hidden lg:block lg:col-span-5 text-xs text-stone-400 italic">
                “Immutable audit logs record reviewer identity, timestamp, and schedule impact”
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 — THE CIVIL PROJECT CHALLENGE & REAL INFRASTRUCTURE IMAGE       */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#FF5500] via-[#F94D00] to-[#E64400] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-grid opacity-30 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
              The Real Project Challenge
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.03em] leading-tight">
              Project updates should not stay disconnected from the plan.
            </h2>
            <p className="text-base sm:text-lg text-white/90 mt-3 leading-relaxed font-normal">
              When site reports arrive in spreadsheets, text notes, and daily diaries, connecting them to scheduled activities takes hours of manual guesswork. PragatiPath builds the bridge.
            </p>
          </div>

          {/* Infrastructure Image + Side-by-Side Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
            {/* Visual Infrastructure Mega-Project Image */}
            <div className="lg:col-span-5 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl relative group flex flex-col justify-end min-h-[360px] bg-[#0B1320]">
              <img
                src="/infrastructure-flyover.jpg"
                alt="Active civil infrastructure elevated viaduct and bridge construction project"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/40 to-transparent" />
              <div className="relative z-10 p-6 text-white space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#FF5500] text-white text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>Real Construction Execution</span>
                </div>
                <h3 className="text-lg font-bold leading-snug">
                  Metro Corridors & Elevated Highways
                </h3>
                <p className="text-xs text-stone-300">
                  Multiple contractors pouring piers, launching precast girders, and filing daily logs that must link to the master schedule.
                </p>
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* The Old Way Card */}
              <div className="bg-[#FAF8F5] text-[#0B1320] rounded-3xl p-6 border border-[#E8E1D5] shadow-lg flex flex-col justify-between hover:-translate-y-1 transition-all">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E8E1D5]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                      Traditional Method
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EAE2D5] text-[#475569] text-[11px] font-bold">
                      The Old Way
                    </span>
                  </div>

                  <div className="mb-4 p-3 rounded-xl bg-white border border-[#E8E1D5] text-[11px] space-y-1.5 font-mono text-stone-600">
                    <div className="flex items-center gap-2 text-rose-600 font-bold">
                      <span>01</span> <span>Site diary filed in email</span>
                    </div>
                    <div className="text-stone-400 pl-4">↓</div>
                    <div className="flex items-center gap-2 text-rose-600 font-bold">
                      <span>02</span> <span>Planner reads raw text</span>
                    </div>
                    <div className="text-stone-400 pl-4">↓</div>
                    <div className="flex items-center gap-2 text-rose-600 font-bold">
                      <span>03</span> <span>Manual CPM activity search</span>
                    </div>
                    <div className="text-stone-400 pl-4">↓</div>
                    <div className="flex items-center gap-2 text-rose-600 font-bold">
                      <span>04</span> <span>Unverified date updates</span>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-[#475569]">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span>Information fragmented in WhatsApp & emails</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span>Field descriptions don't match schedule IDs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span>Unmatched field work causes milestone delays</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E1D5] text-[11px] text-rose-700 font-semibold">
                  Result: Slow visibility and delayed progress decisions.
                </div>
              </div>

              {/* The PragatiPath Way Card */}
              <div className="bg-white text-[#0B1320] rounded-3xl p-6 border-2 border-white shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-all">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E8E1D5]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                      Schedule-Linking Layer
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFF2EB] text-[#FF5500] text-[11px] font-bold border border-[#FFD8C7]">
                      The PragatiPath Way
                    </span>
                  </div>

                  <div className="mb-4 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-[11px] space-y-1.5 font-mono text-stone-700">
                    <div className="flex items-center gap-2 text-emerald-700 font-bold">
                      <span>01</span> <span>Upload DPR / Site Log</span>
                    </div>
                    <div className="text-stone-400 pl-4">↓</div>
                    <div className="flex items-center gap-2 text-emerald-700 font-bold">
                      <span>02</span> <span>Extract Work & Quantities</span>
                    </div>
                    <div className="text-stone-400 pl-4">↓</div>
                    <div className="flex items-center gap-2 text-emerald-700 font-bold">
                      <span>03</span> <span>Suggest Activity Match</span>
                    </div>
                    <div className="text-stone-400 pl-4">↓</div>
                    <div className="flex items-center gap-2 text-emerald-700 font-bold">
                      <span>04</span> <span>Planner Approves & Updates</span>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-[#0B1320]">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>All progress ingested into one unified workspace</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Automated activity matching with confidence scores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Planner verifies every single update before save</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E1D5] text-[11px] text-emerald-700 font-bold">
                  Result: Continuous verified progress alignment with audit logs.
                </div>
              </div>
            </div>
          </div>
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

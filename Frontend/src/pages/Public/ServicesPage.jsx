/**
 * PragatiPath — Services & Capabilities Page (Clienter-inspired Redesign)
 * Varied card hierarchy (hero feature card, supporting cards, orange pipeline section, dark action block),
 * connected 6-stage pipeline, and subtle hover animations.
 */
import { Link } from 'react-router-dom';
import { PublicPageHeader } from '../../components/shared/PublicPageHeader';
import { NetworkLines } from '../../components/shared/NetworkLines';
import {
  MdCalendarToday,
  MdInbox,
  MdSearch,
  MdLink,
  MdAssignmentTurnedIn,
  MdTrendingUp,
  MdArrowForward,
  MdCheckCircle,
  MdLayers,
  MdHistoryEdu,
  MdFactCheck,
} from 'react-icons/md';

export default function ServicesPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#0B1320] pb-24 selection:bg-[#FF5500] selection:text-white">
      {/* 1. HERO HEADER */}
      <PublicPageHeader
        badge="CAPABILITIES & SERVICES"
        title="Core Modules for Infrastructure Project Tracking"
        description="Every capability in PragatiPath is built to resolve operational bottlenecks between planned schedule baselines and daily field reports."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-20">
        
        {/* 2. DIVERSE CARD LAYOUT: LARGE FEATURE CARD + SUPPORTING CARDS */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-2">
            <div>
              <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
                System Capabilities
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0B1320] tracking-tight mt-1">
                Built for Project Reality
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-sm sm:text-right">
              Explore the six working modules powering our planning-to-execution layer.
            </p>
          </div>

          {/* Row 1: Large Feature Hero Card (Schedule & WBS Engine) */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E1D5] hover:border-[#FF5500]/40 warm-card-shadow transition-all duration-300 group relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MdCalendarToday size={24} />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#FF5500] uppercase tracking-wider">
                    01 · Core Schedule Baseline
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#0B1320]">
                  Schedule Baseline & WBS Management
                </h3>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Import, validate, and navigate complex project schedules across 6 tiers of Work Breakdown Structure (L1 Project to L6 Activity). Maintain authoritative dates, activity IDs, and engineering disciplines in one place.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5]">
                    <span className="text-[10px] font-bold uppercase text-[#94A3B8] block">Inputs</span>
                    <strong className="text-xs text-[#0B1320]">Excel, CSV & JSON</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5]">
                    <span className="text-[10px] font-bold uppercase text-[#94A3B8] block">Hierarchy</span>
                    <strong className="text-xs text-[#0B1320]">L1 to L6 WBS</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5]">
                    <span className="text-[10px] font-bold uppercase text-[#94A3B8] block">Disciplines</span>
                    <strong className="text-xs text-[#0B1320]">Civil, Piping, HSE</strong>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-[#E8E1D5] space-y-2.5 text-xs">
                <div className="h-28 rounded-xl overflow-hidden relative mb-2">
                  <img
                    src="/planning-desk.jpg"
                    alt="Civil project planning office desk with schedule baselines"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320]/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[10px] text-white font-bold">WBS Schedule & CPM Baselines</span>
                  </div>
                </div>
                <div className="flex items-center justify-between font-bold text-[#0B1320] border-b border-[#E8E1D5] pb-2">
                  <span>WBS Activity Hierarchy Preview</span>
                  <span className="text-[#FF5500] text-[10px]">Authoritative Baseline</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#E8E1D5]">
                  <span className="text-[10px] text-[#94A3B8] font-mono font-bold">L2 WBS: Civil Substructure</span>
                  <p className="font-bold text-[#0B1320] text-xs">Unit 2 Raw Water Pump House</p>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#E8E1D5] pl-5 border-l-2 border-l-[#FF5500]">
                  <span className="text-[10px] text-[#FF5500] font-mono font-bold">L5 Activity: ACT-1042</span>
                  <p className="font-bold text-[#0B1320] text-xs">P-101 Foundation Bay 3 Raft Concrete</p>
                  <span className="text-[10px] text-slate-500">Planned: 01 Sept – 12 Sept 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Two Medium Cards (DPR Ingestion & Information Extraction) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 02 */}
            <div className="bg-white rounded-3xl p-7 border border-[#E8E1D5] hover:border-[#FF5500]/40 warm-card-shadow transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MdInbox size={24} />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#94A3B8] group-hover:text-[#FF5500] transition-colors">
                    02
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5500]">
                  Field Data Capture
                </span>
                <h3 className="text-xl font-bold text-[#0B1320] mt-1 mb-2">
                  Daily Progress Report (DPR) Ingestion
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-4">
                  Capture shift logs, contractor spreadsheets, and site reports in a centralized inbox without forcing field engineers into complicated scheduling software.
                </p>

                <ul className="space-y-2 text-xs text-[#334155] border-t border-[#E8E1D5]/60 pt-4">
                  <li className="flex items-center gap-2">
                    <MdCheckCircle className="text-emerald-600 flex-shrink-0" />
                    <span>Upload PDF, spreadsheet (.xlsx), or plain text reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MdCheckCircle className="text-emerald-600 flex-shrink-0" />
                    <span>Preserves raw source text permanently for audit verification</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 03 */}
            <div className="bg-white rounded-3xl p-7 border border-[#E8E1D5] hover:border-[#FF5500]/40 warm-card-shadow transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MdSearch size={24} />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#94A3B8] group-hover:text-[#FF5500] transition-colors">
                    03
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5500]">
                  Parsing & Standardization
                </span>
                <h3 className="text-xl font-bold text-[#0B1320] mt-1 mb-2">
                  Progress Information Extraction
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-4">
                  Parses unstructured daily reports into discrete progress events. Isolates work completed, quantities poured/erected, work locations, and dates.
                </p>

                <ul className="space-y-2 text-xs text-[#334155] border-t border-[#E8E1D5]/60 pt-4">
                  <li className="flex items-center gap-2">
                    <MdCheckCircle className="text-emerald-600 flex-shrink-0" />
                    <span>Extracts quantities (m³, meters, metric tons, bays)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MdCheckCircle className="text-emerald-600 flex-shrink-0" />
                    <span>Tags reported engineering disciplines automatically</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Row 3: Three Supporting Cards (Matching, Review, Audit) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 04 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] hover:border-[#FF5500]/40 warm-card-shadow transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MdLink size={22} />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#94A3B8] group-hover:text-[#FF5500] transition-colors">
                    04
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0B1320] mb-2">
                  Activity Matching Engine
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Compares field work descriptions against planned activities. Proposes ranked candidate matches with transparent confidence ratings.
                </p>
              </div>
            </div>

            {/* Card 05 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] hover:border-[#FF5500]/40 warm-card-shadow transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MdAssignmentTurnedIn size={22} />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#94A3B8] group-hover:text-[#FF5500] transition-colors">
                    05
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0B1320] mb-2">
                  Planner Review & Governance
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  One-click Approve, Edit & Approve (adjusting dates and progress %), or Reject with mandatory reviewer notes. Planners stay in control.
                </p>
              </div>
            </div>

            {/* Card 06 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] hover:border-[#FF5500]/40 warm-card-shadow transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MdTrendingUp size={22} />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#94A3B8] group-hover:text-[#FF5500] transition-colors">
                    06
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0B1320] mb-2">
                  Audit History & Progress Record
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Every decision updates project completion status and writes an immutable server-side audit entry capturing reviewer identity and timestamp.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ORANGE FEATURE SECTION: "From Site Update to Schedule Activity" */}
        <section className="bg-gradient-to-br from-[#FF5500] via-[#F94D00] to-[#E64400] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <NetworkLines variant="white" className="opacity-25" />

          <div className="max-w-3xl mx-auto text-center relative z-10 mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
              The Real-Time Pipeline
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              From Site Update to Schedule Activity
            </h2>
            <p className="text-base sm:text-lg text-white/90 mt-4 leading-relaxed font-normal">
              Trace how raw field updates travel through verification into the permanent project record.
            </p>
          </div>

          {/* 6 Connected Pipeline Nodes */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 relative z-10">
            {[
              { label: '01 Report', desc: 'Daily site submission' },
              { label: '02 Extract', desc: 'Isolate quantities & dates' },
              { label: '03 Normalize', desc: 'Standardize discipline & units' },
              { label: '04 Match', desc: 'Candidate activity ranking' },
              { label: '05 Review', desc: 'Planner verification' },
              { label: '06 Update', desc: 'Approved baseline actual' },
            ].map((st, i) => (
              <div
                key={st.label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center flex flex-col justify-between hover:bg-white/15 transition-colors"
              >
                <div>
                  <span className="block text-xs font-bold text-white mb-1">{st.label}</span>
                  <p className="text-[11px] text-white/80 leading-tight">{st.desc}</p>
                </div>
                {i < 5 && (
                  <span className="hidden md:block text-white/40 text-sm font-bold mt-2">→</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 4. DARK ACTION BLOCK */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#0B1320] text-white text-center warm-card-shadow">
          <h2 className="text-2xl sm:text-4xl font-black mb-3">
            Ready to Connect Your Projects?
          </h2>
          <p className="text-sm sm:text-base text-[#DDD3C1] mb-8 max-w-lg mx-auto">
            Experience how PragatiPath eliminates manual schedule cross-referencing and provides genuine progress clarity.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF5500] hover:bg-[#E64D00] text-white text-sm font-bold shadow-md transition-colors"
            >
              <span>Get Started</span>
              <MdArrowForward size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-bold transition-colors"
            >
              <span>Contact Inquiries</span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

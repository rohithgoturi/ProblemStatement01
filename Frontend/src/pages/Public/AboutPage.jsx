/**
 * PragatiPath — About Page (Clienter-inspired Redesign)
 * Warm cream background, orange accents, dark pill buttons, human civil-engineering language.
 */
import { Link } from 'react-router-dom';
import { NetworkLines } from '../../components/shared/NetworkLines';
import {
  MdArrowForward,
  MdCheckCircle,
  MdArchitecture,
  MdFactCheck,
} from 'react-icons/md';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#0B1320] pb-24 selection:bg-[#FF5500] selection:text-white">
      {/* Page Header */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 bg-technical-grid border-b border-[#E8E1D5] overflow-hidden">
        <NetworkLines variant="orange" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] text-[#FF5500] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            About PragatiPath
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B1320] tracking-tight mt-2 mb-6">
            The Planning-to-Execution Bridge for Civil Infrastructure
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto font-normal">
            PragatiPath was created to solve a persistent challenge on construction projects: connecting planned schedule activities with real work completed on the job site.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-16">
        {/* Section 1: What is PragatiPath? */}
        <section className="bg-white rounded-3xl p-8 border border-[#E8E1D5] warm-card-shadow">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] flex items-center justify-center">
              <MdArchitecture size={24} />
            </div>
            <h2 className="text-2xl font-black text-[#0B1320]">What is PragatiPath?</h2>
          </div>
          <p className="text-base text-[#475569] leading-relaxed mb-4">
            PragatiPath is an intelligent data capture and schedule-linking layer designed specifically for civil, commercial, and industrial infrastructure projects.
          </p>
          <p className="text-base text-[#475569] leading-relaxed">
            Instead of requiring planners to spend hours manually searching through daily progress reports (DPRs), site diaries, and contractor spreadsheets, PragatiPath reads field reports, extracts completed work, and suggests the exact schedule activity to update.
          </p>
        </section>

        {/* Section 2: The Planning-to-Execution Disconnect */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#F5F1E8] border border-[#E8E1D5]">
          <h2 className="text-2xl font-black text-[#0B1320] mb-4">
            Why the Planning-to-Execution Gap Matters
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed mb-4">
            In modern infrastructure projects, planning and execution happen in completely different environments:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5]">
              <h3 className="text-sm font-bold text-[#0B1320] mb-1">In the Planning Office</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Project baselines are structured with formal Work Breakdown Structures (WBS L1 to L6), activity IDs, and critical path schedules.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5]">
              <h3 className="text-sm font-bold text-[#0B1320] mb-1">On the Job Site</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Supervisors and engineers record progress in plain language: <em>"Poured 45m³ raft concrete at Unit 2 Pump House."</em>
              </p>
            </div>
          </div>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            When field updates cannot be linked to the planned activity immediately, progress tracking falls behind by days or weeks. Small delays go unnoticed until milestones are already at risk.
          </p>
        </section>

        {/* Section 3: Our Core Guiding Principles */}
        <section className="bg-white rounded-3xl p-8 border border-[#E8E1D5] warm-card-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] flex items-center justify-center">
              <MdFactCheck size={24} />
            </div>
            <h2 className="text-2xl font-black text-[#0B1320]">Our Core Principles</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5]">
              <MdCheckCircle className="text-emerald-600 text-xl flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-[#0B1320] mb-1">The Planner Remains in Control</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Automated matching provides suggestions, but only an authorized planner or project manager can approve changes to the project schedule.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5]">
              <MdCheckCircle className="text-emerald-600 text-xl flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-[#0B1320] mb-1">Complete Audit Traceability</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Every reviewed decision, adjustment, and rejection is stored with reviewer notes and timestamps, creating a transparent historical record.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5]">
              <MdCheckCircle className="text-emerald-600 text-xl flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-[#0B1320] mb-1">Work with Existing Formats</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  We adapt to your team’s existing reports—Excel spreadsheets, DPR documents, and text logs—without requiring field crews to learn complex enterprise scheduling tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Call to Action */}
        <section className="pt-8 text-center border-t border-[#E8E1D5]">
          <h2 className="text-2xl font-bold text-[#0B1320] mb-3">
            Explore How PragatiPath Works
          </h2>
          <p className="text-sm text-[#475569] mb-6 max-w-xl mx-auto">
            Review our complete capabilities or get started by signing in to your project workspace.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#F5F1E8] border border-[#E8E1D5] text-[#0B1320] text-sm font-bold shadow-xs transition-colors"
            >
              <span>View Capabilities</span>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B1320] hover:bg-[#1A2332] text-white text-sm font-bold shadow-xs transition-colors"
            >
              <span>Get Started</span>
              <MdArrowForward size={16} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

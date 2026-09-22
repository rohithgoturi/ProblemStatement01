/**
 * PragatiPath — About Page (Clienter-inspired Redesign)
 * Warm cream background, technical engineering grid, orange accents, visual storytelling,
 * dedicated "AI Suggests. The Planner Decides." human-in-the-loop flow, and infrastructure imagery.
 */
import { Link } from 'react-router-dom';
import { PublicPageHeader } from '../../components/shared/PublicPageHeader';
import { NetworkLines } from '../../components/shared/NetworkLines';
import {
  MdArrowForward,
  MdCheckCircle,
  MdArchitecture,
  MdFactCheck,
  MdShield,
  MdSearch,
  MdLink,
  MdSpeed,
  MdAssignmentTurnedIn,
  MdTrendingUp,
  MdConstruction,
  MdCalendarToday,
  MdDescription,
} from 'react-icons/md';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#0B1320] pb-24 selection:bg-[#FF5500] selection:text-white">
      {/* 1. HERO SECTION */}
      <PublicPageHeader
        badge="ABOUT PRAGATIPATH"
        title="Connecting the Project Plan With What Happens on Site"
        description="PragatiPath was built for civil and infrastructure engineering teams to close the gap between planned schedule activities and real daily site execution."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0B1320] hover:bg-[#1A2332] text-white text-sm font-bold shadow-md transition-all group"
          >
            <span>Get Started</span>
            <MdArrowForward size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#story"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#F5F1E8] border border-[#E8E1D5] text-[#0B1320] text-sm font-bold shadow-xs transition-colors"
          >
            <span>Read Our Story</span>
          </a>
        </div>
      </PublicPageHeader>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        
        {/* 2. THE INFRASTRUCTURE REALITY & HERO VISUAL */}
        <section id="story" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
              The Reality on Site
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1320] tracking-tight leading-tight">
              Two Different Worlds on Every Major Project
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              Every major infrastructure project—from metro corridors and bridges to industrial plants—faces the same communication challenge: the planning office works in formal schedule structures, while the job site operates in daily physical execution.
            </p>
            <p className="text-sm text-[#475569] leading-relaxed">
              When site engineers pour concrete, install piping, or finish excavation, they record their daily achievements in field logs and spreadsheets. Translating those field updates into CPM schedule updates has traditionally taken days of tedious cross-referencing.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] warm-card-shadow">
                <span className="block text-2xl font-black text-[#FF5500] font-mono">1000s</span>
                <span className="text-xs font-bold text-[#0B1320]">Scheduled Activities</span>
                <p className="text-[11px] text-[#64748B] mt-0.5">Tracked in formal WBS hierarchies</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] warm-card-shadow">
                <span className="block text-2xl font-black text-[#0B1320] font-mono">Daily</span>
                <span className="text-xs font-bold text-[#0B1320]">Field Updates</span>
                <p className="text-[11px] text-[#64748B] mt-0.5">Generated across work fronts</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#E8E1D5] warm-card-shadow group">
              <img
                src="/construction-hero.jpg"
                alt="Civil infrastructure construction site and engineers"
                className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320]/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#FF5500]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                      Site Execution Layer
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white/95">
                    Capturing real-world progress where construction happens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. VISUAL STORY: HOW PRAGATIPATH CONNECTS BOTH SIDES */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E1D5] warm-card-shadow">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
              The PragatiPath Bridge
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1320] tracking-tight mt-1 mb-3">
              How the Connection Works
            </h2>
            <p className="text-sm text-[#475569]">
              PragatiPath establishes a seamless, verified operational bridge between the two ends of project delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1: Project Plan */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] flex items-center justify-center mb-4">
                  <MdCalendarToday size={22} />
                </div>
                <span className="text-xs font-bold text-[#FF5500] uppercase font-mono">01 · In the Office</span>
                <h3 className="text-lg font-bold text-[#0B1320] mt-1 mb-2">The Project Plan</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Baselines specify what should happen, when it should finish, and who is responsible, structured into WBS codes L1 through L6.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E8E1D5]/70 text-[11px] font-bold text-[#64748B]">
                Primavera / MS Project / Excel
              </div>
            </div>

            {/* Step 2: Field Reports */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] flex items-center justify-center mb-4">
                  <MdDescription size={22} />
                </div>
                <span className="text-xs font-bold text-[#FF5500] uppercase font-mono">02 · On the Ground</span>
                <h3 className="text-lg font-bold text-[#0B1320] mt-1 mb-2">Daily Field Reports</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Supervisors record what actually happened today: quantities poured, bays completed, weather delays, and subcontractor shifts.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E8E1D5]/70 text-[11px] font-bold text-[#64748B]">
                DPRs / Site Logs / Notes
              </div>
            </div>

            {/* Step 3: Real Progress */}
            <div className="p-6 rounded-2xl bg-[#0B1320] text-white border border-[#0B1320] flex flex-col justify-between shadow-md">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF5500] text-white flex items-center justify-center mb-4 shadow-xs">
                  <MdTrendingUp size={24} />
                </div>
                <span className="text-xs font-bold text-[#FF5500] uppercase font-mono">03 · PragatiPath</span>
                <h3 className="text-lg font-bold text-white mt-1 mb-2">Verified Real Progress</h3>
                <p className="text-xs sm:text-sm text-[#DDD3C1] leading-relaxed">
                  Intelligent matching links the report to the exact activity, the planner verifies the match, and approved actuals update the project.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/15 text-[11px] font-bold text-[#FF5500]">
                Single Source of Truth
              </div>
            </div>
          </div>
        </section>

        {/* 4. DEDICATED SECTION: "AI Suggests. The Planner Decides." */}
        <section className="bg-gradient-to-br from-[#FF5500] via-[#F94D00] to-[#E64400] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <NetworkLines variant="white" className="opacity-20" />

          <div className="max-w-3xl mx-auto text-center relative z-10 mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
              Human-in-the-Loop Governance
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              AI Suggests. The Planner Decides.
            </h2>
            <p className="text-base sm:text-lg text-white/90 mt-4 leading-relaxed font-normal">
              In heavy civil construction, automated software should never silently alter project records. PragatiPath keeps authorized engineers in complete control.
            </p>
          </div>

          {/* 5-Step Human-in-the-Loop Visual Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
            {[
              {
                step: '01',
                title: 'AI Extraction',
                desc: 'Identifies quantities, dates, and locations from raw report text.',
                icon: <MdSearch size={18} />,
              },
              {
                step: '02',
                title: 'Suggested Match',
                desc: 'Compares text against scheduled activity list to find candidates.',
                icon: <MdLink size={18} />,
              },
              {
                step: '03',
                title: 'Confidence Rating',
                desc: 'Shows high, medium, or low confidence to guide review focus.',
                icon: <MdSpeed size={18} />,
              },
              {
                step: '04',
                title: 'Planner Review',
                desc: 'Engineer verifies, adjusts actual dates, or rejects with notes.',
                icon: <MdAssignmentTurnedIn size={18} />,
              },
              {
                step: '05',
                title: 'Approved Update',
                desc: 'Schedule baseline reflects verified reality with audit logging.',
                icon: <MdCheckCircle size={18} />,
              },
            ].map((node) => (
              <div
                key={node.step}
                className="bg-white text-[#0B1320] rounded-2xl p-4 sm:p-5 border border-white/30 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-lg bg-[#FFF2EB] text-[#FF5500] flex items-center justify-center font-bold">
                      {node.icon}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#94A3B8]">
                      {node.step}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0B1320] mb-1">{node.title}</h4>
                  <p className="text-xs text-[#64748B] leading-relaxed">{node.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/20 text-center text-xs text-white/85 max-w-xl mx-auto relative z-10">
            No autonomous baseline modifications. PragatiPath acts as an intelligent assistant, leaving critical engineering decisions to experienced planners.
          </div>
        </section>

        {/* 5. CALL TO ACTION */}
        <section className="text-center pt-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0B1320] text-white warm-card-shadow">
            <h2 className="text-2xl sm:text-4xl font-black mb-3">
              See How It Applies to Your Project
            </h2>
            <p className="text-sm sm:text-base text-[#DDD3C1] mb-8 max-w-lg mx-auto">
              Explore our full capabilities or sign in to your project workspace to start linking site reports.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-bold transition-colors"
              >
                <span>View Capabilities</span>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FF5500] hover:bg-[#E64D00] text-white text-sm font-bold shadow-md transition-colors"
              >
                <span>Get Started</span>
                <MdArrowForward size={16} />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

/**
 * PragatiPath — Services & Capabilities Page (Clienter-inspired Redesign)
 * Warm cream background, technical engineering grid, orange accents, rounded-3xl cards.
 */
import { Link } from 'react-router-dom';
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
} from 'react-icons/md';

export default function ServicesPage() {
  const capabilities = [
    {
      id: 'schedule',
      title: 'Schedule Baseline Management',
      icon: <MdCalendarToday size={24} />,
      desc: 'Import, browse, and manage planned activities across complex multi-tier Work Breakdown Structures (WBS L1 to L6).',
      points: [
        'Import from Excel (.xlsx), CSV, or structured JSON baseline files',
        'Automatic validation of activity IDs, planned dates, and disciplines',
        'Support for Civil, Piping, Electrical, Instrumentation, and HSE disciplines',
      ],
    },
    {
      id: 'dpr',
      title: 'Daily Progress Data Ingestion',
      icon: <MdInbox size={24} />,
      desc: 'Capture daily site execution updates without requiring field engineers to navigate complicated enterprise scheduling tools.',
      points: [
        'Direct upload of supervisor daily logs, DPR files, and contractor updates',
        'Centralized DPR inbox tracking source documents and raw submission text',
        'Support for spreadsheet tables, PDF text reports, and field notes',
      ],
    },
    {
      id: 'extraction',
      title: 'Progress Information Extraction',
      icon: <MdSearch size={24} />,
      desc: 'Parses unstructured daily reports into discrete, auditable progress events.',
      points: [
        'Identifies work descriptions, work locations, and completed quantities',
        'Captures reported dates and associated engineering disciplines',
        'Maintains exact raw text references for complete audit integrity',
      ],
    },
    {
      id: 'matching',
      title: 'Schedule Activity Matching Engine',
      icon: <MdLink size={24} />,
      desc: 'Compares extracted field updates against planned schedule activities to find the exact work package.',
      points: [
        'Suggests best-matching schedule activities based on work description and context',
        'Provides transparent confidence rankings and candidate options',
        'Clearly flags unmatched field updates so nothing is missed or lost',
      ],
    },
    {
      id: 'review',
      title: 'Planner Review & Approval Governance',
      icon: <MdAssignmentTurnedIn size={24} />,
      desc: 'Enforces human-in-the-loop authorization before any schedule baseline is modified.',
      points: [
        'Planners can Approve, Edit & Approve, or Reject candidate matches',
        'Adjust actual start/finish dates and progress percentages on the fly',
        'Mandatory reviewer notes stored permanently on every decision',
      ],
    },
    {
      id: 'tracking',
      title: 'Progress Tracking & Audit Records',
      icon: <MdTrendingUp size={24} />,
      desc: 'Provides real-time visibility into planned vs actual completion status across the project.',
      points: [
        'Activity status tracking: Planned, In Progress, Completed, Delayed',
        'Immutable server-side audit logs capturing who reviewed what and when',
        'Executive project summary metrics and historical activity timelines',
      ],
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#0B1320] pb-24 selection:bg-[#FF5500] selection:text-white">
      {/* Page Header */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 bg-technical-grid border-b border-[#E8E1D5] overflow-hidden">
        <NetworkLines variant="orange" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] text-[#FF5500] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            Capabilities & Services
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B1320] tracking-tight mt-2 mb-6">
            Core Modules for Infrastructure Project Tracking
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto font-normal">
            Every capability in PragatiPath is designed to solve specific operational bottlenecks between project planning and site execution.
          </p>
        </div>
      </section>

      {/* Grid of Capabilities */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E1D5] hover:border-[#FF5500]/40 warm-card-shadow flex flex-col justify-between transition-all duration-200"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF2EB] border border-[#FFD8C7] text-[#FF5500] flex items-center justify-center mb-5">
                  {cap.icon}
                </div>
                <h3 className="text-lg font-black text-[#0B1320] mb-2">{cap.title}</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-4">{cap.desc}</p>
                <ul className="space-y-2 text-xs text-[#334155] border-t border-[#E8E1D5]/60 pt-4">
                  {cap.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <MdCheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={14} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Action CTA */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#0B1320] text-white text-center max-w-3xl mx-auto warm-card-shadow">
          <h2 className="text-2xl sm:text-3xl font-black mb-2 text-white">
            Ready to test these capabilities on your project?
          </h2>
          <p className="text-sm text-[#DDD3C1] mb-6 max-w-md mx-auto">
            Access your project workspace and start linking daily site reports with schedule activities.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FF5500] hover:bg-[#E64D00] text-white text-sm font-bold shadow-md transition-colors"
          >
            <span>Get Started</span>
            <MdArrowForward size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

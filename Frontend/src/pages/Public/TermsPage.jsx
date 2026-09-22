/**
 * PragatiPath — Terms of Service
 * Terms governing the use of PragatiPath infrastructure project management software.
 */
import { PublicPageHeader } from '../../components/shared/PublicPageHeader';

export default function TermsPage() {
  return (
    <div className="pb-24">
      <PublicPageHeader
        badge="SOFTWARE GOVERNANCE"
        title="Terms of Software Usage"
        description="Guidelines and responsibilities governing schedule imports, automated activity matching, and human planner validation."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white border border-[#E8E1D5] rounded-3xl p-8 sm:p-12 shadow-2xs space-y-8 text-sm text-stone-600 leading-relaxed">
          <div className="border-b border-stone-100 pb-4">
            <span className="text-xs font-semibold text-[#FF5500] uppercase tracking-wider">
              Usage Agreement
            </span>
            <p className="text-xs text-stone-400 mt-1">
              Effective Date: September 2026 · Standard Enterprise Terms
            </p>
          </div>

          <section>
            <h2 className="text-lg font-bold text-[#0B1320] mb-2">1. Software Purpose</h2>
            <p>
              PragatiPath is provided as a project progress tracking and schedule-linking layer. It is intended to assist project planners, site supervisors, and project managers in comparing daily field updates with planned activities.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0B1320] mb-2">2. Engineering Responsibility</h2>
            <p>
              While PragatiPath offers automated activity matching suggestions, the engineering verification and final approval of any progress adjustment rests entirely with authorized project personnel. The system requires human-in-the-loop validation before records update.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0B1320] mb-2">3. User Authentication & Integrity</h2>
            <p>
              Users are responsible for maintaining the confidentiality of their credentials. Sharing accounts or attempting unauthorized privilege escalation is strictly prohibited by our system security controls.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

/**
 * PragatiPath — Terms of Service
 * Terms governing the use of PragatiPath infrastructure project management software.
 */
export default function TermsPage() {
  return (
    <div className="bg-white text-slate-900 pb-20">
      <section className="pt-12 pb-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-[#0056D2] uppercase tracking-wider">
            Terms of Service
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Terms of Software Usage
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Last Updated: September 2026
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8 text-sm text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">1. Software Purpose</h2>
          <p>
            PragatiPath is provided as a project progress tracking and schedule-linking layer. It is intended to assist project planners, site supervisors, and project managers in comparing daily field updates with planned activities.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">2. Engineering Responsibility</h2>
          <p>
            While PragatiPath offers automated activity matching suggestions, the engineering verification and final approval of any progress adjustment rests entirely with authorized project personnel. The system requires human-in-the-loop validation before records update.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">3. User Authentication & Integrity</h2>
          <p>
            Users are responsible for maintaining the confidentiality of their credentials. Sharing accounts or attempting unauthorized privilege escalation is strictly prohibited by our system security controls.
          </p>
        </section>
      </div>
    </div>
  );
}

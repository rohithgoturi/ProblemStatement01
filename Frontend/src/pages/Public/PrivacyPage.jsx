/**
 * PragatiPath — Privacy Policy
 * Project data governance and privacy guidelines for infrastructure data.
 */
export default function PrivacyPage() {
  return (
    <div className="bg-white text-slate-900 pb-20">
      <section className="pt-12 pb-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-[#0056D2] uppercase tracking-wider">
            Governance & Privacy
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Project Data Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Last Updated: September 2026
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8 text-sm text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">1. Scope of Project Data</h2>
          <p>
            PragatiPath processes operational project information including schedule baseline activities, daily progress reports (DPRs), site quantities, and supervisor review records strictly for the purpose of project monitoring and progress reconciliation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">2. Data Ownership & Confidentiality</h2>
          <p>
            All imported schedules, proprietary engineering documents, and site progress logs remain the exclusive property of the commissioning project organization. PragatiPath does not share, monetize, or disclose client schedule records to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">3. Role-Based Access Control & Security</h2>
          <p>
            Project data access is strictly governed by server-authoritative Role-Based Access Control (RBAC). Passwords are cryptographically hashed, and API endpoints require authenticated JWT Bearer sessions. Administrative privileges are required to modify user roles and platform permissions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">4. Audit Traceability</h2>
          <p>
            To uphold engineering accountability, review actions—such as match approvals, adjustments, and rejections—are logged with the reviewer's identity and timestamp. These audit records cannot be retroactively modified.
          </p>
        </section>
      </div>
    </div>
  );
}

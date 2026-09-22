/**
 * PragatiPath — Privacy Policy
 * Project data governance and privacy guidelines for infrastructure data.
 */
import { PublicPageHeader } from '../../components/shared/PublicPageHeader';

export default function PrivacyPage() {
  return (
    <div className="pb-24">
      <PublicPageHeader
        badge="DATA GOVERNANCE & PRIVACY"
        title="Project Data Privacy Policy"
        description="Comprehensive governance policies ensuring client schedule confidentiality, site report ownership, and cryptographic security."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white border border-[#E8E1D5] rounded-3xl p-8 sm:p-12 shadow-2xs space-y-8 text-sm text-stone-600 leading-relaxed">
          <div className="border-b border-stone-100 pb-4">
            <span className="text-xs font-semibold text-[#FF5500] uppercase tracking-wider">
              Revision Notice
            </span>
            <p className="text-xs text-stone-400 mt-1">
              Effective Date: September 2026 · PragatiPath Infrastructure Data Protection Standard
            </p>
          </div>

          <section>
            <h2 className="text-lg font-bold text-[#0B1320] mb-2">1. Scope of Project Data</h2>
            <p>
              PragatiPath processes operational project information including schedule baseline activities, daily progress reports (DPRs), site quantities, and supervisor review records strictly for the purpose of project monitoring and progress reconciliation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0B1320] mb-2">2. Data Ownership & Confidentiality</h2>
            <p>
              All imported schedules, proprietary engineering documents, and site progress logs remain the exclusive property of the commissioning project organization. PragatiPath does not share, monetize, or disclose client schedule records to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0B1320] mb-2">3. Role-Based Access Control & Security</h2>
            <p>
              Project data access is strictly governed by server-authoritative Role-Based Access Control (RBAC). Passwords are cryptographically hashed, and API endpoints require authenticated JWT Bearer sessions. Administrative privileges are required to modify user roles and platform permissions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0B1320] mb-2">4. Audit Traceability</h2>
            <p>
              To uphold engineering accountability, review actions—such as match approvals, adjustments, and rejections—are logged with the reviewer's identity and timestamp. These audit records cannot be retroactively modified.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

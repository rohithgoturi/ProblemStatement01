/**
 * PragatiPath — Contact & Inquiries Page (Clienter-inspired Redesign)
 * Warm cream background, technical engineering grid, orange accents, pill buttons,
 * authentic form state management (default, loading, success, error), and infrastructure visual.
 */
import { useState } from 'react';
import { PublicPageHeader } from '../../components/shared/PublicPageHeader';
import { NetworkLines } from '../../components/shared/NetworkLines';
import {
  MdSend,
  MdCheckCircle,
  MdErrorOutline,
  MdHelpOutline,
  MdEngineering,
  MdConstruction,
  MdArrowForward,
} from 'react-icons/md';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Project Manager',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Input Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please provide your name, email address, and message.');
      return;
    }

    setLoading(true);

    // Simulate realistic asynchronous submission handling
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
    } catch (err) {
      setErrorMessage('An error occurred while submitting your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-[#0B1320] pb-24 selection:bg-[#FF5500] selection:text-white">
      {/* 1. HERO HEADER */}
      <PublicPageHeader
        badge="CONTACT & SUPPORT"
        title="Let's Connect Your Project Data With Real Progress"
        description="Have questions about schedule baseline formats, daily site report ingestion, or deploying PragatiPath on your project? Reach out to our team."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Context & Supporting Visual */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
                Engineering Support
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1320] tracking-tight mt-1 mb-3">
                Built to Support Infrastructure Teams
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                Whether you manage a single package or an entire infrastructure corridor, we assist with initial schedule baseline setup, column mapping, and field reporting integration.
              </p>
            </div>

            {/* Infrastructure Visual Card */}
            <div className="relative rounded-3xl overflow-hidden border border-[#E8E1D5] warm-card-shadow group">
              <img
                src="/construction-right-panel.jpg"
                alt="Engineering team analyzing project schedule on site"
                className="w-full h-56 object-cover group-hover:scale-103 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320]/85 via-transparent to-transparent flex items-end p-5">
                <div className="text-white text-xs">
                  <span className="text-[#FF5500] font-bold uppercase tracking-wider block text-[10px]">
                    Project Consultation
                  </span>
                  <span className="font-semibold text-white/95">
                    Guidance for project planners, site supervisors, and contractors.
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Facts List */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] warm-card-shadow space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B1320] flex items-center gap-2">
                <MdEngineering className="text-[#FF5500]" size={16} />
                <span>Integration Specifications</span>
              </h3>
              <ul className="space-y-2 text-xs text-[#475569]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
                  <span>Excel spreadsheets (.xlsx, .csv) & structured JSON</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
                  <span>WBS hierarchies L1 through L6 supported</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
                  <span>Zero disruption to existing scheduling software</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Form with full state handling */}
          <div className="lg:col-span-7">
            <div className="bg-white p-7 sm:p-9 rounded-3xl border border-[#E8E1D5] warm-card-shadow">
              <h2 className="text-xl font-black text-[#0B1320] mb-1">
                Send a Message
              </h2>
              <p className="text-xs text-[#64748B] mb-6">
                Fill out your details below and our project integration team will follow up.
              </p>

              {/* Error State Banner */}
              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <MdErrorOutline className="text-rose-600 text-base flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Success State */}
              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <MdCheckCircle className="text-emerald-600 text-4xl mx-auto mb-2" />
                  <h3 className="text-base font-bold text-emerald-900 mb-1">
                    Inquiry Submitted Successfully
                  </h3>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your inquiry regarding "{formData.subject || 'Project Integration'}" has been recorded. Our team will review your requirements and respond at <strong>{formData.email}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        role: 'Project Manager',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="mt-5 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs font-bold transition-colors shadow-xs"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                /* Default & Loading Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        disabled={loading}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5500]/30 focus:border-[#FF5500] transition-colors disabled:opacity-60"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        disabled={loading}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5500]/30 focus:border-[#FF5500] transition-colors disabled:opacity-60"
                        placeholder="you@project.gov.in"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1.5">
                        Project Role
                      </label>
                      <select
                        disabled={loading}
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5500]/30 focus:border-[#FF5500] transition-colors disabled:opacity-60"
                      >
                        <option value="Project Manager">Project Manager</option>
                        <option value="Project Planner">Project Planner</option>
                        <option value="Site Supervisor">Site Supervisor</option>
                        <option value="Contractor / Engineer">Contractor / Engineer</option>
                        <option value="Infrastructure Consultant">Infrastructure Consultant</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1.5">
                        Inquiry Topic
                      </label>
                      <input
                        type="text"
                        disabled={loading}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5500]/30 focus:border-[#FF5500] transition-colors disabled:opacity-60"
                        placeholder="e.g. Schedule Baseline Integration"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1.5">
                      Project Details or Questions *
                    </label>
                    <textarea
                      required
                      rows={5}
                      disabled={loading}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5500]/30 focus:border-[#FF5500] transition-colors disabled:opacity-60"
                      placeholder="Share details about your project schedule structure, DPR reporting format, or deployment questions..."
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#0B1320] hover:bg-[#1A2332] disabled:bg-slate-400 text-white text-sm font-bold shadow-md transition-all group cursor-pointer"
                    >
                      <MdSend size={16} />
                      <span>{loading ? 'Submitting...' : 'Submit Inquiry'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* FAQs Accordion Strip */}
            <div className="mt-8 space-y-3">
              <h3 className="text-sm font-bold text-[#0B1320] flex items-center gap-2">
                <MdHelpOutline className="text-[#FF5500]" size={18} />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] text-xs space-y-1">
                <strong className="text-[#0B1320]">What schedule tools are supported?</strong>
                <p className="text-[#475569] leading-relaxed">
                  PragatiPath imports spreadsheet exports (.xlsx, .csv) and JSON baseline files generated from Primavera P6, Microsoft Project, or custom planning systems.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] text-xs space-y-1">
                <strong className="text-[#0B1320]">Can supervisors report from mobile devices?</strong>
                <p className="text-[#475569] leading-relaxed">
                  Yes. The DPR ingestion interface is responsive and works directly from phones, tablets, or laptops on site.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

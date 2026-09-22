/**
 * PragatiPath — Contact & Inquiries Page (Clienter-inspired Redesign)
 * Warm cream background, technical engineering grid, orange accents, pill buttons.
 */
import { useState } from 'react';
import { NetworkLines } from '../../components/shared/NetworkLines';
import {
  MdSend,
  MdCheckCircle,
  MdHelpOutline,
} from 'react-icons/md';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Project Manager',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#0B1320] pb-24 selection:bg-[#FF5500] selection:text-white">
      {/* Page Header */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 bg-technical-grid border-b border-[#E8E1D5] overflow-hidden">
        <NetworkLines variant="orange" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] text-[#FF5500] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            Contact & Support
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B1320] tracking-tight mt-2 mb-6">
            Get in Touch with the PragatiPath Team
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto font-normal">
            Have questions about integrating PragatiPath with your project schedule or site reporting workflow? Send us an inquiry below.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E1D5] warm-card-shadow">
              <h2 className="text-xl font-black text-[#0B1320] mb-1">Send an Inquiry</h2>
              <p className="text-xs text-[#64748B] mb-6">
                Fill out the details below and our project integration team will follow up with you.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <MdCheckCircle className="text-emerald-600 text-4xl mx-auto mb-2" />
                  <h3 className="text-base font-bold text-emerald-900 mb-1">
                    Inquiry Received
                  </h3>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    Thank you, {formData.name}. Your inquiry regarding "{formData.subject || 'Project Integration'}" has been submitted successfully.
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
                    className="mt-5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold transition-colors shadow-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5500]/30 focus:border-[#FF5500] transition-colors"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5500]/30 focus:border-[#FF5500] transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1.5">
                        Project Role
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5500]/30 focus:border-[#FF5500] transition-colors"
                      >
                        <option value="Project Manager">Project Manager</option>
                        <option value="Project Planner">Project Planner</option>
                        <option value="Site Supervisor">Site Supervisor</option>
                        <option value="Contractor / Engineer">Contractor / Engineer</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5500]/30 focus:border-[#FF5500] transition-colors"
                        placeholder="e.g. Schedule Format Support"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5500]/30 focus:border-[#FF5500] transition-colors"
                      placeholder="Describe your project requirements or technical questions..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0B1320] hover:bg-[#1A2332] text-white text-sm font-bold shadow-md transition-all group"
                  >
                    <MdSend size={16} />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Technical Support FAQ */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-xl font-black text-[#0B1320] mb-1 flex items-center gap-2">
                <MdHelpOutline className="text-[#FF5500]" size={22} />
                <span>Frequently Asked Questions</span>
              </h2>
              <p className="text-xs text-[#64748B] mb-6">
                Common questions from civil project teams and contractors.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] warm-card-shadow">
                <h3 className="text-sm font-bold text-[#0B1320] mb-1">
                  What schedule file formats are supported?
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  PragatiPath currently supports Excel spreadsheets (.xlsx, .xls), CSV files, and structured JSON baselines containing activity IDs, names, dates, and WBS levels.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] warm-card-shadow">
                <h3 className="text-sm font-bold text-[#0B1320] mb-1">
                  Can site supervisors use it without scheduling training?
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Yes. Site supervisors only submit daily reports, work notes, and completed quantities through a simple upload interface. They do not need training in complex scheduling software.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] warm-card-shadow">
                <h3 className="text-sm font-bold text-[#0B1320] mb-1">
                  Does the system automatically change project schedules?
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  No. PragatiPath follows strict human-in-the-loop governance. Every suggested match must be reviewed and approved by an authorized project planner before records are updated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * PragatiPath — Help, Documentation & Support Center
 * Comprehensive, searchable guide for project managers, planners, and site supervisors.
 * Fully responsive, Clienter-inspired warm neutral aesthetics, step diagrams, and practical FAQs.
 */
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MdSearch,
  MdHelpOutline,
  MdCalendarToday,
  MdDescription,
  MdAutoAwesome,
  MdAssignmentTurnedIn,
  MdMic,
  MdShield,
  MdWarning,
  MdExpandMore,
  MdExpandLess,
  MdArrowForward,
  MdCheckCircle,
  MdEmail,
  MdRefresh,
} from 'react-icons/md';
import { PublicPageHeader } from '../../components/shared/PublicPageHeader';
import { PageHeader } from '../../components/shared/PageHeader';

export default function HelpPage({ isPublic = true }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'all', label: 'All Topics', icon: <MdHelpOutline /> },
    { id: 'getting-started', label: 'Getting Started', icon: <MdCalendarToday /> },
    { id: 'voice', label: 'Voice Input', icon: <MdMic /> },
    { id: 'matching', label: 'AI Matching & Linking', icon: <MdAutoAwesome /> },
    { id: 'review', label: 'Planner Review & Audit', icon: <MdAssignmentTurnedIn /> },
    { id: 'security', label: 'Account & Security', icon: <MdShield /> },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: <MdWarning /> },
  ];

  const faqs = [
    {
      id: 'faq-schedule-upload',
      category: 'getting-started',
      question: 'How do I add or import a project schedule?',
      answer:
        'Navigate to the Schedule page. Click "Upload Baseline Schedule" and select an Excel (.xlsx, .xls) or CSV baseline exported from Primavera P6, Microsoft Project, or your custom master schedule sheet. PragatiPath automatically maps activity IDs, planned start/finish dates, and WBS levels (L1 through L6).',
      tags: ['schedule', 'primavera', 'excel', 'csv', 'import', 'baseline', 'wbs'],
    },
    {
      id: 'faq-dpr-submit',
      category: 'getting-started',
      question: 'How do I submit site progress updates?',
      answer:
        'Go to the DPR Inbox. You can enter progress in three ways: (1) Type a daily field note in the Text Progress entry, (2) Dictate hands-free using the Voice Note microphone, or (3) Upload a daily report spreadsheet (.xlsx) or contractor diary text file. Once submitted, the system initiates progress extraction.',
      tags: ['dpr', 'progress', 'upload', 'report', 'diary', 'submit'],
    },
    {
      id: 'faq-voice-input',
      category: 'voice',
      question: 'How does voice input work on active construction sites?',
      answer:
        'PragatiPath uses the browser’s native speech recognition API. Site supervisors wearing safety gear can tap the microphone button on the DPR Inbox page or on the quick dictate button. The audio is transcribed into text in real time, which is then parsed by the backend to identify activities, locations, and concrete pour quantities.',
      tags: ['voice', 'microphone', 'audio', 'transcription', 'hands-free', 'speech'],
    },
    {
      id: 'faq-matching-logic',
      category: 'matching',
      question: 'How does activity candidate matching work?',
      answer:
        'Extracted progress updates are compared against loaded schedule baseline activities using semantic correlation and keyword proximity. Candidate matches are scored with a confidence percentage (e.g. 94% High Confidence) and queued for planner review. PragatiPath never forces matches automatically.',
      tags: ['matching', 'ai', 'linking', 'confidence', 'candidates', 'schedule'],
    },
    {
      id: 'faq-planner-review',
      category: 'review',
      question: 'Can the AI automatically alter project schedules without review?',
      answer:
        'No. PragatiPath enforces strict human-in-the-loop governance. The system suggests candidate matches with confidence scores, but only an authorized Project Planner can click "Approve", "Edit Quantities", or "Reject". No schedule baselines or progress records are modified without human approval.',
      tags: ['review', 'planner', 'approval', 'governance', 'human', 'reject', 'edit'],
    },
    {
      id: 'faq-audit-log',
      category: 'review',
      question: 'How is approved progress saved and audited?',
      answer:
        'When a planner approves a match, the progress percentage and actual completion dates are written to MongoDB. Simultaneously, an immutable audit log entry is recorded with the reviewer identity, timestamp, original source document ID, and updated schedule activity ID.',
      tags: ['audit', 'history', 'timestamp', 'traceability', 'database', 'approved'],
    },
    {
      id: 'faq-roles-permissions',
      category: 'security',
      question: 'What roles exist and what permissions do they have?',
      answer:
        'PragatiPath implements strict Role-Based Access Control (RBAC): (1) Site Supervisors can submit DPRs and voice logs; (2) Project Planners can import schedules, review/approve matches, and link activities; (3) Project Managers have executive schedule visibility and audit oversight; (4) Admins can manage team access and system configurations.',
      tags: ['roles', 'permissions', 'rbac', 'security', 'supervisor', 'planner', 'manager'],
    },
    {
      id: 'faq-auth-privacy',
      category: 'security',
      question: 'Is confidential project data visible before login?',
      answer:
        'Strictly no. Unauthenticated public pages only display generic illustrative mockups and public product capabilities. Real project schedules, supervisor names, internal activities, and audit logs are accessible only through authenticated JWT sessions validated directly by the backend.',
      tags: ['security', 'privacy', 'login', 'authentication', 'jwt', 'data protection'],
    },
    {
      id: 'faq-troubleshoot-upload',
      category: 'troubleshooting',
      question: 'What should I do if a schedule or report file upload fails?',
      answer:
        'Confirm the file is in a supported format (.xlsx, .xls, .csv, .txt) and under 15MB. Ensure headers contain identifiable column names like "Activity ID", "Activity Name", "Start Date", or "Finish Date". If an error persists, refresh your session and verify backend connectivity.',
      tags: ['troubleshooting', 'upload', 'failed', 'error', 'format', 'xlsx'],
    },
    {
      id: 'faq-troubleshoot-voice',
      category: 'troubleshooting',
      question: 'Why is voice dictation not starting or recording?',
      answer:
        'Ensure you have granted microphone permissions to PragatiPath in your browser settings (look for the lock/camera icon in your browser address bar). Voice recognition is natively supported in Google Chrome, Microsoft Edge, and Safari on HTTPS or localhost.',
      tags: ['troubleshooting', 'voice', 'microphone', 'permission', 'browser', 'blocked'],
    },
    {
      id: 'faq-troubleshoot-no-match',
      category: 'troubleshooting',
      question: 'What if no candidate match is found for a site update?',
      answer:
        'If a reported site activity does not match any existing WBS code, it remains marked as "Unlinked" in the AI Matching console. A planner can manually search the master schedule or reclassify the work under an overarching package.',
      tags: ['troubleshooting', 'no match', 'unlinked', 'manual search', 'missing'],
    },
  ];

  // Real-time keyword filter
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'all' || faq.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="pb-20 font-sans selection:bg-[#FF5500] selection:text-white">
      {/* Dynamic Header: Public vs Authenticated Shell */}
      {isPublic ? (
        <PublicPageHeader
          badge="HELP & DOCUMENTATION"
          title="PragatiPath Knowledge Base"
          description="Everything you need to know about schedule ingestion, field progress capture, voice dictation, and planner verification."
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
          <PageHeader
            title="Help, Docs & Support"
            subtitle="Guides, workflow specifications, and troubleshooting for authorized personnel"
            icon={<MdHelpOutline />}
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-12">
        {/* =================================================================== */}
        {/* INTERACTIVE SEARCH & CATEGORIES STRIP                               */}
        {/* =================================================================== */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E1D5] shadow-xs space-y-6">
          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <MdSearch size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help by keyword (e.g. voice, schedule, matching, planner, upload, audit)..."
              className="w-full pl-12 pr-4 py-3.5 bg-[#FAF8F5] border border-[#E8E1D5] rounded-full text-xs sm:text-sm text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all placeholder:text-stone-400 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-[#0B1320]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0B1320] text-white shadow-xs scale-102'
                    : 'bg-[#FAF8F5] text-stone-600 border border-[#E8E1D5] hover:text-[#0B1320]'
                }`}
              >
                <span className={selectedCategory === cat.id ? 'text-[#FF5500]' : 'text-stone-400'}>
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* STEP-BY-STEP VISUAL PROGRESS FLOW DIAGRAM (01 to 05)                */}
        {/* =================================================================== */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0B1320] text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#FF5500] tracking-widest block">
                Standard Operational Flow
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                How a Progress Update Becomes Schedule Reality
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4">
              {[
                {
                  step: '01',
                  title: 'Submit Update',
                  sub: 'Site diary, spreadsheet or voice note received in DPR Inbox.',
                  icon: <MdDescription size={20} />,
                },
                {
                  step: '02',
                  title: 'Extract Work',
                  sub: 'AI identifies work items, quantities poured, and work front location.',
                  icon: <MdAutoAwesome size={20} />,
                },
                {
                  step: '03',
                  title: 'Candidate Match',
                  sub: 'Matched against baseline schedule activities with confidence score.',
                  icon: <MdCalendarToday size={20} />,
                },
                {
                  step: '04',
                  title: 'Planner Review',
                  sub: 'Authorized human planner clicks Approve, Edit, or Reject.',
                  icon: <MdAssignmentTurnedIn size={20} />,
                  highlight: true,
                },
                {
                  step: '05',
                  title: 'Progress Saved',
                  sub: 'Baseline % updated with immutable server timestamp and audit record.',
                  icon: <MdCheckCircle size={20} />,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className={`p-4 rounded-2xl border transition-all ${
                    item.highlight
                      ? 'bg-[#FF5500]/20 border-[#FF5500] text-white'
                      : 'bg-white/10 border-white/10 text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-black text-[#FF5500]">{item.step}</span>
                    <span className={item.highlight ? 'text-[#FF5500]' : 'text-stone-400'}>
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-[11px] text-stone-300 leading-snug">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* FAQS ACCORDION LIST                                                 */}
        {/* =================================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-[#0B1320]">
              Frequently Answered Questions ({filteredFaqs.length})
            </h2>
            <span className="text-xs text-stone-400">Click question to expand answer</span>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E1D5] space-y-3">
              <MdHelpOutline size={36} className="mx-auto text-stone-400" />
              <h4 className="text-sm font-bold text-[#0B1320]">No matching help topics found</h4>
              <p className="text-xs text-stone-500">
                Try searching for broader terms like "schedule", "progress", "voice", or "matching".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-full bg-[#0B1320] text-white text-xs font-bold"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isExpanded = expandedFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden transition-all shadow-2xs hover:border-[#FF5500]/40"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#FF5500] shrink-0" />
                        <span className="text-sm font-bold text-[#0B1320] leading-snug">
                          {faq.question}
                        </span>
                      </div>
                      <div className="text-stone-400 shrink-0">
                        {isExpanded ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 text-xs text-[#475569] leading-relaxed border-t border-[#E8E1D5]/60 bg-[#FAF8F5]/60 space-y-3">
                        <p>{faq.answer}</p>
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {faq.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded bg-white border border-[#E8E1D5] text-[10px] font-mono text-stone-500"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* =================================================================== */}
        {/* DIRECT SUPPORT & CONTACT BANNER                                     */}
        {/* =================================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-[#E8E1D5] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="text-lg font-black text-[#0B1320]">
              Need direct deployment assistance or custom WBS mapping?
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Our civil systems engineering team is available to assist with Primavera P6 exports, contractor template matching, and role configuration.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B1320] hover:bg-[#1A2332] text-white text-xs font-bold transition-all shadow-xs"
            >
              <MdEmail size={16} />
              <span>Contact Engineering Support</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

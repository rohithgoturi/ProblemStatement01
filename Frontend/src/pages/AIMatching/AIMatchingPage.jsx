/**
 * PragatiPath — AI Matching & Verification Page
 * Faithfully reproduces Phase 4 Reference Screen 2:
 * - Header banner with project/unit/date context
 * - DPR Input card + Extracted Structured JSON card with Copy action
 * - 5-stage Matching Process chevrons + Confidence Score Weights breakdown
 * - Human Validation (Required) table with Approve, Change, Reject interactions
 * - Top 3 Matching Candidates with confidence rings, breakdown meters, and Select action
 * - Matching Summary KPI tiles
 * - Recent Activity audit feed
 */
import { useState } from 'react';
import {
  MdAutoAwesome,
  MdCalendarToday,
  MdKeyboardArrowDown,
  MdLocationCity,
  MdDescription,
  MdMic,
  MdPhotoCamera,
  MdContentCopy,
  MdCheck,
  MdCheckCircle,
  MdSettings,
  MdBarChart,
  MdLocalOffer,
  MdLocationOn,
  MdPsychology,
  MdPercent,
  MdPerson,
  MdInfoOutline,
  MdSwapHoriz,
  MdClose,
  MdVisibility,
  MdFlashOn,
  MdAccessTime,
  MdGroup,
  MdTrackChanges,
  MdLayers,
  MdArrowForward,
} from 'react-icons/md';
import { AI_MATCHING_DATA } from '../../data/aiMatchingData';
import { cn } from '../../utils/helpers';
import { PageHeader } from '../../components/shared/PageHeader';

export default function AIMatchingPage() {
  const [data] = useState(AI_MATCHING_DATA);
  const [copied, setCopied] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState('P-101');
  const [validationStatuses, setValidationStatuses] = useState({
    'val-1': 'Pending',
    'val-2': 'Pending',
    'val-3': 'Pending',
  });
  const [toastMessage, setToastMessage] = useState(null);

  // Show temporary toast feedback
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Copy JSON handler
  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(data.extractedData, null, 2));
    setCopied(true);
    showToast('Structured JSON copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Human validation decision handler
  const handleValidationAction = (item, action) => {
    const updatedStatus = action === 'approve' ? 'Approved' : action === 'reject' ? 'Rejected' : 'Changed';
    setValidationStatuses((prev) => ({
      ...prev,
      [item.id]: updatedStatus,
    }));

    if (action === 'approve') {
      showToast(`Approved match for ${item.activity}. Scheduled link confirmed.`);
    } else if (action === 'reject') {
      showToast(`Rejected suggestion for ${item.activity}. Event flagged for manual link.`);
    } else {
      showToast(`Initiating match change for ${item.activity}. Manual schedule lookup ready.`);
    }
  };

  // Circular progress ring helper for candidate cards
  const renderConfidenceRing = (percentage, colorClass, size = 68) => {
    const strokeWidth = 5;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative flex flex-col items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={colorClass}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-slate-900 leading-none">{percentage}%</span>
          <span className="text-[8px] font-medium text-slate-500 scale-90">Confidence</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-7 max-w-[1600px] mx-auto space-y-5">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <MdCheckCircle className="text-emerald-400 text-base flex-shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <MdClose size={14} />
          </button>
        </div>
      )}

      {/* 1. STANDARDIZED PAGE HEADER */}
      <PageHeader
        title="AI Activity Matching"
        subtitle="Match DPR progress data with baseline schedule activities"
        icon={<MdAutoAwesome />}
        actions={
          <>
            {/* Date Range Selector */}
            <div className="bg-white hover:bg-slate-50 text-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm font-medium shadow-xs transition-colors cursor-pointer border border-white/40">
              <MdCalendarToday className="text-slate-500 text-sm" />
              <span>10 Sep 2026 – 10 Sep 2026</span>
              <MdKeyboardArrowDown className="text-slate-400 text-sm ml-0.5" />
            </div>

            {/* Unit / Project Selector */}
            <div className="bg-white hover:bg-slate-50 text-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm font-medium shadow-xs transition-colors cursor-pointer border border-white/40">
              <MdLocationCity className="text-slate-500 text-sm" />
              <span>Unit 2 – Pump Installation</span>
              <MdKeyboardArrowDown className="text-slate-400 text-sm ml-0.5" />
            </div>
          </>
        }
      />

      {/* Main Grid: 8 Cols Left, 4 Cols Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (8 Columns) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Row 1: DPR Input & Extracted Structured Data (JSON) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: DPR Input */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
                    <MdDescription className="text-lg" />
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    DPR Input{' '}
                    <span className="text-xs font-normal text-slate-500">
                      (Extracted from Site Engineer)
                    </span>
                  </h3>
                </div>

                <div className="my-3 py-2 px-1">
                  <p className="text-sm text-slate-800 italic font-medium leading-relaxed">
                    &ldquo;{data.dprInput.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50/80 border border-blue-100 text-[#0056D2] text-xs font-semibold">
                  <MdMic className="text-sm" /> Voice
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50/80 border border-blue-100 text-[#0056D2] text-xs font-semibold">
                  <MdPhotoCamera className="text-sm" /> Photos ({data.dprInput.photosCount})
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200/80 text-slate-600 text-xs font-semibold">
                  <MdCalendarToday className="text-sm text-slate-500" /> {data.dprInput.date}
                </span>
              </div>
            </div>

            {/* Card 2: Extracted Structured Data (JSON) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2] font-mono text-sm font-bold">
                      &lt;/&gt;
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      Extracted Structured Data (JSON)
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyJSON}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0056D2] hover:text-blue-700 bg-blue-50/70 hover:bg-blue-100/70 px-2 py-1 rounded-md transition-colors"
                  >
                    {copied ? (
                      <>
                        <MdCheck className="text-emerald-600" /> Copied
                      </>
                    ) : (
                      <>
                        <MdContentCopy /> Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Formatted JSON Box matching reference */}
                <div className="rounded-xl bg-slate-50/80 border border-slate-200/80 p-3 font-mono text-[11px] leading-relaxed text-slate-800 overflow-x-auto">
                  <p className="text-slate-500">&#123;</p>
                  <p className="pl-4">
                    <span className="text-blue-700">&quot;activity&quot;</span>: <span className="text-emerald-700">&quot;{data.extractedData.activity}&quot;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-blue-700">&quot;unit&quot;</span>: <span className="text-emerald-700">&quot;{data.extractedData.unit}&quot;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-blue-700">&quot;status&quot;</span>: <span className="text-emerald-700">&quot;{data.extractedData.status}&quot;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-blue-700">&quot;progress&quot;</span>: <span className="text-amber-600">{data.extractedData.progress}</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-blue-700">&quot;date&quot;</span>: <span className="text-emerald-700">&quot;{data.extractedData.date}&quot;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-blue-700">&quot;source&quot;</span>: <span className="text-emerald-700">&quot;{data.extractedData.source}&quot;</span>
                  </p>
                  <p className="text-slate-500">&#125;</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Matching Process Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-blue-50 text-[#0056D2]">
                <MdSettings className="text-base" />
              </span>
              <h3 className="text-sm font-bold text-slate-900">Matching Process</h3>
            </div>

            {/* 5-Step Chevron / Arrow Chain matching reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
              {data.matchingProcess.map((step) => (
                <div
                  key={step.step}
                  className="relative p-2.5 rounded-xl border border-blue-100/90 bg-gradient-to-r from-blue-50/40 to-slate-50/60 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {step.title}
                    </span>
                    <MdCheckCircle className="text-emerald-500 text-sm flex-shrink-0" />
                  </div>
                  <span className="text-[10px] text-slate-500 truncate leading-tight">
                    {step.subtitle}
                  </span>
                </div>
              ))}
            </div>

            {/* Confidence Score Weights */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 mb-2.5">
                <MdBarChart className="text-[#0056D2] text-sm" />
                <h4 className="text-xs font-bold text-slate-800">
                  Confidence Score Weights
                </h4>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {/* 1. Tag Match */}
                <div className="p-2.5 rounded-xl border border-emerald-100 bg-emerald-50/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="p-1 rounded-md bg-emerald-100 text-emerald-600">
                      <MdLocalOffer className="text-xs" />
                    </span>
                    <span className="text-xs font-medium text-slate-700 truncate">
                      Tag Match
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-600">35%</span>
                </div>

                {/* 2. Action Match */}
                <div className="p-2.5 rounded-xl border border-blue-100 bg-blue-50/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="p-1 rounded-md bg-blue-100 text-blue-600">
                      <MdSettings className="text-xs" />
                    </span>
                    <span className="text-xs font-medium text-slate-700 truncate">
                      Action Match
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-[#0056D2]">25%</span>
                </div>

                {/* 3. Location Match */}
                <div className="p-2.5 rounded-xl border border-amber-100 bg-amber-50/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="p-1 rounded-md bg-amber-100 text-amber-600">
                      <MdLocationOn className="text-xs" />
                    </span>
                    <span className="text-xs font-medium text-slate-700 truncate">
                      Location Match
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-amber-600">15%</span>
                </div>

                {/* 4. Embedding */}
                <div className="p-2.5 rounded-xl border border-purple-100 bg-purple-50/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="p-1 rounded-md bg-purple-100 text-purple-600">
                      <MdPsychology className="text-xs" />
                    </span>
                    <span className="text-xs font-medium text-slate-700 truncate">
                      Embedding
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-purple-600">15%</span>
                </div>

                {/* 5. Margin */}
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="p-1 rounded-md bg-slate-200 text-slate-600">
                      <MdPercent className="text-xs" />
                    </span>
                    <span className="text-xs font-medium text-slate-700 truncate">
                      Margin
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-slate-700">10%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Human Validation (Required) Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
                <MdPerson className="text-lg" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Human Validation <span className="text-red-500 font-semibold">(Required)</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  AI suggests matches. Your decision finalizes the update.
                </p>
              </div>
            </div>

            {/* Validation Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-3">Rank</th>
                    <th className="py-2.5 px-3">Activity (AI Suggestion)</th>
                    <th className="py-2.5 px-3 text-center">Confidence</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {data.humanValidationItems.map((item) => {
                    const status = validationStatuses[item.id] || item.status;
                    const rankColor =
                      item.rank === 1
                        ? 'bg-emerald-500 text-white'
                        : item.rank === 2
                        ? 'bg-blue-600 text-white'
                        : 'bg-purple-600 text-white';

                    const confBadgeClass =
                      item.confidence >= 90
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : item.confidence >= 75
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-purple-50 text-purple-700 border-purple-200';

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Rank */}
                        <td className="py-3 px-3">
                          <span
                            className={cn(
                              'w-6 h-6 rounded-full inline-flex items-center justify-center font-bold text-xs',
                              rankColor
                            )}
                          >
                            {item.rank}
                          </span>
                        </td>

                        {/* Activity */}
                        <td className="py-3 px-3 font-semibold text-slate-900">
                          {item.activity}
                        </td>

                        {/* Confidence */}
                        <td className="py-3 px-3 text-center">
                          <span
                            className={cn(
                              'inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border',
                              confBadgeClass
                            )}
                          >
                            {item.confidence}%
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-3 text-center">
                          <span
                            className={cn(
                              'inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold',
                              status === 'Approved'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : status === 'Rejected'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : status === 'Changed'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            )}
                          >
                            {status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-3">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Approve */}
                            <button
                              type="button"
                              onClick={() => handleValidationAction(item, 'approve')}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-2xs"
                            >
                              <MdCheck size={13} /> Approve
                            </button>

                            {/* Change */}
                            <button
                              type="button"
                              onClick={() => handleValidationAction(item, 'change')}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 font-semibold text-xs transition-colors shadow-2xs"
                            >
                              <MdSwapHoriz size={14} /> Change
                            </button>

                            {/* Reject */}
                            <button
                              type="button"
                              onClick={() => handleValidationAction(item, 'reject')}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-red-50 text-red-600 border border-red-200 font-semibold text-xs transition-colors shadow-2xs"
                            >
                              <MdClose size={13} /> Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Audit Trail Note Banner */}
            <div className="rounded-xl bg-blue-50/50 border border-blue-100 p-3 flex items-center gap-2.5 text-xs text-slate-700">
              <MdInfoOutline className="text-[#0056D2] text-base flex-shrink-0" />
              <span>
                Every decision is logged with user, timestamp and remarks for full audit trail.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (4 Columns) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card 1: Top 3 Matching Candidates */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
                  <MdTrackChanges className="text-base" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Top 3 Matching Candidates
                </h3>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500 font-medium cursor-pointer">
                <span>Top 3</span>
                <MdKeyboardArrowDown />
              </div>
            </div>

            {/* Candidate 1: Best Match (Highlighted) */}
            <div
              onClick={() => setSelectedCandidate('P-101')}
              className={cn(
                'rounded-xl border p-3.5 space-y-3 relative overflow-hidden transition-all cursor-pointer',
                selectedCandidate === 'P-101'
                  ? 'border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500 shadow-2xs'
                  : 'border-emerald-200 bg-emerald-50/20'
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center">
                  1
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Best Match
                </span>
              </div>

              {/* Thumbnail + Info + Ring */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                  <img
                    src={data.topCandidates[0].image}
                    alt={data.topCandidates[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {data.topCandidates[0].title}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {data.topCandidates[0].unit} &nbsp;&bull;&nbsp; {data.topCandidates[0].discipline}
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MdCalendarToday className="text-slate-400" />
                    <span>{data.topCandidates[0].dateRange}</span>
                  </p>
                </div>

                {/* Circular Gauge */}
                {renderConfidenceRing(data.topCandidates[0].confidence, 'text-emerald-500')}
              </div>

              {/* Breakdown Progress Bars */}
              <div className="space-y-1.5 pt-2 border-t border-emerald-100 text-[10px]">
                {data.topCandidates[0].breakdown.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-2">
                    <span className="text-slate-600 w-24 truncate">{item.label}</span>
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full', item.color)}
                        style={{ width: `${item.pct * 2.5}%` }}
                      />
                    </div>
                    <span className="text-slate-700 font-semibold w-7 text-right">
                      {item.pct}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Select Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCandidate('P-101');
                    showToast('Selected P-101 Installation as active match!');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-colors"
                >
                  <MdCheck className="text-sm" /> Select
                </button>
              </div>
            </div>

            {/* Candidate 2 */}
            <div
              onClick={() => {
                setSelectedCandidate('P-102');
                showToast('Selected P-102 Pump Installation as candidate!');
              }}
              className={cn(
                'rounded-xl border p-3 space-y-2 hover:border-blue-300 transition-all cursor-pointer',
                selectedCandidate === 'P-102'
                  ? 'border-blue-500 bg-blue-50/30 ring-1 ring-blue-500 shadow-2xs'
                  : 'border-slate-200'
              )}
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                  2
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                  <img
                    src={data.topCandidates[1].image}
                    alt={data.topCandidates[1].title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {data.topCandidates[1].title}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {data.topCandidates[1].unit} &nbsp;&bull;&nbsp; {data.topCandidates[1].discipline}
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MdCalendarToday className="text-slate-400" />
                    <span>{data.topCandidates[1].dateRange}</span>
                  </p>
                </div>

                {/* Circular Gauge */}
                {renderConfidenceRing(data.topCandidates[1].confidence, 'text-blue-600', 58)}
              </div>
            </div>

            {/* Candidate 3 */}
            <div
              onClick={() => {
                setSelectedCandidate('P-101-TC');
                showToast('Selected P-101 Testing & Commissioning as candidate!');
              }}
              className={cn(
                'rounded-xl border p-3 space-y-2 hover:border-purple-300 transition-all cursor-pointer',
                selectedCandidate === 'P-101-TC'
                  ? 'border-purple-500 bg-purple-50/30 ring-1 ring-purple-500 shadow-2xs'
                  : 'border-slate-200'
              )}
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center">
                  3
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                  <img
                    src={data.topCandidates[2].image}
                    alt={data.topCandidates[2].title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {data.topCandidates[2].title}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {data.topCandidates[2].unit} &nbsp;&bull;&nbsp; {data.topCandidates[2].discipline}
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MdCalendarToday className="text-slate-400" />
                    <span>{data.topCandidates[2].dateRange}</span>
                  </p>
                </div>

                {/* Circular Gauge */}
                {renderConfidenceRing(data.topCandidates[2].confidence, 'text-purple-600', 58)}
              </div>

              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast('Viewing candidate P-101 details in full inspector.');
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800"
                >
                  <MdVisibility size={13} /> View
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Matching Summary */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-blue-50 text-[#0056D2]">
                  <MdSettings className="text-base" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">Matching Summary</h3>
              </div>
              <button
                type="button"
                onClick={() => showToast('Displaying comprehensive matching audit records.')}
                className="text-xs font-semibold text-[#0056D2] hover:underline flex items-center gap-0.5"
              >
                View All <MdArrowForward size={12} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {/* Candidates */}
              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0056D2] flex items-center justify-center flex-shrink-0">
                  <MdGroup className="text-base" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900">
                    {data.matchingSummary.candidatesCount}
                  </div>
                  <div className="text-[10px] text-slate-500">Candidates</div>
                </div>
              </div>

              {/* Top Confidence */}
              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <MdTrackChanges className="text-base" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-emerald-700">
                    {data.matchingSummary.topConfidence}
                  </div>
                  <div className="text-[10px] text-slate-500">Top Confidence</div>
                </div>
              </div>

              {/* Validation */}
              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <MdAccessTime className="text-base" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-amber-600">
                    {data.matchingSummary.validationStatus}
                  </div>
                  <div className="text-[10px] text-slate-500">Validation</div>
                </div>
              </div>

              {/* Processing Time */}
              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0056D2] flex items-center justify-center flex-shrink-0">
                  <MdFlashOn className="text-base" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900">
                    {data.matchingSummary.processingTime}
                  </div>
                  <div className="text-[10px] text-slate-500">Processing Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Recent Activity */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-blue-50 text-[#0056D2]">
                  <MdSettings className="text-base" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
              </div>
              <button
                type="button"
                onClick={() => showToast('Opening complete DPR & AI pipeline audit stream.')}
                className="text-xs font-semibold text-[#0056D2] hover:underline flex items-center gap-0.5"
              >
                View All <MdArrowForward size={12} />
              </button>
            </div>

            <div className="divide-y divide-slate-100 space-y-2 pt-1">
              {data.recentActivity.map((activity) => (
                <div key={activity.id} className="pt-2 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0056D2] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {activity.type === 'matching' ? (
                      <MdAutoAwesome className="text-base" />
                    ) : activity.type === 'extraction' ? (
                      <MdLayers className="text-base" />
                    ) : (
                      <MdDescription className="text-base" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 truncate">
                      {activity.title}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {activity.timestamp}
                    </p>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold flex-shrink-0">
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

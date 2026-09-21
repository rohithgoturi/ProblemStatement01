/**
 * PragatiPath — DPR Inbox Page
 * Faithfully matches Phase 3 Reference Image 2:
 * - DPR Hero banner with site photo, metadata chips, and date selector
 * - 5-Mode Input Tabs (Text, Voice, Excel, PDF, Photos)
 * - DPR Text input with character counter & attachment triggers
 * - Interactive Voice Player (Play/Pause, scrub timer, volume, delete)
 * - Supported Formats & Tips box with handwritten cursive branding & crane/hardhat illustration
 * - Recent DPR Submissions with reactive selection
 * - AI Extraction Preview with syntax-colored JSON & confidence score bar
 * - Recent Attachments gallery with '+ Add More' trigger
 */
import { useState, useRef, useEffect } from 'react';
import {
  MdOutlineArticle, MdMic, MdTableChart, MdPictureAsPdf, MdInsertPhoto,
  MdAttachFile, MdAdd, MdPlayArrow, MdPause, MdVolumeUp, MdVolumeOff,
  MdDeleteOutline, MdSend, MdInfoOutline, MdChevronRight, MdContentCopy,
  MdCheckCircle, MdCalendarToday, MdLocationOn, MdClose, MdCheck
} from 'react-icons/md';
import {
  dprContextInfo,
  recentDprSubmissions,
  defaultExtractionPreview,
  dprSupportedTips,
  recentDprAttachments,
} from '../../data/dprData';

export default function DPRInboxPage() {
  // Mode tabs: 'text' | 'voice' | 'excel' | 'pdf' | 'photos'
  const [activeMode, setActiveMode] = useState('text');

  // Input states
  const [reportDate, setReportDate] = useState('10 Sep 2026');
  const [textInput, setTextInput] = useState(
    'Pump P-101 installation completed in Unit 2.\nTesting work ongoing.'
  );
  const [attachments, setAttachments] = useState([
    { id: 'att-excel', name: 'DPR_Report.xlsx', size: '245 KB', type: 'excel' },
  ]);

  // Voice player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasVoiceNote, setHasVoiceNote] = useState(true);

  // Submissions and selected extraction
  const [submissionsList, setSubmissionsList] = useState(recentDprSubmissions);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState('DPR-2025-001');
  const [currentExtraction, setCurrentExtraction] = useState(defaultExtractionPreview);
  const [currentConfidence, setCurrentConfidence] = useState(92);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [recentAtts, setRecentAtts] = useState(recentDprAttachments);

  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);
  const addMoreRef = useRef(null);

  // Simulated voice timer playback
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioSeconds((prev) => {
          if (prev >= 85) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatAudioTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectSubmission = (sub) => {
    setSelectedSubmissionId(sub.id);
    if (sub.extraction) {
      setCurrentExtraction(sub.extraction);
      setCurrentConfidence(sub.confidence || 90);
    }
  };

  const handleRemoveAttachment = (id) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
    showToast('Attachment removed');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const newAtt = {
        id: `att-${Date.now()}`,
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        type: file.name.endsWith('.pdf') ? 'pdf' : file.name.endsWith('.xlsx') ? 'excel' : 'image',
      };
      setAttachments((prev) => [...prev, newAtt]);
      setRecentAtts((prev) => [newAtt, ...prev]);
      showToast(`Attached ${file.name}`);
    }
  };

  const handleSubmitDPR = (e) => {
    e.preventDefault();
    if (!textInput.trim() && !hasVoiceNote && attachments.length === 0) {
      showToast('Please enter report notes or add an attachment');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const newId = `DPR-2026-${String(submissionsList.length + 1).padStart(3, '0')}`;
      const newSub = {
        id: newId,
        title: activeMode === 'text' ? 'Text Report' : activeMode === 'voice' ? 'Voice Note' : `${activeMode.toUpperCase()} Report`,
        type: activeMode,
        code: newId,
        date: '10 Sep 2026',
        time: 'Just now',
        status: 'Extracted',
        statusVariant: 'success',
        icon: activeMode,
        content: textInput,
        extraction: {
          activity: 'Field DPR Submission Verified',
          unit: dprContextInfo.unit,
          status: 'In Progress',
          progress: 85,
          date: '2026-09-10',
          source: activeMode.charAt(0).toUpperCase() + activeMode.slice(1),
        },
        confidence: 96,
      };

      setSubmissionsList([newSub, ...submissionsList]);
      setSelectedSubmissionId(newId);
      setCurrentExtraction(newSub.extraction);
      setCurrentConfidence(newSub.confidence);
      showToast('✓ DPR Submitted & Extracted with 96% confidence!');
    }, 1000);
  };

  const handleCopyJSON = () => {
    navigator.clipboard?.writeText(JSON.stringify(currentExtraction, null, 2));
    setIsCopied(true);
    showToast('JSON copied to clipboard');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-lg shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. DPR HERO BANNER */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0047B3] via-[#0056D2] to-[#0A2540] text-white shadow-sm border border-blue-700/30">
        {/* Background construction framework overlay */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=1400&auto=format&fit=crop&q=80)',
          }}
        />

        <div className="relative z-10 p-6 md:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold tracking-wider uppercase text-blue-100 border border-white/20">
              DPR INBOX
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Submit Daily Progress Report – DPR
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed">
              Capture actual work done on site. Supports text, voice, Excel, PDF, photos (Hindi / Hinglish OK).
            </p>

            {/* Context Metadata Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-blue-100">
              <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                <MdLocationOn className="text-blue-200 text-sm" />
                {dprContextInfo.projectName}
              </span>
              <span className="text-blue-300">•</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                {dprContextInfo.unit}
              </span>
              <span className="text-blue-300">•</span>
              <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                <MdCalendarToday className="text-blue-200 text-sm" />
                {dprContextInfo.reportDate}
              </span>
            </div>
          </div>

          {/* Right Side: Construction Image + Date Picker Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:shrink-0">
            {/* Date Picker Trigger Card */}
            <div className="bg-white text-slate-800 rounded-xl px-4 py-2.5 shadow-md flex items-center gap-3 border border-slate-200 text-xs font-medium">
              <div className="text-slate-400">
                <MdCalendarToday size={18} className="text-[#0056D2]" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Report Date</div>
                <select
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  className="font-bold text-slate-800 bg-transparent cursor-pointer focus:outline-none"
                >
                  <option value="10 Sep 2026">10 Sep 2026</option>
                  <option value="09 Sep 2026">09 Sep 2026</option>
                  <option value="08 Sep 2026">08 Sep 2026</option>
                  <option value="07 Sep 2026">07 Sep 2026</option>
                </select>
              </div>
            </div>

            {/* Engineer Image Thumbnail matching reference */}
            <div className="hidden sm:block relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shadow-lg border-2 border-white/40 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&auto=format&fit=crop&q=80"
                alt="Site Engineer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. MODE TABS STRIP */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'text',   label: 'Text',   icon: MdOutlineArticle },
          { id: 'voice',  label: 'Voice',  icon: MdMic },
          { id: 'excel',  label: 'Excel',  icon: MdTableChart, iconColor: 'text-emerald-600' },
          { id: 'pdf',    label: 'PDF',    icon: MdPictureAsPdf, iconColor: 'text-purple-600' },
          { id: 'photos', label: 'Photos', icon: MdInsertPhoto, iconColor: 'text-blue-500' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMode(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                isActive
                  ? 'bg-[#0056D2] text-white shadow-blue-500/20 shadow-md'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-white' : tab.iconColor || 'text-slate-500'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. MAIN 2-COLUMN GRID (Left ~62% | Right ~38%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main DPR Input Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900 capitalize">
              DPR Input ({activeMode})
            </h2>

            {/* Input Content by Active Tab */}
            {activeMode === 'text' && (
              <div className="space-y-2">
                <div className="relative">
                  <textarea
                    rows={4}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter site work description (Hindi / English / Hinglish supported)..."
                    maxLength={1000}
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0056D2]/20 focus:border-[#0056D2] transition-colors leading-relaxed resize-none"
                  />
                  <div className="absolute right-3 bottom-3 text-xs text-slate-400 font-medium">
                    {textInput.length}/1000
                  </div>
                </div>
              </div>
            )}

            {activeMode === 'voice' && (
              <div className="p-6 border-2 border-dashed border-blue-200 bg-blue-50/40 rounded-xl text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#0056D2] text-white flex items-center justify-center shadow-lg shadow-blue-500/30 cursor-pointer hover:bg-blue-700 transition-all">
                  <MdMic size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Record Voice Report</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Click mic to record notes in Hindi, English, or Hinglish.</p>
                </div>
              </div>
            )}

            {activeMode === 'excel' && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-6 border-2 border-dashed border-emerald-200 bg-emerald-50/30 rounded-xl text-center cursor-pointer hover:bg-emerald-50/60 transition-colors space-y-2"
              >
                <MdTableChart className="mx-auto text-emerald-600 text-3xl" />
                <div className="text-sm font-bold text-slate-800">Upload Excel Spreadsheet (.xlsx, .xls)</div>
                <div className="text-xs text-slate-500">Drag and drop or click to browse daily log sheets</div>
              </div>
            )}

            {activeMode === 'pdf' && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-6 border-2 border-dashed border-purple-200 bg-purple-50/30 rounded-xl text-center cursor-pointer hover:bg-purple-50/60 transition-colors space-y-2"
              >
                <MdPictureAsPdf className="mx-auto text-purple-600 text-3xl" />
                <div className="text-sm font-bold text-slate-800">Upload PDF Inspection Report (.pdf)</div>
                <div className="text-xs text-slate-500">Attach site QA/QC inspection sheets or signoffs</div>
              </div>
            )}

            {activeMode === 'photos' && (
              <div
                onClick={() => photoInputRef.current?.click()}
                className="p-6 border-2 border-dashed border-blue-200 bg-blue-50/30 rounded-xl text-center cursor-pointer hover:bg-blue-50/60 transition-colors space-y-2"
              >
                <MdInsertPhoto className="mx-auto text-blue-600 text-3xl" />
                <div className="text-sm font-bold text-slate-800">Upload Site Photos (.jpg, .png)</div>
                <div className="text-xs text-slate-500">Attach clear photos with equipment, foundation, or crew</div>
              </div>
            )}

            {/* Hidden native inputs */}
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileUpload} />
            <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />

            {/* Attachments Row */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Attach Files button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <MdAttachFile size={16} className="text-slate-500" />
                Attach Files / Photos
              </button>

              {/* Add Photo Dashed Box */}
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-dashed border-slate-300 hover:border-[#0056D2] text-xs font-semibold text-slate-600 hover:text-[#0056D2] bg-white transition-colors"
              >
                <MdAdd size={16} />
                Add Photo
              </button>

              {/* Attached file chips */}
              {attachments.map((att) => (
                <div
                  key={att.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 text-xs text-slate-800 font-medium"
                >
                  <div className="w-5 h-5 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">
                    X
                  </div>
                  <span>{att.name}</span>
                  <span className="text-slate-400 text-[11px]">{att.size}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(att.id)}
                    className="text-slate-400 hover:text-slate-600 ml-0.5"
                  >
                    <MdClose size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Voice Note (Optional) Section */}
            {hasVoiceNote && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <MdMic className="text-[#0056D2]" size={16} />
                    <span>Voice Note (optional)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setHasVoiceNote(false);
                      setIsPlaying(false);
                      showToast('Voice note removed');
                    }}
                    className="text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete voice note"
                  >
                    <MdDeleteOutline size={17} />
                  </button>
                </div>

                {/* Audio Player Bar */}
                <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-200">
                  {/* Play/Pause Circle */}
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full bg-[#0056D2] hover:bg-blue-700 text-white flex items-center justify-center shadow-sm transition-transform active:scale-95 shrink-0"
                  >
                    {isPlaying ? <MdPause size={18} /> : <MdPlayArrow size={18} className="ml-0.5" />}
                  </button>

                  {/* Timestamp */}
                  <span className="text-xs font-mono font-medium text-slate-600 w-24 shrink-0">
                    {formatAudioTime(audioSeconds)} / 01:25
                  </span>

                  {/* Scrubber track */}
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const percent = clickX / rect.width;
                      setAudioSeconds(Math.floor(percent * 85));
                    }}
                    className="relative flex-1 h-1.5 bg-slate-200 rounded-full cursor-pointer overflow-hidden"
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-[#0056D2] rounded-full transition-all"
                      style={{ width: `${(audioSeconds / 85) * 100}%` }}
                    />
                  </div>

                  {/* Volume Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    {isMuted ? <MdVolumeOff size={18} /> : <MdVolumeUp size={18} />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit DPR CTA Button */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmitDPR}
              className="w-full py-3 px-6 rounded-xl bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all active:scale-[0.99] disabled:opacity-75 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting & Extracting...</span>
                </>
              ) : (
                <>
                  <MdSend size={16} className="-rotate-12" />
                  <span>Submit DPR</span>
                </>
              )}
            </button>
          </div>

          {/* Supported Formats & Tips Card */}
          <div className="bg-gradient-to-r from-blue-50/70 to-slate-50 rounded-2xl p-5 border border-blue-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-md">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0056D2]">
                <MdInfoOutline size={16} />
                <span>Supported Formats & Tips</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-600">
                {dprSupportedTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#0056D2] mt-0.5 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative branding handwritten style & sketch */}
            <div className="flex items-center gap-3 shrink-0 text-right md:border-l md:border-blue-200/60 md:pl-5">
              <div className="text-right">
                <p className="text-xs font-serif italic text-blue-900 font-medium leading-tight">
                  Better data.<br />
                  Smarter tracking.<br />
                  On time progress.
                </p>
              </div>
              {/* Construction hardhat SVG sketch */}
              <div className="w-12 h-12 text-[#0056D2]/60 shrink-0">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 34h36c2 0 3-1 3-3 0-11-8-20-21-20S3 20 3 31c0 2 1 3 3 3z" />
                  <path d="M16 11v-3h16v3" />
                  <path d="M24 8v26" />
                  <path d="M12 34v4h24v-4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="lg:col-span-5 space-y-5">
          {/* Card 1: Recent DPR Submissions */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-50 text-[#0056D2]">
                  <MdOutlineArticle size={18} />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Recent DPR Submissions</h3>
              </div>
              <button
                type="button"
                onClick={() => showToast('Displaying all 24 DPR submissions')}
                className="text-xs font-semibold text-[#0056D2] hover:underline"
              >
                View All →
              </button>
            </div>

            {/* Submissions List */}
            <div className="divide-y divide-slate-100">
              {submissionsList.map((sub) => {
                const isSelected = selectedSubmissionId === sub.id;
                return (
                  <div
                    key={sub.id}
                    onClick={() => handleSelectSubmission(sub)}
                    className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-50/70 border border-blue-200'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Icon badge */}
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                          sub.type === 'text'
                            ? 'bg-emerald-100 text-emerald-700'
                            : sub.type === 'voice'
                            ? 'bg-blue-100 text-blue-700'
                            : sub.type === 'excel'
                            ? 'bg-emerald-100 text-emerald-800'
                            : sub.type === 'pdf'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-sky-100 text-sky-700'
                        }`}
                      >
                        {sub.type === 'text' && 'TF'}
                        {sub.type === 'voice' && <MdMic size={16} />}
                        {sub.type === 'excel' && <MdTableChart size={16} />}
                        {sub.type === 'pdf' && <MdPictureAsPdf size={16} />}
                        {sub.type === 'photos' && <MdInsertPhoto size={16} />}
                      </div>

                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">{sub.title}</div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {sub.code} • {sub.time}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          sub.status === 'Extracted'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {sub.status}
                      </span>
                      <MdChevronRight className="text-slate-400" size={18} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: AI Extraction Preview */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs font-bold text-[#0056D2]">A |</span>
                <h3 className="text-sm font-bold text-slate-900">AI Extraction Preview</h3>
              </div>
              <button
                type="button"
                onClick={handleCopyJSON}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-600 transition-colors"
              >
                {isCopied ? <MdCheck size={14} className="text-emerald-600" /> : <MdContentCopy size={14} />}
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Syntax styled JSON box */}
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed border border-slate-800">
              <pre className="text-xs">
                {JSON.stringify(currentExtraction, null, 2)}
              </pre>
            </div>

            {/* Confidence Score Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-slate-600 font-medium">
                  <MdCheckCircle className="text-emerald-500 text-sm" />
                  <span>Extraction Confidence</span>
                </div>
                <span className="font-bold text-slate-900">{currentConfidence}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${currentConfidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* Card 3: Recent Attachments */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
                <MdAttachFile className="text-slate-500" size={18} />
                <span>Recent Attachments</span>
              </div>
              <button
                type="button"
                onClick={() => showToast('Opening attachments repository')}
                className="text-xs font-semibold text-[#0056D2] hover:underline"
              >
                View All →
              </button>
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-4 gap-2.5 pt-1">
              {recentAtts.slice(0, 3).map((att) => (
                <div
                  key={att.id}
                  onClick={() => showToast(`Opening ${att.name}`)}
                  className="p-2 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer text-center space-y-1"
                >
                  {att.thumbnail ? (
                    <div className="w-full h-11 rounded-lg overflow-hidden bg-slate-100">
                      <img src={att.thumbnail} alt={att.name} className="w-full h-full object-cover" />
                    </div>
                  ) : att.type === 'excel' ? (
                    <div className="w-full h-11 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      <MdTableChart size={22} />
                    </div>
                  ) : (
                    <div className="w-full h-11 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs">
                      <MdPictureAsPdf size={22} />
                    </div>
                  )}
                  <div className="text-[11px] font-semibold text-slate-700 truncate">{att.name}</div>
                  <div className="text-[10px] text-slate-400">{att.size}</div>
                </div>
              ))}

              {/* Add More card */}
              <div
                onClick={() => addMoreRef.current?.click()}
                className="p-2 rounded-xl border-2 border-dashed border-slate-200 hover:border-[#0056D2] hover:bg-blue-50/20 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-1"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0056D2] flex items-center justify-center">
                  <MdAdd size={18} />
                </div>
                <div className="text-[11px] font-bold text-[#0056D2]">Add More</div>
                <input ref={addMoreRef} type="file" className="hidden" onChange={handleFileUpload} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

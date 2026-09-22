/**
 * PragatiPath — DPR Inbox Page (Full Backend API Integrated)
 * Clienter-inspired warm rounded cards, orange upload accents, and real report ingestion.
 * Connected directly to Node + Express + MongoDB backend.
 */
import { useState, useRef, useEffect } from 'react';
import {
  MdOutlineArticle, MdSend,
  MdCheckCircle, MdInbox, MdCloudUpload, MdArrowForward
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import { getSourceDocuments, getProgressEvents, submitTextProgress, uploadProgressFile } from '../../services/api';

export default function DPRInboxPage() {
  const [activeMode, setActiveMode] = useState('text'); // 'text' | 'file'
  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [sources, setSources] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSourceId, setSelectedSourceId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch real source documents & events from Express API
  const fetchData = async () => {
    setLoading(true);
    setErrorMsg('');
    const [sourcesRes, eventsRes] = await Promise.all([
      getSourceDocuments(),
      getProgressEvents(),
    ]);

    if (sourcesRes.error) {
      setErrorMsg(sourcesRes.error);
    } else {
      const srcList = Array.isArray(sourcesRes.data) ? sourcesRes.data : [];
      setSources(srcList);
      if (srcList.length > 0 && !selectedSourceId) {
        setSelectedSourceId(srcList[0]._id || srcList[0].id);
      }
    }

    if (eventsRes.data) {
      setEvents(Array.isArray(eventsRes.data) ? eventsRes.data : []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitText = async (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    setIsSubmitting(true);
    setErrorMsg('');

    const res = await submitTextProgress({
      text: textInput.trim(),
      rawContent: textInput.trim(),
      submittedBy: 'site-supervisor-1',
    });

    setIsSubmitting(false);

    if (res.error) {
      setErrorMsg(`Submission failed: ${res.error}`);
    } else {
      showToast('Progress update submitted successfully! AI extraction & matching initiated.');
      setTextInput('');
      fetchData();
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsSubmitting(true);
    setErrorMsg('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('submittedBy', 'site-supervisor-1');

    const res = await uploadProgressFile(formData);
    setIsSubmitting(false);

    if (res.error) {
      setErrorMsg(`File upload failed: ${res.error}`);
    } else {
      showToast(`Uploaded ${file.name} successfully! AI parsed ${res.data?.extractedEvents?.length || 0} events.`);
      setSelectedFile(null);
      fetchData();
    }
  };

  // Selected source & its extracted events
  const activeSource = sources.find((s) => (s._id || s.id) === selectedSourceId) || sources[0];
  const activeEvents = events.filter((ev) => (ev.sourceDocumentId?._id || ev.sourceDocumentId || ev.sourceDocument) === (activeSource?._id || activeSource?.id));

  return (
    <div className="space-y-6 pb-16 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B1320] text-white px-5 py-3 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-base shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="DPR & Progress Report Ingestion"
        subtitle="Ingest raw text updates, supervisor logs, and spreadsheet site diaries"
        icon={<MdInbox />}
      />

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800">
          {errorMsg}
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Progress Submission Form */}
        <div className="lg:col-span-6 space-y-6">
          {/* Submission Mode Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-2xs space-y-5">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-[#FAF8F5] border border-[#E8E1D5] rounded-full text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveMode('text')}
                className={`flex-1 py-2 px-4 rounded-full transition-all flex items-center justify-center gap-2 ${
                  activeMode === 'text' ? 'bg-[#0B1320] text-white shadow-2xs font-bold' : 'text-stone-600 hover:text-[#0B1320]'
                }`}
              >
                <MdOutlineArticle size={16} />
                <span>Text Progress Entry</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('file')}
                className={`flex-1 py-2 px-4 rounded-full transition-all flex items-center justify-center gap-2 ${
                  activeMode === 'file' ? 'bg-[#0B1320] text-white shadow-2xs font-bold' : 'text-stone-600 hover:text-[#0B1320]'
                }`}
              >
                <MdCloudUpload size={16} />
                <span>Upload Report File</span>
              </button>
            </div>

            {/* Mode 1: Text Input Form */}
            {activeMode === 'text' && (
              <form onSubmit={handleSubmitText} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0B1320] mb-2">
                    Daily Progress Report Content
                  </label>
                  <textarea
                    rows={5}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter site progress updates (e.g. 'Piping activity P-102 completed in Unit 2 today. Foundation pouring ongoing.')"
                    className="w-full p-4 bg-[#FAF8F5] border border-[#E8E1D5] rounded-2xl text-xs text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all placeholder:text-stone-400"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-stone-400 font-mono">
                    {textInput.length} characters
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting || !textInput.trim()}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF5500] hover:bg-[#EA580C] text-white font-bold text-xs shadow-sm transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <MdSend size={15} />
                    <span>{isSubmitting ? 'Extracting Progress...' : 'Submit Update'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Mode 2: File Upload */}
            {activeMode === 'file' && (
              <div className="text-center py-8 border-2 border-dashed border-[#E8E1D5] rounded-2xl space-y-4 bg-[#FAF8F5]/50">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center shadow-2xs">
                  <MdCloudUpload size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1320]">Upload Site Progress Report</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Supports Excel (.xlsx, .xls), CSV, or text reports
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv,.txt"
                  className="hidden"
                  onChange={handleFileUpload}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#0B1320] hover:bg-[#FF5500] text-white text-xs font-bold rounded-full transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Uploading & Parsing...' : 'Select Report File'}
                </button>
              </div>
            )}
          </div>

          {/* Submitted Source Documents List */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0B1320]">Ingested Sources ({sources.length})</h2>
              <button
                type="button"
                onClick={fetchData}
                className="text-xs text-[#FF5500] font-bold hover:text-[#EA580C]"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-stone-400">Loading sources...</div>
            ) : sources.length === 0 ? (
              <div className="py-8 text-center text-xs text-stone-500 bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] p-6">
                No progress reports submitted yet.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {sources.map((src) => {
                  const id = src._id || src.id;
                  const isSelected = id === (activeSource?._id || activeSource?.id);
                  return (
                    <div
                      key={id}
                      onClick={() => setSelectedSourceId(id)}
                      className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#FF5500] bg-white shadow-xs ring-2 ring-[#FF5500]/10'
                          : 'border-[#E8E1D5] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-[#0B1320]">
                        <span className="truncate pr-2">{src.originalFileName || src.sourceType || 'Text Progress Report'}</span>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white text-stone-700 uppercase font-mono border border-[#E8E1D5] shrink-0">
                          {src.fileType || 'text'}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-2 flex items-center justify-between">
                        <span>Submitted: {new Date(src.createdAt || Date.now()).toLocaleDateString()}</span>
                        <span className="font-bold text-[#FF5500] flex items-center gap-1">
                          View Events <MdArrowForward size={12} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Extraction & Events Preview */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0B1320]">Extracted Progress Events</h2>
              <span className="px-3 py-1 rounded-full bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/20 text-xs font-bold">
                {activeEvents.length} Extracted
              </span>
            </div>

            {!activeSource ? (
              <div className="py-12 text-center text-xs text-stone-400">
                Select or submit a progress report to view AI extracted events.
              </div>
            ) : activeEvents.length === 0 ? (
              <div className="py-12 text-center bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] text-xs text-stone-500 p-6">
                No progress events extracted for this source yet.
              </div>
            ) : (
              <div className="space-y-3">
                {activeEvents.map((ev) => (
                  <div key={ev._id || ev.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-[#0B1320]">{ev.rawActivityName || ev.extractedActivityName}</h4>
                        <span className="text-[10px] font-mono text-stone-500">{ev.discipline || 'General Discipline'}</span>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                          ev.status === 'APPROVED'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : ev.status === 'MATCH_SUGGESTED' || ev.status === 'PENDING_REVIEW'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-stone-50 text-stone-600 border-stone-200'
                        }`}
                      >
                        {ev.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 bg-white p-3 rounded-xl border border-[#E8E1D5]">
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Actual Start</span>
                        <strong className="text-[#0B1320]">{ev.actualStartDate ? new Date(ev.actualStartDate).toLocaleDateString() : 'N/A'}</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Actual Finish</span>
                        <strong className="text-[#0B1320]">{ev.actualFinishDate ? new Date(ev.actualFinishDate).toLocaleDateString() : 'N/A'}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

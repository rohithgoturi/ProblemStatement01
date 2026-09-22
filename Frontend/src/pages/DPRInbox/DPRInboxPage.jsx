/**
 * PragatiPath — DPR Inbox Page (Full Backend API Integrated)
 * All mock data removed. Real file uploads & text progress reports connected to backend.
 */
import { useState, useRef, useEffect } from 'react';
import {
  MdOutlineArticle, MdTableChart, MdPictureAsPdf,
  MdAttachFile, MdSend, MdInfoOutline,
  MdCheckCircle, MdInbox, MdCloudUpload
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
    <div className="space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-lg shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="DPR & Progress Report Inbox"
        subtitle="Ingest text progress reports, spreadsheets, and site diaries"
        icon={<MdInbox />}
      />

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Progress Submission Form */}
        <div className="lg:col-span-6 space-y-5">
          {/* Submission Mode Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveMode('text')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeMode === 'text' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <MdOutlineArticle size={16} />
                <span>Text Progress</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('file')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeMode === 'file' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <MdCloudUpload size={16} />
                <span>Upload Report / File</span>
              </button>
            </div>

            {/* Mode 1: Text Input Form */}
            {activeMode === 'text' && (
              <form onSubmit={handleSubmitText} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Daily Progress Report Text
                  </label>
                  <textarea
                    rows={5}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter site progress updates (e.g. 'Piping activity P-102 completed in Unit 2 today. Foundation pouring ongoing.')"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#0056D2] focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {textInput.length} characters
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting || !textInput.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <MdSend size={16} />
                    <span>{isSubmitting ? 'Processing AI Extraction...' : 'Submit Update'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Mode 2: File Upload */}
            {activeMode === 'file' && (
              <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-[#0056D2] flex items-center justify-center">
                  <MdCloudUpload size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Upload Site Progress Report</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
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
                  className="px-5 py-2 bg-[#0056D2] text-white text-xs font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Uploading & Parsing...' : 'Select Report File'}
                </button>
              </div>
            )}
          </div>

          {/* Submitted Source Documents List */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Ingested Sources ({sources.length})</h2>
              <button onClick={fetchData} className="text-xs text-blue-600 font-bold hover:underline">
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading sources...</div>
            ) : sources.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 border border-dashed rounded-xl">
                No progress reports submitted yet.
              </div>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {sources.map((src) => {
                  const id = src._id || src.id;
                  const isSelected = id === (activeSource?._id || activeSource?.id);
                  return (
                    <div
                      key={id}
                      onClick={() => setSelectedSourceId(id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#0056D2] bg-blue-50/50 shadow-2xs ring-1 ring-[#0056D2]'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>{src.originalFileName || src.sourceType || 'Text Progress Report'}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase font-mono">
                          {src.fileType || 'text'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                        <span>Submitted: {new Date(src.createdAt || Date.now()).toLocaleString()}</span>
                        <span className="font-semibold text-blue-700">View Events →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Extraction & Events Preview */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Extracted Progress Events</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0056D2] text-xs font-bold">
                {activeEvents.length} Extracted
              </span>
            </div>

            {!activeSource ? (
              <div className="py-12 text-center text-xs text-slate-400">
                Select or submit a progress report to view AI extracted events.
              </div>
            ) : activeEvents.length === 0 ? (
              <div className="py-12 text-center bg-slate-50 rounded-xl border border-dashed text-xs text-slate-500 p-6">
                No progress events extracted for this source yet.
              </div>
            ) : (
              <div className="space-y-3">
                {activeEvents.map((ev) => (
                  <div key={ev._id || ev.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{ev.rawActivityName || ev.extractedActivityName}</h4>
                        <span className="text-[10px] font-mono text-slate-500">{ev.discipline || 'General Discipline'}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          ev.status === 'APPROVED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : ev.status === 'MATCH_SUGGESTED' || ev.status === 'PENDING_REVIEW'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {ev.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-100">
                      <div>
                        <span className="text-slate-400">Actual Start: </span>
                        <strong className="text-slate-700">{ev.actualStartDate ? new Date(ev.actualStartDate).toLocaleDateString() : 'N/A'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Actual Finish: </span>
                        <strong className="text-slate-700">{ev.actualFinishDate ? new Date(ev.actualFinishDate).toLocaleDateString() : 'N/A'}</strong>
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

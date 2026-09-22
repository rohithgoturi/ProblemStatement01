/**
 * PragatiPath — DPR Inbox Page (Full Backend API Integrated)
 * Clienter-inspired warm rounded cards, orange upload accents, and real report ingestion.
 * Connected directly to Node + Express + MongoDB backend.
 */
import { useState, useRef, useEffect } from 'react';
import {
  MdOutlineArticle, MdSend,
  MdCheckCircle, MdInbox, MdCloudUpload, MdArrowForward,
  MdMic, MdMicOff, MdStop, MdGraphicEq
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import { getSourceDocuments, getProgressEvents, submitTextProgress, uploadProgressFile } from '../../services/api';

export default function DPRInboxPage() {
  const [activeMode, setActiveMode] = useState('text'); // 'text' | 'voice' | 'file'
  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [sources, setSources] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSourceId, setSelectedSourceId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Real Web Speech Recognition state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startVoiceDictation = () => {
    setErrorMsg('');
    const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SpeechRecognition) {
      setErrorMsg('Web Speech API is not supported in this browser. Please use Chrome, Edge, or Safari, or type your update.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        setRecordingDuration(0);
        timerRef.current = setInterval(() => {
          setRecordingDuration((prev) => prev + 1);
        }, 1000);
      };

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setTextInput(currentTranscript.trim());
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMsg('Microphone access denied. Please allow microphone access in your browser settings.');
        }
        stopVoiceDictation();
      };

      recognition.onend = () => {
        setIsRecording(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setErrorMsg(`Could not start voice recognition: ${err.message}`);
    }
  };

  const stopVoiceDictation = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
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
    if (e && e.preventDefault) e.preventDefault();
    if (!textInput.trim()) return;

    if (isRecording) {
      stopVoiceDictation();
    }

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
        subtitle="Ingest raw text updates, supervisor voice notes, and spreadsheet site diaries"
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
            <div className="flex items-center gap-1.5 p-1.5 bg-[#FAF8F5] border border-[#E8E1D5] rounded-full text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  if (isRecording) stopVoiceDictation();
                  setActiveMode('text');
                }}
                className={`flex-1 py-2 px-3 rounded-full transition-all flex items-center justify-center gap-1.5 ${
                  activeMode === 'text' ? 'bg-[#0B1320] text-white shadow-2xs font-bold' : 'text-stone-600 hover:text-[#0B1320]'
                }`}
              >
                <MdOutlineArticle size={16} />
                <span>Text Entry</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMode('voice');
                }}
                className={`flex-1 py-2 px-3 rounded-full transition-all flex items-center justify-center gap-1.5 ${
                  activeMode === 'voice' ? 'bg-[#FF5500] text-white shadow-2xs font-bold' : 'text-stone-600 hover:text-[#0B1320]'
                }`}
              >
                <MdMic size={16} />
                <span>Voice Note</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isRecording) stopVoiceDictation();
                  setActiveMode('file');
                }}
                className={`flex-1 py-2 px-3 rounded-full transition-all flex items-center justify-center gap-1.5 ${
                  activeMode === 'file' ? 'bg-[#0B1320] text-white shadow-2xs font-bold' : 'text-stone-600 hover:text-[#0B1320]'
                }`}
              >
                <MdCloudUpload size={16} />
                <span>Upload File</span>
              </button>
            </div>

            {/* Mode 1: Text Input Form */}
            {activeMode === 'text' && (
              <form onSubmit={handleSubmitText} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-[#0B1320]">
                      Daily Progress Report Content
                    </label>
                    {speechSupported && (
                      <button
                        type="button"
                        onClick={isRecording ? stopVoiceDictation : startVoiceDictation}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          isRecording
                            ? 'bg-rose-600 text-white animate-pulse'
                            : 'bg-[#FFF2EB] text-[#FF5500] hover:bg-[#FFE5D6]'
                        }`}
                      >
                        <MdMic size={14} />
                        <span>{isRecording ? 'Stop Recording' : 'Dictate'}</span>
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={5}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter site progress updates (e.g. 'Pier 42 concrete pouring completed today. Foundation reinforcement started on East bay.')"
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

            {/* Mode 2: Voice Dictation Form */}
            {activeMode === 'voice' && (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] text-center space-y-4">
                  <div className="relative inline-block">
                    <button
                      type="button"
                      onClick={isRecording ? stopVoiceDictation : startVoiceDictation}
                      className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all shadow-lg cursor-pointer ${
                        isRecording
                          ? 'bg-rose-600 scale-105 ring-8 ring-rose-600/20 animate-pulse'
                          : 'bg-[#FF5500] hover:bg-[#E64400] ring-4 ring-[#FF5500]/20'
                      }`}
                      title={isRecording ? 'Click to stop listening' : 'Click to start speaking'}
                    >
                      {isRecording ? <MdStop size={34} /> : <MdMic size={34} />}
                    </button>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#0B1320]">
                      {isRecording ? 'Listening to Field Update...' : 'Tap Microphone to Speak Update'}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      {isRecording
                        ? `Recording active • ${String(Math.floor(recordingDuration / 60)).padStart(2, '0')}:${String(recordingDuration % 60).padStart(2, '0')}`
                        : 'Hands-free dictation for active work fronts and noise-heavy sites'}
                    </p>
                  </div>

                  {/* Animated Waveform Bars */}
                  {isRecording && (
                    <div className="flex items-center justify-center gap-1.5 h-8">
                      {[30, 70, 95, 45, 80, 100, 60, 40, 90, 75, 50, 85].map((h, i) => (
                        <span
                          key={i}
                          style={{
                            height: `${Math.max(25, (h + (i % 3) * 20) % 100)}%`,
                          }}
                          className="w-1.5 bg-[#FF5500] rounded-full transition-all duration-200"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Transcribed Text Box */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#0B1320]">
                      Live Speech Transcription:
                    </label>
                    {textInput && (
                      <button
                        type="button"
                        onClick={() => setTextInput('')}
                        className="text-[11px] text-stone-400 hover:text-rose-600 cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Transcribed voice text will appear here. You can also edit it before submitting..."
                    className="w-full p-4 bg-[#FAF8F5] border border-[#E8E1D5] rounded-2xl text-xs text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all placeholder:text-stone-400"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-stone-500 font-mono">
                    {textInput ? `${textInput.split(/\s+/).filter(Boolean).length} words transcribed` : 'Ready for voice input'}
                  </span>
                  <button
                    type="button"
                    onClick={handleSubmitText}
                    disabled={isSubmitting || !textInput.trim()}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF5500] hover:bg-[#EA580C] text-white font-bold text-xs shadow-sm transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <MdSend size={15} />
                    <span>{isSubmitting ? 'Extracting Progress...' : 'Submit Transcribed Update'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mode 3: File Upload */}
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

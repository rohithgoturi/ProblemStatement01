import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/TopCommandBar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusChip } from '@/components/ui/StatusChip';
import { LoadingState } from '@/components/ui/Card';
import { useDemoStore } from '@/store/demoStore';
import { simulateDprExtraction } from '@/services';
import { cn } from '@/lib/utils';
import { FileText, Mic, Table, File, Image, CheckCircle2, MapPin, Clock } from 'lucide-react';
import type { FieldObservation } from '@/types';

const TABS = [
  { id: 'text',  label: 'Text Description', Icon: FileText },
  { id: 'voice', label: 'Voice Note',       Icon: Mic },
  { id: 'excel', label: 'Excel / CSV',      Icon: Table },
  { id: 'pdf',   label: 'PDF Site Log',     Icon: File },
  { id: 'photo', label: 'Photos',           Icon: Image },
];

export default function DPRPage() {
  const [activeTab, setActiveTab] = useState('text');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extracted, setExtracted] = useState<FieldObservation | null>(null);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const obs = await simulateDprExtraction({ type: activeTab, text });
      setExtracted(obs);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Daily Progress Report"
        subtitle="Submit field observations for AI-assisted extraction"
        breadcrumb={[{ label: 'PragatiPath' }, { label: 'DPR' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Input */}
        <div className="space-y-4">
          <Card padding="none">
            {/* Input type tabs */}
            <div className="flex border-b border-neutral-200 overflow-x-auto" role="tablist" aria-label="Input type">
              {TABS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={activeTab === id}
                  onClick={() => { setActiveTab(id); setExtracted(null); }}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-3 text-xs font-medium whitespace-nowrap transition-colors duration-fast border-b-2 shrink-0',
                    activeTab === id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-neutral-600 hover:text-neutral-800 hover:border-neutral-300'
                  )}
                >
                  <Icon size={14} strokeWidth={1.5} aria-hidden="true" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            <div className="p-4">
              {activeTab === 'text' && (
                <div className="space-y-3">
                  <label htmlFor="dpr-text" className="text-xs font-semibold text-neutral-800 uppercase tracking-wide block">
                    Field Observation
                  </label>
                  <textarea
                    id="dpr-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Describe what was done today at site. E.g.: Erection work for Line 24-XX pipe completed up to Ch. 12+450, approximately 64% done. Minor delay due to equipment calibration."
                    className="w-full h-40 rounded border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    aria-label="Field observation text"
                  />
                  <p className="text-xs text-neutral-500">{text.length} characters · Hinglish / English accepted</p>
                </div>
              )}
              {activeTab !== 'text' && (
                <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-neutral-200 rounded text-center gap-2 bg-neutral-50">
                  {TABS.find(t => t.id === activeTab)?.Icon && React.createElement(TABS.find(t => t.id === activeTab)!.Icon, { size: 24, strokeWidth: 1.5, className: 'text-neutral-400' })}
                  <p className="text-sm font-medium text-neutral-600">
                    {activeTab === 'voice' ? 'Click to start voice recording' : `Drop your ${activeTab.toUpperCase()} file here, or click to browse`}
                  </p>
                  <p className="text-xs text-neutral-400">Simulated in demo mode</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => { setExtracted(null); setText('SIMULATED_FILE_INPUT'); }}
                  >
                    Simulate Upload
                  </Button>
                </div>
              )}

              <div className="flex justify-end mt-4">
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={!text.trim() && activeTab === 'text'}
                >
                  {loading ? 'Processing…' : 'Submit & Extract'}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Extraction preview */}
        <div>
          {loading && (
            <Card padding="md">
              <LoadingState label="Simulating AI extraction…" />
              <p className="text-center text-xs text-neutral-400 mt-2">[Demo data — not a live AI connection]</p>
            </Card>
          )}
          {extracted && !loading && (
            <Card padding="md">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={16} strokeWidth={1.5} className="text-success" />
                <h2 className="text-sm font-semibold text-neutral-900">Extraction Preview</h2>
                <span className="ml-auto text-[10px] text-neutral-400 font-mono">[Demo data]</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Observation ID', value: extracted.id, mono: true },
                  { label: 'Activity', value: extracted.extractedActivity ?? extracted.activityText, mono: false },
                  { label: 'Location', value: extracted.extractedLocation ?? extracted.location, mono: true },
                  { label: 'Progress', value: `${extracted.extractedProgress ?? extracted.progress}%`, mono: true },
                  { label: 'Source', value: extracted.source, mono: false },
                  { label: 'Captured', value: new Date(extracted.capturedAt).toLocaleString('en-IN'), mono: false },
                ].map(({ label, value, mono }) => (
                  <div key={label} className="flex items-start gap-3 py-2 border-b border-neutral-100 last:border-0">
                    <span className="text-xs font-semibold text-neutral-600 w-24 shrink-0 pt-0.5">{label}</span>
                    <span className={cn('text-xs text-neutral-900 flex-1', mono && 'font-mono')}>{value}</span>
                  </div>
                ))}
              </div>
              {extracted.notes && (
                <div className="mt-4 bg-neutral-50 border border-neutral-200 rounded p-3">
                  <p className="text-xs font-semibold text-neutral-600 mb-1">Field Notes (original)</p>
                  <p className="text-xs text-neutral-700 font-devanagari leading-relaxed">{extracted.notes}</p>
                </div>
              )}
              <div className="mt-4 flex gap-2">
                <Button variant="primary" size="sm" onClick={() => window.location.href = '/ai-matching'}>
                  Proceed to AI Matching
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setExtracted(null)}>
                  Reset
                </Button>
              </div>
            </Card>
          )}
          {!extracted && !loading && (
            <Card padding="md" className="border-dashed border-neutral-200">
              <div className="text-center py-8">
                <FileText size={24} strokeWidth={1.5} className="text-neutral-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-neutral-500">Extraction preview appears here</p>
                <p className="text-xs text-neutral-400 mt-1">after you submit a field observation</p>
              </div>
            </Card>
          )}

          {/* Recent DPR history */}
          <Card padding="none" className="mt-4">
            <div className="px-4 py-3 border-b border-neutral-100">
              <h2 className="text-sm font-semibold text-neutral-800">Recent Submissions</h2>
            </div>
            <div className="divide-y divide-neutral-100">
              {[
                { id: 'OBS-2024-0142', date: '20 Sep 2024, 14:00', source: 'text', status: 'recommended' },
                { id: 'OBS-2024-0141', date: '19 Sep 2024, 11:30', source: 'voice', status: 'verified' },
                { id: 'OBS-2024-0140', date: '18 Sep 2024, 09:00', source: 'pdf', status: 'needs-review' },
              ].map(({ id, date, source, status }) => (
                <div key={id} className="flex items-center gap-3 px-4 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-mono font-semibold text-primary">{id}</p>
                    <p className="text-[11px] text-neutral-500">{date} · {source}</p>
                  </div>
                  <StatusChip
                    variant={status === 'verified' ? 'success' : status === 'recommended' ? 'ai' : 'warning'}
                    label={status === 'verified' ? 'Verified' : status === 'recommended' ? 'AI Match Ready' : 'Needs Review'}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

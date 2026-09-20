import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/TopCommandBar';
import { Card, LoadingState } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusChip, matchStatusChip } from '@/components/ui/StatusChip';
import { ConfirmDialog, Modal } from '@/components/ui/Modal';
import { useDemoStore } from '@/store/demoStore';
import { MOCK_MATCHES } from '@/data/mock/matches';
import { MOCK_OBSERVATIONS } from '@/data/mock/observations';
import { cn, formatDateTime } from '@/lib/utils';
import { MapPin, Clock, User, CheckCircle2, X, ArrowRight, Cpu } from 'lucide-react';

// ============================================================
// PRAGATIPATH — AI Matching Page
// Route: /ai-matching
// Three-panel: Field Evidence | Pipeline | Suggested Activity
// ============================================================

// Confidence bar
function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 80 ? 'bg-ai' : value >= 50 ? 'bg-warning' : 'bg-neutral-300';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full transition-all duration-slow', color)} style={{ width: `${value}%` }} />
      </div>
      <span className="font-mono text-xs font-bold tabular-nums w-8 text-right text-neutral-800">{value}%</span>
    </div>
  );
}

// Pipeline step
function PipelineStep({ label, step, active }: { label: string; step: number; active: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={cn(
        'h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
        active ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-500'
      )}>
        {step}
      </div>
      <p className={cn('text-[10px] text-center leading-tight', active ? 'text-primary font-semibold' : 'text-neutral-500')}>{label}</p>
    </div>
  );
}

export default function AIMatchingPage() {
  const { matches, currentUser, confirmMatch, rejectMatch } = useDemoStore();
  const obs = MOCK_OBSERVATIONS[0];
  const matchRecord = matches.find((m) => m.observationId === obs.id) ?? matches[0];
  const activeCandidate = matchRecord.topCandidate;

  const [showConfirm, setShowConfirm] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = async () => {
    setConfirming(true);
    await new Promise((r) => setTimeout(r, 700));
    confirmMatch(matchRecord.id, currentUser?.name ?? 'Reviewer');
    setConfirming(false);
    setShowConfirm(false);
  };

  const handleReject = async () => {
    rejectMatch(matchRecord.id, rejectReason);
    setShowRejectModal(false);
    setRejectReason('');
  };

  const isVerified = matchRecord.status === 'verified';
  const isRejected = matchRecord.status === 'rejected';

  return (
    <div>
      <PageHeader
        title="AI Matching & Verification"
        subtitle="Review AI-recommended activity match and validate"
        breadcrumb={[{ label: 'PragatiPath' }, { label: 'AI Matching' }]}
      />

      {/* Three-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Panel 1: Field Evidence */}
        <div className="lg:col-span-4">
          <Card padding="none" className="h-full">
            <div className="px-4 py-3 border-b border-neutral-100 bg-neutral-50 flex items-center justify-between">
              <h2 className="text-xs font-semibold text-neutral-700 uppercase tracking-wide">Field Evidence</h2>
              <span className="font-mono text-[10px] text-neutral-400">{obs.id}</span>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <p className="text-xs font-semibold text-neutral-600 mb-1">Observation</p>
                <p className="text-sm text-neutral-800 leading-relaxed">{obs.activityText}</p>
              </div>
              {obs.notes && (
                <div className="bg-neutral-50 rounded p-3">
                  <p className="text-[10px] text-neutral-500 font-semibold mb-1 uppercase">Field note (original)</p>
                  <p className="text-xs text-neutral-700 font-devanagari">{obs.notes}</p>
                </div>
              )}
              <div className="space-y-2">
                {[
                  { Icon: MapPin, label: 'Location', value: obs.location },
                  { Icon: User, label: 'Contractor', value: obs.contractor ?? '—' },
                  { Icon: Clock, label: 'Captured', value: formatDateTime(obs.capturedAt) },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-2.5">
                    <Icon size={14} strokeWidth={1.5} className="text-neutral-400 mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-[10px] text-neutral-500">{label}</p>
                      <p className="text-xs font-mono font-medium text-neutral-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
                <span className="text-[10px] text-neutral-500">Progress stated:</span>
                <span className="font-mono text-lg font-bold tabular-nums text-neutral-900">{obs.progress}%</span>
              </div>
              <p className="text-[10px] text-neutral-400">[Demo data — simulated field observation]</p>
            </div>
          </Card>
        </div>

        {/* Panel 2: Matching Pipeline */}
        <div className="lg:col-span-4">
          <Card padding="md" className="h-full">
            <div className="flex items-center gap-2 mb-5">
              <Cpu size={16} strokeWidth={1.5} className="text-ai-on" aria-hidden="true" />
              <h2 className="text-xs font-semibold text-neutral-700 uppercase tracking-wide">Matching Pipeline</h2>
            </div>

            {/* Pipeline steps */}
            <div className="flex items-start justify-between mb-6 px-2">
              {['Field Obs', 'Normalize', 'Candidates', 'Compare', 'Recommend'].map((label, i) => (
                <React.Fragment key={label}>
                  <PipelineStep label={label} step={i + 1} active={i <= 4} />
                  {i < 4 && (
                    <div className="flex-1 h-px bg-neutral-200 mt-4 mx-1" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Match factors */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-neutral-700">Match Factors — Top Candidate</h3>
              {activeCandidate.reasons.map((r) => (
                <div key={r.factor}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-neutral-700">{r.factor}</p>
                    <span className="text-[11px] font-mono text-neutral-500">{r.score}%</span>
                  </div>
                  <ConfidenceBar value={r.score} />
                  <p className="text-[10px] text-neutral-500 mt-0.5">{r.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-700">Overall confidence</span>
                <span className="font-mono text-xl font-bold tabular-nums text-ai-on">{activeCandidate.confidence}%</span>
              </div>
              <ConfidenceBar value={activeCandidate.confidence} />
            </div>

            <p className="text-[10px] text-neutral-400 mt-3">[Demo data — confidence scores are simulated]</p>
          </Card>
        </div>

        {/* Panel 3: Suggested Activity + Actions */}
        <div className="lg:col-span-4 space-y-4">
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold text-neutral-700 uppercase tracking-wide">Suggested Activity</h2>
              <StatusChip variant={isVerified ? 'success' : isRejected ? 'critical' : 'ai'} label={isVerified ? 'Verified' : isRejected ? 'Rejected' : 'AI Recommended'} />
            </div>

            {/* Top candidate */}
            <div className="bg-ai-surface/40 border border-ai-border/40 rounded p-3 mb-4">
              <p className="font-mono text-[11px] text-ai-on font-bold mb-0.5">{activeCandidate.activityId}</p>
              <p className="text-sm font-semibold text-neutral-900 mb-2">{activeCandidate.activityName}</p>
              <div className="flex items-center gap-3 text-[11px] text-neutral-600">
                <span className="font-mono">WBS {activeCandidate.wbs}</span>
                <span>·</span>
                <span className="font-mono">{activeCandidate.location}</span>
              </div>
              <div className="mt-3">
                <ConfidenceBar value={activeCandidate.confidence} />
              </div>
            </div>

            {/* Other candidates */}
            {matchRecord.allCandidates.filter(c => c.activityId !== activeCandidate.activityId).length > 0 && (
              <div className="mb-4">
                <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wide mb-2">Other candidates</p>
                {matchRecord.allCandidates.filter(c => c.activityId !== activeCandidate.activityId).map((c) => (
                  <div key={c.activityId} className="flex items-center gap-2 py-1.5 border-b border-neutral-100 last:border-0">
                    <span className="font-mono text-[10px] text-neutral-500 w-10 shrink-0">{c.activityId}</span>
                    <span className="text-xs text-neutral-600 flex-1 truncate">{c.activityName}</span>
                    <span className="font-mono text-[11px] text-neutral-400">{c.confidence}%</span>
                  </div>
                ))}
              </div>
            )}

            {/* Verification state */}
            {isVerified && (
              <div className="bg-success-surface border border-success-border rounded p-3 mb-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <CheckCircle2 size={14} strokeWidth={1.5} className="text-success" aria-hidden="true" />
                  <p className="text-xs font-semibold text-success-on">Match Verified</p>
                </div>
                <p className="text-xs text-success-on/80">Reviewer: {matchRecord.reviewer}</p>
                <p className="text-xs font-mono text-success-on/70 mt-0.5">{matchRecord.reviewedAt ? formatDateTime(matchRecord.reviewedAt) : ''}</p>
                <p className="text-xs text-success-on mt-1.5 font-medium">Activity A101 actual progress updated to 64%.</p>
              </div>
            )}

            {isRejected && (
              <div className="bg-critical-surface border border-critical-border rounded p-3 mb-4">
                <p className="text-xs font-semibold text-critical-on mb-1">Match Rejected</p>
                <p className="text-xs text-critical-on/80">Reason: {matchRecord.rejectionReason}</p>
              </div>
            )}

            {/* Actions */}
            {!isVerified && !isRejected && (
              <div className="space-y-2">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => setShowConfirm(true)}
                  leftIcon={<CheckCircle2 size={14} strokeWidth={2} />}
                >
                  Confirm Match
                </Button>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => setShowRejectModal(true)}
                  leftIcon={<X size={14} strokeWidth={2} />}
                >
                  Reject Match
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Recent decisions table */}
      <Card padding="none" className="mt-5">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-800">Recent Matching Decisions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                {['Observation', 'Suggested Activity', 'Confidence', 'Status', 'Reviewer', 'Time'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-neutral-600 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matches.map((m) => {
                const { variant, label } = matchStatusChip(m.status);
                return (
                  <tr key={m.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-2.5"><span className="font-mono text-xs text-primary">{m.observationId}</span></td>
                    <td className="px-4 py-2.5">
                      <p className="text-xs font-medium text-neutral-800">{m.topCandidate.activityName}</p>
                      <p className="text-[11px] font-mono text-neutral-500">{m.topCandidate.activityId}</p>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={cn('font-mono text-xs font-bold tabular-nums', m.topCandidate.confidence >= 80 ? 'text-ai-on' : 'text-neutral-500')}>
                        {m.topCandidate.confidence}%
                      </span>
                    </td>
                    <td className="px-4 py-2.5"><StatusChip variant={variant} label={label} /></td>
                    <td className="px-4 py-2.5"><span className="text-xs text-neutral-700">{m.reviewer ?? '—'}</span></td>
                    <td className="px-4 py-2.5"><span className="text-xs font-mono text-neutral-500">{m.reviewedAt ? formatDateTime(m.reviewedAt) : formatDateTime(m.createdAt)}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Confirm dialog */}
      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        title="Confirm Match"
        message={`Confirm that OBS-2024-0142 maps to Activity ${activeCandidate.activityId} — ${activeCandidate.activityName}? This will update the activity's actual progress and create a permanent audit record.`}
        confirmLabel="Confirm Match"
        loading={confirming}
      />

      {/* Reject modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Reject Match"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowRejectModal(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim()}>Confirm Rejection</Button>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-sm text-neutral-700">Provide a reason for rejecting this AI match. This will be recorded in the audit trail.</p>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="e.g., Activity location does not match field description — observation is from Zone C, not Zone B."
            className="w-full h-24 rounded border border-neutral-300 text-sm p-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Rejection reason"
          />
        </div>
      </Modal>
    </div>
  );
}

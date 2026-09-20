import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ActivityStatus, MatchStatus } from '@/types';

// ============================================================
// PRAGATIPATH — StatusChip
// Always text + icon. Never color alone.
// ============================================================

type StatusVariant = 'success' | 'warning' | 'critical' | 'ai' | 'neutral' | 'info';

interface StatusChipProps {
  variant: StatusVariant;
  label: string;
  className?: string;
  size?: 'sm' | 'md';
}

const variantClasses: Record<StatusVariant, { bg: string; text: string; icon: React.ReactNode }> = {
  success: {
    bg: 'bg-success-surface border border-success-border',
    text: 'text-success-on',
    icon: <CheckCircle2 size={12} strokeWidth={1.5} />,
  },
  warning: {
    bg: 'bg-warning-surface border border-warning-border',
    text: 'text-warning-on',
    icon: <Clock size={12} strokeWidth={1.5} />,
  },
  critical: {
    bg: 'bg-critical-surface border border-critical-border',
    text: 'text-critical-on',
    icon: <XCircle size={12} strokeWidth={1.5} />,
  },
  ai: {
    bg: 'bg-ai-surface border border-ai-border',
    text: 'text-ai-on',
    icon: <Cpu size={12} strokeWidth={1.5} />,
  },
  neutral: {
    bg: 'bg-neutral-100 border border-neutral-200',
    text: 'text-neutral-700',
    icon: <Clock size={12} strokeWidth={1.5} />,
  },
  info: {
    bg: 'bg-[#EAF1FB] border border-[#A8C4E8]',
    text: 'text-[#0B3D80]',
    icon: <CheckCircle2 size={12} strokeWidth={1.5} />,
  },
};

export function StatusChip({ variant, label, className, size = 'sm' }: StatusChipProps) {
  const { bg, text, icon } = variantClasses[variant];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-semibold whitespace-nowrap',
        size === 'sm' ? 'text-[11px] leading-none px-2 py-0.5' : 'text-xs px-2.5 py-1',
        bg,
        text,
        className
      )}
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </span>
  );
}

// ============================================================
// Helpers: map domain status → StatusChip variant + label
// ============================================================

export function activityStatusChip(status: ActivityStatus) {
  const map: Record<ActivityStatus, { variant: StatusVariant; label: string }> = {
    'on-track':    { variant: 'success', label: 'On Track' },
    'completed':   { variant: 'success', label: 'Completed' },
    'pending':     { variant: 'warning', label: 'Pending' },
    'at-risk':     { variant: 'warning', label: 'At Risk' },
    'delayed':     { variant: 'critical', label: 'Delayed' },
    'not-started': { variant: 'neutral', label: 'Not Started' },
  };
  return map[status] ?? { variant: 'neutral', label: status };
}

export function matchStatusChip(status: MatchStatus) {
  const map: Record<MatchStatus, { variant: StatusVariant; label: string }> = {
    'verified':    { variant: 'success', label: 'Verified' },
    'recommended': { variant: 'ai',      label: 'AI Recommended' },
    'needs-review':{ variant: 'warning', label: 'Needs Review' },
    'rejected':    { variant: 'critical', label: 'Rejected' },
    'pending':     { variant: 'neutral', label: 'Pending' },
  };
  return map[status] ?? { variant: 'neutral', label: status };
}

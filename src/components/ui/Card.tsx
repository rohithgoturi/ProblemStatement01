import React from 'react';
import { cn } from '@/lib/utils';

// ============================================================
// PRAGATIPATH — Card
// Standard card: white + neutral-200 border + 12px radius + card shadow
// ============================================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  role?: string;
  'aria-label'?: string;
  tabIndex?: number;
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
};

export function Card({
  children,
  className,
  padding = 'md',
  onClick,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-neutral-200 rounded-md shadow-card',
        onClick && 'cursor-pointer hover:shadow-interactive transition-shadow duration-base',
        paddingClasses[padding],
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

// ============================================================
// Card Header
// ============================================================

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-between mb-3', className)}>
      {children}
    </div>
  );
}

// ============================================================
// Card Title
// ============================================================

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn('text-sm font-semibold text-neutral-900 leading-tight', className)}>
      {children}
    </h3>
  );
}

// ============================================================
// Divider
// ============================================================

export function Divider({ className }: { className?: string }) {
  return <hr className={cn('border-0 border-t border-neutral-200', className)} />;
}

// ============================================================
// Badge
// ============================================================

interface BadgeProps {
  count: number;
  className?: string;
}

export function Badge({ count, className }: BadgeProps) {
  if (count === 0) return null;
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center h-4 min-w-[16px] px-1 rounded-full',
        'bg-critical text-white text-[10px] font-semibold leading-none',
        className
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}

// ============================================================
// Skeleton
// ============================================================

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
}

export function Skeleton({ className, rounded = false }: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton-shimmer',
        rounded ? 'rounded-full' : 'rounded',
        className
      )}
      aria-hidden="true"
    />
  );
}

// ============================================================
// Loading State
// ============================================================

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12" role="status" aria-label={label}>
      <div className="h-8 w-8 rounded-full border-2 border-neutral-200 border-t-primary animate-spin" />
      <p className="text-sm text-neutral-600">{label}</p>
    </div>
  );
}

// ============================================================
// Empty State
// ============================================================

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="text-neutral-400" aria-hidden="true">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-neutral-800">{title}</p>
        {description && <p className="text-sm text-neutral-600 max-w-sm">{description}</p>}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

// ============================================================
// Inline Error
// ============================================================

export function InlineError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex items-center gap-2 p-3 bg-critical-surface border border-critical-border rounded text-critical-on text-sm" role="alert">
      <svg className="shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span className="flex-1">{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="text-xs underline hover:no-underline">
          Try again
        </button>
      )}
    </div>
  );
}

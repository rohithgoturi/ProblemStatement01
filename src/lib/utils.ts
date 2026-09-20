// ============================================================
// PRAGATIPATH — Utility: cn (className merger)
// Keeps component classes clean without external dependency.
// ============================================================

/**
 * Merges class names, filtering out falsy values.
 * Lightweight alternative to clsx/classnames for PragatiPath.
 */
export function cn(...classes: (string | undefined | null | false | 0)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ============================================================
// Formatters
// ============================================================

/** Format a progress percentage for display */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/** Format a variance with leading +/− sign */
export function formatVariance(value: number, decimals = 1): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}

/** Format an ISO date string to display format */
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/** Format timestamp to compact display */
export function formatDateTime(isoString: string): string {
  return new Date(isoString).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/** Returns "today", "yesterday", or the formatted date */
export function formatRelativeDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  return formatDate(isoString);
}

/** Simulates async delay for mock services */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Get variance color class (Tailwind) */
export function varianceColorClass(variance: number): string {
  if (variance >= 0) return 'text-success-on';
  if (variance >= -5) return 'text-warning-on';
  return 'text-critical-on';
}

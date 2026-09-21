/**
 * PragatiPath — Utility Helpers
 */

// ---- Date Formatting ----

/**
 * Format date string to readable format
 * @param {string} dateStr
 * @param {string} format - 'short' | 'medium' | 'long'
 */
export function formatDate(dateStr, format = 'medium') {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (isNaN(date)) return '—';

  const opts = {
    short:  { day: '2-digit', month: 'short' },
    medium: { day: '2-digit', month: 'short', year: 'numeric' },
    long:   { day: '2-digit', month: 'long',  year: 'numeric' },
  };

  return date.toLocaleDateString('en-IN', opts[format] || opts.medium);
}

/**
 * Format datetime string to readable format
 */
export function formatDateTime(dateTimeStr) {
  if (!dateTimeStr) return '—';
  const date = new Date(dateTimeStr);
  return date.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

/**
 * Time ago from now
 */
export function timeAgo(dateStr) {
  const date = new Date(dateStr);
  const now  = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ---- Number Formatting ----

export function formatNumber(n, decimals = 0) {
  if (n == null) return '—';
  return Number(n).toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(n, decimals = 0) {
  if (n == null) return '—';
  return `${Number(n).toFixed(decimals)}%`;
}

// ---- Status Helpers ----

export const STATUS_CONFIG = {
  on_track:    { label: 'On Track',    color: 'status-green',  bg: 'status-green-bg' },
  in_progress: { label: 'In Progress', color: 'status-blue',   bg: 'status-blue-bg' },
  delayed:     { label: 'Delayed',     color: 'status-orange', bg: 'status-orange-bg' },
  critical:    { label: 'Critical',    color: 'status-red',    bg: 'status-red-bg' },
  completed:   { label: 'Completed',   color: 'status-green',  bg: 'status-green-bg' },
  not_started: { label: 'Not Started', color: 'status-gray',   bg: 'status-gray-bg' },
  upcoming:    { label: 'Upcoming',    color: 'status-purple', bg: 'status-purple-bg' },

  // DPR statuses
  ai_matched:         { label: 'AI Matched',      color: 'status-green',  bg: 'status-green-bg' },
  pending_review:     { label: 'Pending Review',  color: 'status-orange', bg: 'status-orange-bg' },
  pending_extraction: { label: 'Processing',      color: 'status-blue',   bg: 'status-blue-bg' },
  rejected:           { label: 'Rejected',        color: 'status-red',    bg: 'status-red-bg' },

  // Approval statuses
  approved: { label: 'Approved', color: 'status-green',  bg: 'status-green-bg' },
  pending:  { label: 'Pending',  color: 'status-orange', bg: 'status-orange-bg' },
};

export function getStatusConfig(status) {
  return STATUS_CONFIG[status] || { label: status, color: 'status-gray', bg: 'status-gray-bg' };
}

// ---- Class name helper ----
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// ---- Progress color ----
export function getProgressColor(actual, planned) {
  if (actual >= planned)               return 'bg-status-green';
  if (actual >= planned - 10)          return 'bg-status-orange';
  return 'bg-status-red';
}

// ---- Confidence color ----
export function getConfidenceColor(confidence) {
  if (confidence >= 85) return 'text-status-green';
  if (confidence >= 60) return 'text-status-orange';
  return 'text-status-red';
}

// ---- File size formatting ----
export function formatFileSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024)        return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ---- Truncate text ----
export function truncate(str, maxLength = 50) {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '…';
}

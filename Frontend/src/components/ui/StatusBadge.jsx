/**
 * StatusBadge — Color-coded status chip
 */
import { cn, getStatusConfig } from '../../utils/helpers';

const statusTailwindMap = {
  'status-green':  { text: 'text-green-700',   bg: 'bg-green-50',   border: 'border-green-200', dot: 'bg-green-500' },
  'status-orange': { text: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200', dot: 'bg-amber-500' },
  'status-red':    { text: 'text-red-700',     bg: 'bg-red-50',     border: 'border-red-200',   dot: 'bg-red-500' },
  'status-blue':   { text: 'text-blue-700',    bg: 'bg-blue-50',    border: 'border-blue-200',  dot: 'bg-blue-500' },
  'status-purple': { text: 'text-violet-700',  bg: 'bg-violet-50',  border: 'border-violet-200',dot: 'bg-violet-500' },
  'status-gray':   { text: 'text-slate-600',   bg: 'bg-slate-50',   border: 'border-slate-200', dot: 'bg-slate-400' },
};

/**
 * @param {string} status - status key (on_track, delayed, completed, etc.)
 * @param {string} [label] - optional override label
 * @param {boolean} [dot] - show leading dot
 * @param {'sm'|'md'} [size]
 */
export function StatusBadge({ status, label, dot = true, size = 'sm', className = '' }) {
  const config = getStatusConfig(status);
  const styles = statusTailwindMap[config.color] || statusTailwindMap['status-gray'];

  const sizeClass = size === 'md'
    ? 'px-2.5 py-1 text-xs font-medium rounded-md'
    : 'px-2 py-0.5 text-xs font-medium rounded';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border',
        styles.text, styles.bg, styles.border,
        sizeClass,
        className,
      )}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', styles.dot)} />
      )}
      {label || config.label}
    </span>
  );
}

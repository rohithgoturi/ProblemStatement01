/**
 * ProgressBar — Horizontal progress with optional planned marker
 */
import { cn, formatPercent } from '../../utils/helpers';

/**
 * @param {number} actual - actual progress %
 * @param {number} [planned] - planned progress % (shows marker)
 * @param {'sm'|'md'|'lg'} [size]
 * @param {string} [color] - override fill color class
 * @param {boolean} [showLabel]
 * @param {boolean} [showPlannedMarker]
 */
export function ProgressBar({
  actual = 0,
  planned,
  size = 'md',
  color,
  showLabel = false,
  showPlannedMarker = false,
  className = '',
}) {
  const clamped = Math.max(0, Math.min(100, actual));

  const sizeHeight = {
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2.5',
  };

  // Determine fill color based on actual vs planned
  let fillColor = color;
  if (!fillColor) {
    if (planned == null)          fillColor = 'bg-brand-blue';
    else if (actual >= planned)   fillColor = 'bg-status-green';
    else if (actual >= planned - 10) fillColor = 'bg-status-orange';
    else                          fillColor = 'bg-status-red';
  }

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-ink-muted">Progress</span>
          <span className="text-xs font-semibold text-ink-primary">{formatPercent(clamped)}</span>
        </div>
      )}
      <div className={cn('w-full bg-surface-muted rounded-full overflow-hidden relative', sizeHeight[size] || sizeHeight.md)}>
        <div
          className={cn('h-full rounded-full transition-all duration-300', fillColor)}
          style={{ width: `${clamped}%` }}
        />
        {showPlannedMarker && planned != null && (
          <div
            className="absolute top-0 h-full w-0.5 bg-ink-muted/60"
            style={{ left: `${Math.min(100, planned)}%` }}
            title={`Planned: ${formatPercent(planned)}`}
          />
        )}
      </div>
    </div>
  );
}

/**
 * ProgressRing — Circular progress indicator
 */
export function ProgressRing({ actual = 0, size = 56, strokeWidth = 5, color = '#2563eb' }) {
  const clamped = Math.max(0, Math.min(100, actual));
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-500"
      />
    </svg>
  );
}

/**
 * StatCard — KPI stat card with icon, value, label, trend
 */
import { cn } from '../../utils/helpers';

/**
 * @param {string} label
 * @param {string|number} value
 * @param {ReactNode} icon
 * @param {string} [trend] - e.g. "+5 from last week"
 * @param {'positive'|'negative'|'neutral'} [trendType]
 * @param {string} [color] - accent color class for icon background
 * @param {string} [subvalue] - secondary value/label below main value
 */
export function StatCard({
  label,
  value,
  icon,
  trend,
  trendType = 'neutral',
  color = 'bg-brand-blue-xlight text-brand-blue',
  subvalue,
  className = '',
  onClick,
}) {
  const trendColors = {
    positive: 'text-status-green',
    negative: 'text-status-red',
    neutral:  'text-ink-muted',
  };

  return (
    <div
      className={cn(
        'bg-white border border-surface-border rounded-lg p-5 flex flex-col gap-3',
        onClick && 'cursor-pointer card-hover',
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1">{label}</p>
          <p className="text-2xl font-bold text-ink-primary">{value}</p>
          {subvalue && (
            <p className="text-xs text-ink-muted mt-0.5">{subvalue}</p>
          )}
        </div>
        {icon && (
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0', color)}>
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <p className={cn('text-xs font-medium', trendColors[trendType] || trendColors.neutral)}>
          {trend}
        </p>
      )}
    </div>
  );
}

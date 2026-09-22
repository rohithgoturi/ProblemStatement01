/**
 * StatCard — KPI stat card with icon, value, label, trend
 * Styled with Clienter-inspired warm rounded-3xl cards, dark bold numbers, and orange accents.
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
  color = 'bg-[#FF5500]/10 text-[#FF5500]',
  subvalue,
  className = '',
  onClick,
}) {
  const trendColors = {
    positive: 'text-emerald-700 bg-emerald-50 border border-emerald-200',
    negative: 'text-rose-700 bg-rose-50 border border-rose-200',
    neutral:  'text-stone-600 bg-stone-50 border border-stone-200',
  };

  return (
    <div
      className={cn(
        'bg-white border border-[#E8E1D5] rounded-3xl p-5 flex flex-col justify-between gap-3 shadow-2xs hover:shadow-xs transition-all',
        onClick && 'cursor-pointer hover:border-[#FF5500]/40',
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">{label}</p>
          <p className="text-2xl sm:text-3xl font-black text-[#0B1320] tracking-tight">{value}</p>
          {subvalue && (
            <p className="text-xs text-stone-500 mt-1">{subvalue}</p>
          )}
        </div>
        {icon && (
          <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-2xs', color)}>
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="pt-2 border-t border-stone-100 flex items-center">
          <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded-full inline-block', trendColors[trendType] || trendColors.neutral)}>
            {trend}
          </span>
        </div>
      )}
    </div>
  );
}

export default StatCard;

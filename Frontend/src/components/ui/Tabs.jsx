/**
 * Tabs — Tab switcher with indicator underline
 */
import { cn } from '../../utils/helpers';

/**
 * @param {Array<{id: string, label: string, icon?: ReactNode, badge?: number}>} tabs
 * @param {string} activeTab
 * @param {function} onTabChange
 * @param {'underline'|'pill'} [variant]
 * @param {'sm'|'md'} [size]
 */
export function Tabs({ tabs = [], activeTab, onTabChange, variant = 'underline', size = 'md', className = '' }) {
  const isActive = (id) => id === activeTab;

  if (variant === 'pill') {
    return (
      <div className={cn('flex items-center gap-1 p-1 bg-surface-muted rounded-lg', className)}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-150',
              isActive(tab.id)
                ? 'bg-white text-ink-primary shadow-card'
                : 'text-ink-muted hover:text-ink-secondary',
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.badge != null && (
              <span className={cn(
                'ml-0.5 min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full flex items-center justify-center',
                isActive(tab.id) ? 'bg-brand-blue text-white' : 'bg-surface-border text-ink-muted',
              )}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // Underline variant (default)
  return (
    <div className={cn('flex items-end border-b border-surface-border', className)}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex items-center gap-1.5 pb-3 transition-all duration-150 border-b-2 -mb-px',
            size === 'sm' ? 'px-3 text-xs font-medium' : 'px-4 text-sm font-medium',
            isActive(tab.id)
              ? 'border-brand-blue text-brand-blue'
              : 'border-transparent text-ink-muted hover:text-ink-secondary hover:border-surface-border-strong',
          )}
        >
          {tab.icon}
          {tab.label}
          {tab.badge != null && (
            <span className={cn(
              'min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full flex items-center justify-center',
              isActive(tab.id) ? 'bg-brand-blue text-white' : 'bg-surface-muted text-ink-muted',
            )}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/**
 * PageHeader — Top section of each page with title, breadcrumbs, and actions
 */
import { MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/helpers';

/**
 * @param {string} title
 * @param {string} [subtitle]
 * @param {Array<{label: string, path?: string}>} [breadcrumbs]
 * @param {ReactNode} [actions] - right-side action buttons
 * @param {ReactNode} [meta] - additional metadata below title
 */
export function PageHeader({ title, subtitle, breadcrumbs, actions, meta, className = '' }) {
  return (
    <div className={cn('mb-6', className)}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 mb-2 text-xs text-ink-muted">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <MdChevronRight size={14} className="text-ink-disabled" />}
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-brand-blue transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-ink-primary font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Title row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink-primary leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-ink-muted mt-0.5">{subtitle}</p>
          )}
          {meta && <div className="mt-2">{meta}</div>}
        </div>
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * SectionHeader — Section-level heading within a page
 */
export function SectionHeader({ title, subtitle, actions, className = '' }) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <div>
        <h2 className="text-sm font-semibold text-ink-primary">{title}</h2>
        {subtitle && <p className="text-xs text-ink-muted mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/**
 * ChartCard — Wrapper card for chart sections
 */
export function ChartCard({ title, subtitle, actions, children, className = '' }) {
  return (
    <div className={cn('bg-white border border-surface-border rounded-lg', className)}>
      <div className="px-5 py-4 border-b border-surface-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-ink-primary">{title}</h3>
          {subtitle && <p className="text-xs text-ink-muted mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}

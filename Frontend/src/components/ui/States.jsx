/**
 * EmptyState, LoadingState, ErrorState — Standard feedback states
 */
import {
  MdInboxOutlined,
  MdErrorOutline,
  MdRefresh,
} from 'react-icons/md';
import { Button } from './Button';
import { cn } from '../../utils/helpers';

export function EmptyState({
  icon,
  title = 'No data found',
  description,
  action,
  className = '',
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="w-14 h-14 rounded-full bg-surface-muted flex items-center justify-center mb-4 text-ink-muted text-2xl">
        {icon || <MdInboxOutlined size={28} />}
      </div>
      <h3 className="text-sm font-semibold text-ink-primary mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-ink-muted max-w-xs">{description}</p>
      )}
      {action && (
        <div className="mt-4">{action}</div>
      )}
    </div>
  );
}

export function LoadingState({ rows = 5, className = '' }) {
  return (
    <div className={cn('space-y-3 p-4', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="skeleton w-8 h-8 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-3 w-3/4 rounded" />
            <div className="skeleton h-2.5 w-1/2 rounded" />
          </div>
          <div className="skeleton h-5 w-16 rounded" />
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ className = '' }) {
  return (
    <div className={cn('bg-white border border-surface-border rounded-lg p-5 space-y-3', className)}>
      <div className="skeleton h-3 w-1/3 rounded" />
      <div className="skeleton h-8 w-1/2 rounded" />
      <div className="skeleton h-2.5 w-full rounded" />
      <div className="skeleton h-2.5 w-3/4 rounded" />
    </div>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  description,
  onRetry,
  className = '',
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4 text-status-red text-2xl">
        <MdErrorOutline size={28} />
      </div>
      <h3 className="text-sm font-semibold text-ink-primary mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-ink-muted max-w-xs mb-4">{description}</p>
      )}
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<MdRefresh size={16} />}
        >
          Try again
        </Button>
      )}
    </div>
  );
}

export function InlineLoader({ size = 'md', className = '' }) {
  const sizeStyle = size === 'sm' ? 'w-4 h-4 border-2' : 'w-6 h-6 border-2';
  return (
    <span className={cn('inline-block rounded-full border-brand-blue border-t-transparent animate-spin', sizeStyle, className)} />
  );
}

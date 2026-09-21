/**
 * Button — PragatiPath primary interactive element
 * Variants: primary | secondary | ghost | danger | outline
 * Sizes: sm | md | lg
 */
import { cn } from '../../utils/helpers';

const variantStyles = {
  primary:   'bg-brand-blue text-white hover:bg-brand-blue-mid border border-brand-blue hover:border-brand-blue-mid active:bg-brand-navy active:border-brand-navy',
  secondary: 'bg-brand-blue-light text-brand-blue hover:bg-blue-100 border border-brand-blue-light hover:border-blue-200',
  outline:   'bg-white text-ink-primary border border-surface-border hover:bg-surface-muted hover:border-surface-border-strong',
  ghost:     'bg-transparent text-ink-secondary border border-transparent hover:bg-surface-muted hover:text-ink-primary',
  danger:    'bg-status-red text-white hover:bg-red-700 border border-status-red hover:border-red-700 active:bg-red-800',
  success:   'bg-status-green text-white hover:bg-green-700 border border-status-green',
};

const sizeStyles = {
  sm:  'px-3 py-1.5 text-xs font-medium rounded gap-1.5 h-7',
  md:  'px-4 py-2 text-sm font-medium rounded-md gap-2 h-9',
  lg:  'px-5 py-2.5 text-sm font-semibold rounded-md gap-2 h-10',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-1 select-none',
        variantStyles[variant] || variantStyles.primary,
        sizeStyles[size] || sizeStyles.md,
        isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0" />
      )}
      {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
}

export function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}) {
  const sizeIconStyles = {
    sm: 'w-7 h-7 rounded text-sm',
    md: 'w-9 h-9 rounded-md text-base',
    lg: 'w-10 h-10 rounded-md text-lg',
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue select-none flex-shrink-0',
        variantStyles[variant] || variantStyles.ghost,
        sizeIconStyles[size] || sizeIconStyles.md,
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
}

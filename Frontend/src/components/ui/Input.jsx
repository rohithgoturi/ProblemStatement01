/**
 * Input — Text, password, search input components
 */
import { useState } from 'react';
import { MdVisibility, MdVisibilityOff, MdSearch, MdClose } from 'react-icons/md';
import { cn } from '../../utils/helpers';

const sizeStyles = {
  sm: 'h-8 px-3 text-xs rounded',
  md: 'h-9 px-3 text-sm rounded-md',
  lg: 'h-11 px-4 text-sm rounded-md',
};

const baseInputClass = 'w-full bg-white border border-surface-border text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-muted';

export function Input({
  type = 'text',
  size = 'md',
  label,
  hint,
  error,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-ink-primary mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-base pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          className={cn(
            baseInputClass,
            sizeStyles[size] || sizeStyles.md,
            leftIcon  && 'pl-9',
            rightIcon && 'pr-9',
            error && 'border-status-red focus:border-status-red focus:ring-status-red/20',
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted text-base">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-status-red">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}

export function PasswordInput({ size = 'md', label, hint, error, className = '', ...props }) {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-ink-primary mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          className={cn(
            baseInputClass,
            sizeStyles[size] || sizeStyles.md,
            'pr-10',
            error && 'border-status-red focus:border-status-red focus:ring-status-red/20',
            className,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-secondary transition-colors"
          tabIndex={-1}
        >
          {show ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-status-red">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
  size = 'md',
  onClear,
  className = '',
  ...props
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none">
        <MdSearch size={18} />
      </span>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          baseInputClass,
          sizeStyles[size] || sizeStyles.md,
          'pl-9',
          value && onClear && 'pr-8',
          className,
        )}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-primary transition-colors"
        >
          <MdClose size={16} />
        </button>
      )}
    </div>
  );
}

export function Select({ label, error, hint, size = 'md', className = '', children, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-ink-primary mb-1.5">
          {label}
        </label>
      )}
      <select
        className={cn(
          baseInputClass,
          sizeStyles[size] || sizeStyles.md,
          'cursor-pointer appearance-none pr-8 bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3E%3Cpath fill=\'%2394a3b8\' d=\'M4.5 6L8 9.5 11.5 6\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_0.5rem_center] bg-[length:1rem]',
          error && 'border-status-red',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-status-red">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}

export function Textarea({ label, error, hint, className = '', rows = 4, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-ink-primary mb-1.5">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={cn(
          baseInputClass,
          'px-3 py-2.5 text-sm rounded-md resize-y min-h-[80px]',
          error && 'border-status-red focus:border-status-red',
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-status-red">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}

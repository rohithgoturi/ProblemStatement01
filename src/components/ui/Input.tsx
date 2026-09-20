import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================
// PRAGATIPATH — Input Components
// ============================================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  required?: boolean;
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightElement,
  className,
  id,
  required,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-neutral-800 uppercase tracking-wide"
        >
          {label}
          {required && <span className="text-critical ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-neutral-500 pointer-events-none flex items-center" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          aria-invalid={error ? 'true' : undefined}
          className={cn(
            'w-full h-10 rounded bg-white border text-sm text-neutral-900 placeholder:text-neutral-500',
            'transition-colors duration-fast',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:border-primary',
            leftIcon ? 'pl-9' : 'pl-3',
            rightElement ? 'pr-10' : 'pr-3',
            error
              ? 'border-critical-border bg-critical-surface'
              : 'border-neutral-300 hover:border-neutral-400',
            'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {rightElement && (
          <span className="absolute right-3 flex items-center">{rightElement}</span>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-critical-on" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-neutral-600">
          {hint}
        </p>
      )}
    </div>
  );
}

// ============================================================
// Password Input
// ============================================================

export function PasswordInput(props: Omit<InputProps, 'type' | 'rightElement'>) {
  const [show, setShow] = useState(false);
  return (
    <Input
      {...props}
      type={show ? 'text' : 'password'}
      rightElement={
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="text-neutral-500 hover:text-neutral-700 transition-colors focus:outline-none"
        >
          {show ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
        </button>
      }
    />
  );
}

// ============================================================
// Search Input
// ============================================================

interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'type'> {
  onClear?: () => void;
}

export function SearchInput({ value, onClear, ...props }: SearchInputProps) {
  return (
    <Input
      {...props}
      type="search"
      value={value}
      leftIcon={
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      }
    />
  );
}

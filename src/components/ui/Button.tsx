import React from 'react';
import { cn } from '@/lib/utils';

// ============================================================
// PRAGATIPATH — Button Component
// Variants: primary | secondary | destructive | ghost
// Sizes: sm | md | lg
// ============================================================

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-primary text-white',
    'hover:bg-[#004BB8] active:bg-[#003A92]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    'disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed',
  ].join(' '),
  secondary: [
    'bg-white text-neutral-900 border border-neutral-300',
    'hover:bg-neutral-50 hover:border-neutral-400 active:bg-neutral-100',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:border-neutral-200 disabled:cursor-not-allowed',
  ].join(' '),
  destructive: [
    'bg-critical-surface text-critical-on border border-critical-border',
    'hover:bg-[#FBDCDB] active:bg-[#F9CAC8]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-critical',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),
  ghost: [
    'text-neutral-700 bg-transparent',
    'hover:bg-neutral-100 active:bg-neutral-200',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    'disabled:text-neutral-400 disabled:cursor-not-allowed',
  ].join(' '),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs font-semibold gap-1.5',
  md: 'h-10 px-4 text-sm font-semibold gap-2',
  lg: 'h-12 px-6 text-base font-semibold gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded transition-colors duration-fast select-none',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span
          className={cn(
            'inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin',
            'mr-1.5'
          )}
          aria-hidden="true"
        />
      ) : leftIcon ? (
        <span className="shrink-0 flex items-center" aria-hidden="true">{leftIcon}</span>
      ) : null}
      {children}
      {rightIcon && !loading && (
        <span className="shrink-0 flex items-center" aria-hidden="true">{rightIcon}</span>
      )}
    </button>
  );
}

// ============================================================
// Icon Button
// ============================================================

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function IconButton({
  size = 'md',
  variant = 'secondary',
  className,
  ...props
}: IconButtonProps) {
  const sizeIconClasses: Record<ButtonSize, string> = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded transition-colors duration-fast',
        variantClasses[variant],
        sizeIconClasses[size],
        className
      )}
      {...props}
    />
  );
}

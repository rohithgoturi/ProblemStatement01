/**
 * PageHeader — Global Standardized Page Header Component for PragatiPath
 *
 * Clienter-inspired dark navy surface, subtle technical grid overlay,
 * signature orange icon container, white bold typography, and pill actions.
 */
import React from 'react';
import { cn } from '../../utils/helpers';

export function PageHeader({
  title,
  subtitle,
  icon,
  actions,
  children,
  className = '',
}) {
  const rightControls = actions || children;

  return (
    <div
      className={cn(
        'relative w-full min-h-[128px] rounded-3xl px-6 sm:px-8 py-5 sm:py-6',
        'bg-[#0B1320] text-white',
        'shadow-md border border-white/10 overflow-hidden',
        'flex flex-col md:flex-row md:items-center justify-between gap-4',
        'transition-all duration-200',
        className
      )}
    >
      {/* Subtle background technical grid overlay */}
      <div className="absolute inset-0 bg-technical-grid opacity-20 pointer-events-none rounded-3xl" />

      {/* Left Section: Icon Container + Title & Subtitle */}
      <div className="relative z-10 flex items-center gap-5 min-w-0">
        {/* Icon Container with signature orange accent */}
        {icon && (
          <div className="w-14 h-14 rounded-2xl bg-[#FF5500]/15 border border-[#FF5500]/30 flex items-center justify-center text-[#FF5500] text-2xl shrink-0 shadow-sm">
            {icon}
          </div>
        )}

        {/* Title Content */}
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm font-normal text-stone-300 leading-normal mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Section: Page-Specific Controls / Actions */}
      {rightControls && (
        <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto">
          {rightControls}
        </div>
      )}
    </div>
  );
}

export default PageHeader;

/**
 * PageHeader — Global Standardized Page Header Component for PragatiPath
 *
 * Canonical Reference: Reports & Export Screen Header
 *
 * Strict Design Specifications:
 * - Background: #3158C9 to #3F63D5 linear blue gradient
 * - Border radius: 20px (rounded-[20px])
 * - Minimum height: 138px (min-h-[138px])
 * - Horizontal padding: 32px (px-6 sm:px-8), Vertical: py-5 sm:py-6
 * - Icon container: 58px x 58px, rounded-[16px], bg-white/15, border 1px solid rgba(255,255,255,0.20)
 * - Gap between icon and title: 20px (gap-5)
 * - Title: 24-28px (text-2xl sm:text-[26px]), font-bold (700), #FFFFFF
 * - Subtitle: 15-17px (text-[15px]), font-normal (400-500), rgba(255,255,255,0.80)
 * - Vertical alignment: Perfectly centered flex container
 * - Responsive: Stacks cleanly on smaller screens while preserving identical visual identity
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
        'w-full min-h-[138px] rounded-[20px] px-6 sm:px-8 py-5 sm:py-6',
        'bg-gradient-to-r from-[#3158C9] to-[#3F63D5]',
        'shadow-[0_4px_20px_rgba(49,88,201,0.18)] border border-[#4870E8]/30',
        'flex flex-col md:flex-row md:items-center justify-between gap-4',
        'transition-all duration-200',
        className
      )}
    >
      {/* Left Section: Icon Container + Title & Subtitle */}
      <div className="flex items-center gap-5 min-w-0">
        {/* Icon Container: 58px x 58px, 16px radius, translucent white with border */}
        {icon && (
          <div className="w-[58px] h-[58px] rounded-[16px] bg-white/15 border border-white/20 flex items-center justify-center text-white text-[28px] shrink-0 backdrop-blur-xs shadow-xs">
            {icon}
          </div>
        )}

        {/* Title Content */}
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[15px] font-normal text-white/80 leading-normal mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Section: Page-Specific Controls / Actions */}
      {rightControls && (
        <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto">
          {rightControls}
        </div>
      )}
    </div>
  );
}

// Export both PageHeader and PageHero as aliases for full backward compatibility
export const PageHero = PageHeader;
export default PageHeader;

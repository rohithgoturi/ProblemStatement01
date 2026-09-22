/**
 * PragatiPath — Official Brand Identity & Logo System
 * Architectural Direction: ORANGE (#FF5500) + BLACK/NAVY (#0B1320) on clean WHITE background.
 * Civil infrastructure-focused: Interlocking structural baseline, ascending road path, and milestone chevron.
 * Ultra-crisp vector rendering across all sizes, from 18px favicons to 64px hero displays.
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Standalone Icon Mark (Crisp Vector Emblem with White Background)
 * Represents a civil infrastructure bridge viaduct and advancing progress path.
 */
export function PragatiPathIcon({
  size = 36,
  className = '',
  rounded = true,
  alt = 'PragatiPath Logo',
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 select-none overflow-hidden bg-white border border-[#E8E1D5] shadow-xs ${
        rounded ? 'rounded-[24%]' : 'rounded-lg'
      } ${className}`}
      title={alt}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[78%] h-[78%] transition-transform duration-200 hover:scale-105"
      >
        {/* Structural Charcoal Base Tier (Foundation Baseline) */}
        <path
          d="M8 38L22 38L27 28L13 28L8 38Z"
          fill="#0B1320"
        />
        {/* Ascending Orange Progress Highway / Viaduct Chevron */}
        <path
          d="M17 26L31 26L38 12L24 12L17 26Z"
          fill="#FF5500"
        />
        {/* Dynamic Forward Alignment Node (Orange + White Accent) */}
        <circle cx="34" cy="33" r="4.5" fill="#FF5500" />
        <circle cx="34" cy="33" r="2" fill="#FFFFFF" />
        {/* Subtle Civil Center Milestone Notch */}
        <path
          d="M20 22L24 14"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2 2"
        />
      </svg>
    </div>
  );
}

/**
 * Full Logo with bold PRAGATIPATH wordmark
 */
export function Logo({
  size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant = 'primary', // 'primary' | 'white' | 'dark' | 'orange' | 'reversed'
  to = '/',
  showWordmark = true,
  className = '',
}) {
  const sizeConfig = {
    xs: { icon: 24, text: 'text-sm font-black', sub: 'text-[8px]', gap: 'gap-2' },
    sm: { icon: 32, text: 'text-base font-black', sub: 'text-[9px]', gap: 'gap-2.5' },
    md: { icon: 40, text: 'text-lg font-black', sub: 'text-[10px]', gap: 'gap-3' },
    lg: { icon: 50, text: 'text-2xl font-black', sub: 'text-xs', gap: 'gap-3.5' },
    xl: { icon: 64, text: 'text-3xl font-black', sub: 'text-sm', gap: 'gap-4' },
  };

  const current = sizeConfig[size] || sizeConfig.md;

  const wordmarkColors = {
    // Light backgrounds (Cream #FAF8F5, White) -> Deep black/navy Pragati + Orange Path
    primary: {
      pragati: 'text-[#0B1320]',
      path: 'text-[#FF5500]',
      tagline: 'text-[#64748B]',
    },
    dark: {
      pragati: 'text-[#0B1320]',
      path: 'text-[#FF5500]',
      tagline: 'text-[#64748B]',
    },
    orange: {
      pragati: 'text-[#0B1320]',
      path: 'text-[#FF5500]',
      tagline: 'text-[#64748B]',
    },
    // Dark backgrounds (Navy #0B1320, Sidebar, Footer) -> Crisp White Pragati + Orange Path
    white: {
      pragati: 'text-white',
      path: 'text-[#FF5500]',
      tagline: 'text-stone-300',
    },
    reversed: {
      pragati: 'text-white',
      path: 'text-[#FF5500]',
      tagline: 'text-stone-300',
    },
    'dark-bg': {
      pragati: 'text-white',
      path: 'text-[#FF5500]',
      tagline: 'text-stone-300',
    },
    // On-orange banner
    'on-orange': {
      pragati: 'text-white',
      path: 'text-[#0B1320]',
      tagline: 'text-white/80',
    },
    monochrome: {
      pragati: 'text-[#0B1320]',
      path: 'text-[#0B1320]',
      tagline: 'text-stone-600',
    },
  }[variant] || {
    pragati: 'text-[#0B1320]',
    path: 'text-[#FF5500]',
    tagline: 'text-[#64748B]',
  };

  const content = (
    <div className={`inline-flex items-center ${current.gap} select-none group ${className}`}>
      {/* Official Brand Icon on White Ground */}
      <PragatiPathIcon
        size={current.icon}
        className="group-hover:scale-105 transition-transform duration-200"
      />

      {/* Brand Wordmark: PRAGATIPATH */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline tracking-tight">
            <span className={`${current.text} ${wordmarkColors.pragati} tracking-[-0.03em]`}>
              PRAGATI
            </span>
            <span className={`${current.text} ${wordmarkColors.path} tracking-[-0.02em] ml-0.5`}>
              PATH
            </span>
          </div>
          <span className={`${current.sub} font-bold uppercase tracking-[0.15em] ${wordmarkColors.tagline} mt-0.5`}>
            Progress Intelligence
          </span>
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block transition-opacity hover:opacity-95 focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;

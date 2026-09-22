/**
 * PragatiPath — Official Brand Identity & Logo System
 * Uses the primary brand logo asset with correct proportions, aspect-ratio,
 * and high-fidelity rendering across all sizes and contexts.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import brandLogo from '../../assets/pragatipath-logo.png';

/**
 * Standalone Icon Mark (Rounded squircle emblem)
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
      className={`relative inline-flex items-center justify-center shrink-0 select-none overflow-hidden ${
        rounded ? 'rounded-[22%]' : ''
      } ${className}`}
    >
      <img
        src={brandLogo}
        alt={alt}
        className="w-full h-full object-cover object-center transition-transform duration-200 hover:scale-105"
        loading="eager"
      />
    </div>
  );
}

/**
 * Full Logo with optional wordmark
 */
export function Logo({
  size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant = 'primary', // 'primary' | 'monochrome' | 'reversed'
  to = '/',
  showWordmark = true,
  className = '',
}) {
  const sizeConfig = {
    xs: { icon: 24, text: 'text-base', sub: 'text-[8px]', gap: 'gap-2' },
    sm: { icon: 32, text: 'text-lg', sub: 'text-[9px]', gap: 'gap-2.5' },
    md: { icon: 40, text: 'text-xl', sub: 'text-[10px]', gap: 'gap-3' },
    lg: { icon: 50, text: 'text-2xl', sub: 'text-xs', gap: 'gap-3.5' },
    xl: { icon: 64, text: 'text-3xl', sub: 'text-sm', gap: 'gap-4' },
  };

  const current = sizeConfig[size] || sizeConfig.md;

  const wordmarkColors = {
    // Light backgrounds (cream #FAF8F5, white)
    primary: {
      pragati: 'text-[#0B1320]',
      path: 'text-[#FF5500]',
      tagline: 'text-stone-500',
    },
    dark: {
      pragati: 'text-[#0B1320]',
      path: 'text-[#FF5500]',
      tagline: 'text-stone-500',
    },
    orange: {
      pragati: 'text-[#0B1320]',
      path: 'text-[#FF5500]',
      tagline: 'text-stone-500',
    },
    // Dark backgrounds (near-black #0B1320, sidebar, footer)
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
    // Orange hero / highlight cards
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
    tagline: 'text-stone-500',
  };

  const content = (
    <div className={`inline-flex items-center ${current.gap} select-none group ${className}`}>
      {/* Official Brand Icon */}
      <PragatiPathIcon
        size={current.icon}
        className="shadow-xs group-hover:scale-105 transition-transform duration-200"
      />

      {/* Brand Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline tracking-tight">
            <span className={`${current.text} font-black ${wordmarkColors.pragati} tracking-[-0.03em]`}>
              Pragati
            </span>
            <span className={`${current.text} font-black ${wordmarkColors.path} tracking-[-0.02em] ml-0.5`}>
              Path
            </span>
          </div>
          <span className={`${current.sub} font-bold uppercase tracking-[0.14em] ${wordmarkColors.tagline} mt-0.5`}>
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

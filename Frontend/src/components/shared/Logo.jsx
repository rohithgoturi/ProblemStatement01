/**
 * PragatiPath — Proprietary Brand Identity & Geometric Logo System
 *
 * CONCEPT: "A project moving from plan → progress → completion."
 * - Three interlocking geometric segments:
 *   1. Foundation / Plan (Deep Navy #0B192C): The grounded baseline and WBS structure.
 *   2. Ascent / Progress (Vibrant Project Blue #0056D2): The active execution conduit stepping upward.
 *   3. Apex / Completion (Electric Sky Blue #38BDF8 with emerald terminal accent): The achieved milestone.
 * - Negative space forms an architectural gateway/path embedded directly within the structural framework.
 * - Subtly renders the monogram "P" while forming a continuous upward ascending path.
 * - Scales cleanly from 16x16 favicon to large presentation sizing.
 *
 * VARIATIONS:
 * 1. Primary: Color icon + customized PragatiPath wordmark
 * 2. Standalone: Icon only (at any requested size)
 * 3. Monochrome: Uniform dark ink for high-contrast B&W documents
 * 4. Reversed: Pure white/translucent for dark navy/slate backgrounds
 */
import React from 'react';
import { Link } from 'react-router-dom';

export function PragatiPathIcon({
  size = 36,
  variant = 'primary', // 'primary' | 'monochrome' | 'reversed'
  className = '',
}) {
  // Color tokens per variation
  const colors = {
    primary: {
      foundation: '#0B192C', // Deep navy
      progress: '#0056D2',   // Vibrant project blue
      apex: '#2563EB',       // Electric accent blue
      highlight: '#10B981',  // Subtle emerald completion accent dot
    },
    monochrome: {
      foundation: '#0B192C',
      progress: '#0B192C',
      apex: '#0B192C',
      highlight: '#0B192C',
    },
    reversed: {
      foundation: '#FFFFFF',
      progress: '#E0E7FF',
      apex: '#93C5FD',
      highlight: '#34D399',
    },
  }[variant] || {
    foundation: '#0B192C',
    progress: '#0056D2',
    apex: '#2563EB',
    highlight: '#10B981',
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 ${className}`}
      aria-label="PragatiPath Brand Symbol"
    >
      {/* ------------------------------------------------------------------- */}
      {/* SEGMENT 1: The Foundation / Plan (Lower Left Bracket)              */}
      {/* Solid deep navy anchor representing baseline schedules and WBS.     */}
      {/* ------------------------------------------------------------------- */}
      <path
        d="M8 22C8 20.8954 8.89543 20 10 20H17C18.1046 20 19 20.8954 19 22V31H25C26.1046 31 27 31.8954 27 33V39C27 40.1046 26.1046 41 25 41H10C8.89543 41 8 40.1046 8 39V22Z"
        fill={colors.foundation}
      />

      {/* ------------------------------------------------------------------- */}
      {/* SEGMENT 2: The Core Ascent / Progress (Center Stepped Bridge)        */}
      {/* Dynamic project blue conduit stepping up through the framework.     */}
      {/* ------------------------------------------------------------------- */}
      <path
        d="M17 12C17 10.8954 17.8954 10 19 10H30C31.1046 10 32 10.8954 32 12V21H24C22.8954 21 22 21.8954 22 23V30C22 30.5523 21.5523 31 21 31H18C17.4477 31 17 30.5523 17 30V12Z"
        fill={colors.progress}
      />

      {/* ------------------------------------------------------------------- */}
      {/* SEGMENT 3: The Milestone Summit / Completion (Top Right Apex)       */}
      {/* Ascending peak block reaching full project completion.              */}
      {/* ------------------------------------------------------------------- */}
      <path
        d="M26 4C26 2.89543 26.8954 2 28 2H38C39.1046 2 40 2.89543 40 4V13H33C31.8954 13 31 13.8954 31 15V19C31 19.5523 30.5523 20 30 20H27C26.4477 20 26 19.5523 26 19V4Z"
        fill={colors.apex}
      />

      {/* ------------------------------------------------------------------- */}
      {/* SUBTLE PROGRESS PULSE: Precision Milestone Indicator                 */}
      {/* A refined 2.5px terminal accent dot signaling on-track verification. */}
      {/* ------------------------------------------------------------------- */}
      {variant === 'primary' && (
        <circle cx="36" cy="6.5" r="1.5" fill={colors.highlight} />
      )}
    </svg>
  );
}

export function Logo({
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  variant = 'primary', // 'primary' | 'monochrome' | 'reversed'
  to = '/',
  showWordmark = true,
  className = '',
}) {
  const sizeMap = {
    sm: { icon: 26, text: 'text-lg', sub: 'text-[9px]', gap: 'gap-2' },
    md: { icon: 34, text: 'text-xl', sub: 'text-[10px]', gap: 'gap-2.5' },
    lg: { icon: 44, text: 'text-2xl', sub: 'text-xs', gap: 'gap-3' },
    xl: { icon: 56, text: 'text-3xl', sub: 'text-sm', gap: 'gap-3.5' },
  };

  const current = sizeMap[size] || sizeMap.md;

  const wordmarkColors = {
    primary: {
      pragati: 'text-[#0B192C]',
      path: 'text-[#0056D2]',
      tagline: 'text-slate-500',
    },
    monochrome: {
      pragati: 'text-[#0B192C]',
      path: 'text-[#0B192C]',
      tagline: 'text-slate-600',
    },
    reversed: {
      pragati: 'text-white',
      path: 'text-[#60A5FA]',
      tagline: 'text-slate-300',
    },
  }[variant] || {
    pragati: 'text-[#0B192C]',
    path: 'text-[#0056D2]',
    tagline: 'text-slate-500',
  };

  const content = (
    <div className={`inline-flex items-center ${current.gap} select-none group ${className}`}>
      {/* Proprietary Geometric Icon */}
      <PragatiPathIcon
        size={current.icon}
        variant={variant}
        className="group-hover:scale-105"
      />

      {/* Customized Geometric Wordmark */}
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

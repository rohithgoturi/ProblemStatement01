/**
 * PragatiPath Logo Component
 * Reproduces the geometric isometric blueprint building mark from the reference images.
 */
import React from 'react';
import { Link } from 'react-router-dom';

export function Logo({ size = 'md', to = '/', className = '' }) {
  const sizes = {
    sm: { icon: 26, text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 34, text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 42, text: 'text-2xl', sub: 'text-xs' },
  };

  const currentSize = sizes[size] || sizes.md;

  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Isometric structural building logo mark */}
      <div className="relative flex items-center justify-center flex-shrink-0">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xs"
        >
          {/* Outer isometric building frame */}
          <path
            d="M19 3L5 11V29L19 36L33 29V11L19 3Z"
            fill="#1D4ED8"
            fillOpacity="0.08"
            stroke="#1D4ED8"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* Center vertical ridge */}
          <path
            d="M19 3V36"
            stroke="#1D4ED8"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* Top roof facets */}
          <path
            d="M5 11L19 18.5L33 11"
            stroke="#1D4ED8"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* Mid floor horizontal grid lines */}
          <path
            d="M5 20L19 27.5L33 20"
            stroke="#2563EB"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Structural vertical window pillars */}
          <line x1="12" y1="7.5" x2="12" y2="24" stroke="#3B82F6" strokeWidth="1.4" strokeDasharray="1.5 1.5"/>
          <line x1="26" y1="7.5" x2="26" y2="24" stroke="#3B82F6" strokeWidth="1.4" strokeDasharray="1.5 1.5"/>
          {/* Top crane / antenna mast */}
          <line x1="19" y1="3" x2="19" y2="0.5" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round"/>
          <line x1="16" y1="1.5" x2="22" y2="1.5" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Brand Name Typography */}
      <div className="flex items-baseline tracking-tight">
        <span className={`${currentSize.text} font-extrabold text-[#0B2347]`}>Pragati</span>
        <span className={`${currentSize.text} font-extrabold text-brand-blue ml-0.5`}>Path</span>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;

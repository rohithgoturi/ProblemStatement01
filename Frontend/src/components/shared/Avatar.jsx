import React from 'react';

/**
 * Deterministic color palette for initials avatar
 */
const AVATAR_COLORS = [
  'bg-blue-600 text-white',
  'bg-emerald-600 text-white',
  'bg-indigo-600 text-white',
  'bg-purple-600 text-white',
  'bg-amber-600 text-white',
  'bg-rose-600 text-white',
  'bg-cyan-600 text-white',
];

function getInitials(name) {
  if (!name || typeof name !== 'string') return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getColorIndex(name) {
  if (!name) return 0;
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % AVATAR_COLORS.length;
}

export function Avatar({ name, avatar, size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-16 h-16 text-lg',
  };

  const initials = getInitials(name);
  const colorClass = AVATAR_COLORS[getColorIndex(name)];
  const dimensionClass = sizeClasses[size] || sizeClasses.md;

  if (avatar) {
    return (
      <div className={`rounded-full overflow-hidden shrink-0 border border-slate-200 bg-slate-100 ${dimensionClass} ${className}`}>
        <img
          src={avatar}
          alt={name || 'User Avatar'}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials if image URL fails to load
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.innerHTML = `<span class="w-full h-full flex items-center justify-center font-bold font-mono uppercase ${colorClass}">${initials}</span>`;
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`rounded-full shrink-0 flex items-center justify-center font-black font-mono uppercase shadow-2xs border border-white/20 select-none ${dimensionClass} ${colorClass} ${className}`}
      title={name || 'User'}
    >
      {initials}
    </div>
  );
}

export default Avatar;

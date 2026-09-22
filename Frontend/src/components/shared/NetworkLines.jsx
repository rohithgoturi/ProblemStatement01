/**
 * PragatiPath — Technical Network / Fiber Lines Component
 * Subtle SVG curves and pulsing dependency nodes representing schedule linkages & data flows.
 * Purely decorative, zero pointer events, lightweight CSS animations.
 */
export function NetworkLines({ className = '', variant = 'orange' }) {
  const strokeColor = variant === 'white' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 85, 0, 0.22)';
  const flowColor = variant === 'white' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 85, 0, 0.7)';
  const nodeColor = variant === 'white' ? '#FFFFFF' : '#FF5500';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover opacity-80"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="fiberGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.1" />
            <stop offset="50%" stopColor={strokeColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="fiberGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.2" />
            <stop offset="60%" stopColor={strokeColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Primary Schedule Connection Ribbon */}
        <path
          d="M -50,320 C 250,220 380,480 650,280 C 900,120 1050,380 1250,220"
          stroke="url(#fiberGrad1)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Flowing animated dash representing data packet movement */}
        <path
          d="M -50,320 C 250,220 380,480 650,280 C 900,120 1050,380 1250,220"
          stroke={flowColor}
          strokeWidth="1.5"
          className="animate-flow-dash"
          fill="none"
        />

        {/* Secondary Site Report Link Curve */}
        <path
          d="M 50,150 C 320,180 460,80 720,240 C 920,360 1100,200 1250,340"
          stroke="url(#fiberGrad2)"
          strokeWidth="1.2"
          strokeDasharray="4 8"
          fill="none"
        />

        {/* Third Cross-Hierarchy Link */}
        <path
          d="M 120,480 C 350,360 620,420 840,190 C 1020,30 1140,160 1260,110"
          stroke="url(#fiberGrad1)"
          strokeWidth="1"
          fill="none"
        />

        {/* Milestone Activity Nodes */}
        <g className="animate-pulse-subtle">
          <circle cx="280" cy="245" r="4.5" fill={nodeColor} />
          <circle cx="280" cy="245" r="10" stroke={nodeColor} strokeWidth="1" strokeOpacity="0.4" />
        </g>

        <g className="animate-pulse-subtle" style={{ animationDelay: '1.2s' }}>
          <circle cx="650" cy="280" r="5" fill={nodeColor} />
          <circle cx="650" cy="280" r="12" stroke={nodeColor} strokeWidth="1" strokeOpacity="0.35" />
        </g>

        <g className="animate-pulse-subtle" style={{ animationDelay: '2.4s' }}>
          <circle cx="950" cy="180" r="4" fill={nodeColor} />
          <circle cx="950" cy="180" r="9" stroke={nodeColor} strokeWidth="1" strokeOpacity="0.4" />
        </g>

        <g className="animate-pulse-subtle" style={{ animationDelay: '0.8s' }}>
          <circle cx="720" cy="240" r="3.5" fill={nodeColor} />
        </g>
      </svg>
    </div>
  );
}

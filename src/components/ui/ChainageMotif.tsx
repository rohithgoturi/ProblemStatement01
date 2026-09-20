import React from 'react';
import { cn } from '@/lib/utils';

// ============================================================
// PRAGATIPATH — Chainage / Path Motif Component
// Signature visual device for PragatiPath.
// Engineering survey-ruler with chainage labels.
//
// Rules (from PRAGATIPATH_DESIGNmain.md §9.1):
// - Major tick every 100px, 8px height
// - Minor tick every 20px, 4px height
// - Structural line: 1px; Emphasis line: 1.5px
// - Labels: JetBrains Mono, 11px, 600
// - Label color: neutral-700 (#294863)
// - Tick color: neutral-300 (#B4C5D4) / neutral-400 (#8FA6BA)
// - Active position: primary-blue (#0056D2)
// - Max ONE instance per screen
// ============================================================

interface ChainageLabel {
  label: string;   // e.g. "Ch. 12+400"
  position: number; // x position in pixels (0 to width)
  isActive?: boolean;
}

interface ChainageMotifProps {
  /** Width in pixels (default: full container via 100%) */
  width?: number | string;
  /** Height in pixels (default: 40) */
  height?: number;
  /** Explicitly provided labels. If omitted, auto-generates from startChainage/endChainage */
  labels?: ChainageLabel[];
  /** Start chainage in km+m notation, e.g. 12400 (means Ch. 12+400) */
  startChainage?: number;
  /** End chainage in km+m notation, e.g. 13000 */
  endChainage?: number;
  /** Active position (in meters from start) for highlighting */
  activeChainage?: number;
  className?: string;
  'aria-label'?: string;
}

function formatChainage(meters: number): string {
  const km = Math.floor(meters / 1000);
  const m = meters % 1000;
  return `Ch. ${km}+${m.toString().padStart(3, '0')}`;
}

const MAJOR_INTERVAL_PX = 100;
const MINOR_INTERVAL_PX = 20;
const MAJOR_TICK_H = 8;
const MINOR_TICK_H = 4;

const COLORS = {
  line:   '#B4C5D4', // neutral-300
  tick:   '#8FA6BA', // neutral-400
  label:  '#294863', // neutral-700
  active: '#0056D2', // primary-blue
  emphasis: '#0056D2', // primary-blue for emphasis line
};

export function ChainageMotif({
  width = '100%',
  height = 40,
  labels,
  startChainage = 12400,
  endChainage = 13000,
  activeChainage,
  className,
  'aria-label': ariaLabel = 'Infrastructure progress chainage ruler',
}: ChainageMotifProps) {
  const svgWidth = typeof width === 'number' ? width : 800; // used for internal calculations only when string
  const baseline = height - 12;

  // Generate tick positions and labels if not provided
  const numMajorTicks = Math.floor(svgWidth / MAJOR_INTERVAL_PX) + 1;
  const numMinorTicks = Math.floor(svgWidth / MINOR_INTERVAL_PX) + 1;
  const chainageRange = endChainage - startChainage;
  const activeX = activeChainage != null
    ? ((activeChainage - startChainage) / chainageRange) * svgWidth
    : null;

  return (
    <div
      className={cn('w-full overflow-hidden select-none', className)}
      role="img"
      aria-label={ariaLabel}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${svgWidth} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {/* Structural baseline — 1px */}
        <line
          x1={0}
          y1={baseline}
          x2={svgWidth}
          y2={baseline}
          stroke={COLORS.line}
          strokeWidth={1}
          className="chainage-motif-line"
        />

        {/* Active emphasis segment — 1.5px in primary-blue */}
        {activeX !== null && activeX > 0 && (
          <line
            x1={0}
            y1={baseline}
            x2={activeX}
            y2={baseline}
            stroke={COLORS.emphasis}
            strokeWidth={1.5}
            className="chainage-motif-emphasis"
          />
        )}

        {/* Minor ticks */}
        {Array.from({ length: numMinorTicks }).map((_, i) => {
          const x = i * MINOR_INTERVAL_PX;
          const isMajor = x % MAJOR_INTERVAL_PX === 0;
          if (isMajor) return null;
          return (
            <line
              key={`minor-${i}`}
              x1={x}
              y1={baseline - MINOR_TICK_H}
              x2={x}
              y2={baseline}
              stroke={COLORS.line}
              strokeWidth={1}
            />
          );
        })}

        {/* Major ticks + labels */}
        {Array.from({ length: numMajorTicks }).map((_, i) => {
          const x = i * MAJOR_INTERVAL_PX;
          const t = svgWidth > 0 ? x / svgWidth : 0;
          const chainage = Math.round(startChainage + t * chainageRange);
          const isActive = activeX !== null && Math.abs(x - activeX) < MAJOR_INTERVAL_PX / 2;
          const color = isActive ? COLORS.active : COLORS.tick;
          const labelColor = isActive ? COLORS.active : COLORS.label;

          // Get label
          let labelText: string;
          if (labels) {
            const found = labels.find((l) => Math.abs(l.position - x) < MINOR_INTERVAL_PX);
            labelText = found?.label ?? '';
          } else {
            // Only label every other major tick to avoid crowding
            labelText = i % 2 === 0 ? formatChainage(chainage) : '';
          }

          return (
            <g key={`major-${i}`}>
              <line
                x1={x}
                y1={baseline - MAJOR_TICK_H}
                x2={x}
                y2={baseline}
                stroke={color}
                strokeWidth={isActive ? 1.5 : 1}
              />
              {labelText && (
                <text
                  x={x}
                  y={baseline - MAJOR_TICK_H - 4}
                  textAnchor="middle"
                  fontSize={11}
                  fontFamily='"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
                  fontWeight={600}
                  fill={labelColor}
                >
                  {labelText}
                </text>
              )}
            </g>
          );
        })}

        {/* Active position indicator dot */}
        {activeX !== null && (
          <circle
            cx={activeX}
            cy={baseline}
            r={4}
            fill={COLORS.active}
            stroke="white"
            strokeWidth={1.5}
          />
        )}
      </svg>
    </div>
  );
}

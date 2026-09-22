/**
 * PragatiPath — Shared Public Page Header
 * Consistent Clienter-inspired header for public inner pages (About, Services, Contact, etc.)
 * Technical grid background, warm radial glow, network lines, uppercase pill badge, large bold typography.
 */
import { NetworkLines } from './NetworkLines';

export function PublicPageHeader({
  badge = 'PRAGATIPATH',
  title = '',
  description = '',
  children = null,
}) {
  return (
    <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[#E8E1D5] bg-technical-grid overflow-hidden">
      {/* Decorative Network Fiber Lines */}
      <NetworkLines variant="orange" />

      {/* Subtle Warm Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF5500]/[0.05] rounded-full blur-3xl"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Uppercase Pill Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] text-[#FF5500] text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
            <span>{badge}</span>
          </div>
        )}

        {/* Large Bold Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0B1320] tracking-[-0.03em] leading-[1.12] mb-5">
          {title}
        </h1>

        {/* Supporting Explanation */}
        {description && (
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto font-normal">
            {description}
          </p>
        )}

        {/* Optional Action / Supporting Visual slot */}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

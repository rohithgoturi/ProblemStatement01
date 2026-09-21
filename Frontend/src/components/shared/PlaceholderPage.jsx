/**
 * PlaceholderPage — Generic placeholder for unimplemented screens
 * Used to establish routes before each phase is built
 */

export function PlaceholderPage({ title, description, phase }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-brand-blue-xlight rounded-xl flex items-center justify-center mb-6">
        <div className="w-8 h-8 bg-brand-blue rounded-lg opacity-60" />
      </div>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue-xlight text-brand-blue text-xs font-semibold rounded-full mb-3">
        Phase {phase}
      </div>
      <h1 className="text-xl font-bold text-ink-primary mb-2">{title}</h1>
      <p className="text-sm text-ink-muted max-w-md">
        {description || 'This screen will be implemented in its designated phase. The route and shell are ready.'}
      </p>
    </div>
  );
}

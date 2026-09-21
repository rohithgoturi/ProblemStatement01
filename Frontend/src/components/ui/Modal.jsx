/**
 * Modal — Dialog overlay component
 */
import { useEffect, useRef } from 'react';
import { MdClose } from 'react-icons/md';
import { cn } from '../../utils/helpers';

const sizeStyles = {
  sm:  'max-w-sm',
  md:  'max-w-lg',
  lg:  'max-w-2xl',
  xl:  'max-w-4xl',
  full:'max-w-screen-lg',
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showClose = true,
  closeOnOverlay = true,
  footer,
  className = '',
}) {
  const overlayRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-fade-in"
      onClick={closeOnOverlay ? (e) => { if (e.target === overlayRef.current) onClose?.(); } : undefined}
    >
      <div
        className={cn(
          'relative w-full bg-white rounded-xl shadow-card-lg flex flex-col max-h-[90vh] animate-slide-in',
          sizeStyles[size] || sizeStyles.md,
          className,
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border flex-shrink-0">
            {title && <h2 className="text-base font-semibold text-ink-primary">{title}</h2>}
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                className="ml-auto text-ink-muted hover:text-ink-primary transition-colors p-1 rounded hover:bg-surface-muted"
              >
                <MdClose size={20} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-surface-border flex-shrink-0 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

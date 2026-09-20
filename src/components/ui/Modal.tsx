import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

// ============================================================
// PRAGATIPATH — Modal / Dialog
// Focus trapped, keyboard accessible, aria-modal
// ============================================================

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Focus first focusable element
  useEffect(() => {
    if (isOpen && panelRef.current) {
      const focusable = panelRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/60"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        ref={panelRef}
        className={cn(
          'relative w-full bg-white rounded-lg shadow-modal flex flex-col max-h-[90vh]',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
          <h2 id="modal-title" className="text-base font-semibold text-neutral-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-neutral-500 hover:text-neutral-800 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-5 py-4 border-t border-neutral-200 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Confirm Dialog
// ============================================================

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'primary' | 'destructive';
  loading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={variant === 'destructive' ? 'destructive' : 'primary'} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-neutral-700">{message}</p>
    </Modal>
  );
}

// ============================================================
// Drawer (slide from right)
// ============================================================

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export function Drawer({ isOpen, onClose, title, children, width = '420px' }: DrawerProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-900/40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'fixed top-0 right-0 z-50 h-full bg-white shadow-modal flex flex-col',
          'transition-transform duration-slow',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ width }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
          <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </>
  );
}

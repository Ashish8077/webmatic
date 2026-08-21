"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "sm:max-w-md",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const initialFocusSelector = [
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "a[href]",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocusedElement = document.activeElement;
    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusableElements = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ??
          [],
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true",
      );

    const focusFirstElement = () => {
      const initialFocusElement =
        panelRef.current?.querySelector<HTMLElement>(
          `[data-autofocus], ${initialFocusSelector}`,
        ) ?? getFocusableElements()[0];

      initialFocusElement?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.setTimeout(focusFirstElement, 0);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalBodyOverflow;

      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex overflow-hidden items-center justify-center p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`
          relative w-full ${sizeStyles[size]}
          max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3rem)]
          overflow-hidden bg-card-bg border border-card-border rounded-xl sm:rounded-2xl
          shadow-2xl shadow-black/40
          animate-scale-in
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-card-border px-4 py-3 sm:px-6 sm:py-4">
          <h2
            id={titleId}
            className="min-w-0 truncate text-base font-semibold text-foreground sm:text-lg"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            aria-label="Close modal"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          {children}
        </div>

        {footer && (
          <div className="shrink-0 border-t border-card-border px-4 py-3 sm:px-6">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

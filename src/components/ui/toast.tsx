"use client";

import { useEffect, useState } from "react";

type ToastVariant = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

let toastId = 0;
const listeners = new Set<(toast: Toast) => void>();

export function showToast(message: string, variant: ToastVariant = "success") {
  const toast: Toast = { id: ++toastId, message, variant };
  listeners.forEach((fn) => fn(toast));
}

const variantStyles: Record<ToastVariant, string> = {
  success: "bg-success/15 border-success/30 text-success",
  error: "bg-danger/15 border-danger/30 text-danger",
  info: "bg-accent/15 border-accent/30 text-accent",
};

const variantIcons: Record<ToastVariant, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3500);
    };

    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-2.5 px-4 py-3 rounded-xl border
            text-sm font-medium shadow-xl shadow-black/30
            animate-slide-in min-w-70
            ${variantStyles[toast.variant]}
          `}
        >
          <span className="text-base">{variantIcons[toast.variant]}</span>
          {toast.message}
        </div>
      ))}
    </div>
  );
}

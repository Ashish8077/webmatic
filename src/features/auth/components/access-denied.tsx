"use client";

import Link from "next/link";

interface AccessDeniedProps {
  title?: string;
  description?: string;
}

export function AccessDenied({
  title = "Access denied",
  description = "You don't have permission to view this page. If you believe this is incorrect, contact your administrator.",
}: AccessDeniedProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient background orbs */}
      <div
        className="absolute top-1/4 -left-32 w-72 h-72 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #ef4444, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-72 h-72 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }}
      />

      <div className="w-full max-w-md animate-fade-in">
        {/* Glass card */}
        <div className="relative rounded-2xl border border-white/[0.06] bg-card-bg/80 backdrop-blur-xl p-10 text-center shadow-2xl shadow-black/40">
          {/* Subtle top border gradient */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-danger/40 to-transparent rounded-t-2xl" />

          {/* Shield icon with animated ring */}
          <div className="relative mx-auto mb-7 flex h-20 w-20 items-center justify-center">
            {/* Outer pulse ring */}
            <div
              className="absolute inset-0 rounded-full opacity-20 animate-spin"
              style={{
                background: "conic-gradient(from 180deg, transparent, #ef4444, transparent)",
                animationDuration: "4s",
              }}
            />
            {/* Inner glow */}
            <div className="absolute inset-[3px] rounded-full bg-card-bg" />
            {/* Icon background */}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-danger/15 to-danger/5 border border-danger/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-danger"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
          </div>

          {/* Error code badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-danger/8 border border-danger/15 px-3 py-1 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-danger/80">
              403 Forbidden
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-xs mx-auto">
            {description}
          </p>

          {/* Divider */}
          <div className="mt-8 mb-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Action */}
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-accent to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:brightness-110 active:scale-[0.98]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>

    </div>
  );
}

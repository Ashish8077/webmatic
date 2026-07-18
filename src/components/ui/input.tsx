"use client";

import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-muted-foreground mb-1 block"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-3.5 py-2.5 rounded-lg text-sm
            bg-input-bg border border-input-border text-foreground
            placeholder:text-muted-foreground/60
            focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-danger focus:ring-danger/40" : ""}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-xs text-danger mt-0.5">{error}</p>}
        {hint && !error && (
          <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

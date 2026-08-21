"use client";

import { type InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", id, type, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const currentType = isPassword ? (showPassword ? "text" : "password") : type;

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
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={currentType}
            className={`
              w-full px-3.5 py-2.5 rounded-lg text-sm
              bg-input-bg border border-input-border text-foreground
              placeholder:text-muted-foreground/60
              focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isPassword ? "pr-10" : ""}
              ${error ? "border-danger focus:ring-danger/40" : ""}
              ${className}
            `}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && <p className="text-xs text-danger mt-0.5">{error}</p>}
        {hint && !error && (
          <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

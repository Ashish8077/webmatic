import React from "react";
import { Check, X } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password?: string;
}

export function PasswordStrengthIndicator({ password = "" }: PasswordStrengthIndicatorProps) {
  const requirements = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "1 uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "1 lowercase letter", test: (p: string) => /[a-z]/.test(p) },
    { label: "1 number", test: (p: string) => /[0-9]/.test(p) },
    { label: "1 special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ];

  // If there's no password yet, we don't necessarily want to show a block of red X's
  // We can show gray circles or just red X's. Showing X's is clear.
  
  return (
    <div className="mt-2 p-3 bg-surface border border-card-border rounded-lg space-y-2">
      <p className="text-xs font-semibold text-muted-foreground mb-1">Password must contain:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {requirements.map((req, i) => {
          const isValid = req.test(password);
          return (
            <div key={i} className="flex items-center gap-2">
              {isValid ? (
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-success/10 text-success">
                  <Check size={12} strokeWidth={3} />
                </div>
              ) : (
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-danger/10 text-danger">
                  <X size={12} strokeWidth={3} />
                </div>
              )}
              <span className={`text-xs ${isValid ? "text-success font-medium" : "text-muted-foreground"}`}>
                {req.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

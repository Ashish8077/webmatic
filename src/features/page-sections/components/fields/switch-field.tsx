"use client";

import { useFormContext, useController } from "react-hook-form";
// Ensure there is a UI primitive for this, but since we may not have one, we can build a simple checkbox/switch wrapper
// Wait, I should check if there's a Switch component. If not, I'll render a simple native checkbox with Tailwind styling.
// Let me just use a native checkbox styled nicely.

interface SwitchFieldProps {
  name: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export function SwitchField({
  name,
  label,
  description,
  disabled,
}: SwitchFieldProps) {
  const { control } = useFormContext();
  const {
    field: { ref: fieldRef, ...fieldProps },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm bg-surface">
      <div className="space-y-0.5">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={Boolean(fieldProps.value)}
            onChange={(e) => fieldProps.onChange(e.target.checked)}
            onBlur={fieldProps.onBlur}
            disabled={disabled}
            ref={fieldRef}
          />
          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"></div>
        </label>
      </div>
      {error && (
        <p className="text-xs text-danger mt-1 absolute -bottom-5">
          {error.message}
        </p>
      )}
    </div>
  );
}

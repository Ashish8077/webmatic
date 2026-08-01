"use client";

import { useFormContext, useController } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: Option[];
  disabled?: boolean;
}

export function SelectField({
  name,
  label,
  options,
  disabled,
}: SelectFieldProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <select
        {...field}
        disabled={disabled}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}

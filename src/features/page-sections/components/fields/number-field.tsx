"use client";

import { useFormContext, useController } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface NumberFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

export function NumberField({
  name,
  label,
  placeholder,
  disabled,
}: NumberFieldProps) {
  const { control } = useFormContext();
  const {
    field: { ref: fieldRef, ...fieldProps },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Input
      type="number"
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      error={error?.message}
      value={fieldProps.value ?? ""}
      onChange={(e) => {
        const raw = e.target.value;
        fieldProps.onChange(raw === "" ? undefined : Number(raw));
      }}
      onBlur={fieldProps.onBlur}
      ref={fieldRef}
    />
  );
}

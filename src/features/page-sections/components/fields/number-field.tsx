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
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Input
      type="number"
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      error={error?.message}
      value={field.value ?? ""}
      onChange={(e) => {
        const raw = e.target.value;
        field.onChange(raw === "" ? null : Number(raw));
      }}
      onBlur={field.onBlur}
      ref={field.ref}
    />
  );
}

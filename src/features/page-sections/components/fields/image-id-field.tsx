"use client";

import { useFormContext, useController } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface ImageIdFieldProps {
  name: string;
  label?: string;
  disabled?: boolean;
}

/**
 * Numeric input for nullable image IDs.
 * Converts empty string to null so the value matches the backend schema.
 */
export function ImageIdField({
  name,
  label = "Image ID",
  disabled,
}: ImageIdFieldProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Input
      type="number"
      label={label}
      placeholder="e.g. 12"
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

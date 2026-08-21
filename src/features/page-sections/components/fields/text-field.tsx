"use client";

import { useFormContext, useController } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface TextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

export function TextField({
  name,
  label,
  placeholder,
  type = "text",
  disabled,
}: TextFieldProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Input
      {...field}
      value={field.value ?? ""}
      type={type}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      error={error?.message}
    />
  );
}

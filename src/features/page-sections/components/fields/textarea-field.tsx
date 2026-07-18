"use client";

import { useFormContext, useController } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface TextareaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function TextareaField({
  name,
  label,
  placeholder,
  disabled,
  className,
}: TextareaFieldProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Textarea
      {...field}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      error={error?.message}
    />
  );
}

"use client";

import { useFormContext, useController } from "react-hook-form";
import { ImagePicker } from "@/components/shared/media";

interface MediaPickerFieldProps {
  name: string;
  label?: string;
  description?: string;
  disabled?: boolean;
}

/**
 * A react-hook-form wrapper around the generic ImagePicker.
 * Used for visually selecting media rather than entering raw IDs.
 */
export function MediaPickerField({
  name,
  label = "Image",
  description,
  disabled,
}: MediaPickerFieldProps) {
  const { control } = useFormContext();
  const {
    field: { ref: fieldRef, ...fieldProps },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div ref={fieldRef} className={disabled ? "opacity-50 pointer-events-none" : ""}>
      <ImagePicker
        value={fieldProps.value}
        onChange={(val) => fieldProps.onChange(val)}
        label={label}
        description={description}
        error={error?.message}
      />
    </div>
  );
}

"use client";

import { useFormContext, useController } from "react-hook-form";
import { VisualPicker } from "@/components/ui/visual-picker";
import { VisualAsset } from "@/shared/types/visual-asset.types";
import { useEffect, useCallback } from "react";

interface VisualPickerFieldProps {
  name: string;
  label?: string;
  description?: string;
}

export function VisualPickerField({
  name,
  label = "Visual Asset",
  description,
}: VisualPickerFieldProps) {
  const { control, setValue, watch, register } = useFormContext();
  const getFieldName = useCallback(
    (field: string) => (name ? `${name}.${field}` : field),
    [name]
  );

  // Explicitly register the fields so react-hook-form tracks them for submission
  useEffect(() => {
    register(getFieldName("visualType"));
    register(getFieldName("iconName"));
    register(getFieldName("imageId"));
  }, [register, getFieldName]);

  // Watch the three fields
  const visualType = watch(getFieldName("visualType"));
  const iconName = watch(getFieldName("iconName"));
  const imageId = watch(getFieldName("imageId"));

  const value: VisualAsset = {
    visualType: visualType ?? "none",
    iconName: iconName ?? null,
    imageId: imageId ?? null,
  };

  const handleChange = (newValue: VisualAsset) => {
    setValue(getFieldName("visualType"), newValue.visualType, { shouldDirty: true, shouldValidate: true });
    setValue(getFieldName("iconName"), newValue.iconName, { shouldDirty: true, shouldValidate: true });
    setValue(getFieldName("imageId"), newValue.imageId, { shouldDirty: true, shouldValidate: true });
  };

  const {
    fieldState: { error },
  } = useController({ name: getFieldName("visualType"), control });

  return (
    <VisualPicker
      value={value}
      onChange={handleChange}
      label={label}
      description={description}
      error={error?.message}
    />
  );
}

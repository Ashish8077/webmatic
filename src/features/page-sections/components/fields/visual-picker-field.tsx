"use client";

import { useFormContext, useController, useWatch } from "react-hook-form";
import { VisualPicker } from "@/components/ui/visual-picker";
import { VisualAsset } from "@/shared/types/visual-asset.types";
import { useEffect, useCallback } from "react";
import { getMediaFieldName } from "../../utils/media-utils";
import { Media } from "@/features/media/types";

interface VisualPickerFieldProps {
  name: string;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function VisualPickerField({
  name,
  label = "Visual Asset",
  description,
  disabled,
}: VisualPickerFieldProps) {
  const { control, setValue, register } = useFormContext();
  const getFieldName = useCallback(
    (field: string) => (name ? `${name}.${field}` : field),
    [name]
  );

  const imageKey = getFieldName(getMediaFieldName("imageId")); // "name.image"

  // Explicitly register the fields so react-hook-form tracks them for submission
  useEffect(() => {
    register(getFieldName("visualType"));
    register(getFieldName("iconName"));
    register(getFieldName("imageId"));
    // We don't strictly need to register "image" for submission, but RHF will track it via setValue
  }, [register, getFieldName]);

  // Watch the fields
  const visualType = useWatch({ control, name: getFieldName("visualType") });
  const iconName = useWatch({ control, name: getFieldName("iconName") });
  const imageId = useWatch({ control, name: getFieldName("imageId") });
  const image = useWatch({ control, name: imageKey }) as
    | Media
    | null
    | undefined;

  const value: VisualAsset = {
    visualType: visualType ?? "none",
    iconName: iconName ?? null,
    imageId: imageId ?? null,
    image: image ?? null,
  };

  const handleChange = (newValue: VisualAsset) => {
    const nextImage =
      newValue.visualType === "image"
        ? newValue.image ?? (newValue.imageId === image?.id ? image : null)
        : null;

    setValue(getFieldName("visualType"), newValue.visualType, { shouldDirty: true, shouldValidate: true, shouldTouch: true });
    setValue(getFieldName("iconName"), newValue.iconName, { shouldDirty: true, shouldValidate: true, shouldTouch: true });
    setValue(getFieldName("imageId"), newValue.imageId, { shouldDirty: true, shouldValidate: true, shouldTouch: true });
    setValue(imageKey, nextImage, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
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
      disabled={disabled}
    />
  );
}

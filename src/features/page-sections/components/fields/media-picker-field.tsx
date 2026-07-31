"use client";

import { useFormContext, useController, useWatch } from "react-hook-form";
import { MediaField } from "@/features/media/components/media-field/media-field";
import { getMediaFieldName } from "../../utils/media-utils";
import { Media } from "@/features/media/types";

interface MediaPickerFieldProps {
  name: string;
  label?: string;
  description?: string;
  disabled?: boolean;
}

/**
 * A react-hook-form wrapper around the generic MediaField.
 * Used for visually selecting media rather than entering raw IDs.
 */
export function MediaPickerField({
  name,
  label = "Image",
  description,
  disabled,
}: MediaPickerFieldProps) {
  const { control, setValue } = useFormContext();
  const {
    field: { ref: fieldRef, ...fieldProps },
    fieldState: { error },
  } = useController({ name, control });

  // Derive the media object key from the ID key (e.g. backgroundImageId -> backgroundImage)
  const imageKey = getMediaFieldName(name);
  const media = useWatch({ control, name: imageKey }) as
    | Media
    | null
    | undefined;

  const handleMediaChange = (newMedia: Media | null) => {
    setValue(imageKey, newMedia, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
    fieldProps.onChange(newMedia?.id ?? null);
  };

  return (
    <div ref={fieldRef} className={disabled ? "opacity-50 pointer-events-none" : ""}>
      <MediaField
        value={media ?? null}
        onMediaChange={handleMediaChange}
        label={label}
      />
      {description && !error && (
        <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
      )}
      {error && <p className="mt-1.5 text-sm font-medium text-danger">{error.message}</p>}
    </div>
  );
}


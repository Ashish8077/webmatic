"use client";

import { MediaField } from "@/features/media/components/media-field/media-field";
import { IconPicker } from "./icon-picker";
import { VisualAsset, VisualType } from "@/shared/types/visual-asset.types";
import React, { useId } from "react";
import { Media } from "@/features/media/types";

export interface VisualPickerProps {
  value: VisualAsset;
  onChange: (value: VisualAsset) => void;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
}

export function VisualPicker({
  value,
  onChange,
  label = "Visual Asset",
  description,
  error,
  disabled = false,
}: VisualPickerProps) {
  const radioGroupName = useId();

  // Use refs to preserve selections when toggling between types without causing cascading renders
  const lastIconRef = React.useRef<string | null>(value.iconName ?? null);
  const lastImageIdRef = React.useRef<number | null>(value.imageId ?? null);
  const lastImageRef = React.useRef<Media | null>(value.image ?? null);

  // Sync external value changes into refs
  React.useEffect(() => {
    if (value.iconName) lastIconRef.current = value.iconName;
    if (value.imageId) lastImageIdRef.current = value.imageId;
    if (value.image) lastImageRef.current = value.image;
  }, [value.iconName, value.imageId, value.image]);

  const handleTypeChange = (val: string) => {
    const newType = val as VisualType;
    if (newType === "none") {
      onChange({ visualType: "none", iconName: null, imageId: null, image: null });
    } else if (newType === "icon") {
      onChange({
        visualType: "icon",
        iconName: lastIconRef.current,
        imageId: null,
        image: null
      });
    } else if (newType === "image") {
      onChange({
        visualType: "image",
        iconName: null,
        imageId: lastImageIdRef.current,
        image: lastImageRef.current,
      });
    }
  };

  const handleIconChange = (iconName: string | null) => {
    lastIconRef.current = iconName;
    onChange({ visualType: "icon", iconName, imageId: null, image: null });
  };

  const handleImageChange = (media: Media | null) => {
    lastImageIdRef.current = media?.id ?? null;
    lastImageRef.current = media ?? null;
    onChange({ visualType: "image", iconName: null, imageId: media?.id ?? null, image: media });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">{label}</label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={radioGroupName}
              value="none"
              checked={value.visualType === "none"}
              onChange={(e) => handleTypeChange(e.target.value)}
              disabled={disabled}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="text-sm font-medium">None</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={radioGroupName}
              value="icon"
              checked={value.visualType === "icon"}
              onChange={(e) => handleTypeChange(e.target.value)}
              disabled={disabled}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="text-sm font-medium">Icon</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={radioGroupName}
              value="image"
              checked={value.visualType === "image"}
              onChange={(e) => handleTypeChange(e.target.value)}
              disabled={disabled}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="text-sm font-medium">Image</span>
          </label>
        </div>
      </div>

      <div className="mt-4 border rounded-md p-4 bg-muted/20">
        {value.visualType === "none" && (
          <p className="text-sm text-muted-foreground italic py-2 text-center">
            No visual asset selected.
          </p>
        )}

        {value.visualType === "icon" && (
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Select Icon
            </label>
            <IconPicker
              value={value?.iconName ?? null}
              onChange={handleIconChange}
            />
          </div>
        )}

        {value.visualType === "image" && (
          <div className="space-y-2">
            <MediaField
              value={value?.image ?? null}
              onMediaChange={handleImageChange}
            />
          </div>
        )}
      </div>

      {error && <p className="text-sm font-medium text-danger">{error}</p>}
    </div>
  );
}


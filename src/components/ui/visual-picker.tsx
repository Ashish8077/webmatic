"use client";

import { ImagePicker } from "@/components/shared/media";
import { IconPicker } from "./icon-picker";
import { VisualAsset, VisualType } from "@/shared/types/visual-asset.types";
import { useId } from "react";

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
  const handleTypeChange = (val: string) => {
    const newType = val as VisualType;
    if (newType === "none") {
      onChange({ visualType: "none", iconName: null, imageId: null });
    } else if (newType === "icon") {
      onChange({
        visualType: "icon",
        iconName: value?.iconName ?? null,
        imageId: null,
      });
    } else if (newType === "image") {
      onChange({
        visualType: "image",
        iconName: null,
        imageId: value?.imageId ?? null,
      });
    }
  };

  const handleIconChange = (iconName: string | null) => {
    onChange({ visualType: "icon", iconName, imageId: null });
  };

  const handleImageChange = (imageId: number | null) => {
    onChange({ visualType: "image", iconName: null, imageId });
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
            <ImagePicker
              value={value?.imageId ?? null}
              onChange={handleImageChange}
            />
          </div>
        )}
      </div>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}

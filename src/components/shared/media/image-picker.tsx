"use client";

import { ImagePlus, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

interface ImagePickerProps {
  value?: number | null;
  onChange?: (id: number | null) => void;
  label?: string;
  error?: string;
  description?: string;
}

export default function ImagePicker({
  value,
  onChange,
  label = "Image",
  error,
  description,
}: ImagePickerProps) {
  const handleSelectImage = () => {
    // TODO: Integrate with actual Media Library when it becomes available.
    // This function will eventually open the media modal and call onChange(selectedImageId)
    console.warn("Media Library integration pending.");
    alert("Media Library is under construction.");
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChange) {
      onChange(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      
      <div 
        className={clsx(
          "relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors bg-card-bg",
          error ? "border-red-500" : "border-card-border hover:border-accent hover:bg-surface-hover cursor-pointer"
        )}
        onClick={handleSelectImage}
      >
        {value ? (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="relative w-full max-w-sm aspect-video bg-input rounded overflow-hidden flex items-center justify-center">
              {/* If we had the image URL, we'd render it here. For now we just show an icon and the ID. */}
              <ImageIcon className="text-muted-foreground opacity-20 w-1/3 h-1/3" />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-medium mb-2">Image ID: {value}</span>
                <div className="flex gap-2">
                  <Button type="button" variant="secondary" size="sm" onClick={handleSelectImage}>
                    Change
                  </Button>
                  <Button type="button" variant="danger" size="sm" onClick={handleRemove}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImagePlus size={32} />
            <span className="text-sm font-medium">Click to select image</span>
          </div>
        )}
      </div>
      
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

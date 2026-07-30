"use client";
import { useState } from "react";
import Image from "next/image";
import { X, Image as ImageIcon } from "lucide-react";
import { Media } from "../../types";
import { MediaPickerModal } from "../media-picker";
import { Button } from "@/components/ui/button";

interface MediaFieldProps {
  value: Media | null;
  onChange: (mediaId: number | null) => void;
  label?: string;
  defaultFolder?: string;
}

export function MediaField({ value, onChange, label, defaultFolder }: MediaFieldProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (media: Media) => {
    onChange(media.id);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  const isImage = value?.type === "image";
  const imageUrl = value?.url || value?.storagePath;

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div 
        className="group relative flex aspect-video w-full max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-border transition-colors hover:border-primary/50 bg-muted/30"
        onClick={() => setIsModalOpen(true)}
      >
        {value ? (
          <>
            {isImage ? (
              <Image
                src={imageUrl!}
                alt={value.altText || value.originalName}
                fill
                className="object-contain p-2"
                unoptimized={value.disk === "local"}
              />
            ) : (
              <div className="flex flex-col items-center text-muted-foreground">
                <ImageIcon className="mb-2 h-8 w-8 opacity-50" />
                <span className="text-xs">{value.originalName}</span>
              </div>
            )}
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="secondary" size="sm" type="button" className="h-8">
                Replace
              </Button>
            </div>
            
            {/* Remove Button */}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-foreground backdrop-blur-sm transition-transform hover:scale-110 hover:bg-destructive hover:text-destructive-foreground"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageIcon className="h-8 w-8 opacity-50" />
            <span className="text-sm font-medium">Select Media</span>
          </div>
        )}
      </div>

      <MediaPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelect}
        defaultFolder={defaultFolder}
      />
    </div>
  );
}

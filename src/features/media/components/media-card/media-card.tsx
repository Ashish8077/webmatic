"use client";
import React from "react";
import Image from "next/image";
import { Media } from "../../types";
import { formatFileSize } from "../../utils/format-file-size";
import { formatMediaDate } from "../../utils/format-media-date";
import { File, FileText, Image as ImageIcon, Video, Music } from "lucide-react";

interface MediaCardProps {
  media: Media;
  isSelected?: boolean;
  onClick?: (media: Media) => void;
}

function MediaIcon({ type, mimeType, className }: { type: string; mimeType: string; className?: string }) {
  if (type === "image") return <ImageIcon className={className} />;
  if (type === "video") return <Video className={className} />;
  if (type === "audio") return <Music className={className} />;
  if (mimeType.includes("pdf") || mimeType.includes("document")) return <FileText className={className} />;
  return <File className={className} />;
}

export function MediaCard({ media, isSelected, onClick }: MediaCardProps) {
  const isImage = media.type === "image";
  const imageUrl = media.url || media.storagePath; // Assuming storagePath works for local disk, or url is provided

  return (
    <div
      onClick={() => onClick?.(media)}
      className={`
        group relative flex flex-col overflow-hidden rounded-lg border bg-card-bg transition-all hover:shadow-md cursor-pointer
        ${isSelected ? "ring-2 ring-primary border-transparent" : "border-card-border hover:border-primary/50"}
      `}
    >
      <div className="relative aspect-video w-full bg-muted/50 flex items-center justify-center overflow-hidden">
        {isImage ? (
          <Image
            src={imageUrl}
            alt={media.altText || media.originalName}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized={media.disk === "local"} // Skip next/image optimization for local dev uploads to avoid errors if unconfigured
          />
        ) : (
          <MediaIcon 
            type={media.type} 
            mimeType={media.mimeType} 
            className="h-12 w-12 text-muted-foreground/50 transition-colors group-hover:text-primary/50" 
          />
        )}
      </div>
      <div className="flex flex-col gap-1 p-3 text-sm">
        <p className="truncate font-medium text-foreground" title={media.originalName}>
          {media.originalName}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatFileSize(media.size)}</span>
          <span>{formatMediaDate(media.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

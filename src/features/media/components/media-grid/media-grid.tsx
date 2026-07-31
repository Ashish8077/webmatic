"use client";
import { Media } from "../../types";
import { MediaCard } from "../media-card";
import { EmptyMediaState } from "../empty-media-state";

interface MediaGridProps {
  media: Media[];
  selectedIds?: number[];
  onMediaClick?: (media: Media) => void;
  isLoading?: boolean;
  onUploadClick: () => void;
  isFiltered?: boolean;
}

export function MediaGrid({
  media,
  selectedIds = [],
  onMediaClick,
  isLoading,
  onUploadClick,
  isFiltered,
}: MediaGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    );
  }

  if (media.length === 0) {
    return (
      <EmptyMediaState onUploadClick={onUploadClick} isFiltered={isFiltered} />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {media.map((item) => (
        <MediaCard
          key={item.id}
          media={item}
          isSelected={selectedIds.includes(item.id)}
          onClick={onMediaClick}
        />
      ))}
    </div>
  );
}

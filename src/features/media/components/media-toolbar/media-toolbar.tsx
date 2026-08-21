"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaFilters } from "../media-filters";
import { MediaQuery } from "../../types/media-query.types";

interface MediaToolbarProps {
  query: MediaQuery;
  onSearchChange: (search: string) => void;
  onFolderChange: (folder: string | undefined) => void;
  onTypeChange: (type: string | undefined) => void;
  onSortChange: (sortBy: string) => void;
  onUploadClick: () => void;
}

export function MediaToolbar({
  query,
  onSearchChange,
  onFolderChange,
  onTypeChange,
  onSortChange,
  onUploadClick,
}: MediaToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center justify-between pb-4 border-b border-border">
      <div className="flex-1 min-w-70 max-w-3xl">
        <MediaFilters
          query={query}
          onSearchChange={onSearchChange}
          onFolderChange={onFolderChange}
          onTypeChange={onTypeChange}
          onSortChange={onSortChange}
        />
      </div>
      <div className="flex-shrink-0">
        <Button onClick={onUploadClick} className="w-full sm:w-auto gap-2">
          <Plus size={16} strokeWidth={2} />
          Upload Media
        </Button>
      </div>
    </div>
  );
}

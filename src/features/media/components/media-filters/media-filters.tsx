"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { MEDIA_FOLDERS } from "../../constants/folders";
import { MediaQuery } from "../../types/media-query.types";

interface MediaFiltersProps {
  query: MediaQuery;
  onSearchChange: (search: string) => void;
  onFolderChange: (folder: string | undefined) => void;
  onTypeChange: (type: string | undefined) => void;
  onSortChange: (sortBy: string) => void;
}

export function MediaFilters({
  query,
  onSearchChange,
  onFolderChange,
  onTypeChange,
  onSortChange,
}: MediaFiltersProps) {
  const folderOptions = [
    { value: "all", label: "All Folders" },
    ...MEDIA_FOLDERS.map((f) => ({ value: f.value, label: f.label })),
  ];

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "image", label: "Images" },
    { value: "document", label: "Documents" },
    { value: "video", label: "Videos" },
  ];

  const sortOptions = [
    { value: "created_at", label: "Upload Date" },
    { value: "original_name", label: "File Name" },
    { value: "size", label: "File Size" },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center w-full">
      <div className="relative flex-1 min-w-[200px]">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search size={16} className="text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder="Search media..."
          className="pl-10"
          value={query.search || ""}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
        <div className="w-[140px] shrink-0">
          <Select
            options={folderOptions}
            value={query.folder || "all"}
            onChange={(e) => onFolderChange(e.target.value)}
            placeholder="Folder"
          />
        </div>
        <div className="w-[140px] shrink-0">
          <Select
            options={typeOptions}
            value={query.type || "all"}
            onChange={(e) => onTypeChange(e.target.value)}
            placeholder="Type"
          />
        </div>
        <div className="w-[140px] shrink-0">
          <Select
            options={sortOptions}
            value={query.sortBy || "created_at"}
            onChange={(e) => onSortChange(e.target.value)}
            placeholder="Sort by"
          />
        </div>
      </div>
    </div>
  );
}

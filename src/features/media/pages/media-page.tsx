"use client";

import { useState } from "react";
import { Media } from "../types";
import { useMedia } from "../hooks/use-media";
import { useMediaFilters } from "../hooks/use-media-filters";
import { MediaGrid } from "../components/media-grid";
import { MediaToolbar } from "../components/media-toolbar";
import { MediaPagination } from "../components/media-pagination";
import { MediaUploadDialog } from "../components/media-upload";
import { MediaInspector } from "../components/media-inspector";

export function MediaPage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const {
    query,
    updateSearch,
    updateFolder,
    updateType,
    updateSort,
    updatePagination,
  } = useMediaFilters();

  const { data, isLoading } = useMedia(query);

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col overflow-hidden -m-4 sm:-m-6 md:-m-8">
      {/* Header / Toolbar Area */}
      <div className="flex-none border-b border-border bg-background p-4 sm:p-6 md:p-8 pb-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your images, videos, and documents
          </p>
        </div>
        
        <MediaToolbar
          query={query}
          onSearchChange={updateSearch}
          onFolderChange={updateFolder}
          onTypeChange={updateType}
          onSortChange={updateSort}
          onUploadClick={() => setIsUploadOpen(true)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0 bg-muted/10">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 flex flex-col min-h-0">
          <div className="flex-1">
            <MediaGrid
              media={data?.items || []}
              isLoading={isLoading}
              selectedId={selectedMedia?.id}
              onSelect={setSelectedMedia}
              onUploadClick={() => setIsUploadOpen(true)}
              isFiltered={!!query.search || !!query.folder || !!query.type}
            />
          </div>
          
          {data?.pagination && (
            <div className="flex-none mt-6">
              <MediaPagination
                pagination={data.pagination}
                onPaginationChange={updatePagination}
              />
            </div>
          )}
        </div>

        {/* Inspector Sidebar */}
        <MediaInspector
          media={selectedMedia}
          isOpen={!!selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      </div>

      {/* Upload Dialog */}
      <MediaUploadDialog
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        defaultFolder={query.folder}
      />
    </div>
  );
}

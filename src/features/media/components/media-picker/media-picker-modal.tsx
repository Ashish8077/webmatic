"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { MediaGrid } from "../media-grid";
import { MediaToolbar } from "../media-toolbar";
import { MediaPagination } from "../media-pagination";
import { MediaUploadDialog } from "../media-upload";
import { useMedia } from "../../hooks/use-media";
import { useMediaFilters } from "../../hooks/use-media-filters";
import { Media } from "../../types";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: Media) => void;
  defaultFolder?: string;
}

export function MediaPickerModal({ isOpen, onClose, onSelect, defaultFolder }: MediaPickerModalProps) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const {
    query,
    updateSearch,
    updateFolder,
    updateType,
    updateSort,
    updatePagination,
  } = useMediaFilters({ folder: defaultFolder });

  // Only fetch when the modal is open
  const { data, isLoading } = useMedia(query, { enabled: isOpen });

  const handleSelect = () => {
    if (selectedMedia) {
      onSelect(selectedMedia);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedMedia(null);
    onClose();
  };

  const footer = (
    <div className="flex items-center justify-between w-full">
      <div className="text-sm text-muted-foreground">
        {selectedMedia ? (
          <span>Selected: <span className="font-medium text-foreground">{selectedMedia.originalName}</span></span>
        ) : (
          <span>No media selected</span>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleSelect} disabled={!selectedMedia}>
          Select Media
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={handleClose}
        title="Select Media"
        size="lg"
        footer={footer}
      >
        <div className="flex flex-col min-h-0 gap-4 h-[60vh]">
          <MediaToolbar
            query={query}
            onSearchChange={updateSearch}
            onFolderChange={updateFolder}
            onTypeChange={updateType}
            onSortChange={updateSort}
            onUploadClick={() => setIsUploadOpen(true)}
          />

          <div className="flex-1 overflow-y-auto min-h-0 pr-2">
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
            <div className="shrink-0 border-t border-card-border pt-4 mt-auto">
              <MediaPagination
                pagination={data.pagination}
                onPaginationChange={updatePagination}
              />
            </div>
          )}
        </div>
      </Modal>

      <MediaUploadDialog
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        defaultFolder={query.folder}
      />
    </>
  );
}

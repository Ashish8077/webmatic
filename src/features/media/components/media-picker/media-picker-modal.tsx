"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { MediaBrowser } from "../media-browser";
import { Media } from "../../types";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: Media) => void;
  defaultFolder?: string;
}

/**
 * MediaPickerModal — thin composition wrapper.
 *
 * All orchestration (fetching, filtering, pagination) is delegated
 * to MediaBrowser in "select" mode. This component only manages the
 * modal shell and the select/cancel footer actions.
 */
export function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  defaultFolder,
}: MediaPickerModalProps) {
  const [pendingMedia, setPendingMedia] = useState<Media | null>(null);

  const handleSelect = (media: Media) => {
    setPendingMedia(media);
  };

  const handleConfirm = () => {
    if (pendingMedia) {
      onSelect(pendingMedia);
      handleClose();
    }
  };

  const handleClose = () => {
    setPendingMedia(null);
    onClose();
  };

  const footer = (
    <div className="flex items-center justify-between w-full">
      <div className="text-sm text-muted-foreground">
        {pendingMedia ? (
          <span>
            Selected:{" "}
            <span className="font-medium text-foreground">
              {pendingMedia.originalName}
            </span>
          </span>
        ) : (
          <span>No media selected</span>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} disabled={!pendingMedia}>
          Select Media
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Select Media"
      size="lg"
      footer={footer}
    >
      <div className="h-[60vh]">
        <MediaBrowser
          mode="select"
          selectionMode="single"
          defaultFolder={defaultFolder}
          onSelect={handleSelect}
          enabled={isOpen}
        />
      </div>
    </Modal>
  );
}

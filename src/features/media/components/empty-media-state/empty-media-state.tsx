"use client";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyMediaStateProps {
  onUploadClick: () => void;
  isFiltered?: boolean;
}

export function EmptyMediaState({ onUploadClick, isFiltered }: EmptyMediaStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <ImageIcon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">No media found</h3>
      <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm">
        {isFiltered 
          ? "No media files match your current filters. Try adjusting your search or folder selection." 
          : "You haven't uploaded any media yet. Upload your first image or document to get started."}
      </p>
      {!isFiltered && (
        <Button onClick={onUploadClick}>
          Upload Media
        </Button>
      )}
    </div>
  );
}

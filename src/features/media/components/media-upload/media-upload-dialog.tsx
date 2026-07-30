"use client";
import { useState, useRef } from "react";
import { UploadCloud, X, File as FileIcon } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { MEDIA_FOLDERS } from "../../constants/folders";
import { useUploadMedia } from "../../hooks/use-upload-media";

interface MediaUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFolder?: string;
}

export function MediaUploadDialog({ isOpen, onClose, defaultFolder }: MediaUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState<string>(defaultFolder || "general");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadMedia, isPending } = useUploadMedia();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    if (folder) formData.append("folder", folder);

    uploadMedia(formData, {
      onSuccess: () => {
        setFile(null);
        onClose();
      },
    });
  };

  const folderOptions = MEDIA_FOLDERS.map((f) => ({ value: f.value, label: f.label }));

  const footer = (
    <div className="flex justify-end gap-2">
      <Button variant="secondary" onClick={onClose} disabled={isPending}>
        Cancel
      </Button>
      <Button onClick={handleUpload} disabled={!file || isPending}>
        {isPending ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!isPending) onClose();
      }}
      title="Upload Media"
      size="sm"
      footer={footer}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Select Folder</label>
          <Select
            options={folderOptions}
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
          />
        </div>

        {!file ? (
          <div
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 text-center transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-card-border hover:bg-surface-hover"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <UploadCloud className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="mb-1 text-sm font-medium">Drag & drop your file here</p>
            <p className="mb-4 text-xs text-muted-foreground">Or click to browse from your computer</p>
            <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
              Select File
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-md border border-card-border p-3 bg-surface-hover">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-card-bg border border-card-border">
                <FileIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex flex-col overflow-hidden text-sm">
                <span className="truncate font-medium text-foreground">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            </div>
            <button
              onClick={() => setFile(null)}
              disabled={isPending}
              className="shrink-0 p-1.5 rounded text-muted-foreground hover:bg-card-bg hover:text-foreground disabled:opacity-50"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

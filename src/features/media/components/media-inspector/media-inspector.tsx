"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, ExternalLink, Download, Trash2, Calendar, FileType, HardDrive } from "lucide-react";
import { formatFileSize, formatMediaDate } from "../../utils";
import { Media } from "../../types";
import { MEDIA_FOLDERS } from "../../constants/folders";
import { updateMediaSchema, UpdateMediaFormValues } from "../../validation";
import { useUpdateMedia, useDeleteMedia } from "../../hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useState } from "react";

interface MediaInspectorProps {
  media: Media | null;
  onClose: () => void;
  isOpen: boolean;
}

export function MediaInspector({ media, onClose, isOpen }: MediaInspectorProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const { mutate: updateMedia, isPending: isUpdating } = useUpdateMedia();
  const { mutate: deleteMedia, isPending: isDeleting } = useDeleteMedia();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty },
  } = useForm<UpdateMediaFormValues>({
    resolver: zodResolver(updateMediaSchema),
  });

  useEffect(() => {
    if (media) {
      reset({
        altText: media.altText || "",
        caption: media.caption || "",
        folder: media.folder || "",
      });
    }
  }, [media, reset]);

  if (!isOpen || !media) return null;

  const onSubmit = (data: UpdateMediaFormValues) => {
    updateMedia({ id: media.id, data });
  };

  const handleDelete = () => {
    deleteMedia(media.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        onClose();
      },
    });
  };

  const folderOptions = [
    { value: "", label: "No Folder" },
    ...MEDIA_FOLDERS.map((f) => ({ value: f.value, label: f.label })),
  ];
  
  const imageUrl = media.url || media.storagePath;
  const isImage = media.type === "image";

  return (
    <>
      <div className="fixed inset-y-0 right-0 z-40 w-full max-w-sm border-l border-border bg-card-bg shadow-xl transition-transform duration-300 flex flex-col">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold text-foreground">Media Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="px-2">
            <X size={18} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          <div className="relative aspect-video w-full rounded-md border border-card-border bg-muted/50 overflow-hidden flex items-center justify-center">
            {isImage ? (
              <Image
                src={imageUrl}
                alt={media.altText || media.originalName}
                fill
                className="object-contain"
                unoptimized={media.disk === "local"}
              />
            ) : (
              <span className="text-muted-foreground font-medium text-sm">{media.extension.toUpperCase()} File</span>
            )}
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <p className="font-medium text-foreground truncate" title={media.originalName}>
              {media.originalName}
            </p>
            <div className="grid grid-cols-2 gap-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={14} /> {formatMediaDate(media.createdAt)}
              </div>
              <div className="flex items-center gap-2">
                <HardDrive size={14} /> {formatFileSize(media.size)}
              </div>
              <div className="flex items-center gap-2">
                <FileType size={14} /> {media.mimeType}
              </div>
              {media.width && media.height && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-xs">WH</span> {media.width}x{media.height}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="flex-1" onClick={() => window.open(imageUrl, '_blank')}>
              <ExternalLink size={14} className="mr-2" /> View
            </Button>
            <Button variant="secondary" size="sm" className="flex-1" onClick={() => {
               const a = document.createElement('a');
               a.href = imageUrl;
               a.download = media.fileName;
               a.click();
            }}>
              <Download size={14} className="mr-2" /> Download
            </Button>
          </div>

          <form id="media-edit-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 border-t border-card-border pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Folder</label>
              <Select
                options={folderOptions}
                value={media.folder || ""}
                onChange={(e) => setValue("folder", e.target.value, { shouldDirty: true })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Alt Text</label>
              <Input {...register("altText")} placeholder="Describe the image..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Caption</label>
              <Input {...register("caption")} placeholder="Image caption..." />
            </div>
          </form>

          <div className="border-t border-card-border pt-4 mt-auto">
            <Button
              variant="danger"
              className="w-full"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 size={16} className="mr-2" /> Delete Permanently
            </Button>
          </div>
        </div>

        <div className="border-t border-border p-4 flex gap-2 bg-card-bg">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Close
          </Button>
          <Button 
            className="flex-1" 
            disabled={!isDirty || isUpdating}
            form="media-edit-form"
            type="submit"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={onClose} 
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Media"
        message={`Are you sure you want to permanently delete "${media.originalName}"? This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete Media"}
        variant="danger"
      />
    </>
  );
}

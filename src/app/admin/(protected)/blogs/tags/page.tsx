"use client";

import { useState } from "react";
import { BlogHeader, TagForm, TagListTable, TagListFilters } from "@/features/blog/components";
import {Pagination} from "@/components/ui/pagination";
import { useTags } from "@/features/blog/hooks/use-tags";
import { useCreateTag } from "@/features/blog/hooks/use-create-tag";
import { useUpdateTag } from "@/features/blog/hooks/use-update-tag";
import { useDeleteTag } from "@/features/blog/hooks/use-delete-tag";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { BlogTag } from "@/features/blog/types/blog.types";

export default function TagsPage() {
  const [query, setQuery] = useState<{ page: number; limit: number; search?: string }>({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useTags(query);
  const createMutation = useCreateTag();
  const [editingTag, setEditingTag] = useState<BlogTag | null>(null);
  const updateMutation = useUpdateTag(editingTag?.id || 0);
  const deleteMutation = useDeleteTag();

  const [deleteTarget, setDeleteTarget] = useState<BlogTag | null>(null);

  const tags = data?.data?.items ?? [];

  const handleCreate = async (data: any) => {
    await createMutation.mutateAsync(data);
  };

  const handleUpdate = async (data: any) => {
    if (!editingTag) return;
    await updateMutation.mutateAsync(data);
    setEditingTag(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="animate-fade-in max-w-6xl">
      <BlogHeader title="Tags" description="Manage blog tags" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-card-bg border border-card-border rounded-2xl p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              {editingTag ? "Edit Tag" : "Add New Tag"}
            </h2>
            <TagForm 
              onSubmit={editingTag ? handleUpdate : handleCreate}
              submitLabel={editingTag ? "Update" : "Add Tag"}
              defaultValues={editingTag || undefined}
              onCancel={editingTag ? () => setEditingTag(null) : undefined}
              key={editingTag ? `edit-${editingTag.id}` : "create"}
            />
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <TagListFilters
            query={query}
            onSearchChange={(search) => setQuery((prev) => ({ ...prev, search, page: 1 }))}
          />
          <TagListTable 
            tags={tags}
            isLoading={isLoading}
            onEdit={setEditingTag}
            onDelete={setDeleteTarget}
          />

          {data?.data?.pagination && data.data.pagination.totalPages > 1 && (
            <div className="mt-6 flex justify-end">
              <Pagination
                currentPage={data.data.pagination.page}
                totalPages={data.data.pagination.totalPages}
                onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
              />
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Tag"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}

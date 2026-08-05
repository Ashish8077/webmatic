"use client";

import { useState } from "react";
import { BlogHeader, CategoryForm, CategoryListTable, CategoryListFilters } from "@/features/blog/components";
import { Pagination } from "@/components/ui/pagination";
import { useCategories } from "@/features/blog/hooks/use-categories";
import { useCreateCategory } from "@/features/blog/hooks/use-create-category";
import { useUpdateCategory } from "@/features/blog/hooks/use-update-category";
import { useDeleteCategory } from "@/features/blog/hooks/use-delete-category";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { BlogCategory } from "@/features/blog/types/blog.types";

export default function CategoriesPage() {
  const [query, setQuery] = useState<{ page: number; limit: number; search?: string }>({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useCategories(query);
  const createMutation = useCreateCategory();
  // Using 0 as a placeholder for the update mutation when no item is selected
  // In a real app we'd want a separate component or a refactored hook, but this matches the standard pattern for now
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const updateMutation = useUpdateCategory(editingCategory?.id || 0);
  const deleteMutation = useDeleteCategory();

  const [deleteTarget, setDeleteTarget] = useState<BlogCategory | null>(null);

  const categories = data?.data?.items ?? [];

  const handleCreate = async (data: any) => {
    await createMutation.mutateAsync(data);
  };

  const handleUpdate = async (data: any) => {
    if (!editingCategory) return;
    await updateMutation.mutateAsync(data);
    setEditingCategory(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="animate-fade-in max-w-6xl">
      <BlogHeader title="Categories" description="Manage blog categories" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-card-bg border border-card-border rounded-2xl p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h2>
            <CategoryForm 
              onSubmit={editingCategory ? handleUpdate : handleCreate}
              submitLabel={editingCategory ? "Update" : "Add Category"}
              defaultValues={editingCategory || undefined}
              onCancel={editingCategory ? () => setEditingCategory(null) : undefined}
              key={editingCategory ? `edit-${editingCategory.id}` : "create"}
            />
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <CategoryListFilters
            query={query}
            onSearchChange={(search) => setQuery((prev) => ({ ...prev, search, page: 1 }))}
          />
          <CategoryListTable 
            categories={categories}
            isLoading={isLoading}
            onEdit={setEditingCategory}
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
        title="Delete Category"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}

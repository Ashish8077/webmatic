"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Pagination } from "@/components/ui/pagination";
import {
  BlogListFilters,
  BlogListHeader,
  BlogListTable,
} from "@/features/blog/components";
import { useBlogs } from "@/features/blog/hooks/use-blogs";
import { useBlogFilters } from "@/features/blog/hooks/use-blog-filters";
import { useDeleteBlog } from "@/features/blog/hooks/use-delete-blog";
import { useToggleStatus } from "@/features/blog/hooks/use-toggle-status";
import type { BlogListItem } from "@/features/blog/types/blog.types";

export default function BlogsListPage() {
  const { query, updateSearch, updateStatus, updatePage, updateSort } = useBlogFilters();
  const { data, isPending } = useBlogs(query);
  const deleteBlogMutation = useDeleteBlog();
  const toggleStatusMutation = useToggleStatus();

  const [deleteTarget, setDeleteTarget] = useState<BlogListItem | null>(null);

  const blogs = data?.data?.items ?? [];

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteBlogMutation.mutate(deleteTarget.id);
    setDeleteTarget(null);
  };

  const handleToggleStatus = (blog: BlogListItem) => {
    toggleStatusMutation.mutate({ id: blog.id, currentStatus: blog.status });
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <BlogListHeader title="Blogs" />

      {/* Filters */}
      <BlogListFilters
        query={query}
        onSearchChange={updateSearch}
        onStatusChange={updateStatus}
        onSortChange={updateSort}
      />

      {/* Table */}
      <BlogListTable
        blogs={blogs}
        isLoading={isPending}
        onDelete={setDeleteTarget}
        onToggleStatus={handleToggleStatus}
      />

      {/* Pagination */}
      {data?.data?.pagination && data.data.pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-end">
          <Pagination
            currentPage={data.data.pagination.page}
            totalPages={data.data.pagination.totalPages}
            onPageChange={updatePage}
          />
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Blog"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}

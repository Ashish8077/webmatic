"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  PageListFilters,
  PageListHeader,
  PageListTable,
} from "@/features/pages/components";
import { usePages } from "@/features/pages/hooks/use-pages";
import { usePageFilters } from "@/features/pages/hooks/use-page-filters";
import { useDeletePage } from "@/features/pages/hooks/use-delete-page";
import { useToggleStatus } from "@/features/pages/hooks/use-toggle-status";
import type { PageListItem } from "@/features/pages/types/page.types";

export default function PagesListPage() {
  const { query, updateSearch, updateStatus } = usePageFilters();
  const { data, isPending } = usePages(query);
  const deletePageMutation = useDeletePage();
  const toggleStatusMutation = useToggleStatus();



  const [deleteTarget, setDeleteTarget] = useState<PageListItem | null>(null);

  const pages = data?.data?.items ?? [];

  const handleDelete = () => {
    if (!deleteTarget) return;
    deletePageMutation.mutate(deleteTarget.id);
    setDeleteTarget(null);
  };

  const handleToggleStatus = (page: PageListItem) => {
    toggleStatusMutation.mutate({ id: page.id, currentStatus: page.status });
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <PageListHeader title="Pages" />

      {/* Filters */}
      <PageListFilters
        query={query}
        onSearchChange={updateSearch}
        onStatusChange={updateStatus}
      />

      {/* Table */}
      <PageListTable
        pages={pages}
        isLoading={isPending}
        onDelete={setDeleteTarget}
        onToggleStatus={handleToggleStatus}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Page"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}

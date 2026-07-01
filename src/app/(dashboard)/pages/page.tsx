"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { dummyPages, type DummyPage } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { showToast } from "@/components/ui/toast";
import { PageListFilters, PageListHeader, PageListTable } from "@/features/pages/components";


export default function PagesListPage() {
  const [pages, setPages] = useState<DummyPage[]>(dummyPages);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft"
  >("all");
  const [deleteTarget, setDeleteTarget] = useState<DummyPage | null>(null);

  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      const matchesSearch =
        !search ||
        page.title.toLowerCase().includes(search.toLowerCase()) ||
        page.slug.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || page.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [pages, search, statusFilter]);

  const handleDelete = (page: DummyPage) => {
    setPages((prev) => prev.filter((p) => p.id !== page.id));
    showToast(`"${page.title}" deleted`, "success");
  };

  const handleToggleStatus = (page: DummyPage) => {
    setPages((prev) =>
      prev.map((p) =>
        p.id === page.id
          ? {
              ...p,
              status: p.status === "published" ? "draft" : "published",
              publishedAt:
                p.status === "draft" ? new Date().toISOString() : null,
            }
          : p,
      ),
    );
    showToast(
      `"${page.title}" ${page.status === "published" ? "unpublished" : "published"}`,
      "success",
    );
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <PageListHeader title="Pages" />

      {/* Filters */}
      <PageListFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Table */}
      <PageListTable
        filteredPages={filteredPages}
        onDelete={setDeleteTarget}
        onToggleStatus={handleToggleStatus}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        title="Delete Page"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}

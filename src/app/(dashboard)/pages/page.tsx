"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { dummyPages, type DummyPage } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { showToast } from "@/components/ui/toast";

export default function PagesListPage() {
  const [pages, setPages] = useState<DummyPage[]>(dummyPages);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pages</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your website pages
          </p>
        </div>
        <Link href="/pages/create">
          <Button size="md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Page
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(["all", "published", "draft"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`
                px-3.5 py-2 text-xs font-medium rounded-lg border transition-all duration-200 capitalize cursor-pointer
                ${
                  statusFilter === status
                    ? "bg-accent/12 text-accent border-accent/30"
                    : "bg-card-bg text-muted-foreground border-card-border hover:border-accent/20 hover:text-foreground"
                }
              `}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
        {filteredPages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">No pages found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Title
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">
                  Published
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">
                  Updated
                </th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((page) => (
                <tr
                  key={page.id}
                  className="border-b border-card-border/50 last:border-0 hover:bg-surface-hover/50 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/pages/${page.id}`}
                      className="hover:text-accent transition-colors"
                    >
                      <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                        {page.title}
                      </p>
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      /{page.slug}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={page.status}>
                      {page.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground hidden lg:table-cell">
                    {page.publishedAt
                      ? new Date(page.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground hidden md:table-cell">
                    {new Date(page.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {/* Sections */}
                      <Link href={`/pages/${page.id}/sections`}>
                        <button
                          title="Manage Sections"
                          className="p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all cursor-pointer"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <line x1="3" y1="9" x2="21" y2="9" />
                            <line x1="3" y1="15" x2="21" y2="15" />
                          </svg>
                        </button>
                      </Link>

                      {/* Edit */}
                      <Link href={`/pages/${page.id}`}>
                        <button
                          title="Edit"
                          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all cursor-pointer"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                      </Link>

                      {/* Toggle status */}
                      <button
                        title={page.status === "published" ? "Unpublish" : "Publish"}
                        onClick={() => handleToggleStatus(page)}
                        className={`p-2 rounded-lg transition-all cursor-pointer ${
                          page.status === "published"
                            ? "text-success hover:text-warning hover:bg-warning/10"
                            : "text-muted-foreground hover:text-success hover:bg-success/10"
                        }`}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          {page.status === "published" ? (
                            <>
                              <rect x="6" y="4" width="4" height="16" />
                              <rect x="14" y="4" width="4" height="16" />
                            </>
                          ) : (
                            <polygon points="5 3 19 12 5 21 5 3" />
                          )}
                        </svg>
                      </button>

                      {/* Delete */}
                      <button
                        title="Delete"
                        onClick={() => setDeleteTarget(page)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all cursor-pointer"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

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

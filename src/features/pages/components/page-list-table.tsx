import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FileText, Rows3, SquarePen, Pause, Play, Trash2 } from "lucide-react";
import type { PageListItem } from "../types/page.types";

interface PageListTableProps {
  pages: PageListItem[];
  isLoading?: boolean;
  onDelete: (page: PageListItem) => void;
  onToggleStatus: (page: PageListItem) => void;
}

function PageListTable({
  pages,
  isLoading,
  onDelete,
  onToggleStatus,
}: PageListTableProps) {
  if (isLoading) {
    return (
      <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground mt-3">Loading pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
      {pages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center mb-3">
            <FileText
              size={24}
              strokeWidth={1.5}
              className="text-muted-foreground"
            />
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
                Template
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
            {pages.map((page) => (
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
                  <Badge variant={page.template === "default" ? "secondary" : "default"} className="capitalize">
                    {page.template.split("-").join(" ")}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <Badge variant={page.status}>{page.status}</Badge>
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
                        <Rows3 size={15} strokeWidth={1.8} />
                      </button>
                    </Link>

                    {/* Edit */}
                    <Link href={`/pages/${page.id}`}>
                      <button
                        title="Edit"
                        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all cursor-pointer"
                      >
                        <SquarePen size={15} strokeWidth={1.8} />
                      </button>
                    </Link>

                    {/* Toggle status */}
                    <button
                      title={
                        page.status === "published" ? "Unpublish" : "Publish"
                      }
                      onClick={() => onToggleStatus(page)}
                      className={`p-2 rounded-lg transition-all cursor-pointer ${
                        page.status === "published"
                          ? "text-success hover:text-warning hover:bg-warning/10"
                          : "text-muted-foreground hover:text-success hover:bg-success/10"
                      }`}
                    >
                      {page.status === "published" ? (
                        <Pause size={15} strokeWidth={1.8} />
                      ) : (
                        <Play size={15} strokeWidth={1.8} />
                      )}
                    </button>

                    {/* Delete */}
                    {!page.isSystem && (
                      <button
                        title="Delete"
                        onClick={() => onDelete(page)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all cursor-pointer"
                      >
                        <Trash2 size={15} strokeWidth={1.8} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PageListTable;

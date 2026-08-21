import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FileText,  SquarePen, Pause, Play, Trash2, CalendarClock } from "lucide-react";
import type { BlogListItem } from "../types/blog.types";

interface BlogListTableProps {
  blogs: BlogListItem[];
  isLoading?: boolean;
  onDelete: (blog: BlogListItem) => void;
  onToggleStatus: (blog: BlogListItem) => void;
}

function BlogListTable({
  blogs,
  isLoading,
  onDelete,
  onToggleStatus,
}: BlogListTableProps) {
  if (isLoading) {
    return (
      <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground mt-3">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
      {blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center mb-3">
            <FileText
              size={24}
              strokeWidth={1.5}
              className="text-muted-foreground"
            />
          </div>
          <p className="text-sm text-muted-foreground">No blogs found</p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-card-border">
              <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Title
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Featured
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
            {blogs.map((blog) => (
              <tr
                key={blog.id}
                className="border-b border-card-border/50 last:border-0 hover:bg-surface-hover/50 transition-colors group"
              >
                <td className="px-5 py-4">
                  <Link
                    href={`/admin/blogs/${blog.id}`}
                    className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors font-medium text-sm"
                  >
                    <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {blog.title}
                    </p>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    /{blog.slug}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <Badge variant={blog.isFeatured ? "default" : "secondary"} className="capitalize">
                    {blog.isFeatured ? "Yes" : "No"}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <Badge variant={
                    blog.status === "published" ? "published" :
                    blog.status === "scheduled" ? "draft" : "draft"
                  }>
                    {blog.status}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground hidden lg:table-cell">
                  {blog.publishedAt
                    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"}
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground hidden md:table-cell">
                  {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    {/* Edit */}
                    <Link href={`/admin/blogs/${blog.id}`}>
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
                        blog.status === "published" ? "Unpublish" : "Publish"
                      }
                      onClick={() => onToggleStatus(blog)}
                      className={`p-2 rounded-lg transition-all cursor-pointer ${
                        blog.status === "published"
                          ? "text-success hover:text-warning hover:bg-warning/10"
                          : blog.status === "scheduled"
                          ? "text-warning hover:text-success hover:bg-success/10"
                          : "text-muted-foreground hover:text-success hover:bg-success/10"
                      }`}
                    >
                      {blog.status === "published" ? (
                        <Pause size={15} strokeWidth={1.8} />
                      ) : blog.status === "scheduled" ? (
                        <CalendarClock size={15} strokeWidth={1.8} />
                      ) : (
                        <Play size={15} strokeWidth={1.8} />
                      )}
                    </button>

                    {/* Delete */}
                    <button
                      title="Delete"
                      onClick={() => onDelete(blog)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all cursor-pointer"
                    >
                      <Trash2 size={15} strokeWidth={1.8} />
                    </button>
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

export default BlogListTable;

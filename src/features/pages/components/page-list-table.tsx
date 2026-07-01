import { Badge } from "@/components/ui/badge";
import { DummyPage } from "@/lib/dummy-data";
import { Link } from "lucide-react";

function PageListTable({
  filteredPages,
  onDelete,
  onToggleStatus,
}: {
  filteredPages: DummyPage[];
  onDelete: (page: DummyPage) => void;
  onToggleStatus: (page: DummyPage) => void;
}) {
  return (
    <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
      {filteredPages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center mb-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
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
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
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
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
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
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
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
                      onClick={() => onDelete(page)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all cursor-pointer"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
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
  );
}

export default PageListTable;

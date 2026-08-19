import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { SquarePen, Pause, Play, Trash2, Star } from "lucide-react";
import type { WorkProjectListItem } from "../types/work-project.types";
import clsx from "clsx";
import { usePermissions } from "@/features/auth/api/use-has-permission";
import { Permission } from "@/features/auth/constants/permissions";

interface WorkProjectListTableProps {
  workProjects: WorkProjectListItem[];
  isLoading?: boolean;
  onDelete: (workProject: WorkProjectListItem) => void;
  onToggleStatus: (workProject: WorkProjectListItem) => void;
  onToggleFeatured: (workProject: WorkProjectListItem) => void;
}

export default function WorkProjectListTable({
  workProjects,
  isLoading,
  onDelete,
  onToggleStatus,
  onToggleFeatured,
}: WorkProjectListTableProps) {
  const { has } = usePermissions();
  const canUpdate = has(Permission.WORK_UPDATE);
  const canPublish = has(Permission.WORK_PUBLISH);
  const canDelete = has(Permission.WORK_DELETE);

  if (isLoading) {
    return (
      <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground mt-3">Loading workProjects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
      {workProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center mb-3">
            <span className="text-muted-foreground text-2xl">📋</span>
          </div>
          <p className="text-sm text-muted-foreground">No workProjects found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-card-border bg-surface-hover/30">
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  WorkProject
                </th>
                <th className="text-center px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Featured
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">
                  Published
                </th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {workProjects.map((workProject) => (
                <tr
                  key={workProject.id}
                  className="border-b border-card-border/50 last:border-0 hover:bg-surface-hover/50 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/work/projects/${workProject.id}`}
                      className="hover:text-accent transition-colors block"
                    >
                      <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                        {workProject.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        /{workProject.slug}
                      </p>
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      type="button"
                      disabled={!canUpdate}
                      onClick={() => onToggleFeatured(workProject)}
                      className="p-2 rounded-full hover:bg-surface-hover transition-colors inline-flex disabled:opacity-50 disabled:cursor-not-allowed"
                      title={workProject.isFeatured ? "Remove from featured" : "Mark as featured"}
                    >
                      <Star 
                        size={18} 
                        className={clsx(
                          workProject.isFeatured ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        )} 
                      />
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={workProject.status}>{workProject.status}</Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground hidden lg:table-cell">
                    {workProject.publishedAt
                      ? new Date(workProject.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {canUpdate && (
                        <Link href={`/admin/work/projects/${workProject.id}`}>
                          <button
                            title="Edit"
                            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all cursor-pointer"
                          >
                            <SquarePen size={15} strokeWidth={1.8} />
                          </button>
                        </Link>
                      )}

                      {canPublish && (
                        <button
                          title={workProject.status === "published" ? "Unpublish" : "Publish"}
                          onClick={() => onToggleStatus(workProject)}
                          className={`p-2 rounded-lg transition-all cursor-pointer ${
                            workProject.status === "published"
                              ? "text-success hover:text-warning hover:bg-warning/10"
                              : "text-muted-foreground hover:text-success hover:bg-success/10"
                          }`}
                        >
                          {workProject.status === "published" ? (
                            <Pause size={15} strokeWidth={1.8} />
                          ) : (
                            <Play size={15} strokeWidth={1.8} />
                          )}
                        </button>
                      )}

                      {canDelete && (
                        <button
                          title="Delete"
                          onClick={() => onDelete(workProject)}
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
        </div>
      )}
    </div>
  );
}

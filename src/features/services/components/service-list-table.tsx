import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { SquarePen, Pause, Play, Trash2, Star } from "lucide-react";
import type { ServiceListItem } from "../types/service.types";
import clsx from "clsx";

interface ServiceListTableProps {
  services: ServiceListItem[];
  isLoading?: boolean;
  onDelete: (service: ServiceListItem) => void;
  onToggleStatus: (service: ServiceListItem) => void;
  onToggleFeatured: (service: ServiceListItem) => void;
}

export default function ServiceListTable({
  services,
  isLoading,
  onDelete,
  onToggleStatus,
  onToggleFeatured,
}: ServiceListTableProps) {
  if (isLoading) {
    return (
      <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground mt-3">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
      {services.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center mb-3">
            <span className="text-muted-foreground text-2xl">📋</span>
          </div>
          <p className="text-sm text-muted-foreground">No services found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-card-border bg-surface-hover/30">
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Service
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
              {services.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-card-border/50 last:border-0 hover:bg-surface-hover/50 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/services/${service.id}`}
                      className="hover:text-accent transition-colors block"
                    >
                      <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                        {service.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        /{service.slug}
                      </p>
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => onToggleFeatured(service)}
                      className="p-2 rounded-full hover:bg-surface-hover transition-colors inline-flex"
                      title={service.isFeatured ? "Remove from featured" : "Mark as featured"}
                    >
                      <Star 
                        size={18} 
                        className={clsx(
                          service.isFeatured ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        )} 
                      />
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={service.status}>{service.status}</Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground hidden lg:table-cell">
                    {service.publishedAt
                      ? new Date(service.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/services/${service.id}`}>
                        <button
                          title="Edit"
                          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all cursor-pointer"
                        >
                          <SquarePen size={15} strokeWidth={1.8} />
                        </button>
                      </Link>

                      <button
                        title={service.status === "published" ? "Unpublish" : "Publish"}
                        onClick={() => onToggleStatus(service)}
                        className={`p-2 rounded-lg transition-all cursor-pointer ${
                          service.status === "published"
                            ? "text-success hover:text-warning hover:bg-warning/10"
                            : "text-muted-foreground hover:text-success hover:bg-success/10"
                        }`}
                      >
                        {service.status === "published" ? (
                          <Pause size={15} strokeWidth={1.8} />
                        ) : (
                          <Play size={15} strokeWidth={1.8} />
                        )}
                      </button>

                      <button
                        title="Delete"
                        onClick={() => onDelete(service)}
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
        </div>
      )}
    </div>
  );
}

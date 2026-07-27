import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { SquarePen, Pause, Play, Trash2 } from "lucide-react";
import type { TestimonialListItem } from "../types/testimonial.types";

interface TestimonialListTableProps {
  testimonials: TestimonialListItem[];
  isLoading?: boolean;
  onDelete: (testimonial: TestimonialListItem) => void;
  onToggleStatus: (testimonial: TestimonialListItem) => void;
}

export default function TestimonialListTable({
  testimonials,
  isLoading,
  onDelete,
  onToggleStatus,
}: TestimonialListTableProps) {
  if (isLoading) {
    return (
      <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground mt-3">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
      {testimonials.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center mb-3">
            <span className="text-muted-foreground text-2xl">📋</span>
          </div>
          <p className="text-sm text-muted-foreground">No testimonials found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-card-border bg-surface-hover/30">
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Client / Company
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Rating
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
              {testimonials.map((testimonial) => (
                <tr
                  key={testimonial.id}
                  className="border-b border-card-border/50 last:border-0 hover:bg-surface-hover/50 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/testimonials/${testimonial.id}`}
                      className="hover:text-accent transition-colors block"
                    >
                      <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                        {testimonial.clientName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {[testimonial.designation, testimonial.companyName]
                          .filter(Boolean)
                          .join(", ") || "—"}
                      </p>
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <span>{testimonial.rating}</span>
                      <span className="text-xs">/ 5</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={testimonial.status}>{testimonial.status}</Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground hidden lg:table-cell">
                    {testimonial.publishedAt
                      ? new Date(testimonial.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/testimonials/${testimonial.id}`}>
                        <button
                          title="Edit"
                          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all cursor-pointer"
                        >
                          <SquarePen size={15} strokeWidth={1.8} />
                        </button>
                      </Link>

                      <button
                        title={testimonial.status === "published" ? "Unpublish" : "Publish"}
                        onClick={() => onToggleStatus(testimonial)}
                        className={`p-2 rounded-lg transition-all cursor-pointer ${
                          testimonial.status === "published"
                            ? "text-success hover:text-warning hover:bg-warning/10"
                            : "text-muted-foreground hover:text-success hover:bg-success/10"
                        }`}
                      >
                        {testimonial.status === "published" ? (
                          <Pause size={15} strokeWidth={1.8} />
                        ) : (
                          <Play size={15} strokeWidth={1.8} />
                        )}
                      </button>

                      <button
                        title="Delete"
                        onClick={() => onDelete(testimonial)}
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

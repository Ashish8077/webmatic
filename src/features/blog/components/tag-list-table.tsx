
import { SquarePen, Trash2 } from "lucide-react";
import type { BlogTag } from "../types/blog.types";

interface TagListTableProps {
  tags: BlogTag[];
  isLoading?: boolean;
  onEdit: (tag: BlogTag) => void;
  onDelete: (tag: BlogTag) => void;
}

export function TagListTable({
  tags,
  isLoading,
  onEdit,
  onDelete,
}: TagListTableProps) {
  if (isLoading) {
    return (
      <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground mt-3">Loading tags...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
      {tags.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <p className="text-sm text-muted-foreground">No tags found</p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-card-border">
              <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Name
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Slug
              </th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr
                key={tag.id}
                className="border-b border-card-border/50 last:border-0 hover:bg-surface-hover/50 transition-colors group"
              >
                <td className="px-5 py-4 font-medium text-sm text-foreground">
                  {tag.name}
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground">
                  /{tag.slug}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      title="Edit"
                      onClick={() => onEdit(tag)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all cursor-pointer"
                    >
                      <SquarePen size={15} strokeWidth={1.8} />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => onDelete(tag)}
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

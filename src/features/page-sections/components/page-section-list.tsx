"use client";

import {
  Eye,
  EyeOff,
  FileText,
  Plus,
  Rows3,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { stringifySectionContent } from "../schemas/page-section.utils";
import type { PageSectionListItem } from "../types/page-section.types";

interface PageSectionListProps {
  sections: PageSectionListItem[];
  isLoading?: boolean;
  onCreate: () => void;
  onEdit: (section: PageSectionListItem) => void;
  onDelete: (section: PageSectionListItem) => void;
  onToggleStatus: (section: PageSectionListItem) => void;
  updatingSectionId?: number | null;
}

function getContentPreview(section: PageSectionListItem): string {
  const content = stringifySectionContent(section.content);
  return content.length > 220 ? `${content.slice(0, 220)}...` : content;
}

export function PageSectionList({
  sections,
  isLoading = false,
  onCreate,
  onEdit,
  onDelete,
  onToggleStatus,
  updatingSectionId = null,
}: PageSectionListProps) {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-card-border bg-card-bg">
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="mt-3 text-sm text-muted-foreground">
            Loading sections...
          </p>
        </div>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-card-border bg-card-bg px-4 py-16">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-hover">
          <Rows3
            size={24}
            strokeWidth={1.5}
            className="text-muted-foreground"
          />
        </div>
        <p className="text-sm text-muted-foreground">No sections yet</p>
        <button
          onClick={onCreate}
          className="mt-2 inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-hover"
        >
          <Plus size={14} />
          Add section
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sections.map((section) => {
        const isUpdating = updatingSectionId === section.id;

        return (
          <article
            key={section.id}
            className={`
              rounded-2xl border bg-card-bg p-5 transition-all duration-200 hover:border-accent/20
              ${section.status === "published" ? "border-card-border" : "border-card-border/50 opacity-70"}
            `}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-accent/10 px-1.5 text-xs font-bold text-accent">
                    {section.sortOrder}
                  </span>
                  <div className="font-medium text-foreground">
                    {section.sectionType}
                  </div>
                  <Badge
                    variant={
                      section.status === "published" ? "active" : "inactive"
                    }
                  >
                    {section.status === "published" ? "Published" : "Draft"}
                  </Badge>
                </div>

                <div className="mt-3 overflow-hidden rounded-lg border border-card-border/60 bg-surface">
                  <div className="flex items-center gap-2 border-b border-card-border/60 px-3 py-2 text-xs text-muted-foreground">
                    <FileText size={13} />
                    Content
                  </div>
                  <pre className="max-h-[96px] overflow-hidden px-3 py-2 font-mono text-xs leading-5 text-muted-foreground/80">
                    {getContentPreview(section)}
                  </pre>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  title={
                    section.status === "published" ? "Move to Draft" : "Publish"
                  }
                  disabled={isUpdating}
                  onClick={() => onToggleStatus(section)}
                  className={`
                    rounded-lg p-2 transition-all disabled:cursor-not-allowed disabled:opacity-50
                    ${
                      section.status === "published"
                        ? "text-success hover:bg-success/10"
                        : "text-muted-foreground hover:bg-success/10 hover:text-success"
                    }
                  `}
                >
                  {section.status === "published" ? (
                    <Eye size={15} strokeWidth={1.8} />
                  ) : (
                    <EyeOff size={15} strokeWidth={1.8} />
                  )}
                </button>

                <button
                  title="Edit"
                  disabled={isUpdating}
                  onClick={() => onEdit(section)}
                  className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-surface-hover hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <SquarePen size={15} strokeWidth={1.8} />
                </button>

                <button
                  title="Delete"
                  disabled={isUpdating}
                  onClick={() => onDelete(section)}
                  className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-danger/10 hover:text-danger disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={15} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/shared/hooks/use-debounce";

import type { BlogQuery } from "@/features/blog/types/blog-query";
import { Select } from "@/components/ui/select";

export const BLOG_SORT_OPTIONS = [
  { label: "Recently Updated", value: "updated_at|desc" },
  { label: "Oldest Updated", value: "updated_at|asc" },
  { label: "Title: A to Z", value: "title|asc" },
  { label: "Title: Z to A", value: "title|desc" },
  { label: "Newest Published", value: "published_at|desc" },
  { label: "Oldest Published", value: "published_at|asc" },
];

type BlogListFiltersProps = {
  query: BlogQuery;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: "draft" | "published" | "scheduled" | undefined) => void;
  onSortChange?: (sortBy: BlogQuery["sortBy"], sortOrder: "asc" | "desc") => void;
};

function BlogListFilters({
  query,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: BlogListFiltersProps) {
  const [localSearch, setLocalSearch] = useState(query.search || "");
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    const trimmedLocal = debouncedSearch.trim();
    const currentQuerySearch = query.search || "";
    if (trimmedLocal !== currentQuerySearch) {
      onSearchChange(trimmedLocal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, onSearchChange]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1 max-w-sm">
        <Input
          placeholder="Search blogs..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        {onSortChange && (
          <div className="w-55">
            <Select
              options={BLOG_SORT_OPTIONS}
              value={`${query.sortBy}|${query.sortOrder || "desc"}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split("|");
                onSortChange(sortBy as BlogQuery["sortBy"], sortOrder as "asc" | "desc");
              }}
            />
          </div>
        )}
        <div className="flex gap-2 h-10.5 items-center">
          {(["all", "published", "scheduled", "draft"] as const).map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status === "all" ? undefined : status)}
              className={`
                  h-full px-4 text-xs font-medium rounded-lg border transition-all duration-200 capitalize cursor-pointer
                  ${
                    (
                      status === "all"
                        ? query.status === undefined
                        : query.status === status
                    )
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
    </div>
  );
}

export default BlogListFilters;

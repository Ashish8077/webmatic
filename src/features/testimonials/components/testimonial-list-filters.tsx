import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { GetTestimonialsQuery } from "../api/get-testimonials";

export const TESTIMONIAL_SORT_OPTIONS = [
  { label: "Default Order", value: "sort_order|asc" },
  { label: "Created: Newest First", value: "published_at|desc" },
  { label: "Created: Oldest First", value: "published_at|asc" },
  { label: "Rating: Highest First", value: "rating|desc" },
  { label: "Rating: Lowest First", value: "rating|asc" },
  { label: "Client Name: A to Z", value: "client_name|asc" },
  { label: "Client Name: Z to A", value: "client_name|desc" },
];

type TestimonialListFiltersProps = {
  query: GetTestimonialsQuery;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: "draft" | "published" | undefined) => void;
  onSortChange?: (sortBy: string, sortOrder: "asc" | "desc") => void;
};

export function TestimonialListFilters({
  query,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: TestimonialListFiltersProps) {
  const [localSearch, setLocalSearch] = useState(query.search || "");

  // Debounce search effect
  useEffect(() => {
    const handler = setTimeout(() => {
      // Only call update if trimmed search changed to avoid unnecessary re-fetches
      const trimmedValue = localSearch.trim();
      onSearchChange(trimmedValue);
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [localSearch, onSearchChange]);

  useEffect(() => {
    if (query.search !== localSearch.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalSearch(query.search || "");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.search]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1 max-w-sm">
        <Input
          placeholder="Search for clients or companies..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        {onSortChange && (
          <div className="w-[220px]">
            <Select
              options={TESTIMONIAL_SORT_OPTIONS}
              value={`${query.sortBy}|${query.sortOrder || "asc"}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split("|");
                onSortChange(sortBy, sortOrder as "asc" | "desc");
              }}
            />
          </div>
        )}
        <div className="flex gap-2 h-[42px] items-center">
          {(["all", "published", "draft"] as const).map((status) => (
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

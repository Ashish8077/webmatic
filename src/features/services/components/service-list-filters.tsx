import { useState, useEffect } from "react";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { GetServicesQuery } from "../api/get-services";

export const SERVICE_SORT_OPTIONS = [
  { label: "Default Order", value: "sort_order|asc" },
  { label: "Service Name: A to Z", value: "name|asc" },
  { label: "Service Name: Z to A", value: "name|desc" },
  { label: "Created: Newest First", value: "published_at|desc" },
  { label: "Created: Oldest First", value: "published_at|asc" },
];

type ServiceListFiltersProps = {
  query: GetServicesQuery;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: "draft" | "published" | undefined) => void;
  onSortChange?: (sortBy: string, sortOrder: "asc" | "desc") => void;
};

export function ServiceListFilters({
  query,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: ServiceListFiltersProps) {
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
          placeholder="Search for services..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        {onSortChange && (
          <div className="w-[220px]">
            <Select
              options={SERVICE_SORT_OPTIONS}
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

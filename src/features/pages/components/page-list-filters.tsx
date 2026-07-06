import { Input } from "@/components/ui/input";
import { GetPagesQuery } from "@/modules/pages/schemas/get-pages-query.schema";

import type { PageQuery } from "@/features/pages/types/page-query";

type PageListFiltersProps = {
  query: PageQuery;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: "draft" | "published" | undefined) => void;
};

function PageListFilters({
  query,
  onSearchChange,
  onStatusChange,
}: PageListFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1 max-w-sm">
        <Input
          placeholder="Search pages..."
          value={query.search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        {(["all", "published", "draft"] as const).map((status) => (
          <button
            key={status}
            onClick={() =>
              onStatusChange(status === "all" ? undefined : status)
            }
            className={`
                px-3.5 py-2 text-xs font-medium rounded-lg border transition-all duration-200 capitalize cursor-pointer
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
  );
}

export default PageListFilters;

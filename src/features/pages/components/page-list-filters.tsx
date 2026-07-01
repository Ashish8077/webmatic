import { Input } from "@/components/ui/input";

function PageListFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: {
  search: string;
  setSearch: (search: string) => void;
  statusFilter: "all" | "published" | "draft";
  setStatusFilter: (statusFilter: "all" | "published" | "draft") => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1 max-w-sm">
        <Input
          placeholder="Search pages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        {(["all", "published", "draft"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`
                px-3.5 py-2 text-xs font-medium rounded-lg border transition-all duration-200 capitalize cursor-pointer
                ${
                  statusFilter === status
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

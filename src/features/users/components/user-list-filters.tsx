import { Search, X } from "lucide-react";
import { USER_STATUS } from "@/modules/users/constants/user.constants";
import type { GetUsersQuery } from "@/modules/users/validation/get-users-query.schema";

interface UserListFiltersProps {
  query: GetUsersQuery;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: string | undefined) => void;
}

export default function UserListFilters({
  query,
  onSearchChange,
  onStatusChange,
}: UserListFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={query.search || ""}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 bg-card-bg border border-card-border rounded-xl text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
        />
        {query.search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-card-bg border border-card-border rounded-xl p-1">
          <button
            onClick={() => onStatusChange(undefined)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              !query.status
                ? "bg-surface-hover text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-hover/50"
            }`}
          >
            All
          </button>
          {USER_STATUS.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all capitalize ${
                query.status === status
                  ? "bg-surface-hover text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-hover/50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState, useCallback } from "react";
import type { GetUsersQuery } from "@/modules/users/validation/get-users-query.schema";

export const DEFAULT_USER_QUERY: GetUsersQuery = {
  page: 1,
  limit: 20,
  sortBy: "created_at",
  sortOrder: "desc",
};

export function useUserFilters() {
  const [query, setQuery] = useState<GetUsersQuery>(DEFAULT_USER_QUERY);

  const updateSearch = useCallback((search: string) => {
    setQuery((prev) => ({
      ...prev,
      search: search || undefined,
      page: 1,
    }));
  }, []);

  const updateStatus = useCallback((status: string | undefined) => {
    setQuery((prev) => ({
      ...prev,
      status: status as GetUsersQuery["status"],
      page: 1,
    }));
  }, []);

  const updateSort = useCallback((sortBy: string, explicitOrder?: "asc" | "desc") => {
    setQuery((prev) => {
      if (explicitOrder) {
        return {
          ...prev,
          sortBy: sortBy as GetUsersQuery["sortBy"],
          sortOrder: explicitOrder,
        };
      }
      const isSameColumn = prev.sortBy === sortBy;
      const newSortOrder = isSameColumn && prev.sortOrder === "asc" ? "desc" : "asc";
      
      return {
        ...prev,
        sortBy: sortBy as GetUsersQuery["sortBy"],
        sortOrder: newSortOrder,
      };
    });
  }, []);

  const updatePagination = useCallback((page: number, limit?: number) => {
    setQuery((prev) => {
      const isLimitChanged = limit !== undefined && limit !== prev.limit;
      return {
        ...prev,
        page: isLimitChanged ? 1 : page,
        limit: limit ?? prev.limit,
      };
    });
  }, []);

  return {
    query,
    updateSearch,
    updateStatus,
    updateSort,
    updatePagination,
  };
}

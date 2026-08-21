import { useState, useCallback } from "react";
import type { GetServicesQuery } from "../api/get-services";

export const DEFAULT_SERVICE_QUERY: GetServicesQuery = {
  page: 1,
  limit: 20,
  sortBy: "sort_order",
  sortOrder: "asc",
};

export function useServiceFilters() {
  const [query, setQuery] = useState<GetServicesQuery>(DEFAULT_SERVICE_QUERY);

  const updateSearch = useCallback((search: string) => {
    setQuery((prev) => ({
      ...prev,
      search: search || undefined,
      page: 1, // Reset page on search change
    }));
  }, []);

  const updateStatus = useCallback((status: string | undefined) => {
    // Typecast to handle the enum properly according to the GetServicesQuery definition
    setQuery((prev) => ({
      ...prev,
      status: status as GetServicesQuery["status"],
      page: 1, // Reset page on status change
    }));
  }, []);

  const updateSort = useCallback((sortBy: string, explicitOrder?: "asc" | "desc") => {
    setQuery((prev) => {
      if (explicitOrder) {
        return {
          ...prev,
          sortBy: sortBy as GetServicesQuery["sortBy"],
          sortOrder: explicitOrder,
        };
      }
      const isSameColumn = prev.sortBy === sortBy;
      const newSortOrder = isSameColumn && prev.sortOrder === "asc" ? "desc" : "asc";
      
      return {
        ...prev,
        sortBy: sortBy as GetServicesQuery["sortBy"],
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

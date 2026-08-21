import { useState, useCallback } from "react";
import { MediaQuery } from "../types";

export const DEFAULT_MEDIA_QUERY: MediaQuery = {
  page: 1,
  limit: 20,
  sortBy: "created_at",
  sortOrder: "desc",
};

export function useMediaFilters(initialQuery?: Partial<MediaQuery>) {
  const [query, setQuery] = useState<MediaQuery>({
    ...DEFAULT_MEDIA_QUERY,
    ...initialQuery,
  });

  const updateSearch = useCallback((search: string) => {
    setQuery((prev) => ({
      ...prev,
      search: search || undefined,
      page: 1, // Reset page on search change
    }));
  }, []);

  const updateFolder = useCallback((folder: string | undefined) => {
    setQuery((prev) => ({
      ...prev,
      folder: folder === "all" ? undefined : folder,
      page: 1, // Reset page on folder change
    }));
  }, []);
  
  const updateType = useCallback((type: string | undefined) => {
    setQuery((prev) => ({
      ...prev,
      type: type === "all" ? undefined : type,
      page: 1, // Reset page on type change
    }));
  }, []);

  const updateSort = useCallback((sortBy: string, explicitOrder?: "asc" | "desc") => {
    setQuery((prev) => {
      if (explicitOrder) {
        return {
          ...prev,
          sortBy,
          sortOrder: explicitOrder,
        };
      }
      const isSameColumn = prev.sortBy === sortBy;
      const newSortOrder = isSameColumn && prev.sortOrder === "desc" ? "asc" : "desc";
      
      return {
        ...prev,
        sortBy,
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
    updateFolder,
    updateType,
    updateSort,
    updatePagination,
  };
}

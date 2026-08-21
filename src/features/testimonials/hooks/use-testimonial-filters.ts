import { useState, useCallback } from "react";
import type { GetTestimonialsQuery } from "../api/get-testimonials";

export const DEFAULT_TESTIMONIAL_QUERY: GetTestimonialsQuery = {
  page: 1,
  limit: 20,
  sortBy: "sort_order",
  sortOrder: "asc",
};

export function useTestimonialFilters() {
  const [query, setQuery] = useState<GetTestimonialsQuery>(DEFAULT_TESTIMONIAL_QUERY);

  const updateSearch = useCallback((search: string) => {
    setQuery((prev) => ({
      ...prev,
      search: search || undefined,
      page: 1, // Reset page on search change
    }));
  }, []);

  const updateStatus = useCallback((status: string | undefined) => {
    setQuery((prev) => ({
      ...prev,
      status,
      page: 1, // Reset page on status change
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
      const newSortOrder = isSameColumn && prev.sortOrder === "asc" ? "desc" : "asc";
      
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
    updateStatus,
    updateSort,
    updatePagination,
  };
}

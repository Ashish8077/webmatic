import { useState } from "react";

import { DEFAULT_PAGE_QUERY, type PageQuery } from "../types/page-query";

export function usePageFilters() {
  const [query, setQuery] = useState<PageQuery>(DEFAULT_PAGE_QUERY);

  const updateSearch = (search: string) => {
    setQuery((prev) => ({
      ...prev,
      search,
      page: 1,
    }));
  };

  const updateStatus = (status: "draft" | "published" | undefined) => {
    setQuery((prev) => ({
      ...prev,
      status,
      page: 1,
    }));
  };

  return {
    query,
    updateSearch,
    updateStatus,
  };
}

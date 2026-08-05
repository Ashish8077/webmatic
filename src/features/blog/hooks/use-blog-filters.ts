import { useState } from "react";

import { DEFAULT_BLOG_QUERY, type BlogQuery } from "../types/blog-query";

export function useBlogFilters() {
  const [query, setQuery] = useState<BlogQuery>(DEFAULT_BLOG_QUERY);

  const updateSearch = (search: string) => {
    setQuery((prev) => ({
      ...prev,
      search,
      page: 1,
    }));
  };

  const updateStatus = (status: "draft" | "published" | "scheduled" | undefined) => {
    setQuery((prev) => ({
      ...prev,
      status,
      page: 1,
    }));
  };

  const updateCategory = (category: number | undefined) => {
    setQuery((prev) => ({
      ...prev,
      category,
      page: 1,
    }));
  };

  const updateTag = (tag: number | undefined) => {
    setQuery((prev) => ({
      ...prev,
      tag,
      page: 1,
    }));
  };

  const updatePage = (page: number) => {
    setQuery((prev) => ({
      ...prev,
      page,
    }));
  };

  const updateSort = (sortBy: BlogQuery["sortBy"], sortOrder: "asc" | "desc") => {
    setQuery((prev) => ({
      ...prev,
      sortBy,
      sortOrder,
      page: 1,
    }));
  };

  return {
    query,
    updateSearch,
    updateStatus,
    updateCategory,
    updateTag,
    updatePage,
    updateSort,
  };
}

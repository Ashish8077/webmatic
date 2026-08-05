export const DEFAULT_BLOG_QUERY: BlogQuery = {
  page: 1,
  limit: 10,
  search: "",
  status: undefined,
  category: undefined,
  tag: undefined,
  featured: undefined,
  sortBy: "updated_at",
  sortOrder: "desc",
};

export interface BlogQuery {
  page: number;
  limit: number;
  search: string;
  status?: "draft" | "published" | "scheduled";
  category?: number;
  tag?: number;
  featured?: boolean;
  sortBy:
    | "title"
    | "slug"
    | "status"
    | "created_at"
    | "updated_at"
    | "published_at";
  sortOrder: "asc" | "desc";
}

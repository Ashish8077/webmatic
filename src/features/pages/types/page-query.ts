export const DEFAULT_PAGE_QUERY: PageQuery = {
  page: 1,
  pageSize: 10,
  search: "",
  status: undefined,
  sortBy: "updated_at",
  sortOrder: "desc",
};

export interface PageQuery {
  page: number;
  pageSize: number;
  search: string;
  status?: "draft" | "published";
  sortBy:
    | "title"
    | "slug"
    | "status"
    | "created_at"
    | "updated_at"
    | "published_at";
  sortOrder: "asc" | "desc";
}

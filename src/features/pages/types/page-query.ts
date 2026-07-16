import { PageTemplate } from "@/modules/pages/constants/page-templates";

export const DEFAULT_PAGE_QUERY: PageQuery = {
  page: 1,
  limit: 10,
  search: "",
  status: undefined,
  template: undefined,
  sortBy: "updated_at",
  sortOrder: "desc",
};

export interface PageQuery {
  page: number;
  limit: number;
  search: string;
  status?: "draft" | "published";
  template?: PageTemplate;
  sortBy:
    | "title"
    | "slug"
    | "status"
    | "created_at"
    | "updated_at"
    | "published_at";
  sortOrder: "asc" | "desc";
}

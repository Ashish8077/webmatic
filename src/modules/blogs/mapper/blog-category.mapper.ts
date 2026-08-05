import { BlogCategoryRow } from "../types/repository.types";
import { BlogCategory } from "../types/blog.types";

export function toBlogCategoryResponse(row: BlogCategoryRow): BlogCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toBlogCategoryListResponse(rows: BlogCategoryRow[]): { items: BlogCategory[] } {
  return {
    items: rows.map(toBlogCategoryResponse),
  };
}

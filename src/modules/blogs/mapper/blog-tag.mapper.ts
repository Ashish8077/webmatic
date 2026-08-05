import { BlogTagRow } from "../types/repository.types";
import { BlogTag } from "../types/blog.types";

export function toBlogTagResponse(row: BlogTagRow): BlogTag {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toBlogTagListResponse(rows: BlogTagRow[]): { items: BlogTag[] } {
  return {
    items: rows.map(toBlogTagResponse),
  };
}

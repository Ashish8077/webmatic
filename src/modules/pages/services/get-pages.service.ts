// get-pages.service.ts

import { GetPagesQuery } from "../validators/get-pages-query.schema";
import { countPages, findPages } from "../repositories/page.repository";
import { PageListItem, PageListResponse } from "../types";

export async function getPagesService(
  query: GetPagesQuery,
): Promise<PageListResponse> {
  const [rows, totalItems] = await Promise.all([
    findPages(query),
    countPages(query),
  ]);

  const items: PageListItem[] = rows.map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
  }));

  return {
    items,
    pagination: {
      page: query.page,
      limit: query.limit,
      totalItems,
      totalPages: Math.ceil(totalItems / query.limit),
    },
  };
}

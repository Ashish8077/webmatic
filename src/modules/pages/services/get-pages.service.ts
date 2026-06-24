// get-pages.service.ts

import { GetPagesQuery } from "../validators/get-pages-query.schema";
import { countPages, findPages } from "../repositories/page.repository";

import { PageListItem, PageListResponse } from "../types";
import { AuthUser } from "@/modules/auth/lib/types";

export async function getPagesService(
  query: GetPagesQuery,
  user: AuthUser,
): Promise<PageListResponse> {
  console.log("This is Context inside getPagesService", user.roles);
  console.log("This is Context inside getPagesService", user.permissions);

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

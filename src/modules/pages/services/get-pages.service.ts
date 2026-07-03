// get-pages.service.ts

import { GetPagesQuery } from "../validators/get-pages-query.schema";
import { countPages, findPages } from "../repositories/page.repository";

import { PageListItem, PageListResponse } from "../services/types";

import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";

export async function getPagesService(
  query: GetPagesQuery,
  user: AuthUser,
): Promise<PageListResponse> {
  requirePermission(user, PERMISSIONS.PAGES_VIEW);
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
    updatedAt: row.updated_at,
  }));

  const totalPages = Math.ceil(totalItems / query.pageSize);

  return {
    items,
    pagination: {
      page: query.page,
      pageSize: query.pageSize,
      totalItems,
      totalPages,
      hasNextPage: query.page < totalPages,
      hasPreviousPage: query.page > 1,
    },
  };
}

// get-pages.service.ts

import { GetPagesQuery } from "../validators/get-pages-query.schema";
import { countPages, findPages } from "../repositories/page.repository";

import { PageListItem, PageListResponse } from "../services/types";

import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { toPageListItems } from "../mapper/page.mapper";

export async function getPagesService(
  query: GetPagesQuery,
  user: AuthUser,
): Promise<PageListResponse> {
  requirePermission(user, PERMISSIONS.PAGES_VIEW);
  const [rows, totalItems] = await Promise.all([
    findPages(query),
    countPages(query),
  ]);

  const items = toPageListItems(rows);

  const totalPages = Math.ceil(totalItems / query.limit);

  return {
    items,
    pagination: {
      page: query.page,
      limit: query.limit,
      totalItems,
      totalPages,
      hasNextPage: query.page < totalPages,
      hasPreviousPage: query.page > 1,
    },
  };
}

import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { countCategories, findAllCategories } from "../repositories/blog-category.repository";
import { toBlogCategoryListResponse } from "../mapper/blog-category.mapper";
import { GetCategoriesQuery } from "../validation/get-categories-query.schema";

export async function getBlogCategoriesService(
  query: GetCategoriesQuery,
  user: AuthUser,
) {
  requirePermission(user, PERMISSIONS.BLOG_VIEW);

  const [categories, totalItems] = await Promise.all([
    findAllCategories(query),
    countCategories(query),
  ]);

  const response = toBlogCategoryListResponse(categories);

  const totalPages = Math.ceil(totalItems / query.limit);

  return {
    items: response.items,
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

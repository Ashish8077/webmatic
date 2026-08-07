import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { countTags, findAllTags } from "../repositories/blog-tag.repository";
import { toBlogTagListResponse } from "../mapper/blog-tag.mapper";
import { GetTagsQuery } from "../validation/get-tags-query.schema";

export async function getBlogTagsService(
  query: GetTagsQuery,
  user: AuthUser,
) {
  requirePermission(user, PERMISSIONS.BLOG_TAGS_VIEW);

  const [tags, totalItems] = await Promise.all([
    findAllTags(query),
    countTags(query),
  ]);

  const response = toBlogTagListResponse(tags);

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

import { GetUsersQuery } from "../validation/get-users-query.schema";
import { findUsers, countUsers } from "../repositories/user.repository";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { toUserListItems } from "../mapper/user.mapper";
import type { UserListItem, UserListResult } from "../types/user.types";

export async function getUsersService(
  query: GetUsersQuery,
  user: AuthUser
): Promise<UserListResult> {
  requirePermission(user, PERMISSIONS.USER_VIEW);

  const [rows, totalItems] = await Promise.all([
    findUsers(query),
    countUsers(query),
  ]);

  const items: UserListItem[] = toUserListItems(rows);
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

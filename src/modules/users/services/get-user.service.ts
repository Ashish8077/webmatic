import { findUserById } from "../repositories/user.repository";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { toUserDetail } from "../mapper/user.mapper";
import type { UserDetail } from "../types/user.types";
import { AppError } from "@/shared/utils/errors/app-error";

export async function getUserService(
  id: number,
  user: AuthUser
): Promise<UserDetail> {
  requirePermission(user, PERMISSIONS.USER_VIEW);

  const row = await findUserById(id);
  if (!row) {
    throw new AppError("User not found", 404);
  }

  return toUserDetail(row);
}

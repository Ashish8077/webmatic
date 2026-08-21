import { softDeleteUser } from "../repositories/user.repository";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";

export async function deleteUserService(
  id: number,
  user: AuthUser
): Promise<{ success: boolean }> {
  requirePermission(user, PERMISSIONS.USER_DELETE);

  await softDeleteUser(id);

  return { success: true };
}

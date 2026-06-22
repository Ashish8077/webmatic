import { findPermissionsByUserId } from "@/modules/auth/repositories/permission.repository";
import type { PermissionsResponse } from "./types";

export async function permissionsService(
  userId: number,
): Promise<PermissionsResponse> {
  const permissions = await findPermissionsByUserId(userId);
  return {
    permissions,
  };
}

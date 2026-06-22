import { AppError } from "@/shared/utils/errors/app-error";

import { hasPermission } from "@/modules/auth/repositories/permission.repository";

export async function requirePermission(
  userId: number,
  permission: string,
): Promise<void> {
  const allowed = await hasPermission(userId, permission);

  if (!allowed) {
    throw new AppError("Forbidden", 403);
  }
}

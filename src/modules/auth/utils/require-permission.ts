import { AppError } from "@/shared/utils/errors/app-error";
import { Permission } from "../constants/permissions";
import { AuthUser } from "../lib/types";

export function hasPermission(user: AuthUser, permission: Permission): boolean {
  if (user.roles.includes("super-admin")) {
    return true;
  }

  return user.permissions.includes(permission);
}

export function requirePermission(
  user: AuthUser,
  permission: Permission,
): void {
  if (!hasPermission(user, permission)) {
    throw new AppError(
      "You do not have permission to perform this action",
      403,
    );
  }
}

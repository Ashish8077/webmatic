import { AppError } from "@/shared/utils/errors/app-error";
import { Permission } from "../constants/permissions";
import { AuthUser } from "../types/auth-user";

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
      "You do not have sufficient permissions to perform this action",
      403,
    );
  }
}

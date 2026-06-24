import { AppError } from "@/shared/utils/errors/app-error";
import { getAuthUser } from "../lib/get-auth-user";

export async function requirePermission(permission: string): Promise<void> {
  const user = await getAuthUser();

//   if (!user) {
//     throw new AppError("Authentication required", 401);
//   }

//   if (user.roleNames.includes("super-admin")) {
//     return;
//   }

//   const hasPermission = user.permissionNames.includes(permission);

//   if (!hasPermission) {
//     throw new AppError("Insufficient permissions", 403);
//   }
}

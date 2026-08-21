import { UpdateUserInput } from "../validation/update-user.schema";
import { updateUser, findUserById } from "../repositories/user.repository";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { hashPassword } from "@/modules/auth/lib/password";
import { findUserByEmail } from "@/modules/auth/repositories/user.repository";
import { AppError } from "@/shared/utils/errors/app-error";

export async function updateUserService(
  id: number,
  updateUserInput: UpdateUserInput,
  user: AuthUser
): Promise<{ success: boolean }> {
  requirePermission(user, PERMISSIONS.USER_UPDATE);

  const existingUser = await findUserById(id);
  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  // Check email conflict
  if (updateUserInput.email && updateUserInput.email !== existingUser.email) {
    const emailConflict = await findUserByEmail(updateUserInput.email);
    if (emailConflict) {
      throw new AppError("Email is already in use by another account", 400);
    }
  }

  let passwordHash: string | undefined = undefined;
  if (updateUserInput.password) {
    passwordHash = await hashPassword(updateUserInput.password);
  }

  await updateUser(id, { ...updateUserInput, passwordHash }, existingUser.role_id);

  return { success: true };
}

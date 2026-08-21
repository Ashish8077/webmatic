// Shared app infrastructure
import { AppError } from "@/shared/utils/errors/app-error";

// Auth module
import { comparePassword, hashPassword } from "@/modules/auth/lib/password";
import {
  findUserPasswordHashById,
  updateUserPassword,
} from "@/modules/auth/repositories/user.repository";
import { revokeAllRefreshTokensForUser } from "@/modules/auth/repositories/refresh-token.repository";
import type { ChangePasswordInput } from "@/modules/auth/schemas/change-password.schema";

export async function changePasswordService(
  userId: number,
  input: ChangePasswordInput,
): Promise<void> {
  // 1. Fetch the user's current password hash
  const user = await findUserPasswordHashById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // 2. Verify the current password
  const isValidPassword = await comparePassword(
    input.currentPassword,
    user.password_hash,
  );

  if (!isValidPassword) {
    throw new AppError("Invalid current password", 401);
  }

  // 3. Hash the new password
  const newPasswordHash = await hashPassword(input.newPassword);

  // 4. Update the password in the database
  const updated = await updateUserPassword(userId, newPasswordHash);

  if (!updated) {
    throw new AppError("Failed to update password", 500);
  }

  // 5. Revoke all refresh tokens to invalidate all sessions
  await revokeAllRefreshTokensForUser(userId);
}

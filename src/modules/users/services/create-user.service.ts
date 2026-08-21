import { CreateUserInput } from "../validation/create-user.schema";
import { insertUser } from "../repositories/user.repository";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { hashPassword } from "@/modules/auth/lib/password";
import { findUserByEmail } from "@/modules/auth/repositories/user.repository";
import { AppError } from "@/shared/utils/errors/app-error";

export async function createUserService(
  createUserInput: CreateUserInput,
  user: AuthUser
): Promise<{ id: number }> {
  requirePermission(user, PERMISSIONS.USER_CREATE);

  const existingUser = await findUserByEmail(createUserInput.email);
  if (existingUser) {
    throw new AppError("Email is already registered", 400);
  }

  const passwordHash = await hashPassword(createUserInput.password);
  
  const id = await insertUser({
    ...createUserInput,
    passwordHash
  });

  return { id };
}

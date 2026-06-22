import { AppError } from "@/shared/utils/errors/app-error";
import { findUserById } from "../repositories/user.repository";

export async function getCurrentUserService(userId: number) {
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
  };
}

import { cookies } from "next/headers";
import type { AuthUser } from "../types/auth-user";
import { AppError } from "@/shared/utils/errors/app-error";
import { verifyAccessToken } from "./jwt";
import { findAuthUserById } from "../repositories/permission.repository";

export async function requireAuth(): Promise<AuthUser> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new AppError("Authentication required", 401);
  }

  const payload = verifyAccessToken(accessToken);

  const user = await findAuthUserById(payload.sub);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
}

import { cookies } from "next/headers";
import type { AuthUser } from "./types";
import { AppError } from "@/shared/utils/errors/app-error";
import { verifyAccessToken } from "./jwt";
import { findAuthUserById } from "../repositories/permission.repository";

export async function getAuthUser(): Promise<AuthUser> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new AppError("Unauthorized", 401);
  }

  const payload = verifyAccessToken(accessToken);

  const user = await findAuthUserById(payload.sub);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
}

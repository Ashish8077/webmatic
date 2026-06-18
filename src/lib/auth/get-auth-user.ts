import { cookies } from "next/headers";
import { AuthUser } from "./types";
import { AppError } from "../errors/app-error";
import { verifyAccessToken } from "./jwt";

export async function getAuthUser(): Promise<AuthUser> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new AppError("Unauthorized", 401);
  }

  const payload = verifyAccessToken(accessToken);

  return {
    userId: payload.sub,
  };
}

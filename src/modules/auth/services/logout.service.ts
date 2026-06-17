import { createHash } from "@/shared/utils/hash";
import { revokeRefreshToken } from "../repositories/refresh-token.repository";

export async function logoutService(refreshToken: string) {
  console.log(refreshToken);

  const tokenHash = createHash(refreshToken);
  console.log("TokenHash", tokenHash);
  await revokeRefreshToken(tokenHash);
}

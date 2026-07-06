// External packages

// Shared app infrastructure
import { AppError } from "@/shared/utils/errors/app-error";
import { createHash } from "@/shared/utils/crypto/hash";
import { env } from "@/config/env.server";

// Auth module
import { comparePassword } from "@/modules/auth/lib/password";
import { findUserByEmail } from "@/modules/auth/repositories/user.repository";
import {
  durationToDate,
  generateAccessToken,
  generateRefreshToken,
} from "@/modules/auth/lib/jwt";
import { createRefreshToken } from "@/modules/auth/repositories/refresh-token.repository";
import type { LoginResponse } from "@/modules/auth/services/types";
import type { LoginInput } from "@/modules/auth/schemas/login.schema";

export async function loginService(
  loginInput: LoginInput,
): Promise<LoginResponse> {
  const user = await findUserByEmail(loginInput.email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (user.status !== "active") {
    throw new AppError("Account is not active", 403);
  }

  const isValidPassword = await comparePassword(
    loginInput.password,
    user.password_hash,
  );

  if (!isValidPassword) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = generateAccessToken(user.id);

  const refreshToken = generateRefreshToken(user.id);

  const tokenHash = createHash(refreshToken);

  const expiresAt = durationToDate(env.JWT_REFRESH_EXPIRES_IN);

  await createRefreshToken(user.id, tokenHash, expiresAt);

  if (!user.role_slug) {
    throw new AppError("User role not assigned", 403);
  }

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name || null,
      email: user.email,
      role: user.role_slug,
    },
  };
}

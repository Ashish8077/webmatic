import { AppError } from "@/lib/errors/app-error";
import { handleApiError } from "@/lib/http/handle-api-error";
import { successResponse } from "@/lib/http/success-response";
import { refreshTokenService } from "@/modules/auth/services/refresh-token.service";
import { clearAuthCookies, setAuthCookies } from "@/modules/auth/lib/cookies";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      throw new AppError("Refresh token not found", 401);
    }

    const { accessToken } = await refreshTokenService(refreshToken);
    const response = successResponse({
      message: "Token refreshed successfully",
    });

    setAuthCookies(response, accessToken, refreshToken);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

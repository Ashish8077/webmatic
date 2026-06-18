import { handleApiError } from "@/lib/http/handle-api-error";
import { successResponse } from "@/lib/http/success-response";
import { logoutService } from "@/modules/auth/services/logout.service";
import { clearAuthCookies } from "@/lib/auth/cookies";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (refreshToken) {
      await logoutService(refreshToken);
    }

    const response = successResponse({ message: "Logged out successfully" });

    clearAuthCookies(response);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

// Shared app infrastructure
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";

// Auth module
import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { clearAuthCookies } from "@/modules/auth/lib/cookies";
import { changePasswordService } from "@/modules/auth/services/change-password.service";
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from "@/modules/auth/schemas/change-password.schema";

export async function PATCH(request: Request) {
  try {
    const authUser = await requireAuth();

    const input: ChangePasswordInput = validate(
      changePasswordSchema,
      await request.json(),
    );

    await changePasswordService(authUser.userId, input);

    const response = successResponse({
      message: "Password updated successfully.",
    });

    // Clear auth cookies so the frontend is forced to re-authenticate
    clearAuthCookies(response);

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

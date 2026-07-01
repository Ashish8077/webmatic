import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { getCurrentUserService } from "@/modules/auth/services/get-current-user.service";

export async function GET() {
  try {
    const authUser = await requireAuth();

    return successResponse({
      message: "User fetched successfully",
      data: {
        user: {
          id: authUser.userId,
          email: authUser.email,
        },
        roles: authUser.roles,
        permissions: authUser.permissions,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

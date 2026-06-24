import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { getCurrentUserService } from "@/modules/auth/services/get-current-user.service";

export async function GET() {
  try {
    const authUser = await requireAuth();

    const user = await getCurrentUserService(authUser.userId);

    return successResponse({
      message: "User fetched successfully",
      data: user,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

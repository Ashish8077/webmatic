import { getAuthUser } from "@/lib/auth/get-auth-user";
import { handleApiError } from "@/lib/http/handle-api-error";
import { successResponse } from "@/lib/http/success-response";
import { getCurrentUserService } from "@/modules/auth/services/get-current-user.service";

export async function GET() {
  try {
    const authUser = await getAuthUser();

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

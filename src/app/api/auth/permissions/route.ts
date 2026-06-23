import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { getAuthUser } from "@/modules/auth/lib/get-auth-user";
import { permissionsService } from "@/modules/auth/services/permissions.service";

export async function GET() {
  try {
    const authUser = await getAuthUser();

    const result = await permissionsService(authUser.userId);

    return successResponse({
      message: "Permissions fetched successfully",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

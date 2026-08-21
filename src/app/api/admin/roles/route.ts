import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { getRolesService } from "@/modules/auth/services/get-roles.service";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const rolesData = await getRolesService(user);

    return successResponse({
      message: "Roles fetched successfully",
      data: rolesData,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

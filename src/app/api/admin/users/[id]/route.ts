import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { deleteUserService } from "@/modules/users/services/delete-user.service";
import { getUserService } from "@/modules/users/services/get-user.service";
import { updateUserService } from "@/modules/users/services/update-user.service";
import {
  UpdateUserInput,
  updateUserSchema,
} from "@/modules/users/validation/update-user.schema";
import { IdRouteParams } from "@/shared/types/route-params";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { idParamSchema } from "@/shared/utils/validators/route-params.schema.";
import { validate } from "@/shared/utils/validators/validation";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id } = validate(idParamSchema, await params);
    
    const userData = await getUserService(id, user);

    return successResponse({
      message: "User fetched successfully",
      data: userData,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  req: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id } = validate(idParamSchema, await params);
    
    const updateUserData: UpdateUserInput = validate(
      updateUserSchema,
      await req.json(),
    );
    
    await updateUserService(id, updateUserData, user);
    
    return successResponse({
      message: "User updated successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id } = validate(idParamSchema, await params);
    
    await deleteUserService(id, user);
    
    return successResponse({
      message: "User deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

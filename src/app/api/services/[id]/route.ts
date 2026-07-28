import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { deleteServiceService } from "@/modules/services/services/delete-service.service";
import { getServiceService } from "@/modules/services/services/get-service.service";
import { updateServiceService } from "@/modules/services/services/update-service.service";
import {
  UpdateServiceInput,
  updateServiceSchema,
} from "@/modules/services/validation/update-service.schema";
import { IdRouteParams } from "@/shared/types/route-params";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { idParamSchema } from "@/shared/utils/validators/route-params.schema.";
import { validate } from "@/shared/utils/validators/validation";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const { id: serviceId } = validate(idParamSchema, await params);

    const serviceData = await getServiceService(serviceId, user);

    return successResponse({
      message: "Service fetched successfully",
      data: serviceData,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id: serviceId } = validate(idParamSchema, await params);

    const updateServiceData: UpdateServiceInput = validate(
      updateServiceSchema,
      await request.json(),
    );

    await updateServiceService(serviceId, updateServiceData, user);

    return successResponse({
      message: "Service updated successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const { id: serviceId } = validate(idParamSchema, await params);

    await deleteServiceService(serviceId, user);

    return successResponse({
      message: "Service deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

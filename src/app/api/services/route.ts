import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { createServiceService } from "@/modules/services/services/create-service.service";
import { getServicesService } from "@/modules/services/services/get-services.service";
import {
  CreateServiceInput,
  createServiceSchema,
} from "@/modules/services/validation/create-service.schema";
import { getServicesQuerySchema } from "@/modules/services/validation/get-services-query.schema";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    
    const createServiceData: CreateServiceInput = validate(
      createServiceSchema,
      await req.json(),
    );
    const service = await createServiceService(createServiceData, user);
    return successResponse({
      message: "Service created successfully",
      statusCode: 201,
      data: service,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);

    const query = validate(
      getServicesQuerySchema,
      Object.fromEntries(searchParams.entries()),
    );

    const servicesData = await getServicesService(query, user);

    return successResponse({
      message: "Services fetched successfully",
      data: servicesData,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

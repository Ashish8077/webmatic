import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { createService } from "@/modules/services/services/create-service.service";
import {
  CreateServiceInput,
  createServiceSchema,
} from "@/modules/services/validation/create-service.schema";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const createServiceData: CreateServiceInput = validate(
      createServiceSchema,
      await req.json(),
    );
    const service = await createService(createServiceData, user);
    return successResponse({
      message: "Service created successfully",
      statusCode: 201,
      data: service,
    });
  } catch (error) {
    handleApiError(error);
  }
}

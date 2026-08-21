import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { updateWorkProjectFeaturedService } from "@/modules/work/services/auxiliary-work-project.service";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";
import { NextResponse } from "next/server";
import { z } from "zod";
import { AppError } from "@/shared/utils/errors/app-error";

const updateFeaturedSchema = z.object({
  isFeatured: z.boolean(),
});

export async function PATCH(
  req: Request,
  props: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id } = await props.params;

    const projectId = parseInt(id, 10);
    if (isNaN(projectId)) {
      throw new AppError("Invalid work project ID", 400);
    }

    const { isFeatured } = validate(updateFeaturedSchema, await req.json());

    await updateWorkProjectFeaturedService(projectId, isFeatured, user);

    return successResponse({
      message: "Featured status updated successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

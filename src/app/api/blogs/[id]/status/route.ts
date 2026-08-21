// app/api/blogs/[id]/status/route.ts

import { NextResponse } from "next/server";

import {
  updateBlogStatusSchema,
  type UpdateBlogStatusInput,
} from "@/modules/blogs/validation/update-blog-status.schema";

import { updateBlogStatusService } from "@/modules/blogs/services/update-blog-status.service";
import { AppError } from "@/shared/utils/errors/app-error";
import { validate } from "@/shared/utils/validators/validation";
import { successResponse } from "@/shared/utils/http/success-response";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { IdRouteParams } from "@/shared/types/route-params";

export async function PATCH(
  request: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id } = await params;

    const blogId = Number(id);

    if (!Number.isInteger(blogId) || blogId <= 0) {
      throw new AppError("Invalid blog id", 400);
    }

    const statusData: UpdateBlogStatusInput = validate(
      updateBlogStatusSchema,
      await request.json(),
    );

    await updateBlogStatusService(blogId, statusData, user);

    return successResponse({
      message:
        statusData.status === "published"
          ? "Blog published successfully"
          : statusData.status === "scheduled"
            ? "Blog scheduled successfully"
            : "Blog moved to draft successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

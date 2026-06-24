// app/api/pages/[id]/status/route.ts

import { NextResponse } from "next/server";

import {
  updatePageStatusSchema,
  type UpdatePageStatusInput,
} from "@/modules/pages/validators/update-page-status.schema";

import { updatePageStatusService } from "@/modules/pages/services/update-page-status.service";
import { AppError } from "@/shared/utils/errors/app-error";
import { validate } from "@/shared/utils/validation/validation";
import { successResponse } from "@/shared/utils/http/success-response";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: Request,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id } = await params;

    const pageId = Number(id);

    if (!Number.isInteger(pageId) || pageId <= 0) {
      throw new AppError("Invalid page id", 400);
    }

    const statusData: UpdatePageStatusInput = validate(
      updatePageStatusSchema,
      await request.json(),
    );

    await updatePageStatusService(pageId, statusData, user);

    return successResponse({
      message:
        statusData.status === "published"
          ? "Page published successfully"
          : "Page moved to draft successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

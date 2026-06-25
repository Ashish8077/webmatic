import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { deletePageService } from "@/modules/pages/services/delete-page.service";
import { getPageByIdService } from "@/modules/pages/services/get-page.service";
import { updatePageService } from "@/modules/pages/services/update-page.service";
import {
  UpdatePageInput,
  updatePageSchema,
} from "@/modules/pages/validators/update-page.schema";
import { IdRouteParams } from "@/shared/types/route-params";
import { AppError } from "@/shared/utils/errors/app-error";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const { id } = await params;

    const pageId = Number(id);

    if (!Number.isInteger(pageId) || pageId <= 0) {
      throw new AppError("Invalid page id", 400);
    }

    const pageData = await getPageByIdService(pageId, user);

    return successResponse({
      message: "Page fetched successfully",
      data: pageData,
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
    const { id } = await params;

    const pageId = Number(id);

    if (!Number.isInteger(pageId) || pageId <= 0) {
      throw new AppError("Invalid page id", 400);
    }

    const updatePageData: UpdatePageInput = validate(
      updatePageSchema,
      await request.json(),
    );

    await updatePageService(pageId, updatePageData, user);

    return successResponse({
      message: "Page updated successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request, { params }: IdRouteParams) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    const pageId = Number(id);

    if (!Number.isInteger(pageId) || pageId <= 0) {
      throw new AppError("Invalid page id", 400);
    }

    await deletePageService(pageId, user);

    return successResponse({
      message: "Page deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

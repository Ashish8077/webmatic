import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { deleteSectionService } from "@/modules/pages-section/services/delete-section.service";
import { getSectionById } from "@/modules/pages-section/services/get-section.service";
import { updatePageSectionService } from "@/modules/pages-section/services/update-page-section.service";
import { updatePageSectionSchema } from "@/modules/pages-section/validators/update-page-section.schema";
import { IdRouteParams } from "@/shared/types/route-params";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { idParamSchema } from "@/shared/utils/validators/route-params.schema.";
import { validate } from "@/shared/utils/validators/validation";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const { id: sectionId } = validate(idParamSchema, await params);

    const section = await getSectionById(sectionId, user);

    return successResponse({
      data: section,
      message: "Section fetched successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  _request: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const { id: sectionId } = validate(idParamSchema, await params);

    const updatePageSection = validate(
      updatePageSectionSchema,
      await _request.json(),
    );

    await updatePageSectionService(sectionId, updatePageSection, user);

    return successResponse({
      message: "Section updated successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: IdRouteParams) {
  try {
    const user = await requireAuth();

    const { id: sectionId } = validate(idParamSchema, await params);
    await deleteSectionService(sectionId, user);

    return successResponse({
      message: "Section deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

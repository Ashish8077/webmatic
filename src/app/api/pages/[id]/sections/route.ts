import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { createPageSectionService } from "@/modules/pages-section/services/create-page-section.service";
import { getPageSectionsService } from "@/modules/pages-section/services/get-page-sections.service";
import { createPageSectionSchema } from "@/modules/pages-section/schemas/create-page-section.schema";

import { IdRouteParams } from "@/shared/types/route-params";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { idParamSchema } from "@/shared/utils/validators/route-params.schema.";
import { validate } from "@/shared/utils/validators/validation";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: IdRouteParams) {
  try {
    const user = await requireAuth();

    const { id: pageId } = validate(idParamSchema, await params);

    const pageSections = await getPageSectionsService(pageId, user);

    return successResponse({
      message: "Sections fetched successfully",
      data: pageSections,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(
  _request: Request,
  { params }: IdRouteParams,
): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const { id: pageId } = validate(idParamSchema, await params);

    const createPageSection = validate(
      createPageSectionSchema,
      await _request.json(),
    );

    const pageSection = await createPageSectionService(
      pageId,
      createPageSection,
      user,
    );

    return successResponse({
      message: "Section created successfully",
      data: pageSection,
      statusCode: 201,
    });
  } catch (error) {
    console.log(error);
    return handleApiError(error);
  }
}

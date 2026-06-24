import { getAuthUser } from "@/modules/auth/lib/get-auth-user";
import { createPageService } from "@/modules/pages/services/create-page.service";
import { getPagesService } from "@/modules/pages/services/get-pages.service";

import {
  CreatePageInput,
  createPageSchema,
} from "@/modules/pages/validators/create-page.schema";
import { getPagesQuerySchema } from "@/modules/pages/validators/get-pages-query.schema";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validation/validation";

import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const authUser = await getAuthUser();

    const createPageData: CreatePageInput = validate(
      createPageSchema,
      await request.json(),
    );

    const createdPage = await createPageService(createPageData);

    return successResponse({
      message: "Page created successfully",
      statusCode: 201,
      data: createdPage,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const user = await getAuthUser();

    const { searchParams } = new URL(request.url);

    const query = validate(
      getPagesQuerySchema,
      Object.fromEntries(searchParams.entries()),
    );

    const pagesData = await getPagesService(query, user);

    return successResponse({
      message: "Pages fetched successfully",
      data: pagesData,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

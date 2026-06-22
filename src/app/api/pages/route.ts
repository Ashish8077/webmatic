import { createPageService } from "@/modules/pages/services/create-page.service";

import { handleApiError } from "@/lib/http/handle-api-error";
import { validate } from "@/lib/validation/validation";
import {
  CreatePageInput,
  createPageSchema,
} from "@/modules/pages/validators/create-page.schema";
import { successResponse } from "@/lib/http/success-response";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
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
    console.log(error);
    return handleApiError(error);
  }
}

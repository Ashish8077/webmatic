import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { createBlogTagService } from "@/modules/blogs/services/create-tag.service";
import { getBlogTagsService } from "@/modules/blogs/services/get-tags.service";
import {
  CreateBlogTagInput,
  createBlogTagSchema,
} from "@/modules/blogs/validation/create-blog-tag.schema";
import { getTagsQuerySchema } from "@/modules/blogs/validation/get-tags-query.schema";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";

import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const createTagData: CreateBlogTagInput = validate(
      createBlogTagSchema,
      await request.json(),
    );

    const createdTag = await createBlogTagService(createTagData, user);

    return successResponse({
      message: "Tag created successfully",
      statusCode: 201,
      data: createdTag,
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
      getTagsQuerySchema,
      Object.fromEntries(searchParams.entries()),
    );

    const tagsData = await getBlogTagsService(query, user);

    return successResponse({
      message: "Tags fetched successfully",
      data: tagsData,
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);
    return handleApiError(error);
  }
}

import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { createBlogCategoryService } from "@/modules/blogs/services/create-category.service";
import { getBlogCategoriesService } from "@/modules/blogs/services/get-categories.service";
import {
  CreateBlogCategoryInput,
  createBlogCategorySchema,
} from "@/modules/blogs/validation/create-blog-category.schema";
import { getCategoriesQuerySchema } from "@/modules/blogs/validation/get-categories-query.schema";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";

import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const createCategoryData: CreateBlogCategoryInput = validate(
      createBlogCategorySchema,
      await request.json(),
    );

    const createdCategory = await createBlogCategoryService(
      createCategoryData,
      user,
    );

    return successResponse({
      message: "Category created successfully",
      statusCode: 201,
      data: createdCategory,
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
      getCategoriesQuerySchema,
      Object.fromEntries(searchParams.entries()),
    );

    const categoriesData = await getBlogCategoriesService(query, user);

    return successResponse({
      message: "Categories fetched successfully",
      data: categoriesData,
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);
    return handleApiError(error);
  }
}

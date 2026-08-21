import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { createBlogService } from "@/modules/blogs/services/create-blog.service";
import { getBlogsService } from "@/modules/blogs/services/get-blogs.service";

import {
  CreateBlogInput,
  createBlogSchema,
} from "@/modules/blogs/validation/create-blog.schema";
import { getBlogsQuerySchema } from "@/modules/blogs/validation/get-blogs-query.schema";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";

import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const createBlogData: CreateBlogInput = validate(
      createBlogSchema,
      await request.json(),
    );

    const createdBlog = await createBlogService(createBlogData, user);

    return successResponse({
      message: "Blog created successfully",
      statusCode: 201,
      data: createdBlog,
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
      getBlogsQuerySchema,
      Object.fromEntries(searchParams.entries()),
    );

    const blogsData = await getBlogsService(query, user);

    return successResponse({
      message: "Blogs fetched successfully",
      data: blogsData,
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);
    return handleApiError(error);
  }
}

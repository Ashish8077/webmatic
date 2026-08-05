import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { getBlogByIdService } from "@/modules/blogs/services/get-blog.service";
import { updateBlogService } from "@/modules/blogs/services/update-blog.service";
import { deleteBlogService } from "@/modules/blogs/services/delete-blog.service";
import {
  UpdateBlogInput,
  updateBlogSchema,
} from "@/modules/blogs/validation/update-blog.schema";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id } = await params;
    const blogId = parseInt(id, 10);

    const blogData = await getBlogByIdService(blogId, user);

    return successResponse({
      message: "Blog fetched successfully",
      data: blogData,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id } = await params;
    const blogId = parseInt(id, 10);

    const updateBlogData: UpdateBlogInput = validate(
      updateBlogSchema,
      await request.json(),
    );

    const updatedBlog = await updateBlogService(blogId, updateBlogData, user);

    return successResponse({
      message: "Blog updated successfully",
      data: updatedBlog,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const { id } = await params;
    const blogId = parseInt(id, 10);

    await deleteBlogService(blogId, user);

    return successResponse({
      message: "Blog deleted successfully",
      statusCode: 200,
      data: { success: true },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

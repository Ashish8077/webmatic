import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { updateBlogCategoryService } from "@/modules/blogs/services/update-category.service";
import { deleteBlogCategoryService } from "@/modules/blogs/services/delete-category.service";
import {
  UpdateBlogCategoryInput,
  updateBlogCategorySchema,
} from "@/modules/blogs/validation/update-blog-category.schema";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";

import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    const id = parseInt((await params).id, 10);

    const updateCategoryData: UpdateBlogCategoryInput = validate(
      updateBlogCategorySchema,
      await request.json(),
    );

    const updatedCategory = await updateBlogCategoryService(
      id,
      updateCategoryData,
      user,
    );

    return successResponse({
      message: "Category updated successfully",
      data: updatedCategory,
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
    const id = parseInt((await params).id, 10);

    await deleteBlogCategoryService(id, user);

    return successResponse({
      message: "Category deleted successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

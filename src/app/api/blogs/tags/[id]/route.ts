import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { updateBlogTagService } from "@/modules/blogs/services/update-tag.service";
import { deleteBlogTagService } from "@/modules/blogs/services/delete-tag.service";
import {
  UpdateBlogTagInput,
  updateBlogTagSchema,
} from "@/modules/blogs/validation/update-blog-tag.schema";
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

    const updateTagData: UpdateBlogTagInput = validate(
      updateBlogTagSchema,
      await request.json(),
    );

    const updatedTag = await updateBlogTagService(id, updateTagData, user);

    return successResponse({
      message: "Tag updated successfully",
      data: updatedTag,
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

    await deleteBlogTagService(id, user);

    return successResponse({
      message: "Tag deleted successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

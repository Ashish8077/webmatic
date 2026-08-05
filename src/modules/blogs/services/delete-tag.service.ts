import { AppError } from "@/shared/utils/errors/app-error";
import { findById, softDeleteTag } from "../repositories/blog-tag.repository";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { AuthUser } from "@/modules/auth/types/auth-user";

export async function deleteBlogTagService(
  tagId: number,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.BLOG_TAG_MANAGE);

  const tag = await findById(tagId);

  if (!tag) {
    throw new AppError("Tag not found", 404);
  }

  const deletedCount = await softDeleteTag(tagId, user.userId);
  if (deletedCount === 0) {
    throw new AppError("Tag not found", 404);
  }
}

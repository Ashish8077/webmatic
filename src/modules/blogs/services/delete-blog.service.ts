import { AppError } from "@/shared/utils/errors/app-error";
import { findById, softDeleteBlog } from "../repositories/blog.repository";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { AuthUser } from "@/modules/auth/types/auth-user";

export async function deleteBlogService(
  blogId: number,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.BLOG_DELETE);

  const blog = await findById(blogId);

  if (!blog) {
    throw new AppError("Blog not found", 404);
  }

  const deletedCount = await softDeleteBlog(blogId, user.userId);
  if (deletedCount === 0) {
    throw new AppError("Blog not found", 404);
  }
}

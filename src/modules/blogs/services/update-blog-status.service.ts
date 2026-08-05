import { AppError } from "@/shared/utils/errors/app-error";
import {
  findById,
  updateBlogStatus,
} from "../repositories/blog.repository";
import { UpdateBlogStatusInput } from "../validation/update-blog-status.schema";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { AuthUser } from "@/modules/auth/types/auth-user";

export async function updateBlogStatusService(
  blogId: number,
  statusData: UpdateBlogStatusInput,
  user: AuthUser,
): Promise<void> {
  // If changing to 'draft' or 'scheduled', we should ideally check UNPUBLISH or SCHEDULE permissions
  // But mirroring pages exactly: pages uses PAGES_PUBLISH for all status updates.
  requirePermission(user, PERMISSIONS.BLOG_PUBLISH);

  const blog = await findById(blogId);

  if (!blog) {
    throw new AppError("Blog not found", 404);
  }

  if (blog.status === statusData.status) {
    throw new AppError(`Blog is already ${statusData.status}`, 409);
  }

  const updatedBlogCount = await updateBlogStatus(
    blogId,
    statusData.status,
    user.userId,
  );

  if (updatedBlogCount === 0) {
    throw new AppError("Blog not found", 404);
  }
}

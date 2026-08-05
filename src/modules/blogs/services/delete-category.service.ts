import { AppError } from "@/shared/utils/errors/app-error";
import { findById, softDeleteCategory } from "../repositories/blog-category.repository";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { AuthUser } from "@/modules/auth/types/auth-user";

export async function deleteBlogCategoryService(
  categoryId: number,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.BLOG_CATEGORY_MANAGE);

  const category = await findById(categoryId);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const deletedCount = await softDeleteCategory(categoryId, user.userId);
  if (deletedCount === 0) {
    throw new AppError("Category not found", 404);
  }
}

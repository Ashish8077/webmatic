import { AppError } from "@/shared/utils/errors/app-error";
import { handleDuplicateConstraint } from "@/shared/utils/errors/database-error.util";
import {
  findById,
  existsBySlugExcludingId,
  updateCategory,
} from "../repositories/blog-category.repository";
import { UpdateBlogCategoryInput } from "../validation/update-blog-category.schema";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";

export async function updateBlogCategoryService(
  categoryId: number,
  categoryData: UpdateBlogCategoryInput,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.BLOG_CATEGORIES_UPDATE);

  try {
    const category = await findById(categoryId);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    if (categoryData.slug !== undefined) {
      const existingCategory = await existsBySlugExcludingId(
        categoryData.slug,
        categoryId,
      );

      if (existingCategory) {
        throw new AppError("Category slug already exists", 409, {
          slug: ["Category slug already exists."],
        });
      }
    }

    const updatePayload = {
      name: categoryData.name ?? category.name,
      slug: categoryData.slug ?? category.slug,
      description: categoryData.description !== undefined ? categoryData.description : category.description,
    };

    const updatedCount = await updateCategory(categoryId, updatePayload, user.userId);
    
    if (updatedCount === 0) {
      throw new AppError("Category not found", 404);
    }
  } catch (error) {
    handleDuplicateConstraint(error, {
      slug: { field: "slug", message: "Category slug already exists." },
    });
    throw error;
  }
}

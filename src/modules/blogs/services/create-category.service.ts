import { AppError } from "@/shared/utils/errors/app-error";
import { handleDuplicateConstraint } from "@/shared/utils/errors/database-error.util";
import {
  createCategory,
  existsBySlug,
} from "../repositories/blog-category.repository";
import { CreateBlogCategoryInput } from "../validation/create-blog-category.schema";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { BlogCategory } from "../types/blog.types";

export async function createBlogCategoryService(
  categoryData: CreateBlogCategoryInput,
  user: AuthUser,
): Promise<{ category: BlogCategory }> {
  requirePermission(user, PERMISSIONS.BLOG_CATEGORIES_CREATE);

  try {
    const existingCategory = await existsBySlug(categoryData.slug);

    if (existingCategory) {
      throw new AppError("Category slug already exists", 409, {
        slug: ["Category slug already exists."],
      });
    }

    const categoryId = await createCategory(categoryData, user.userId);

    return {
      category: {
        id: categoryId,
        name: categoryData.name,
        slug: categoryData.slug,
        description: categoryData.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  } catch (error) {
    handleDuplicateConstraint(error, {
      slug: { field: "slug", message: "Category slug already exists." },
    });
    throw error;
  }
}

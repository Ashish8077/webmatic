import { AppError } from "@/shared/utils/errors/app-error";
import { handleDuplicateConstraint } from "@/shared/utils/errors/database-error.util";

import {
  findById,
  existsBySlugExcludingId,
  updateBlog,
  replaceCategories,
  replaceTags,
} from "../repositories/blog.repository";

import { UpdateBlogInput } from "../validation/update-blog.schema";

import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { toUpdateBlogPayload } from "../mapper/blog.mapper";

export async function updateBlogService(
  blogId: number,
  blogData: UpdateBlogInput,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.BLOG_UPDATE);

  try {
    const blog = await findById(blogId);

    if (!blog) {
      throw new AppError("Blog not found", 404);
    }

    /**
     * Slug must be unique
     */
    if (blogData.slug !== undefined) {
      const existingBlog = await existsBySlugExcludingId(
        blogData.slug,
        blogId,
      );

      if (existingBlog) {
        throw new AppError("Blog slug already exists", 409, {
          slug: ["Blog slug already exists."],
        });
      }
    }

    /**
     * Update blog payload & update
     */
    const updatePayload = toUpdateBlogPayload(blog, blogData);

    const updatedBlogCount = await updateBlog(blogId, updatePayload, user.userId);
    if (updatedBlogCount === 0) {
      throw new AppError("Blog not found", 404);
    }

    /**
     * Update relationships
     * replaceCategories and replaceTags internally handle the transaction logic
     */
    if (blogData.categoryIds !== undefined) {
      await replaceCategories(blogId, blogData.categoryIds);
    }

    if (blogData.tagIds !== undefined) {
      await replaceTags(blogId, blogData.tagIds);
    }
  } catch (error) {
    handleDuplicateConstraint(error, {
      slug: { field: "slug", message: "Blog slug already exists." },
    });
    throw error;
  }
}

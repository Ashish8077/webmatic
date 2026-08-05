import { AppError } from "@/shared/utils/errors/app-error";
import { handleDuplicateConstraint } from "@/shared/utils/errors/database-error.util";

import {
  createBlog,
  existsBySlug,
  attachCategories,
  attachTags,
} from "../repositories/blog.repository";

import { CreateBlogInput } from "../validation/create-blog.schema";

import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";
import {
  toCreateBlogPayload,
  toCreateBlogResponse,
} from "../mapper/blog.mapper";
import { CreateBlogResponse } from "../types/service.types";

export async function createBlogService(
  blogData: CreateBlogInput,
  user: AuthUser,
): Promise<CreateBlogResponse> {
  requirePermission(user, PERMISSIONS.BLOG_CREATE);

  try {
    /**
     * Slug must be unique
     */
    const existingBlog = await existsBySlug(blogData.slug);

    if (existingBlog) {
      throw new AppError("Blog slug already exists", 409, {
        slug: ["Blog slug already exists."],
      });
    }

    /**
     * Create blog payload & insert
     */
    const createBlogRequest = toCreateBlogPayload(blogData);
    const blogId = await createBlog(createBlogRequest, user.userId);

    /**
     * Attach relationships
     * Since attach uses INSERT IGNORE, it silently ignores duplicate relationships.
     */
    if (createBlogRequest.categoryIds.length > 0) {
      await attachCategories(blogId, createBlogRequest.categoryIds);
    }
    
    if (createBlogRequest.tagIds.length > 0) {
      await attachTags(blogId, createBlogRequest.tagIds);
    }

    return toCreateBlogResponse({
      id: blogId,
      title: createBlogRequest.title,
      slug: createBlogRequest.slug,
      status: createBlogRequest.status,
    });
  } catch (error) {
    handleDuplicateConstraint(error, {
      slug: { field: "slug", message: "Blog slug already exists." },
    });
    throw error;
  }
}

import { AppError } from "@/shared/utils/errors/app-error";
import { handleDuplicateConstraint } from "@/shared/utils/errors/database-error.util";
import {
  createTag,
  existsBySlug,
} from "../repositories/blog-tag.repository";
import { CreateBlogTagInput } from "../validation/create-blog-tag.schema";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { BlogTag } from "../types/blog.types";

export async function createBlogTagService(
  tagData: CreateBlogTagInput,
  user: AuthUser,
): Promise<{ tag: BlogTag }> {
  requirePermission(user, PERMISSIONS.BLOG_TAG_MANAGE);

  try {
    const existingTag = await existsBySlug(tagData.slug);

    if (existingTag) {
      throw new AppError("Tag slug already exists", 409, {
        slug: ["Tag slug already exists."],
      });
    }

    const tagId = await createTag(tagData, user.userId);

    return {
      tag: {
        id: tagId,
        name: tagData.name,
        slug: tagData.slug,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  } catch (error) {
    handleDuplicateConstraint(error, {
      slug: { field: "slug", message: "Tag slug already exists." },
    });
    throw error;
  }
}

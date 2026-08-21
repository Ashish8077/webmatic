import { AppError } from "@/shared/utils/errors/app-error";
import { handleDuplicateConstraint } from "@/shared/utils/errors/database-error.util";
import {
  findById,
  existsBySlugExcludingId,
  updateTag,
} from "../repositories/blog-tag.repository";
import { UpdateBlogTagInput } from "../validation/update-blog-tag.schema";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";

export async function updateBlogTagService(
  tagId: number,
  tagData: UpdateBlogTagInput,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.BLOG_TAGS_UPDATE);

  try {
    const tag = await findById(tagId);

    if (!tag) {
      throw new AppError("Tag not found", 404);
    }

    if (tagData.slug !== undefined) {
      const existingTag = await existsBySlugExcludingId(
        tagData.slug,
        tagId,
      );

      if (existingTag) {
        throw new AppError("Tag slug already exists", 409, {
          slug: ["Tag slug already exists."],
        });
      }
    }

    const updatePayload = {
      name: tagData.name ?? tag.name,
      slug: tagData.slug ?? tag.slug,
    };

    const updatedCount = await updateTag(tagId, updatePayload, user.userId);
    
    if (updatedCount === 0) {
      throw new AppError("Tag not found", 404);
    }
  } catch (error) {
    handleDuplicateConstraint(error, {
      slug: { field: "slug", message: "Tag slug already exists." },
    });
    throw error;
  }
}

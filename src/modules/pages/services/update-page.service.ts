import { AppError } from "@/shared/utils/errors/app-error";
import {
  findPageById,
  findPageSlugExcludingPageId,
  updatePage,
} from "../repositories/page.repository";
import { UpdatePageInput } from "../schemas/update-page.schema";
import { isDuplicateKeyError } from "@/shared/utils/errors/database-error.util";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { AuthUser } from "@/modules/auth/types/auth-user";

export async function updatePageService(
  pageId: number,
  pageData: UpdatePageInput,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.PAGES_UPDATE);

  const page = await findPageById(pageId);

  if (!page) {
    throw new AppError("Page not found", 404);
  }

  const existingPage = await findPageSlugExcludingPageId(pageData.slug, pageId);

  if (existingPage) {
    throw new AppError("Page slug already exists", 409, {
      slug: ["Page slug already exists."],
    });
  }

  const publishedAt =
    page.status == "draft" && pageData.status == "published"
      ? new Date()
      : null;

  try {
    const updatedPageCount = await updatePage(
      pageId,
      pageData,
      user.userId,
      publishedAt,
    );
    if (updatedPageCount === 0) {
      throw new AppError("Page not found", 404);
    }
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      throw new AppError("Page slug already exists", 409, {
        slug: ["Page slug already exists."],
      });
    }
    throw error;
  }
}

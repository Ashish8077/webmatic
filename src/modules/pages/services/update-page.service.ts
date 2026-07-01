import { AppError } from "@/shared/utils/errors/app-error";
import {
  findPageById,
  findPageSlug,
  updatePage,
} from "../repositories/page.repository";
import { UpdatePageInput } from "../validators/update-page.schema";
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

  const existingPage = await findPageSlug(pageData.slug);

  if (existingPage && existingPage.id == pageId) {
    throw new AppError("Page slug already exists", 409);
  }

  try {
    const updatedPageCount = await updatePage(pageId, pageData);
    if (updatedPageCount === 0) {
      throw new AppError("Page not found", 404);
    }
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      throw new AppError("Page slug already exists", 409);
    }
    throw error;
  }
}

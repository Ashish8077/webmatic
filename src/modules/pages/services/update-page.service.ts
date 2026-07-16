import { AppError } from "@/shared/utils/errors/app-error";
import {
  findPageById,
  findPageSlugExcludingPageId,
  updatePage,
} from "../repositories/page.repository";
import { UpdatePageInput } from "../validation/update-page.schema";
import { isDuplicateKeyError } from "@/shared/utils/errors/database-error.util";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { toUpdatePagePayload } from "../mapper/page.mapper";
import { SYSTEM_PAGE_PROTECTED_FIELDS } from "../constants/page.constants";

export async function updatePageService(
  pageId: number,
  pageData: UpdatePageInput,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.PAGES_UPDATE);

  try {
    const page = await findPageById(pageId);

    if (!page) {
      throw new AppError("Page not found", 404);
    }

    if (page.is_system) {
      for (const field of SYSTEM_PAGE_PROTECTED_FIELDS) {
        if (pageData[field] !== undefined) {
          throw new AppError(`System page ${field} cannot be changed.`, 400);
        }
      }
    }

    if (!page.is_system && pageData.slug !== undefined) {
      const existingPage = await findPageSlugExcludingPageId(
        pageData.slug,
        pageId,
      );

      if (existingPage) {
        throw new AppError("Page slug already exists", 409, {
          slug: ["Page slug already exists."],
        });
      }
    }

    const updatePayload = toUpdatePagePayload(page, pageData);

    const updatedPageCount = await updatePage(
      pageId,
      updatePayload,
      user.userId,
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

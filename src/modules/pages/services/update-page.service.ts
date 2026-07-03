import { AppError } from "@/shared/utils/errors/app-error";
import {
  findPageById,
  findPageSlugExcludingPageId,
  updatePage,
  countPagesByTemplate,
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

  const existingPage = await findPageSlugExcludingPageId(pageData.slug, pageId);

  if (existingPage) {
    throw new AppError("Page slug already exists", 409, {
      slug: ["Page slug already exists."],
    });
  }

  // Prevent multiple home pages
  if (pageData.template === "home") {
    const homeCount = await countPagesByTemplate("home", pageId);
    if (homeCount > 0) {
      throw new AppError("Only one Home page can exist", 400, {
        template: ["A page with the Home template already exists."],
      });
    }
  }

  // Prevent unpublishing the home page
  if (page.template === "home" && pageData.status === "draft") {
    throw new AppError("The Home page cannot be unpublished", 400, {
      status: ["The Home page must remain published."],
    });
  }

  try {
    const updatedPageCount = await updatePage(pageId, pageData);
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

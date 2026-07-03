import { AppError } from "@/shared/utils/errors/app-error";
import { softDeletePage, findPageById } from "../repositories/page.repository";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";

export async function deletePageService(
  pageId: number,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.PAGES_DELETE);
  const page = await findPageById(pageId);
  if (!page) {
    throw new AppError("Page not found", 404);
  }

  if (page.template === "home") {
    throw new AppError("Cannot delete the Home page.", 400, {
      template: ["Reassign the Home template to another page before deleting this one."],
    });
  }

  const deletedPageCount = await softDeletePage(pageId);

  if (deletedPageCount === 0) {
    throw new AppError("Page not found", 404);
  }
}

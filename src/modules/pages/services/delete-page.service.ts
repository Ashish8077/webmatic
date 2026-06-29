import { AppError } from "@/shared/utils/errors/app-error";
import { softDeletePage } from "../repositories/page.repository";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";

export async function deletePageService(
  pageId: number,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.PAGES_DELETE);

  const deletedPageCount = await softDeletePage(pageId);

  if (deletedPageCount === 0) {
    throw new AppError("Page not found", 404);
  }
}

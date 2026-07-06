import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { findPageSectionsByPageId } from "../repositories/page-section.repository";
import { toPageSectionListItem } from "../mapper/page-section.mapper";
import { PageSectionListItem } from "../types/api.types";
import { findPageById } from "@/modules/pages/repositories/page.repository";
import { AppError } from "@/shared/utils/errors/app-error";

export async function getPageSectionsService(
  pageId: number,
  user: AuthUser,
): Promise<PageSectionListItem[]> {
  requirePermission(user, PERMISSIONS.PAGES_VIEW);

  const page = await findPageById(pageId);

  console.log(page);

  if (!page) {
    throw new AppError("Page not found", 404);
  }

  const pageSections = await findPageSectionsByPageId(pageId);

  return pageSections.map(toPageSectionListItem);
}

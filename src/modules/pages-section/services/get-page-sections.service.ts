import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { findPageSectionsByPageId } from "../repositories/page-section.repository";
import { toPageSectionListItem } from "../mapper/page-section.mapper";
import { PageSectionListItem } from "../types/api.types";
import { findPageById } from "@/modules/pages/repositories/page.repository";
import { AppError } from "@/shared/utils/errors/app-error";
import { hydrateJsonMedia } from "@/modules/media/services/hydrate-json-media.service";
import { JsonObject } from "@/shared/types/json";

export async function getPageSectionsService(
  pageId: number,
  user: AuthUser,
): Promise<PageSectionListItem[]> {
  requirePermission(user, PERMISSIONS.PAGES_VIEW);

  const page = await findPageById(pageId);


  if (!page) {
    throw new AppError("Page not found", 404);
  }

  const pageSections = await findPageSectionsByPageId(pageId);

  const hydratedSections = await Promise.all(
    pageSections.map(async (section) => {
      return {
        ...section,
        content: (await hydrateJsonMedia(section.content)) as JsonObject,
      };
    })
  );

  return hydratedSections.map(toPageSectionListItem);
}

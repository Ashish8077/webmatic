import { AppError } from "@/shared/utils/errors/app-error";
import { findSectionById } from "../repositories/page-section.repository";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { toPageSectionResponse } from "../mapper/page-section.mapper";
import { PageSectionResponse } from "../types/api.types";

export async function getSectionById(
  sectionId: number,
  user: AuthUser,
): Promise<PageSectionResponse> {
  requirePermission(user, PERMISSIONS.PAGE_SECTIONS_VIEW);

  const pageSection = await findSectionById(sectionId);

  if (!pageSection) {
    throw new AppError("Section not found", 404);
  }

  return toPageSectionResponse(pageSection);
}

import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { softDeleteSection } from "../repositories/page-section.repository";
import { AppError } from "@/shared/utils/errors/app-error";

export async function deleteSectionService(
  sectionId: number,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.PAGES_DELETE);

  const deletedSectionCount = await softDeleteSection(sectionId);

  if (deletedSectionCount === 0) {
    throw new AppError("Section not found", 404);
  }
}

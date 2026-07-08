import { AuthUser } from "@/modules/auth/types/auth-user";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { updatePageSection } from "../repositories/page-section.repository";
import { UpdatePageSectionInput } from "../validation/update-page-section.schema";
import { AppError } from "@/shared/utils/errors/app-error";
import { PageStatus } from "@/modules/pages/constants/page.constants";

export async function updatePageSectionService(
  sectionId: number,
  sectionData: UpdatePageSectionInput,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.PAGES_UPDATE);

  const updatedRowCount = await updatePageSection(
    sectionId,
    sectionData,
    user.userId,
  );

  if (updatedRowCount === 0) {
    throw new AppError("Page section not found", 404);
  }
}

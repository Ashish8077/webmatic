import { AuthUser } from "@/modules/auth/types/auth-user";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { updatePageSection } from "../repositories/page-section.repository";
import { UpdatePageSectionInput } from "../validation/update-page-section.schema";
import { AppError } from "@/shared/utils/errors/app-error";

import { handleDuplicateConstraint } from "@/shared/utils/errors/database-error.util";

export async function updatePageSectionService(
  sectionId: number,
  sectionData: UpdatePageSectionInput,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.PAGE_SECTIONS_UPDATE);

  try {
    const updatedRowCount = await updatePageSection(
      sectionId,
      sectionData,
      user.userId,
    );

    if (updatedRowCount === 0) {
      throw new AppError("Page section not found", 404);
    }
  } catch (error) {
    handleDuplicateConstraint(error, {
      uk_page_section_type_per_page: {
        field: "sectionType",
        message: "A section of this type already exists on this page.",
      },
    });
    throw error;
  }
}

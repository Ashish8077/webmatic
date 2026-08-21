import { findPageById } from "@/modules/pages/repositories/page.repository";
import { CreatePageSectionInput } from "../validation/create-page-section.schema";
import { AppError } from "@/shared/utils/errors/app-error";
import { handleDuplicateConstraint } from "@/shared/utils/errors/database-error.util";
import { PageSectionResponse } from "../types/api.types";
import {
  createPageSection,
  findSectionById,
} from "../repositories/page-section.repository";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { toCreatePageSectionResponse } from "../mapper/page-section.mapper";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";

import {
  SECTION_STATUS,
  SectionStatus,
} from "../constants/page-section.constants";

export async function createPageSectionService(
  pageId: number,
  sectionData: CreatePageSectionInput,
  user: AuthUser,
): Promise<PageSectionResponse> {
  requirePermission(user, PERMISSIONS.PAGE_SECTIONS_CREATE);

  try {
    const page = await findPageById(pageId);
    if (!page) {
      throw new AppError("Page not found", 404);
    }

    const status: SectionStatus = sectionData.status ?? SECTION_STATUS.DRAFT;

    const pageSectionId = await createPageSection(
      pageId,
      sectionData,
      user.userId,
      status,
    );

    const pageSection = await findSectionById(pageSectionId);

    if (!pageSection) {
      throw new AppError("Failed to retrieve created page section", 500);
    }

    return toCreatePageSectionResponse(pageSection);
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

import { findPageById } from "@/modules/pages/repositories/page.repository";
import { CreatePageSectionInput } from "../schemas/create-page-section.schema";
import { AppError } from "@/shared/utils/errors/app-error";
import { isDuplicateKeyError } from "@/shared/utils/errors/database-error.util";
import { PageSectionResponse } from "../types/api.types";
import {
  createPageSection,
  findSectionById,
} from "../repositories/page-section.repository";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { toCreatePageSectionResponse } from "../mapper/page-section.mapper";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";

export async function createPageSectionService(
  pageId: number,
  sectionData: CreatePageSectionInput,
  user: AuthUser,
): Promise<PageSectionResponse> {
  requirePermission(user, PERMISSIONS.PAGES_CREATE);

  const page = await findPageById(pageId);
  if (!page) {
    throw new AppError("Page not found", 404);
  }

  try {
    const pageSectionId = await createPageSection(
      pageId,
      sectionData,
      user.userId,
    );

    const pageSection = await findSectionById(pageSectionId);

    console.log(pageSection);

    if (!pageSection) {
      throw new AppError("Failed to retrieve created page section", 500);
    }

    return toCreatePageSectionResponse(pageSection);
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      throw new AppError(
        "A section of this type already exists on this page.",
        409,
        {
          sectionType: ["Duplicate section type."],
        },
      );
    }
    throw error;
  }
}

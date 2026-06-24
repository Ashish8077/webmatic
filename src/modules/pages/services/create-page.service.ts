// modules/pages/services/create-page.service.ts

import { AppError } from "@/shared/utils/errors/app-error";
import { isDuplicateKeyError } from "@/shared/utils/errors/database-error.util";

import { createPage, findPageSlug } from "../repositories/page.repository";

import { CreatePageInput } from "../validators/create-page.schema";

import { CreatePageResponse } from "../services/types";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";

export async function createPageService(
  pageData: CreatePageInput,
  user: AuthUser,
): Promise<CreatePageResponse> {
  requirePermission(user, PERMISSIONS.PAGE_CREATE);

  const existingPage = await findPageSlug(pageData.slug);

  if (existingPage) {
    throw new AppError("Page slug already exists", 409);
  }

  try {
    const pageId = await createPage(pageData);

    return {
      page: {
        id: pageId,
        title: pageData.title,
        slug: pageData.slug,
        status: "draft",
      },
    };
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      throw new AppError("Page slug already exists", 409);
    }
    throw error;
  }
}

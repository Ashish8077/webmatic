// modules/pages/services/create-page.service.ts

import { AppError } from "@/shared/utils/errors/app-error";
import { isDuplicateKeyError } from "@/shared/utils/errors/database-error.util";

import { createPage, findPageSlug } from "../repositories/page.repository";

import { CreatePageInput } from "../validation/create-page.schema";

import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { toCreatePageResponse } from "../mapper/page.mapper";
import { PageStatus } from "../constants/page.constants";
import { CreatePageResponse } from "../types/service.types";

export async function createPageService(
  pageData: CreatePageInput,
  user: AuthUser,
): Promise<CreatePageResponse> {
  requirePermission(user, PERMISSIONS.PAGES_CREATE);

  try {
    const existingPage = await findPageSlug(pageData.slug);

    if (existingPage) {
      throw new AppError("Page slug already exists", 409, {
        slug: ["Page slug already exists."],
      });
    }

    const publishedAt: Date | null =
      pageData.status === "published" ? new Date() : null;
    const status: PageStatus = pageData.status ?? "draft";
    const pageId = await createPage(pageData, user.userId, publishedAt, status);

    return toCreatePageResponse({
      id: pageId,
      title: pageData.title,
      slug: pageData.slug,
      status,
    });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      throw new AppError("Page slug already exists", 409);
    }
    throw error;
  }
}

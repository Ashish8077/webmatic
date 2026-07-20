// modules/pages/services/create-page.service.ts

import { AppError } from "@/shared/utils/errors/app-error";
import { handleDuplicateConstraint } from "@/shared/utils/errors/database-error.util";

import { createPage, findPageSlug } from "../repositories/page.repository";

import { CreatePageInput } from "../validation/create-page.schema";

import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";
import {
  toCreatePagePayload,
  toCreatePageResponse,
} from "../mapper/page.mapper";
import { PageStatus } from "../constants/page.constants";
import { CreatePageResponse } from "../types/service.types";

export async function createPageService(
  pageData: CreatePageInput,
  user: AuthUser,
): Promise<CreatePageResponse> {
  requirePermission(user, PERMISSIONS.PAGES_CREATE);

  try {
    /**
     * System page templates cannot be created.
     */
    if (pageData.template !== "default") {
      throw new AppError("System page templates cannot be created.", 400, {
        template: ["Only custom pages can be created."],
      });
    }

    /**
     * Slug must be unique
     */
    const existingPage = await findPageSlug(pageData.slug);

    if (existingPage) {
      throw new AppError("Page slug already exists", 409, {
        slug: ["Page slug already exists."],
      });
    }

    /**
     * Create page
     *
     * Repository should always save:
     * is_system = false
     */

    const createPageRequest = toCreatePagePayload(pageData);
    const pageId = await createPage(createPageRequest, user.userId);

    return toCreatePageResponse({
      id: pageId,
      title: createPageRequest.title,
      slug: createPageRequest.slug,
      template: createPageRequest.template,
      status: createPageRequest.status,
    });
  } catch (error) {
    handleDuplicateConstraint(error, {
      slug: { field: "slug", message: "Page slug already exists." },
    });
    throw error;
  }
}

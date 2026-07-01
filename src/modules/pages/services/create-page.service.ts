// modules/pages/services/create-page.service.ts

import { AppError } from "@/shared/utils/errors/app-error";
import { isDuplicateKeyError } from "@/shared/utils/errors/database-error.util";

import { createPage, findPageSlug } from "../repositories/page.repository";

import { CreatePageInput } from "../validators/create-page.schema";

import { CreatePageResponse } from "../types";

export async function createPageService(
  pageData: CreatePageInput,
): Promise<CreatePageResponse> {
  const existingPage = await findPageSlug(pageData.slug);

  if (existingPage) {
    throw new AppError("Page slug already exists", 409, {
      slug: ["Page slug already exists."],
    });
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

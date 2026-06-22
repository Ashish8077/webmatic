// modules/pages/services/create-page.service.ts

import { AppError } from "@/lib/errors/app-error";

import {
  createPage,
  findPublishedPageBySlug,
} from "../repositories/page.repository";

import { CreatePageInput } from "../validators/create-page.schema";

import { CreatePageResponse } from "../types";

export async function createPageService(
  pageData: CreatePageInput,
): Promise<CreatePageResponse> {
  const existingPage = await findPublishedPageBySlug(pageData.slug);

  if (existingPage) {
    throw new AppError("Page slug already exists", 409);
  }

  const pageId = await createPage(pageData);

  return {
    page: {
      id: pageId,
      title: pageData.title,
      slug: pageData.slug,
      status: "draft",
    },
  };
}

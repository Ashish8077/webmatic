import { AppError } from "@/shared/utils/errors/app-error";
import { findPageById } from "../repositories/page.repository";
import { PageDetailsResponse } from "../types";

export async function getPageByIdService(
  id: number,
): Promise<PageDetailsResponse> {
  const page = await findPageById(id);

  if (!page) {
    throw new AppError("Page not found", 404);
  }

  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    status: page.status,
    template: page.template,

    seoTitle: page.seo_title,
    metaDescription: page.meta_description,
    metaKeywords: page.meta_keywords,

    canonicalUrl: page.canonical_url,

    robotsIndex: Boolean(page.robots_index),
    robotsFollow: Boolean(page.robots_follow),

    schemaMarkup: page.schema_markup,

    publishedAt: page.published_at?.toISOString() ?? null,

    createdAt: page.created_at.toISOString(),
    updatedAt: page.updated_at.toISOString(),
  };
}

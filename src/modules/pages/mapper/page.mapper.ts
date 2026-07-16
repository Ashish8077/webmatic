import { PageStatus } from "../constants/page.constants";
import { PageTemplate } from "../constants/page-templates";
import { PageDetailsRow, PageListRow } from "../types/repository.types";
import {
  CreatePagePayload,
  CreatePageResponse,
  PageDetailsResponse,
  PageListItem,
  UpdatePagePayload,
} from "../types/service.types";
import { UpdatePageInput } from "../validation/update-page.schema";
import { CreatePageInput } from "../validation/create-page.schema";

type CreatedPage = {
  id: number;
  title: string;
  slug: string;
  template: PageTemplate;
  status: PageStatus;
};

/**
 * Maps the create page DTO to the create page response.
 * @param page - The create page DTO.
 * @returns The create page response.
 */

export function toCreatePageResponse(page: CreatedPage): CreatePageResponse {
  return {
    page: {
      id: page.id,
      title: page.title,
      slug: page.slug,
      template: page.template,
      status: page.status,
    },
  };
}

/**
 * Maps the create page input to the create page payload.
 * @param pageData - The create page input.
 * @returns The create page payload.
 */

export function toCreatePagePayload(
  pageData: CreatePageInput,
): CreatePagePayload {
  return {
    title: pageData.title,
    slug: pageData.slug,
    template: pageData.template,

    status: pageData.status,

    seoTitle: pageData.seoTitle,
    metaDescription: pageData.metaDescription,
    metaKeywords: pageData.metaKeywords,
    canonicalUrl: pageData.canonicalUrl,

    ogTitle: pageData.ogTitle,
    ogDescription: pageData.ogDescription,
    ogImageId: pageData.ogImageId,

    twitterTitle: pageData.twitterTitle,
    twitterDescription: pageData.twitterDescription,
    twitterImageId: pageData.twitterImageId,

    schemaMarkup: pageData.schemaMarkup,
  };
}

/**
 * Maps the update page input to the update page payload.
 * @param page - The page details row.
 * @param pageData - The update page input.
 * @returns The update page payload.
 */

export function toUpdatePagePayload(
  currentPage: PageDetailsRow,
  updates: UpdatePageInput,
): UpdatePagePayload {
  const payload: UpdatePagePayload = {
    title: currentPage.title,
    slug: currentPage.slug,
    template: currentPage.template,
    status: currentPage.status,

    seoTitle: currentPage.seo_title,
    metaDescription: currentPage.meta_description,
    metaKeywords: currentPage.meta_keywords,
    canonicalUrl: currentPage.canonical_url,

    ogTitle: currentPage.og_title,
    ogDescription: currentPage.og_description,
    ogImageId: currentPage.og_image_id,

    twitterTitle: currentPage.twitter_title,
    twitterDescription: currentPage.twitter_description,
    twitterImageId: currentPage.twitter_image_id,

    robotsIndex: Boolean(currentPage.robots_index),
    robotsFollow: Boolean(currentPage.robots_follow),

    schemaMarkup: currentPage.schema_markup,
  };

  if (updates.title !== undefined) payload.title = updates.title;
  if (updates.slug !== undefined) payload.slug = updates.slug;
  if (updates.template !== undefined) payload.template = updates.template;
  if (updates.status !== undefined) payload.status = updates.status;

  if (updates.seoTitle !== undefined) payload.seoTitle = updates.seoTitle;
  if (updates.metaDescription !== undefined)
    payload.metaDescription = updates.metaDescription;
  if (updates.metaKeywords !== undefined)
    payload.metaKeywords = updates.metaKeywords;
  if (updates.canonicalUrl !== undefined)
    payload.canonicalUrl = updates.canonicalUrl;

  if (updates.ogTitle !== undefined) payload.ogTitle = updates.ogTitle;
  if (updates.ogDescription !== undefined)
    payload.ogDescription = updates.ogDescription;
  if (updates.ogImageId !== undefined) payload.ogImageId = updates.ogImageId;

  if (updates.twitterTitle !== undefined)
    payload.twitterTitle = updates.twitterTitle;
  if (updates.twitterDescription !== undefined)
    payload.twitterDescription = updates.twitterDescription;
  if (updates.twitterImageId !== undefined)
    payload.twitterImageId = updates.twitterImageId;

  if (updates.robotsIndex !== undefined)
    payload.robotsIndex = updates.robotsIndex;
  if (updates.robotsFollow !== undefined)
    payload.robotsFollow = updates.robotsFollow;

  if (updates.schemaMarkup !== undefined) {
    payload.schemaMarkup = updates.schemaMarkup;
  }

  return payload;
}

/**
 * Maps the page details row to the page details response.
 * @param page - The page details row.
 * @returns The page details response.
 */

export function toPageDetailsResponse(
  page: PageDetailsRow,
): PageDetailsResponse {
  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    template: page.template,
    status: page.status,

    seoTitle: page.seo_title,
    metaDescription: page.meta_description,
    metaKeywords: page.meta_keywords,
    canonicalUrl: page.canonical_url,

    ogTitle: page.og_title,
    ogDescription: page.og_description,
    ogImageId: page.og_image_id,

    twitterTitle: page.twitter_title,
    twitterDescription: page.twitter_description,
    twitterImageId: page.twitter_image_id,

    robotsIndex: Boolean(page.robots_index),
    robotsFollow: Boolean(page.robots_follow),

    schemaMarkup: page.schema_markup,

    publishedAt: page.published_at?.toISOString() ?? null,

    createdAt: page.created_at.toISOString(),
    updatedAt: page.updated_at.toISOString(),
  };
}

/**
 * Maps the page list rows to the page list items.
 * @param pages - The page list rows.
 * @returns The page list items.
 */

export function toPageListItems(pages: PageListRow[]): PageListItem[] {
  return pages.map((page) => toPageListItem(page));
}

/**
 * Maps the page list row to the page list item.
 * @param page - The page list row.
 * @returns The page list item.
 */

export function toPageListItem(page: PageListRow): PageListItem {
  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    template: page.template,
    status: page.status,
    publishedAt: page.published_at?.toISOString() ?? null,
    updatedAt: page.updated_at.toISOString(),
  };
}

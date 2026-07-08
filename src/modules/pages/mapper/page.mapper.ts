import { PageStatus } from "../constants/page.constants";
import { PageDetailsRow, PageListRow } from "../types/repository.types";
import {
  CreatePageResponse,
  PageDetailsResponse,
  PageListItem,
} from "../types/service.types";

type CreatedPage = {
  id: number;
  title: string;
  slug: string;
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
      status: page.status,
    },
  };
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
    status: page.status,
    publishedAt: page.published_at?.toISOString() ?? null,
    updatedAt: page.updated_at.toISOString(),
  };
}

import { JsonObject } from "@/shared/types/json";
import { PaginationMeta } from "@/shared/types/pagination";
import { PageStatus } from "../constants/page.constants";
import { PageTemplate } from "../constants/page-templates";

export interface CreatePageResponse {
  page: {
    id: number;
    title: string;
    slug: string;
    template: PageTemplate;
    status: PageStatus;
  };
}

export interface PageListItem {
  id: number;
  title: string;
  slug: string;
  template: PageTemplate;
  status: PageStatus;
  publishedAt: string | null;
  updatedAt: string;
}

export interface PageListResponse {
  items: PageListItem[];
  pagination: Omit<PaginationMeta, "pageSize"> & { limit: number };
}

export interface PageDetailsResponse {
  id: number;
  title: string;
  slug: string;
  template: PageTemplate;
  status: PageStatus;
  seoTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageId: number | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageId: number | null;
  robotsIndex: boolean;
  robotsFollow: boolean;
  schemaMarkup: JsonObject | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Internal CreatePage payload passed from the service to the repository.
 */
export interface CreatePagePayload {
  title: string;
  slug: string;
  template: PageTemplate;
  status: PageStatus;

  seoTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;

  ogTitle: string | null;
  ogDescription: string | null;
  ogImageId: number | null;

  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageId: number | null;

  schemaMarkup: Record<string, unknown> | null;
}

/**
 * Internal UpdatePage payload passed from the service to the repository.
 */
export interface UpdatePagePayload {
  title: string;
  slug: string;
  template: PageTemplate;
  status: PageStatus;

  seoTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;

  ogTitle: string | null;
  ogDescription: string | null;
  ogImageId: number | null;

  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageId: number | null;

  robotsIndex: boolean;
  robotsFollow: boolean;

  schemaMarkup: Record<string, unknown> | null;
}

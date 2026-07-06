import { JsonObject } from "@/shared/types/json";
import { PaginationMeta } from "@/shared/types/pagination";

export interface CreatePageResponse {
  page: {
    id: number;
    title: string;
    slug: string;
    status: "draft" | "published";
  };
}

export interface PageListItem {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published";
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
  status: "draft" | "published";
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

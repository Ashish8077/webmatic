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
  publishedAt: Date | null;
  updatedAt: Date;
}

export interface PageListResponse {
  items: PageListItem[];
  pagination: PaginationMeta;
}

export interface PageDetailsResponse {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published";
  template: string | null;
  seoTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;
  robotsIndex: boolean;
  robotsFollow: boolean;
  schemaMarkup: JsonObject | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

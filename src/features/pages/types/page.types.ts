// ===== Domain Models =====

import { BaseResponse } from "@/shared/types/api.types";

// export interface Page {
//   id: number;
//   title: string;
//   slug: string;
//   status: PageStatus;
//   // ...
// }

// ===== ===== ===== ===== ===== ===== ===== API Requests =====  ===== ===== ===== ===== ===== =====

export interface CreatePageRequest {
  title: string;
  slug: string;
  status?: "draft" | "published";
  seoTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageId?: number | null;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImageId?: number | null;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  schemaMarkup?: Record<string, unknown>;
}

export type UpdatePageRequest = CreatePageRequest;

// ===== ===== ===== ===== ===== ===== ===== API Responses ===== ===== ===== ===== ===== ===== =====

export interface Page {
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
  schemaMarkup: Record<string, unknown> | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePageResponse extends BaseResponse {
  data: {
    id: number;
  };
}

export interface GetPageResponse extends BaseResponse {
  data: Page;
}

export interface PageListItem {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published";
  publishedAt: string | null;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ListPagesResponse extends BaseResponse {
  data: {
    items: PageListItem[];
    pagination: Pagination;
  };
}

// export interface CreatePageResponse {
//   page: Page;
// }

// export interface GetPageResponse {
//   page: Page;
// }

// export interface GetPagesResponse {
//   pages: Page[];
//   pagination: Pagination;
// }

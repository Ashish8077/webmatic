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
  template?: string;
  seoTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  schemaMarkup?: Record<string, unknown>;
}

// ===== ===== ===== ===== ===== ===== ===== API Responses ===== ===== ===== ===== ===== ===== =====

export interface Page {
  id: number;
  title: string;
  slug: string;
  status?: "draft" | "published";
  template?: string;
  seoTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  schemaMarkup?: Record<string, unknown>;
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

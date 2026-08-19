import { BaseResponse } from "@/shared/types/api.types";
import { JsonObject } from "@/shared/types/json";
import { PaginationMeta } from "@/shared/types/pagination";
import { Media } from "@/features/media/types";
import { WorkCategory } from "@/modules/work/constants/work.constants";

export type WorkProjectStatus = "draft" | "published";

export interface CreateWorkProjectRequest {
  title: string;
  slug: string;
  category: WorkCategory;
  shortDescription?: string | null;
  description?: string | null;
  projectUrl?: string | null;
  
  featuredImageId?: number | null;

  seoTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  canonicalUrl?: string | null;

  openGraphTitle?: string | null;
  openGraphDescription?: string | null;
  openGraphImageId?: number | null;

  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImageId?: number | null;

  schemaMarkup?: JsonObject | null;

  status?: WorkProjectStatus;
  isFeatured?: boolean;
  sortOrder?: number;
}

export type UpdateWorkProjectRequest = Partial<CreateWorkProjectRequest>;

export interface WorkProjectListItem {
  id: number;
  title: string;
  slug: string;
  category: WorkCategory;
  shortDescription?: string | null;
  featuredImageId?: number | null;
  featuredImage?: Media;
  status: WorkProjectStatus;
  isFeatured: boolean;
  sortOrder: number;
  publishedAt: string | null;
  updatedAt: string;
}

export interface WorkProjectListResponse extends BaseResponse {
  data: {
    items: WorkProjectListItem[];
    pagination: Omit<PaginationMeta, "pageSize"> & { limit: number };
  };
}

export interface WorkProjectDetailsResponse {
  id: number;
  title: string;
  slug: string;
  category: WorkCategory;
  shortDescription: string | null;
  description: string | null;
  projectUrl: string | null;
  
  featuredImageId: number | null;
  featuredImage?: Media;

  seoTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;

  openGraphTitle: string | null;
  openGraphDescription: string | null;
  openGraphImageId: number | null;
  openGraphImage?: Media;

  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageId: number | null;
  twitterImage?: Media;

  schemaMarkup: JsonObject | null;

  status: WorkProjectStatus;
  isFeatured: boolean;
  sortOrder: number;

  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetWorkProjectResponse extends BaseResponse {
  data: WorkProjectDetailsResponse;
}

export interface CreateWorkProjectResponse extends BaseResponse {
  data: {
    id: number;
    title: string;
    slug: string;
    status: WorkProjectStatus;
  };
}

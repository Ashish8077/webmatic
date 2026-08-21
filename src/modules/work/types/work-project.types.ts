import { JsonObject } from "@/shared/types/json";
import { PaginationMeta } from "@/shared/types/pagination";
import { Media } from "@/features/media/types";
import { WorkCategory } from "../constants/work.constants";

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

export interface CreateWorkProjectResponse {
  project: {
    id: number;
    title: string;
    slug: string;
    status: WorkProjectStatus;
  };
}

export interface WorkProjectListItem {
  id: number;
  title: string;
  slug: string;
  category: WorkCategory;
  shortDescription: string | null;
  featuredImageId: number | null;
  featuredImage?: Media;
  status: WorkProjectStatus;
  isFeatured: boolean;
  sortOrder: number;
  publishedAt: string | null;
  updatedAt: string;
}

export interface WorkProjectListResponse {
  items: WorkProjectListItem[];
  pagination: Omit<PaginationMeta, "pageSize"> & { limit: number };
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

export interface CreateWorkProjectPayload {
  title: string;
  slug: string;
  category: WorkCategory;
  short_description: string | null;
  description: string | null;
  project_url: string | null;

  featured_image_id: number | null;

  seo_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  canonical_url: string | null;

  open_graph_title: string | null;
  open_graph_description: string | null;
  open_graph_image_id: number | null;

  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image_id: number | null;

  schema_markup: Record<string, unknown> | null;

  status: WorkProjectStatus;
  is_featured: boolean;
  sort_order: number;
}

export interface UpdateWorkProjectPayload extends Partial<CreateWorkProjectPayload> {
  published_at?: Date | null;
}

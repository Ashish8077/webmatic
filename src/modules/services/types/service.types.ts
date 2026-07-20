import { JsonObject } from "@/shared/types/json";
import { PaginationMeta } from "@/shared/types/pagination";
import { ServiceStatus } from "../constants/service.constants";

export interface CreateServiceResponse {
  service: {
    id: number;
    name: string;
    slug: string;
    status: ServiceStatus;
  };
}

export interface ServiceListItem {
  id: number;
  name: string;
  slug: string;
  status: ServiceStatus;
  isFeatured: boolean;
  sortOrder: number;
  publishedAt: string | null;
  updatedAt: string;
}

export interface ServiceListResponse {
  items: ServiceListItem[];
  pagination: Omit<PaginationMeta, "pageSize"> & { limit: number };
}

export interface ServiceDetailsResponse {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  
  featuredImageId: number | null;
  bannerImageId: number | null;

  keyFeatures: string[] | null;
  benefits: string[] | null;
  faq: JsonObject | null;

  ctaTitle: string | null;
  ctaDescription: string | null;
  ctaButtonText: string | null;
  ctaButtonUrl: string | null;

  seoTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;

  openGraphTitle: string | null;
  openGraphDescription: string | null;
  openGraphImageId: number | null;

  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageId: number | null;

  schemaMarkup: JsonObject | null;

  status: ServiceStatus;
  isFeatured: boolean;
  sortOrder: number;

  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Internal CreateService payload passed from the service to the repository.
 */
export interface CreateServicePayload {
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;

  featured_image_id: number | null;
  banner_image_id: number | null;

  key_features: string | null; // stored as JSON string
  benefits: string | null;     // stored as JSON string
  faq: string | null;          // stored as JSON string

  cta_title: string | null;
  cta_description: string | null;
  cta_button_text: string | null;
  cta_button_url: string | null;

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

  status: ServiceStatus;
  is_featured: boolean;
  sort_order: number;
}

/**
 * Internal UpdateService payload passed from the service to the repository.
 */
export interface UpdateServicePayload extends Partial<CreateServicePayload> {
  published_at?: Date | null;
}

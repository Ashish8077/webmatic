import { BaseResponse } from "@/shared/types/api.types";
import { JsonObject } from "@/shared/types/json";
import { PaginationMeta } from "@/shared/types/pagination";
import { VisualType } from "@/shared/types/visual-asset.types";

export type ServiceStatus = "draft" | "published";

export interface ServiceBenefit {
  title: string;
  visualType: VisualType;
  iconName?: string | null;
  imageId?: number | null;
  image?: any;
}

export interface CreateServiceRequest {
  name: string;
  slug: string;
  shortDescription?: string | null;
  description?: string | null;
  
  featuredImageId?: number | null;
  bannerImageId?: number | null;

  visualType?: "none" | "icon" | "image";
  iconName?: string | null;
  imageId?: number | null;

  keyFeatures?: string[] | null;
  benefits?: ServiceBenefit[] | null;
  faq?: { question: string; answer: string }[] | null;

  ctaTitle?: string | null;
  ctaDescription?: string | null;
  ctaButtonText?: string | null;
  ctaButtonUrl?: string | null;

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

  status?: ServiceStatus;
  isFeatured?: boolean;
  sortOrder?: number;
}

export type UpdateServiceRequest = Partial<CreateServiceRequest>;

export interface ServiceListItem {
  id: number;
  name: string;
  slug: string;
  status: ServiceStatus;
  isFeatured: boolean;
  sortOrder: number;
  visualType: "none" | "icon" | "image";
  iconName: string | null;
  imageId: number | null;
  publishedAt: string | null;
  updatedAt: string;
}

export interface ServiceListResponse extends BaseResponse {
  data: {
    items: ServiceListItem[];
    pagination: Omit<PaginationMeta, "pageSize"> & { limit: number };
  };
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  
  featuredImageId: number | null;
  featuredImage?: any;
  bannerImageId: number | null;
  bannerImage?: any;

  visualType: "none" | "icon" | "image";
  iconName: string | null;
  imageId: number | null;
  image?: any;

  keyFeatures: string[] | null;
  benefits: ServiceBenefit[] | null;
  faq: { question: string; answer: string }[] | null;

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
  openGraphImage?: any;

  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageId: number | null;
  twitterImage?: any;

  schemaMarkup: JsonObject | null;

  status: ServiceStatus;
  isFeatured: boolean;
  sortOrder: number;

  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetServiceResponse extends BaseResponse {
  data: Service;
}

export interface CreateServiceResponse extends BaseResponse {
  data: {
    id: number;
    name: string;
    slug: string;
    status: ServiceStatus;
  };
}

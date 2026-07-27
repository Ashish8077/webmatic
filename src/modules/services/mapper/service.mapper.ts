import { ServiceStatus } from "../constants/service.constants";
import { ServiceDetailsRow, ServiceListRow } from "../types/repository.types";
import {
  CreateServicePayload,
  CreateServiceResponse,
  ServiceDetailsResponse,
  ServiceListItem,
  UpdateServicePayload,
} from "../types/service.types";
import { UpdateServiceInput } from "../validation/update-service.schema";
import { CreateServiceInput } from "../validation/create-service.schema";

type CreatedService = {
  id: number;
  name: string;
  slug: string;
  status: ServiceStatus;
};

/**
 * Maps the create service DTO to the create service response.
 */
export function toCreateServiceResponse(
  service: CreatedService,
): CreateServiceResponse {
  return {
    service: {
      id: service.id,
      name: service.name,
      slug: service.slug,
      status: service.status,
    },
  };
}

/**
 * Maps the create service input to the create service payload.
 */
export function toCreateServicePayload(
  serviceData: CreateServiceInput,
): CreateServicePayload {
  return {
    name: serviceData.name,
    slug: serviceData.slug,
    short_description: serviceData.shortDescription,
    description: serviceData.description,

    featured_image_id: serviceData.featuredImageId,
    banner_image_id: serviceData.bannerImageId,

    visual_type: serviceData.visualType,
    icon_name: serviceData.iconName,
    image_id: serviceData.imageId,

    key_features: JSON.stringify(serviceData.keyFeatures),
    benefits: JSON.stringify(serviceData.benefits),
    faq: JSON.stringify(serviceData.faq),

    cta_title: serviceData.ctaTitle,
    cta_description: serviceData.ctaDescription,
    cta_button_text: serviceData.ctaButtonText,
    cta_button_url: serviceData.ctaButtonUrl,

    seo_title: serviceData.seoTitle,
    meta_description: serviceData.metaDescription,
    meta_keywords: serviceData.metaKeywords,
    canonical_url: serviceData.canonicalUrl,

    open_graph_title: serviceData.openGraphTitle,
    open_graph_description: serviceData.openGraphDescription,
    open_graph_image_id: serviceData.openGraphImageId,

    twitter_title: serviceData.twitterTitle,
    twitter_description: serviceData.twitterDescription,
    twitter_image_id: serviceData.twitterImageId,

    schema_markup: serviceData.schemaMarkup as Record<string, unknown> | null,

    status: serviceData.status,
    is_featured: serviceData.isFeatured,
    sort_order: serviceData.sortOrder,
  };
}

/**
 * Maps the update service input to the update service payload.
 */
export function toUpdateServicePayload(
  updates: UpdateServiceInput,
): UpdateServicePayload {
  const payload: UpdateServicePayload = {};

  if (updates.name !== undefined) payload.name = updates.name;
  if (updates.slug !== undefined) payload.slug = updates.slug;
  if (updates.shortDescription !== undefined)
    payload.short_description = updates.shortDescription;
  if (updates.description !== undefined)
    payload.description = updates.description;

  if (updates.featuredImageId !== undefined)
    payload.featured_image_id = updates.featuredImageId;
  if (updates.bannerImageId !== undefined)
    payload.banner_image_id = updates.bannerImageId;

  if (updates.visualType !== undefined)
    payload.visual_type = updates.visualType;
  if (updates.iconName !== undefined)
    payload.icon_name = updates.iconName;
  if (updates.imageId !== undefined)
    payload.image_id = updates.imageId;

  if (updates.keyFeatures !== undefined) {
    payload.key_features = updates.keyFeatures
      ? JSON.stringify(updates.keyFeatures)
      : null;
  }
  if (updates.benefits !== undefined) {
    payload.benefits = updates.benefits
      ? JSON.stringify(updates.benefits)
      : null;
  }
  if (updates.faq !== undefined) {
    payload.faq = updates.faq ? JSON.stringify(updates.faq) : null;
  }

  if (updates.ctaTitle !== undefined) payload.cta_title = updates.ctaTitle;
  if (updates.ctaDescription !== undefined)
    payload.cta_description = updates.ctaDescription;
  if (updates.ctaButtonText !== undefined)
    payload.cta_button_text = updates.ctaButtonText;
  if (updates.ctaButtonUrl !== undefined)
    payload.cta_button_url = updates.ctaButtonUrl;

  if (updates.seoTitle !== undefined) payload.seo_title = updates.seoTitle;
  if (updates.metaDescription !== undefined)
    payload.meta_description = updates.metaDescription;
  if (updates.metaKeywords !== undefined)
    payload.meta_keywords = updates.metaKeywords;
  if (updates.canonicalUrl !== undefined)
    payload.canonical_url = updates.canonicalUrl;

  if (updates.openGraphTitle !== undefined)
    payload.open_graph_title = updates.openGraphTitle;
  if (updates.openGraphDescription !== undefined)
    payload.open_graph_description = updates.openGraphDescription;
  if (updates.openGraphImageId !== undefined)
    payload.open_graph_image_id = updates.openGraphImageId;

  if (updates.twitterTitle !== undefined)
    payload.twitter_title = updates.twitterTitle;
  if (updates.twitterDescription !== undefined)
    payload.twitter_description = updates.twitterDescription;
  if (updates.twitterImageId !== undefined)
    payload.twitter_image_id = updates.twitterImageId;

  if (updates.schemaMarkup !== undefined) {
    payload.schema_markup = updates.schemaMarkup as Record<
      string,
      unknown
    > | null;
  }

  if (updates.status !== undefined) payload.status = updates.status;
  if (updates.isFeatured !== undefined)
    payload.is_featured = updates.isFeatured;
  if (updates.sortOrder !== undefined) payload.sort_order = updates.sortOrder;

  return payload;
}

/**
 * Maps the service details row to the service details response.
 */
export function toServiceDetailsResponse(
  service: ServiceDetailsRow,
): ServiceDetailsResponse {
  return {
    id: service.id,
    name: service.name,
    slug: service.slug,
    shortDescription: service.short_description,
    description: service.description,

    featuredImageId: service.featured_image_id,
    bannerImageId: service.banner_image_id,

    visualType: service.visual_type,
    iconName: service.icon_name,
    imageId: service.image_id,

    keyFeatures: service.key_features as string[] | null,
    benefits: service.benefits as string[] | null,
    faq: service.faq,

    ctaTitle: service.cta_title,
    ctaDescription: service.cta_description,
    ctaButtonText: service.cta_button_text,
    ctaButtonUrl: service.cta_button_url,

    seoTitle: service.seo_title,
    metaDescription: service.meta_description,
    metaKeywords: service.meta_keywords,
    canonicalUrl: service.canonical_url,

    openGraphTitle: service.open_graph_title,
    openGraphDescription: service.open_graph_description,
    openGraphImageId: service.open_graph_image_id,

    twitterTitle: service.twitter_title,
    twitterDescription: service.twitter_description,
    twitterImageId: service.twitter_image_id,

    schemaMarkup: service.schema_markup,

    status: service.status,
    isFeatured: Boolean(service.is_featured),
    sortOrder: service.sort_order,

    publishedAt: service.published_at?.toISOString() ?? null,

    createdAt: service.created_at.toISOString(),
    updatedAt: service.updated_at.toISOString(),
  };
}

/**
 * Maps the service list rows to the service list items.
 */
export function toServiceListItems(
  services: ServiceListRow[],
): ServiceListItem[] {
  return services.map((service) => toServiceListItem(service));
}

/**
 * Maps the service list row to the service list item.
 */
export function toServiceListItem(service: ServiceListRow): ServiceListItem {
  return {
    id: service.id,
    name: service.name,
    slug: service.slug,
    shortDescription: service.short_description,
    visualType: service.visual_type,
    iconName: service.icon_name,
    imageId: service.image_id,
    featuredImageId: service.featured_image_id,
    ctaButtonText: service.cta_button_text,
    status: service.status,
    isFeatured: Boolean(service.is_featured),
    sortOrder: service.sort_order,
    publishedAt: service.published_at?.toISOString() ?? null,
    updatedAt: service.updated_at.toISOString(),
  };
}

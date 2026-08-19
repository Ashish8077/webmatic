import { WorkProjectListRow, WorkProjectDetailsRow } from "../types/repository.types";
import { WorkProjectListItem, WorkProjectDetailsResponse, CreateWorkProjectPayload, UpdateWorkProjectPayload } from "../types/work-project.types";
import { CreateWorkProjectInput } from "../validation/work-project.validation";
import { UpdateWorkProjectInput } from "../validation/work-project.validation";

export function toWorkProjectListItems(
  items: WorkProjectListRow[],
): WorkProjectListItem[] {
  return items.map((item) => toWorkProjectListItem(item));
}

export function toWorkProjectListItem(
  item: WorkProjectListRow,
): WorkProjectListItem {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    category: item.category,
    shortDescription: item.short_description,
    featuredImageId: item.featured_image_id,
    status: item.status,
    isFeatured: Boolean(item.is_featured),
    sortOrder: item.sort_order,
    publishedAt: item.published_at ? item.published_at.toISOString() : null,
    updatedAt: item.updated_at.toISOString(),
  };
}

export function toWorkProjectDetailsResponse(
  row: WorkProjectDetailsRow,
): WorkProjectDetailsResponse {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    shortDescription: row.short_description,
    description: row.description,
    projectUrl: row.project_url,
    
    featuredImageId: row.featured_image_id,

    seoTitle: row.seo_title,
    metaDescription: row.meta_description,
    metaKeywords: row.meta_keywords,
    canonicalUrl: row.canonical_url,

    openGraphTitle: row.open_graph_title,
    openGraphDescription: row.open_graph_description,
    openGraphImageId: row.open_graph_image_id,

    twitterTitle: row.twitter_title,
    twitterDescription: row.twitter_description,
    twitterImageId: row.twitter_image_id,

    schemaMarkup: row.schema_markup,

    status: row.status,
    isFeatured: Boolean(row.is_featured),
    sortOrder: row.sort_order,

    publishedAt: row.published_at ? row.published_at.toISOString() : null,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export function toCreateWorkProjectPayload(
  input: CreateWorkProjectInput,
): CreateWorkProjectPayload {
  return {
    title: input.title,
    slug: input.slug,
    category: input.category,
    short_description: input.shortDescription ?? null,
    description: input.description ?? null,
    project_url: input.projectUrl ?? null,
    
    featured_image_id: input.featuredImageId ?? null,
    
    seo_title: input.seoTitle ?? null,
    meta_description: input.metaDescription ?? null,
    meta_keywords: input.metaKeywords ?? null,
    canonical_url: input.canonicalUrl ?? null,
    
    open_graph_title: input.openGraphTitle ?? null,
    open_graph_description: input.openGraphDescription ?? null,
    open_graph_image_id: input.openGraphImageId ?? null,
    
    twitter_title: input.twitterTitle ?? null,
    twitter_description: input.twitterDescription ?? null,
    twitter_image_id: input.twitterImageId ?? null,
    
    schema_markup: input.schemaMarkup ? JSON.parse(input.schemaMarkup) : null,
    
    status: input.status ?? "draft",
    is_featured: input.isFeatured ?? false,
    sort_order: input.sortOrder ?? 0,
  };
}

export function toCreateWorkProjectResponse(data: {
  id: number;
  title: string;
  slug: string;
  status: string;
}) {
  return {
    project: {
      id: data.id,
      title: data.title,
      slug: data.slug,
      status: data.status,
    },
  };
}

export function toUpdateWorkProjectPayload(
  updates: UpdateWorkProjectInput,
): UpdateWorkProjectPayload {
  const payload: UpdateWorkProjectPayload = {};

  if (updates.title !== undefined) payload.title = updates.title;
  if (updates.slug !== undefined) payload.slug = updates.slug;
  if (updates.category !== undefined) payload.category = updates.category;
  if (updates.shortDescription !== undefined) payload.short_description = updates.shortDescription;
  if (updates.description !== undefined) payload.description = updates.description;
  if (updates.projectUrl !== undefined) payload.project_url = updates.projectUrl;

  if (updates.featuredImageId !== undefined) payload.featured_image_id = updates.featuredImageId;

  if (updates.seoTitle !== undefined) payload.seo_title = updates.seoTitle;
  if (updates.metaDescription !== undefined) payload.meta_description = updates.metaDescription;
  if (updates.metaKeywords !== undefined) payload.meta_keywords = updates.metaKeywords;
  if (updates.canonicalUrl !== undefined) payload.canonical_url = updates.canonicalUrl;

  if (updates.openGraphTitle !== undefined) payload.open_graph_title = updates.openGraphTitle;
  if (updates.openGraphDescription !== undefined) payload.open_graph_description = updates.openGraphDescription;
  if (updates.openGraphImageId !== undefined) payload.open_graph_image_id = updates.openGraphImageId;

  if (updates.twitterTitle !== undefined) payload.twitter_title = updates.twitterTitle;
  if (updates.twitterDescription !== undefined) payload.twitter_description = updates.twitterDescription;
  if (updates.twitterImageId !== undefined) payload.twitter_image_id = updates.twitterImageId;

  if (updates.schemaMarkup !== undefined) {
    payload.schema_markup = updates.schemaMarkup as Record<string, unknown> | null;
  }

  if (updates.status !== undefined) payload.status = updates.status;
  if (updates.isFeatured !== undefined) payload.is_featured = updates.isFeatured;
  if (updates.sortOrder !== undefined) payload.sort_order = updates.sortOrder;

  return payload;
}

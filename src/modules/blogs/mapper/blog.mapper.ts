import { BlogStatus } from "../constants/blog.constants";
import { BlogDetailsRow, BlogListRow } from "../types/repository.types";
import {
  CreateBlogPayload,
  CreateBlogResponse,
  BlogDetailsResponse,
  BlogListItem,
  UpdateBlogPayload,
} from "../types/service.types";
import { UpdateBlogInput } from "../validation/update-blog.schema";
import { CreateBlogInput } from "../validation/create-blog.schema";

type CreatedBlog = {
  id: number;
  title: string;
  slug: string;
  status: BlogStatus;
};

/**
 * Maps the create blog DTO to the create blog response.
 * @param blog - The create blog DTO.
 * @returns The create blog response.
 */
export function toCreateBlogResponse(blog: CreatedBlog): CreateBlogResponse {
  return {
    blog: {
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      status: blog.status,
    },
  };
}

/**
 * Maps the create blog input to the create blog payload.
 * @param blogData - The create blog input.
 * @returns The create blog payload.
 */
export function toCreateBlogPayload(
  blogData: CreateBlogInput,
): CreateBlogPayload {
  return {
    title: blogData.title,
    slug: blogData.slug,
    excerpt: blogData.excerpt,
    content: blogData.content,

    authorId: blogData.authorId,
    featuredImageId: blogData.featuredImageId,

    status: blogData.status,
    isFeatured: blogData.isFeatured,

    seoTitle: blogData.seoTitle,
    metaDescription: blogData.metaDescription,
    metaKeywords: blogData.metaKeywords,
    canonicalUrl: blogData.canonicalUrl,

    ogTitle: blogData.ogTitle,
    ogDescription: blogData.ogDescription,
    ogImageId: blogData.ogImageId,

    twitterTitle: blogData.twitterTitle,
    twitterDescription: blogData.twitterDescription,
    twitterImageId: blogData.twitterImageId,

    robotsIndex: blogData.robotsIndex,
    robotsFollow: blogData.robotsFollow,

    schemaMarkup: blogData.schemaMarkup,

    categoryIds: blogData.categoryIds,
    tagIds: blogData.tagIds,
  };
}

/**
 * Maps the update blog input to the update blog payload.
 * @param currentBlog - The blog details row.
 * @param updates - The update blog input.
 * @returns The update blog payload.
 */
export function toUpdateBlogPayload(
  currentBlog: BlogDetailsRow,
  updates: UpdateBlogInput,
): UpdateBlogPayload {
  const payload: UpdateBlogPayload = {
    title: currentBlog.title,
    slug: currentBlog.slug,
    excerpt: currentBlog.excerpt,
    content: currentBlog.content,

    authorId: currentBlog.author_id,
    featuredImageId: currentBlog.featured_image_id,

    status: currentBlog.status,
    isFeatured: Boolean(currentBlog.is_featured),

    seoTitle: currentBlog.seo_title,
    metaDescription: currentBlog.meta_description,
    metaKeywords: currentBlog.meta_keywords,
    canonicalUrl: currentBlog.canonical_url,

    ogTitle: currentBlog.og_title,
    ogDescription: currentBlog.og_description,
    ogImageId: currentBlog.og_image_id,

    twitterTitle: currentBlog.twitter_title,
    twitterDescription: currentBlog.twitter_description,
    twitterImageId: currentBlog.twitter_image_id,

    robotsIndex: Boolean(currentBlog.robots_index),
    robotsFollow: Boolean(currentBlog.robots_follow),

    schemaMarkup: currentBlog.schema_markup,

    // Note: Relations are handled separately in the service/repo, 
    // but if passed they are included in the payload.
    categoryIds: [],
    tagIds: [],
  };

  if (updates.title !== undefined) payload.title = updates.title;
  if (updates.slug !== undefined) payload.slug = updates.slug;
  if (updates.excerpt !== undefined) payload.excerpt = updates.excerpt;
  if (updates.content !== undefined) payload.content = updates.content;

  if (updates.authorId !== undefined) payload.authorId = updates.authorId;
  if (updates.featuredImageId !== undefined) payload.featuredImageId = updates.featuredImageId;

  if (updates.status !== undefined) payload.status = updates.status;
  if (updates.isFeatured !== undefined) payload.isFeatured = updates.isFeatured;

  if (updates.seoTitle !== undefined) payload.seoTitle = updates.seoTitle;
  if (updates.metaDescription !== undefined) payload.metaDescription = updates.metaDescription;
  if (updates.metaKeywords !== undefined) payload.metaKeywords = updates.metaKeywords;
  if (updates.canonicalUrl !== undefined) payload.canonicalUrl = updates.canonicalUrl;

  if (updates.ogTitle !== undefined) payload.ogTitle = updates.ogTitle;
  if (updates.ogDescription !== undefined) payload.ogDescription = updates.ogDescription;
  if (updates.ogImageId !== undefined) payload.ogImageId = updates.ogImageId;

  if (updates.twitterTitle !== undefined) payload.twitterTitle = updates.twitterTitle;
  if (updates.twitterDescription !== undefined) payload.twitterDescription = updates.twitterDescription;
  if (updates.twitterImageId !== undefined) payload.twitterImageId = updates.twitterImageId;

  if (updates.robotsIndex !== undefined) payload.robotsIndex = updates.robotsIndex;
  if (updates.robotsFollow !== undefined) payload.robotsFollow = updates.robotsFollow;

  if (updates.schemaMarkup !== undefined) {
    payload.schemaMarkup = updates.schemaMarkup;
  }

  if (updates.categoryIds !== undefined) payload.categoryIds = updates.categoryIds;
  if (updates.tagIds !== undefined) payload.tagIds = updates.tagIds;

  return payload;
}

/**
 * Maps the blog details row to the blog details response.
 * @param blog - The blog details row.
 * @returns The blog details response.
 */
export function toBlogDetailsResponse(
  blog: BlogDetailsRow,
): BlogDetailsResponse {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,

    authorId: blog.author_id,
    featuredImageId: blog.featured_image_id,

    status: blog.status,
    isFeatured: Boolean(blog.is_featured),

    seoTitle: blog.seo_title,
    metaDescription: blog.meta_description,
    metaKeywords: blog.meta_keywords,
    canonicalUrl: blog.canonical_url,

    ogTitle: blog.og_title,
    ogDescription: blog.og_description,
    ogImageId: blog.og_image_id,

    twitterTitle: blog.twitter_title,
    twitterDescription: blog.twitter_description,
    twitterImageId: blog.twitter_image_id,

    robotsIndex: Boolean(blog.robots_index),
    robotsFollow: Boolean(blog.robots_follow),

    schemaMarkup: blog.schema_markup,

    publishedAt: blog.published_at?.toISOString() ?? null,
    createdAt: blog.created_at.toISOString(),
    updatedAt: blog.updated_at.toISOString(),
  };
}

/**
 * Maps the blog list rows to the blog list items.
 * @param blogs - The blog list rows.
 * @returns The blog list items.
 */
export function toBlogListItems(blogs: BlogListRow[]): BlogListItem[] {
  return blogs.map((blog) => toBlogListItem(blog));
}

/**
 * Maps the blog list row to the blog list item.
 * @param blog - The blog list row.
 * @returns The blog list item.
 */
export function toBlogListItem(blog: BlogListRow): BlogListItem {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    featuredImageId: blog.featured_image_id,
    authorId: blog.author_id,
    status: blog.status,
    isFeatured: Boolean(blog.is_featured),
    publishedAt: blog.published_at?.toISOString() ?? null,
    createdAt: blog.created_at.toISOString(),
    updatedAt: blog.updated_at.toISOString(),
  };
}

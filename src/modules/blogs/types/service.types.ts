import { JsonObject } from "@/shared/types/json";
import { PaginationMeta } from "@/shared/types/pagination";
import { BlogStatus } from "../constants/blog.constants";
import { Media } from "@/modules/media/types";

export interface CreateBlogResponse {
  blog: {
    id: number;
    title: string;
    slug: string;
    status: BlogStatus;
  };
}

export interface BlogListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImageId: number | null;
  authorId: number | null;
  featuredImage?: { url: string; altText: string | null };
  categories?: { id: number; name: string }[];
  author?: { name: string };
  status: BlogStatus;
  isFeatured: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogListResponse {
  items: BlogListItem[];
  pagination: Omit<PaginationMeta, "pageSize"> & { limit: number };
}

export interface BlogDetailsResponse {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;

  authorId: number | null;
  featuredImageId: number | null;
  featuredImage?: Media;

  status: BlogStatus;
  isFeatured: boolean;

  seoTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;

  ogTitle: string | null;
  ogDescription: string | null;
  ogImageId: number | null;
  ogImage?: Media;

  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageId: number | null;
  twitterImage?: Media;

  robotsIndex: boolean;
  robotsFollow: boolean;

  schemaMarkup: JsonObject | null;

  categories?: { id: number; name: string }[];
  tags?: { id: number; name: string }[];
  author?: { name: string };

  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Internal CreateBlog payload passed from the service to the repository.
 */
export interface CreateBlogPayload {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;

  authorId: number | null;
  featuredImageId: number | null;

  status: BlogStatus;
  isFeatured: boolean;

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
  
  // Relations
  categoryIds: number[];
  tagIds: number[];
}

/**
 * Internal UpdateBlog payload passed from the service to the repository.
 */
export interface UpdateBlogPayload {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;

  authorId: number | null;
  featuredImageId: number | null;

  status: BlogStatus;
  isFeatured: boolean;

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

  // Relations
  categoryIds: number[];
  tagIds: number[];
}

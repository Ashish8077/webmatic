import { Media } from "@/modules/media/types/media.types";
import { BlogStatus } from "../constants/blog.constants";

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog {
  id: number;
  
  // Basic Info
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  
  // Author
  authorId: number | null;
  author?: unknown | null;

  // Media
  featuredImageId: number | null;
  featuredImage?: Media | null;

  // Status & Publishing
  status: BlogStatus;
  publishedAt: Date | null;
  isFeatured: boolean;

  // SEO
  seoTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;

  // Open Graph
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageId: number | null;
  ogImage?: Media | null;

  // Twitter Card
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageId: number | null;
  twitterImage?: Media | null;
  
  // Robots
  robotsIndex: boolean;
  robotsFollow: boolean;

  // Structured Data
  schemaMarkup: Record<string, unknown> | null;

  // Relations
  categories?: BlogCategory[];
  tags?: BlogTag[];

  // Audit
  createdBy: number | null;
  updatedBy: number | null;
  createdAt: Date;
  updatedAt: Date;
}

import { JsonObject } from "@/shared/types/json";
import { RowDataPacket } from "mysql2";
import { BlogStatus } from "../constants/blog.constants";

export interface BlogSlugRow extends RowDataPacket {
  id: number;
  slug: string;
}

export interface PublishedBlogRow extends RowDataPacket {
  id: number;

  title: string;
  slug: string;

  seo_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;

  robots_index: 0 | 1;
  robots_follow: 0 | 1;

  schema_markup: JsonObject | null;

  published_at: Date | null;
}

export interface BlogListRow extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_id: number | null;
  author_id: number | null;
  status: BlogStatus;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface CountRow extends RowDataPacket {
  total: number;
}

export interface BlogDetailsRow extends RowDataPacket {
  id: number;

  title: string;
  slug: string;
  excerpt: string | null;
  content: string;

  author_id: number | null;
  featured_image_id: number | null;

  status: BlogStatus;
  is_featured: 0 | 1;

  seo_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  canonical_url: string | null;

  og_title: string | null;
  og_description: string | null;
  og_image_id: number | null;

  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image_id: number | null;

  robots_index: 0 | 1;
  robots_follow: 0 | 1;

  schema_markup: JsonObject | null;

  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface BlogCategoryRow extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface BlogTagRow extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

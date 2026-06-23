import { JsonObject } from "@/shared/types/json";
import { PaginationQuery } from "@/shared/types/pagination";
import { RowDataPacket } from "mysql2";

export interface PageSlugRow extends RowDataPacket {
  id: number;
  slug: string;
}

export interface PublishedPageRow extends RowDataPacket {
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

export interface FindPagesOptions {
  page: number;
  limit: number;
}

export interface GetPagesQuery extends PaginationQuery {
  search?: string;

  status?: "draft" | "published";

  sortBy?: "title" | "created_at" | "published_at";

  sortOrder?: "asc" | "desc";
}

export interface PageListRow extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published";
  published_at: Date | null;
  created_at: Date;
}

export interface CountRow extends RowDataPacket {
  total: number;
}

export interface PageDetailsRow extends RowDataPacket {
  id: number;

  title: string;
  slug: string;

  status: "draft" | "published";

  template: string | null;

  seo_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;

  canonical_url: string | null;

  robots_index: 0 | 1;
  robots_follow: 0 | 1;

  schema_markup: JsonObject | null;

  published_at: Date | null;

  created_at: Date;
  updated_at: Date;
}

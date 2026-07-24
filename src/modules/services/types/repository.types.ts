import { JsonObject } from "@/shared/types/json";
import { PaginationQuery } from "@/shared/types/pagination";
import { RowDataPacket } from "mysql2";
import { ServiceStatus } from "../constants/service.constants";

export interface ServiceSlugRow extends RowDataPacket {
  id: number;
  slug: string;
  name: string;
}

export interface PublishedServiceRow extends RowDataPacket {
  id: number;

  name: string;
  slug: string;

  seo_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;

  schema_markup: JsonObject | null;

  published_at: Date | null;
}

export interface GetServicesQuery extends PaginationQuery {
  search?: string;

  status?: ServiceStatus;
  isFeatured?: boolean;

  sortBy?: "name" | "created_at" | "updated_at" | "published_at" | "sort_order";
  sortOrder?: "asc" | "desc";
}

/**
 * Interface for a service list row.
 */
export interface ServiceListRow extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  short_description: string | null;
  icon_type: "library" | "image";
  icon_name: string | null;
  icon_image_id: number | null;
  featured_image_id: number | null;
  cta_button_text: string | null;
  status: ServiceStatus;
  is_featured: boolean;
  sort_order: number;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface CountRow extends RowDataPacket {
  total: number;
}

/**
 * Interface for a service details row.
 */
export interface ServiceDetailsRow extends RowDataPacket {
  id: number;

  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;

  featured_image_id: number | null;
  banner_image_id: number | null;
  icon_type: "library" | "image";
  icon_name: string | null;
  icon_image_id: number | null;

  key_features: JsonObject | null;
  benefits: JsonObject | null;
  faq: JsonObject | null;

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

  schema_markup: JsonObject | null;

  status: ServiceStatus;
  is_featured: boolean;
  sort_order: number;

  published_at: Date | null;

  created_at: Date;
  updated_at: Date;
  created_by: number | null;
  updated_by: number | null;
}

import { RowDataPacket } from "mysql2";
import { WorkProjectStatus } from "./work-project.types";
import { JsonObject } from "@/shared/types/json";
import { WorkCategory } from "../constants/work.constants";

export interface CountRow extends RowDataPacket {
  total: number;
}

export interface WorkProjectSlugRow extends RowDataPacket {
  id: number;
  slug: string;
  title: string;
}

export interface WorkProjectListRow extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  category: WorkCategory;
  short_description: string | null;
  featured_image_id: number | null;
  
  status: WorkProjectStatus;
  is_featured: number;
  sort_order: number;
  
  published_at: Date | null;
  updated_at: Date;
}

export interface WorkProjectDetailsRow extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  category: WorkCategory;
  short_description: string | null;
  description: string | null;
  project_url: string | null;
  
  featured_image_id: number | null;

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

  status: WorkProjectStatus;
  is_featured: number;
  sort_order: number;

  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

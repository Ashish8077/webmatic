import { JsonObject } from "@/shared/types/json";
import { RowDataPacket } from "mysql2";

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

import { JsonObject } from "@/shared/types/json";
import { RowDataPacket } from "mysql2";

export interface PageSectionRow extends RowDataPacket {
  id: number;

  page_id: number;

  section_name: string;

  title: string | null;

  content: JsonObject;

  sort_order: number;

  is_active: number;

  created_at: Date;

  updated_at: Date;
}

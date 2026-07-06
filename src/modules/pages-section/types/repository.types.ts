import { JsonObject } from "@/shared/types/json";
import { RowDataPacket } from "mysql2";
import {
  PageSectionStatus,
  PageSectionType,
} from "../schemas/page-section.schema";

export interface PageSectionRow extends RowDataPacket {
  id: number;

  page_id: number;

  section_type: PageSectionType;

  content: JsonObject | null;

  settings: JsonObject | null;

  sort_order: number;

  status: PageSectionStatus;

  created_at: Date;

  updated_at: Date;
}

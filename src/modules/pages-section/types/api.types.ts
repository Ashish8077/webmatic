
import { JsonObject, JsonValue } from "@/shared/types/json";
import {
  PageSectionStatus,
  PageSectionType,
} from "../validation/page-section.schema";

/**
 * response from create page section api
 *
 */

export interface PageSectionResponse {
  section: {
    id: number;
    pageId: number;
    sectionType: PageSectionType;
    content: JsonValue;
    settings: JsonObject | null;
    sortOrder: number;
    status: PageSectionStatus;
    createdAt: Date;
    updatedAt: Date;
  };
}

/**
 * response from get page sections api
 *
 */

export interface PageSectionListItem {
  id: number;
  sectionType: PageSectionType;
  content: JsonValue;
  settings: JsonObject | null;
  sortOrder: number;
  status: PageSectionStatus;
}

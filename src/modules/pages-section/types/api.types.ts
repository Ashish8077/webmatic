import { HomeSectionType } from "@/shared/constants/section-types";
import { JsonObject, JsonValue } from "@/shared/types/json";
import {
  PageSectionStatus,
  PageSectionType,
} from "../schemas/page-section.schema";

/**
 * create page section from request body schema
 *
 */

export interface CreatePageSectionRequest {
  sectionType: HomeSectionType;
  title?: string | null;
  content: JsonObject;
  sortOrder?: number;
  isActive: boolean;
}

/**
 * update page section from request body schema
 *
 */

export interface UpdatePageSectionRequest {
  title?: string | null;
  content?: JsonObject;
  sortOrder?: number;
  isActive?: boolean;
}

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

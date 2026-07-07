import { CreatePageSectionInput } from "../schemas/create-page-section.schema";
import { UpdatePageSectionInput } from "../schemas/update-page-section.schema";
import { JsonObject, JsonValue } from "@/shared/types/json";
import {
  PageSectionStatus,
  PageSectionType,
} from "../schemas/page-section.schema";

/**
 * create page section from request body schema
 *
 */

export type CreatePageSectionRequest = CreatePageSectionInput;

/**
 * update page section from request body schema
 *
 */

export type UpdatePageSectionRequest = UpdatePageSectionInput;

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

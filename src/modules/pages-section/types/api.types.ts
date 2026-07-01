import { JsonObject, JsonValue } from "@/shared/types/json";

/**
 * create page section from request body schema
 *
 */

export interface CreatePageSectionRequest {
  sectionName: string;
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
  sectionName?: string;
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
    sectionName: string;
    title: string | null;
    content: JsonObject;
    sortOrder: number;
    isActive: boolean;
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
  sectionName: string;
  title: string | null;
  content: JsonValue;
  sortOrder: number;
  isActive: boolean;
}

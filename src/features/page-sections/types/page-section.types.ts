import type { BaseResponse } from "@/shared/types/api.types";
import type { JsonObject, JsonValue } from "@/shared/types/json";

export interface PageSectionListItem {
  id: number;
  sectionName: string;
  title: string | null;
  content: JsonValue;
  sortOrder: number;
  isActive: boolean;
}

export interface PageSection {
  id: number;
  pageId: number;
  sectionName: string;
  title: string | null;
  content: JsonObject;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePageSectionRequest {
  sectionName: string;
  title?: string | null;
  content: JsonObject;
  sortOrder?: number;
  isActive: boolean;
}

export interface UpdatePageSectionRequest {
  sectionName?: string;
  title?: string | null;
  content?: JsonObject;
  sortOrder?: number;
  isActive?: boolean;
}

export interface ListPageSectionsResponse extends BaseResponse {
  data: PageSectionListItem[];
}

export interface PageSectionResponse extends BaseResponse {
  data: {
    section: PageSection;
  };
}

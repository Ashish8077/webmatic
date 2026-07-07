import type { BaseResponse } from "@/shared/types/api.types";
import type { JsonObject, JsonValue } from "@/shared/types/json";
import {
  PageSectionStatus,
  PageSectionType,
} from "@/modules/pages-section/schemas/page-section.schema";

export interface PageSectionListItem {
  id: number;
  sectionType: PageSectionType;
  content: JsonValue;
  settings: JsonObject | null;
  sortOrder: number;
  status: PageSectionStatus;
}

export interface PageSection {
  id: number;
  pageId: number;
  sectionType: PageSectionType;
  content: JsonObject;
  settings: JsonObject | null;
  sortOrder: number;
  status: PageSectionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePageSectionRequest {
  sectionType: PageSectionType;
  content: JsonObject;
  settings?: JsonObject | null;
  sortOrder?: number;
  status?: PageSectionStatus;
}

export interface UpdatePageSectionRequest {
  content?: JsonObject;
  settings?: JsonObject | null;
  sortOrder?: number;
  status?: PageSectionStatus;
}

export interface ListPageSectionsResponse extends BaseResponse {
  data: PageSectionListItem[];
}

export interface PageSectionResponse extends BaseResponse {
  data: {
    section: PageSection;
  };
}

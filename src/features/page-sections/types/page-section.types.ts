import type { BaseResponse } from "@/shared/types/api.types";
import type { JsonObject, JsonValue } from "@/shared/types/json";
import { HomeSectionType } from "@/shared/constants/section-types";

export interface PageSectionListItem {
  id: number;
  sectionType: HomeSectionType;
  title: string | null;
  content: JsonValue;
  sortOrder: number;
  isActive: boolean;
}

export interface PageSection {
  id: number;
  pageId: number;
  sectionType: HomeSectionType;
  title: string | null;
  content: JsonObject;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePageSectionRequest {
  sectionType: HomeSectionType;
  title?: string | null;
  content: JsonObject;
  sortOrder?: number;
  isActive: boolean;
}

export interface UpdatePageSectionRequest {
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

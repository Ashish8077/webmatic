import { JsonObject } from "@/shared/types/json";

export interface CreatePageSectionRequest {
  sectionName: string;
  title?: string | null;
  content: JsonObject;
  sortOrder?: number;
  isActive: boolean;
}

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

import { PaginationMeta } from "./media-query.types";

export interface Media {
  id: number;
  originalName: string;
  fileName: string;
  extension: string;
  mimeType: string;
  size: number;
  checksum: string | null;
  disk: string;
  storagePath: string;
  folder: string | null;
  width: number | null;
  height: number | null;
  altText: string | null;
  caption: string | null;
  metadata: Record<string, unknown> | null;
  type: string;
  providerFileId: string | null;
  uploadedBy: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  
  // Computed property sometimes returned by the backend or injected
  url?: string; 
}

export interface MediaListResponse {
  items: Media[];
  pagination: PaginationMeta;
}

export interface UpdateMediaPayload {
  altText?: string | null;
  caption?: string | null;
  folder?: string | null;
  metadata?: Record<string, unknown> | null;
}

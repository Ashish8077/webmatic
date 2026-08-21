import { apiClient } from "@/lib/api";
import { MediaQuery, MediaListResponse } from "../types";

export async function getMedia(params: MediaQuery): Promise<MediaListResponse> {
  const response = await apiClient.get<{ message: string, data: MediaListResponse }>("/media", { params });
  return response.data.data;
}

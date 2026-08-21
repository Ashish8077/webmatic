import { apiClient } from "@/lib/api";
import { Media, UpdateMediaPayload } from "../types";

export async function updateMedia({ id, data }: { id: number; data: UpdateMediaPayload }): Promise<Media> {
  const response = await apiClient.patch<{ message: string, data: Media }>(`/media/${id}`, data);
  return response.data.data;
}

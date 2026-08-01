import { apiClient } from "@/lib/api";

export async function deleteMedia(id: number): Promise<void> {
  await apiClient.delete(`/media/${id}`);
}

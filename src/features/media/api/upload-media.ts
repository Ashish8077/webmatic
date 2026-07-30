import { apiClient } from "@/lib/api";
import { Media } from "../types";

export async function uploadMedia(data: FormData): Promise<Media> {
  const response = await apiClient.post<{ message: string, data: Media }>("/media", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
}

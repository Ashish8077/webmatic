import { apiClient } from "@/lib/api";

export async function getRoles() {
  const response = await apiClient.get<{ data: { id: number; name: string }[] }>("/admin/roles");
  return response.data.data;
}

import { apiClient } from "@/lib/api";

export async function deleteUser(id: number) {
  const response = await apiClient.delete(`/admin/users/${id}`);
  return response.data;
}

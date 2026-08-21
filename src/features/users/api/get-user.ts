import { apiClient } from "@/lib/api";
import { UserDetailResponse } from "@/modules/users/types/user.types";

export async function getUser(id: number) {
  const response = await apiClient.get<UserDetailResponse>(`/admin/users/${id}`);
  return response.data;
}

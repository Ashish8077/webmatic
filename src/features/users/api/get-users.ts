import { apiClient } from "@/lib/api";
import { UserListResponse } from "@/modules/users/types/user.types";

export async function getUsers(params: Record<string, unknown>) {
  const response = await apiClient.get<UserListResponse>("/admin/users", { params });
  return response.data;
}

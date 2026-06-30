import { apiClient } from "@/lib/api";
import type { UserResponse } from "../types/auth.types";
import { AUTH_ENDPOINTS } from "../constants/endpoints";

export async function getCurrentUser(): Promise<UserResponse> {
  const response = await apiClient.get(AUTH_ENDPOINTS.ME);

  console.log(response.data);

  return response.data;
}

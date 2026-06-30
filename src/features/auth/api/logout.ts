import { apiClient } from "@/lib/api";
import { AUTH_ENDPOINTS } from "../constants/endpoints";

export async function logout(): Promise<void> {
  await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
}

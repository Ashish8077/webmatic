import { apiClient } from "@/lib/api";
import type { LoginRequest, LoginResponse } from "../types/auth.types";
import { AUTH_ENDPOINTS } from "../constants/endpoints";

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, payload);
  return response.data.data.user;
}

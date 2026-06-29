import { apiClient } from "@/lib/api";
import type { LoginRequest, LoginResponse } from "../types/auth.types";

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post("api/auth/login", payload);
  return response.data;
}

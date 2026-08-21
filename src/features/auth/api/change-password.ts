import { apiClient } from "@/lib/api";
import { AUTH_ENDPOINTS } from "../constants/endpoints";

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export async function changePassword(
  payload: ChangePasswordPayload,
): Promise<void> {
  await apiClient.patch(AUTH_ENDPOINTS.CHANGE_PASSWORD, payload);
}

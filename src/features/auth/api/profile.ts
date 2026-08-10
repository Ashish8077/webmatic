import { apiClient } from "@/lib/api";
import { AUTH_ENDPOINTS } from "../constants/endpoints";
import { Media } from "@/features/media/types";

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  status: string;
  createdAt: string;
  roleSlug: string | null;
  profileImage: Media | null;
}

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  profileImageId: number | null;
}

export async function getProfile(): Promise<UserProfile> {
  const response = await apiClient.get<{ data: UserProfile }>(AUTH_ENDPOINTS.PROFILE);
  return response.data.data;
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
  const response = await apiClient.patch<{ data: UserProfile }>(AUTH_ENDPOINTS.PROFILE, payload);
  return response.data.data;
}

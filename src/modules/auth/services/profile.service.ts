// Shared app infrastructure
import { AppError } from "@/shared/utils/errors/app-error";
import { StorageFactory } from "@/shared/storage/storage-factory";
import { StorageDisk } from "@/shared/storage/types";

// Auth module
import {
  findUserProfileById,
  updateUserProfile,
} from "@/modules/auth/repositories/user.repository";
import { UpdateProfileInput } from "@/modules/auth/schemas/profile.schema";

export interface ProfileMedia {
  id: number;
  originalName: string;
  type: string;
  url: string;
}

export interface UserProfileResponse {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  status: string;
  createdAt: Date;
  roleSlug: string | null;
  profileImage: ProfileMedia | null;
}

export async function getProfileService(
  userId: number,
): Promise<UserProfileResponse> {
  const profile = await findUserProfileById(userId);
  if (!profile) {
    throw new AppError("User profile not found", 404);
  }

  let profileImage: ProfileMedia | null = null;
  if (profile.profile_image_id && profile.profile_image_storage_path) {
    const storage = StorageFactory.create(profile.profile_image_disk as StorageDisk);
    profileImage = {
      id: profile.profile_image_id,
      originalName: profile.profile_image_name ?? "avatar",
      type: profile.profile_image_type?.startsWith("image/") ? "image" : "document",
      url: storage.getUrl(profile.profile_image_storage_path),
    };
  }

  return {
    id: profile.id,
    firstName: profile.first_name,
    lastName: profile.last_name,
    email: profile.email,
    status: profile.status,
    createdAt: profile.created_at,
    roleSlug: profile.role_slug,
    profileImage,
  };
}

export async function updateProfileService(
  updateProfileData: UpdateProfileInput,
  userId: number,
): Promise<void> {
  const profile = await findUserProfileById(userId);
  if (!profile) {
    throw new AppError("User profile not found", 404);
  }

  const success = await updateUserProfile(
    userId,
    updateProfileData.firstName,
    updateProfileData.lastName,
    updateProfileData.profileImageId ?? null,
  );

  if (!success) {
    throw new AppError("Failed to update user profile", 500);
  }
}

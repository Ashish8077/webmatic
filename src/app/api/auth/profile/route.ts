import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";
import { validate } from "@/shared/utils/validators/validation";

import { updateProfileSchema, UpdateProfileInput } from "@/modules/auth/schemas/profile.schema";
import {
  getProfileService,
  updateProfileService,
} from "@/modules/auth/services/profile.service";

export async function GET() {
  try {
    const authUser = await requireAuth();
    
    const profile = await getProfileService(authUser.userId);

    return successResponse({
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(req: Request) {
  try {
    const authUser = await requireAuth();

    const updateProfileData: UpdateProfileInput = validate(
      updateProfileSchema,
      await req.json()
    );

    await updateProfileService(updateProfileData, authUser.userId);

    const updatedProfile = await getProfileService(authUser.userId);

    return successResponse({
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

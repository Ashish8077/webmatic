import { siteSettingsService } from "@/modules/site-settings/services/site-settings.service";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { successResponse } from "@/shared/utils/http/success-response";

export async function GET() {
  try {
    const user = await requireAuth();
    
    const settings = await siteSettingsService.getHeaderSettings(user);
    return successResponse({
      message: "Header settings fetched successfully",
      data: settings,
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireAuth();
    
    const body = await request.json();
    await siteSettingsService.updateHeaderSettings(body, user);

    return successResponse({
      message: "Header settings updated successfully",
      data: { success: true },
      statusCode: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

import { NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { validate } from "@/shared/utils/validators/validation";
import { createMenuItemSchema } from "@/modules/menus/schemas/create-menu-item.schema";
import { menuService } from "@/modules/menus/services/menu.service";
import { successResponse } from "@/shared/utils/http/success-response";
import { handleApiError } from "@/shared/utils/http/handle-api-error";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const body = await request.json();
    const data = validate(createMenuItemSchema, body);

    const result = await menuService.createMenuItem(data, user);

    return successResponse({
      data: result,
      message: "Menu item created successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

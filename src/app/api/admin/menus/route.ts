import { NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { validate } from "@/shared/utils/validators/validation";
import { createMenuSchema } from "@/modules/menus/schemas/create-menu.schema";
import { menuService } from "@/modules/menus/services/menu.service";
import { successResponse } from "@/shared/utils/http/success-response";
import { handleApiError } from "@/shared/utils/http/handle-api-error";

export async function GET(): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const result = await menuService.getMenus(user);

    return successResponse({
      data: result,
      message: "Menus retrieved successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const body = await request.json();
    const data = validate(createMenuSchema, body);

    const result = await menuService.createMenu(data, user);

    return successResponse({
      data: result,
      message: "Menu created successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

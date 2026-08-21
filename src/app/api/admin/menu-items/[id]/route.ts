import { NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { validate } from "@/shared/utils/validators/validation";
import { updateMenuItemSchema } from "@/modules/menus/schemas/update-menu-item.schema";
import { menuService } from "@/modules/menus/services/menu.service";
import { successResponse } from "@/shared/utils/http/success-response";
import { handleApiError } from "@/shared/utils/http/handle-api-error";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const user = await requireAuth();

    const body = await request.json();
    const data = validate(updateMenuItemSchema, body);

    const result = await menuService.updateMenuItem(Number(id), data, user);

    return successResponse({
      data: result,
      message: "Menu item updated successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const user = await requireAuth();

    await menuService.deleteMenuItem(Number(id), user);

    return successResponse({
      data: null,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

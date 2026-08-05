import { NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { validate } from "@/shared/utils/validators/validation";
import { updateMenuSchema } from "@/modules/menus/schemas/update-menu.schema";
import { menuService } from "@/modules/menus/services/menu.service";
import { successResponse } from "@/shared/utils/http/success-response";
import { handleApiError } from "@/shared/utils/http/handle-api-error";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const user = await requireAuth();

    const { menu, items } = await menuService.getAdminMenu(Number(id), user);

    return successResponse({
      data: { menu, items },
      message: "Menu retrieved successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const user = await requireAuth();

    const body = await request.json();
    const data = validate(updateMenuSchema, body);

    const result = await menuService.updateMenu(Number(id), data, user);

    return successResponse({
      data: result,
      message: "Menu updated successfully",
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

    await menuService.deleteMenu(Number(id), user);

    return successResponse({
      data: null,
      message: "Menu deleted successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

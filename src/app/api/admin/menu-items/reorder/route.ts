import { NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { validate } from "@/shared/utils/validators/validation";
import { reorderMenuItemSchema } from "@/modules/menus/schemas/reorder-menu-item.schema";
import { menuService } from "@/modules/menus/services/menu.service";
import { successResponse } from "@/shared/utils/http/success-response";
import { handleApiError } from "@/shared/utils/http/handle-api-error";
import { z } from "zod";

const batchReorderSchema = z.object({
  menuId: z.number().int().positive(),
  items: reorderMenuItemSchema,
});

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    requirePermission(user, PERMISSIONS.MENUS_UPDATE);

    const body = await request.json();
    const data = validate(batchReorderSchema, body);

    await menuService.reorderMenuItems(data.menuId, data.items, user.userId);

    return successResponse({
      data: null,
      message: "Menu items reordered successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

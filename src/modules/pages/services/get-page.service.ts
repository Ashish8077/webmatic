import { AppError } from "@/shared/utils/errors/app-error";
import { findPageById } from "../repositories/page.repository";
import { PageDetailsResponse } from "../services/types";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { toPageDetailsResponse } from "../mapper/page.mapper";

export async function getPageByIdService(
  id: number,
  user: AuthUser,
): Promise<PageDetailsResponse> {
  requirePermission(user, PERMISSIONS.PAGES_VIEW);

  const page = await findPageById(id);

  if (!page) {
    throw new AppError("Page not found", 404);
  }

  return toPageDetailsResponse(page);
}

import { AppError } from "@/shared/utils/errors/app-error";
import {
  findPageById,
  updatePageStatus,
} from "../repositories/page.repository";
import { UpdatePageStatusInput } from "../validators/update-page-status.schema";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { AuthUser } from "@/modules/auth/types/auth-user";

export async function updatePageStatusService(
  pageId: number,
  statusData: UpdatePageStatusInput,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.PAGES_PUBLISH);

  const page = await findPageById(pageId);

  if (!page) {
    throw new AppError("Page not found", 404);
  }

  if (page.status === statusData.status) {
    throw new AppError(`Page is already ${statusData.status}`, 409);
  }

  const updatedPageCount = await updatePageStatus(
    pageId,
    statusData.status,
    user.userId,
  );

  if (updatedPageCount === 0) {
    throw new AppError("Page not found", 404);
  }
}

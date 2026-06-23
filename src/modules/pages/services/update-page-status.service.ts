import { AppError } from "@/shared/utils/errors/app-error";
import {
  findPageById,
  updatePageStatus,
} from "../repositories/page.repository";
import { UpdatePageStatusInput } from "../validators/update-page-status.schema";

export async function updatePageStatusService(
  pageId: number,
  statusData: UpdatePageStatusInput,
): Promise<void> {
  const page = await findPageById(pageId);

  if (!page) {
    throw new AppError("Page not found", 404);
  }

  if (page.status === statusData.status) {
    throw new AppError(`Page is already ${statusData.status}`, 409);
  }

  const updated = await updatePageStatus(pageId, statusData.status);

  if (!updated) {
    throw new AppError("Failed to update page status", 500);
  }
}

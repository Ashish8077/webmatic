import { AppError } from "@/shared/utils/errors/app-error";
import { softDeletePage } from "../repositories/page.repository";

export async function deletePageService(pageId: number): Promise<void> {
  const deleted = await softDeletePage(pageId);

  if (!deleted) {
    throw new AppError("Page not found", 404);
  }
}

import { AppError } from "@/shared/utils/errors/app-error";
import {
  findPageById,
  findPageSlug,
  updatePage,
} from "../repositories/page.repository";
import { UpdatePageInput } from "../validators/update-page.schema";
import { isDuplicateKeyError } from "@/shared/utils/errors/database-error.util";

export async function updatePageService(
  pageId: number,
  pageData: UpdatePageInput,
): Promise<void> {
  const page = await findPageById(pageId);

  if (!page) {
    throw new AppError("Page not found", 404);
  }

  const existingPage = await findPageSlug(pageData.slug);


  if (existingPage && existingPage.id == pageId) {
    throw new AppError("Page slug already exists", 409);
  }

  try {
    await updatePage(pageId, pageData);
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      throw new AppError("Page slug already exists", 409);
    }
    throw error;
  }
}

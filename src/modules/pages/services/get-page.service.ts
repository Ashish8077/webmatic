import { AppError } from "@/shared/utils/errors/app-error";
import { findPageById } from "../repositories/page.repository";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { findMediaById } from "@/modules/media/repositories/media.repository";
import { StorageFactory } from "@/shared/storage/storage-factory";
import { toPageDetailsResponse } from "../mapper/page.mapper";
import { PageDetailsResponse } from "../types/service.types";

export async function getPageByIdService(
  id: number,
  user: AuthUser,
): Promise<PageDetailsResponse> {
  requirePermission(user, PERMISSIONS.PAGES_VIEW);

  const page = await findPageById(id);

  if (!page) {
    throw new AppError("Page not found", 404);
  }

  const pageDetails = toPageDetailsResponse(page);

  const storage = StorageFactory.create();
  
  const resolveMedia = async (id: number | null | undefined) => {
    if (!id) return null;
    const media = await findMediaById(id);
    if (!media) return null;
    return { ...media, url: storage.getUrl(media.storagePath) };
  };

  const [ogImage, twitterImage] = await Promise.all([
    resolveMedia(pageDetails.ogImageId),
    resolveMedia(pageDetails.twitterImageId),
  ]);

  if (ogImage) pageDetails.ogImage = ogImage;
  if (twitterImage) pageDetails.twitterImage = twitterImage;

  return pageDetails;
}

import { AppError } from "@/shared/utils/errors/app-error";
import { findWorkProjectById, findWorkProjectBySlug } from "../repositories/work-project.repository";
import { toWorkProjectDetailsResponse } from "../mapper/work-project.mapper";
import { WorkProjectDetailsResponse } from "../types/work-project.types";
import { findMediaById } from "@/modules/media/repositories/media.repository";
import { StorageFactory } from "@/shared/storage/storage-factory";

export async function getWorkProjectByIdService(
  id: number,
): Promise<WorkProjectDetailsResponse> {
  const row = await findWorkProjectById(id);

  if (!row) {
    throw new AppError("Work project not found.", 404);
  }

  const response = toWorkProjectDetailsResponse(row);
  return hydrateMedia(response);
}

export async function getWorkProjectBySlugService(
  slug: string,
): Promise<WorkProjectDetailsResponse> {
  const row = await findWorkProjectBySlug(slug);

  if (!row) {
    throw new AppError("Work project not found.", 404);
  }

  const response = toWorkProjectDetailsResponse(row);
  return hydrateMedia(response);
}

async function hydrateMedia(response: WorkProjectDetailsResponse): Promise<WorkProjectDetailsResponse> {
  const storage = StorageFactory.create();
  
  if (response.featuredImageId) {
    const media = await findMediaById(response.featuredImageId);
    if (media) response.featuredImage = { ...media, url: storage.getUrl(media.storagePath) };
  }
  if (response.openGraphImageId) {
    const media = await findMediaById(response.openGraphImageId);
    if (media) response.openGraphImage = { ...media, url: storage.getUrl(media.storagePath) };
  }
  if (response.twitterImageId) {
    const media = await findMediaById(response.twitterImageId);
    if (media) response.twitterImage = { ...media, url: storage.getUrl(media.storagePath) };
  }

  return response;
}

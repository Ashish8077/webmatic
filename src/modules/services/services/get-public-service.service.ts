import { AppError } from "@/shared/utils/errors/app-error";
import { findPublishedServiceBySlug } from "../repositories/service.repository";
import { findMediaById } from "@/modules/media/repositories/media.repository";
import { StorageFactory } from "@/shared/storage/storage-factory";
import { toServiceDetailsResponse } from "../mapper/service.mapper";
import { ServiceDetailsResponse } from "../types/service.types";

export async function getPublicServiceBySlug(
  slug: string,
): Promise<ServiceDetailsResponse> {
  const service = await findPublishedServiceBySlug(slug);

  if (!service) {
    throw new AppError("Service not found", 404);
  }

  const serviceDetails = toServiceDetailsResponse(service);

  // Hydrate all media relations for the service details
  const storage = StorageFactory.create();
  
  const resolveMedia = async (id: number | null | undefined) => {
    if (!id) return null;
    const media = await findMediaById(id);
    if (!media) return null;
    return { ...media, url: storage.getUrl(media.storagePath) };
  };

  const [
    featuredImage,
    bannerImage,
    image,
    openGraphImage,
    twitterImage
  ] = await Promise.all([
    resolveMedia(serviceDetails.featuredImageId),
    resolveMedia(serviceDetails.bannerImageId),
    resolveMedia(serviceDetails.imageId),
    resolveMedia(serviceDetails.openGraphImageId),
    resolveMedia(serviceDetails.twitterImageId),
  ]);

  if (featuredImage) serviceDetails.featuredImage = featuredImage;
  if (bannerImage) serviceDetails.bannerImage = bannerImage;
  if (image) serviceDetails.image = image;
  if (openGraphImage) serviceDetails.openGraphImage = openGraphImage;
  if (twitterImage) serviceDetails.twitterImage = twitterImage;

  if (serviceDetails.benefits && serviceDetails.benefits.length > 0) {
    await Promise.all(
      serviceDetails.benefits.map(async (benefit) => {
        if (benefit.imageId) {
          const benefitImage = await resolveMedia(benefit.imageId);
          if (benefitImage) benefit.image = benefitImage;
        }
      })
    );
  }

  return serviceDetails;
}

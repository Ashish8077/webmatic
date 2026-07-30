import { AppError } from "@/shared/utils/errors/app-error";
import { findPublishedServiceBySlug } from "../repositories/service.repository";
import { toServiceDetailsResponse } from "../mapper/service.mapper";
import { ServiceDetailsResponse } from "../types/service.types";

export async function getPublicServiceBySlug(
  slug: string,
): Promise<ServiceDetailsResponse> {
  const service = await findPublishedServiceBySlug(slug);

  if (!service) {
    throw new AppError("Service not found", 404);
  }

  return toServiceDetailsResponse(service);
}

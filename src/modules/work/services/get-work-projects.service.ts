
import {
  countWorkProjects,
  findWorkProjects,
} from "../repositories/work-project.repository";
import { GetWorkProjectsQuery } from "../validation/get-work-projects-query.schema";
import { WorkProjectListResponse } from "../types/work-project.types";
import { toWorkProjectListItems } from "../mapper/work-project.mapper";
import { findMediaById } from "@/modules/media/repositories/media.repository";
import { StorageFactory } from "@/shared/storage/storage-factory";

export async function getWorkProjectsService(
  query: GetWorkProjectsQuery,
): Promise<WorkProjectListResponse> {
  const [rows, totalItems] = await Promise.all([
    findWorkProjects(query),
    countWorkProjects(query),
  ]);

  const items = toWorkProjectListItems(rows);

  const storage = StorageFactory.create();
  for (const item of items) {
    if (item.featuredImageId) {
      const media = await findMediaById(item.featuredImageId);
      if (media) {
        item.featuredImage = { ...media, url: storage.getUrl(media.storagePath) };
      }
    }
  }

  const totalPages = Math.ceil(totalItems / query.limit);

  return {
    items,
    pagination: {
      page: query.page,
      limit: query.limit,
      totalItems,
      totalPages,
      hasNextPage: query.page < totalPages,
      hasPreviousPage: query.page > 1,
    },
  };
}

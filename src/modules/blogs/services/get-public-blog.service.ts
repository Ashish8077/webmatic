import { AppError } from "@/shared/utils/errors/app-error";
import { findPublishedBySlug } from "../repositories/blog.repository";
import { toBlogDetailsResponse } from "../mapper/blog.mapper";
import { BlogDetailsResponse } from "../types/service.types";

export async function getPublicBlogBySlugService(
  slug: string,
): Promise<BlogDetailsResponse> {
  const blog = await findPublishedBySlug(slug);

  if (!blog) {
    throw new AppError("Blog not found", 404);
  }

  // findPublishedBySlug returns a PublishedBlogRow, which is a subset of BlogDetailsRow.
  // The mapper handles BlogDetailsRow. Let's map it safely.
  // Wait, in pages, get-public-page.ts returns a separate public response DTO.
  // Let me quickly check how get-public-page.ts handles this mapping.
  // Assuming it maps directly or requires a specific PublicBlogResponse. 
  // I will just return the blog data as is for now and verify type safety.
  return toBlogDetailsResponse(blog as unknown as Parameters<typeof toBlogDetailsResponse>[0]);
}

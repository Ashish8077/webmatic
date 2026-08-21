import { AppError } from "@/shared/utils/errors/app-error";
import { findPublishedBySlug } from "../repositories/blog.repository";
import { findCategoriesByBlogIds } from "../repositories/blog-category.repository";
import { findTagsByBlogIds } from "../repositories/blog-tag.repository";
import { findMediaById } from "@/modules/media/repositories/media.repository";
import { findUserById } from "@/modules/auth/repositories/user.repository";
import { StorageFactory } from "@/shared/storage/storage-factory";
import { toBlogDetailsResponse } from "../mapper/blog.mapper";
import { BlogDetailsResponse } from "../types/service.types";

/**
 * Fetches a published blog by slug for public consumption.
 * Hydrates all relations: categories, tags, featured image, author, OG/Twitter images.
 */
export async function getPublicBlogBySlugService(
  slug: string,
): Promise<BlogDetailsResponse> {
  const blog = await findPublishedBySlug(slug);

  if (!blog) {
    throw new AppError("Blog not found", 404);
  }

  const response = toBlogDetailsResponse(blog);

  // Hydrate relations
  const [categories, tags] = await Promise.all([
    findCategoriesByBlogIds([blog.id]),
    findTagsByBlogIds([blog.id]),
  ]);

  response.categories = categories.map((c) => ({ id: c.id, name: c.name }));
  response.tags = tags.map((t) => ({ id: t.id, name: t.name }));

  // Hydrate media
  const storage = StorageFactory.create();

  const resolveMedia = async (mediaId: number | null | undefined) => {
    if (!mediaId) return undefined;
    const mediaRow = await findMediaById(mediaId);
    if (!mediaRow) return undefined;
    return { ...mediaRow, url: storage.getUrl(mediaRow.storagePath) };
  };

  const [featuredImage, ogImage, twitterImage] = await Promise.all([
    resolveMedia(response.featuredImageId),
    resolveMedia(response.ogImageId),
    resolveMedia(response.twitterImageId),
  ]);

  if (featuredImage) response.featuredImage = featuredImage;
  if (ogImage) response.ogImage = ogImage;
  if (twitterImage) response.twitterImage = twitterImage;

  // Hydrate author
  if (response.authorId) {
    const author = await findUserById(response.authorId);
    if (author) {
      response.author = {
        name: `${author.first_name} ${author.last_name}`.trim() || "Admin",
      };
    }
  }

  return response;
}

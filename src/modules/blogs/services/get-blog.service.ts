import { AppError } from "@/shared/utils/errors/app-error";
import { findById } from "../repositories/blog.repository";
import { findCategoriesByBlogIds } from "../repositories/blog-category.repository";
import { findTagsByBlogIds } from "../repositories/blog-tag.repository";
import { findMediaById } from "@/modules/media/repositories/media.repository";
import { StorageFactory } from "@/shared/storage/storage-factory";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { toBlogDetailsResponse } from "../mapper/blog.mapper";
import { BlogDetailsResponse } from "../types/service.types";

export async function getBlogByIdService(
  id: number,
  user: AuthUser,
): Promise<BlogDetailsResponse> {
  requirePermission(user, PERMISSIONS.BLOG_VIEW);

  const blog = await findById(id);

  if (!blog) {
    throw new AppError("Blog not found", 404);
  }

  const response = toBlogDetailsResponse(blog);

  // Hydrate relations
  const [categories, tags] = await Promise.all([
    findCategoriesByBlogIds([id]),
    findTagsByBlogIds([id]),
  ]);

  response.categories = categories.map(c => ({ id: c.id, name: c.name }));
  response.tags = tags.map(t => ({ id: t.id, name: t.name }));

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

  return response;
}

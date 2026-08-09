import { getBlogsService } from "./get-blogs.service";
import type { BlogDetailsResponse, BlogListItem } from "../types/service.types";

/**
 * Maximum number of related blogs to return.
 */
const RELATED_BLOG_LIMIT = 3;

/**
 * Fetches related blogs for a given blog.
 *
 * Fallback algorithm:
 * 1. Same category
 * 2. Same tags
 * 3. Latest published
 *
 * The service extracts id/categories/tags internally — callers
 * only need to pass the blog object.
 *
 * Rules:
 * - Only published blogs (enforced by status filter)
 * - Only non-deleted blogs (enforced by getBlogsService/repository)
 * - Excludes the current blog
 * - Returns at most RELATED_BLOG_LIMIT items
 */
export async function getRelatedBlogsService(
  blog: BlogDetailsResponse,
): Promise<BlogListItem[]> {
  const collected = new Map<number, BlogListItem>();

  // 1. Try same category
  if (blog.categories && blog.categories.length > 0) {
    for (const category of blog.categories) {
      if (collected.size >= RELATED_BLOG_LIMIT) break;

      const result = await getBlogsService({
        categoryId: category.id,
        status: "published",
        limit: RELATED_BLOG_LIMIT + 1, // +1 to account for excluding current blog
        page: 1,
        sortBy: "published_at",
        sortOrder: "desc",
      });

      for (const item of result.items) {
        if (item.id === blog.id) continue;
        if (collected.size >= RELATED_BLOG_LIMIT) break;
        collected.set(item.id, item);
      }
    }
  }

  // 2. Try same tags
  if (collected.size < RELATED_BLOG_LIMIT && blog.tags && blog.tags.length > 0) {
    for (const tag of blog.tags) {
      if (collected.size >= RELATED_BLOG_LIMIT) break;

      const result = await getBlogsService({
        tagId: tag.id,
        status: "published",
        limit: RELATED_BLOG_LIMIT + 1,
        page: 1,
        sortBy: "published_at",
        sortOrder: "desc",
      });

      for (const item of result.items) {
        if (item.id === blog.id) continue;
        if (collected.has(item.id)) continue;
        if (collected.size >= RELATED_BLOG_LIMIT) break;
        collected.set(item.id, item);
      }
    }
  }

  // 3. Fallback: latest published
  if (collected.size < RELATED_BLOG_LIMIT) {
    const result = await getBlogsService({
      status: "published",
      limit: RELATED_BLOG_LIMIT + 1,
      page: 1,
      sortBy: "published_at",
      sortOrder: "desc",
    });

    for (const item of result.items) {
      if (item.id === blog.id) continue;
      if (collected.has(item.id)) continue;
      if (collected.size >= RELATED_BLOG_LIMIT) break;
      collected.set(item.id, item);
    }
  }

  return Array.from(collected.values());
}

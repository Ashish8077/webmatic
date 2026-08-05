import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { GetBlogsQuery } from "../validation/get-blogs-query.schema";
import { findBlogs, countBlogs } from "../repositories/blog.repository";
import { findCategoriesByBlogIds } from "../repositories/blog-category.repository";
import { findMediaById } from "@/modules/media/repositories/media.repository";
import { findUserById } from "@/modules/auth/repositories/user.repository";
import { StorageFactory } from "@/shared/storage/storage-factory";
import { toBlogListItems } from "../mapper/blog.mapper";
import { BlogListResponse } from "../types/service.types";

import { AppError } from "@/shared/utils/errors/app-error";

export async function getBlogsService(
  query: GetBlogsQuery,
  user?: AuthUser,
): Promise<BlogListResponse> {
  if (user) {
    requirePermission(user, PERMISSIONS.BLOG_VIEW);
  } else if (query.status !== "published") {
    throw new AppError("Unauthorized: Can only view published blogs", 401);
  }

  const [blogs, totalItems] = await Promise.all([
    findBlogs(query),
    countBlogs(query),
  ]);

  const items = toBlogListItems(blogs);

  // Hydrate images, categories and authors
  if (items.length > 0) {
    const storage = StorageFactory.create();
    
    // Fetch categories in bulk
    const blogIds = items.map((item) => item.id);
    const categoryRows = await findCategoriesByBlogIds(blogIds);
    
    // Map categories by blogId
    const categoriesByBlogId = categoryRows.reduce((acc, row) => {
      if (!acc[row.blog_id]) {
        acc[row.blog_id] = [];
      }
      acc[row.blog_id].push({ id: row.id, name: row.name });
      return acc;
    }, {} as Record<number, { id: number; name: string }[]>);

    await Promise.all(
      items.map(async (item) => {
        // Hydrate featured image
        if (item.featuredImageId) {
          const media = await findMediaById(item.featuredImageId);
          if (media) {
            item.featuredImage = {
              url: storage.getUrl(media.storagePath),
              altText: media.altText,
            };
          }
        }
        
        // Hydrate author
        if (item.authorId) {
          const author = await findUserById(item.authorId);
          if (author) {
            item.author = { name: `${author.first_name} ${author.last_name}`.trim() || "Admin" };
          }
        } else {
          item.author = { name: "admin" };
        }
        
        // Assign categories
        item.categories = categoriesByBlogId[item.id] || [];
      })
    );
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

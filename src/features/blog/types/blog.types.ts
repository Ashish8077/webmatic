import type { BlogCategory, BlogTag, Blog } from "@/modules/blogs/types/blog.types";
import type { 
  BlogListItem, 
  BlogListResponse, 
  BlogDetailsResponse, 
  CreateBlogResponse as BackendCreateBlogResponse 
} from "@/modules/blogs/types/service.types";
import type { CreateBlogInput } from "@/modules/blogs/validation/create-blog.schema";
import type { UpdateBlogInput } from "@/modules/blogs/validation/update-blog.schema";
import type { CreateBlogCategoryInput } from "@/modules/blogs/validation/create-blog-category.schema";
import type { UpdateBlogCategoryInput } from "@/modules/blogs/validation/update-blog-category.schema";
import type { CreateBlogTagInput } from "@/modules/blogs/validation/create-blog-tag.schema";
import type { UpdateBlogTagInput } from "@/modules/blogs/validation/update-blog-tag.schema";
import type { ApiResponse } from "@/lib/api/responses";
import type { PaginationMeta } from "@/shared/types/pagination";

export type { BlogCategory, BlogTag, Blog, BlogListItem };

// Request types
export type CreateBlogRequest = CreateBlogInput;
export type UpdateBlogRequest = UpdateBlogInput;
export type CreateCategoryRequest = CreateBlogCategoryInput;
export type UpdateCategoryRequest = UpdateBlogCategoryInput;
export type CreateTagRequest = CreateBlogTagInput;
export type UpdateTagRequest = UpdateBlogTagInput;

// Response types
// If backend returns data directly nested or just standard ApiResponse data
export type CreateBlogResponse = ApiResponse<BackendCreateBlogResponse>;
export type GetBlogResponse = ApiResponse<BlogDetailsResponse>;
export type ListBlogsResponse = ApiResponse<BlogListResponse>;

// For categories and tags
export type ListCategoriesResponse = ApiResponse<{
  items: BlogCategory[];
  pagination: Omit<PaginationMeta, "pageSize"> & { limit: number };
}>;
export type ListTagsResponse = ApiResponse<{
  items: BlogTag[];
  pagination: Omit<PaginationMeta, "pageSize"> & { limit: number };
}>;
export type CreateCategoryResponse = ApiResponse<BlogCategory>;
export type CreateTagResponse = ApiResponse<BlogTag>;

"use client";

import { BlogHeader, BlogForm } from "@/features/blog/components";
import { useCreateBlog } from "@/features/blog/hooks/use-create-blog";
import { useBlogForm } from "@/features/blog/hooks/use-blog-form";
import { ApiError } from "@/lib/api/errors";
import { applyServerErrors } from "@/shared/utils/form/apply-server-errors";
import { CreateBlogInput } from "@/features/blog/schemas/create-blog.schema";
import { CreateBlogRequest } from "@/features/blog/types/blog.types";

export default function CreateBlogPage() {
  const createBlogMutation = useCreateBlog();
  const form = useBlogForm();

  const onSubmit = async (data: CreateBlogInput) => {
    const requestData: CreateBlogRequest = {
      ...data,
      excerpt: data.excerpt ?? null,
      content: data.content ?? "",
      authorId: null,
      featuredImageId: data.featuredImageId ?? null,
      seoTitle: data.seoTitle ?? null,
      metaDescription: data.metaDescription ?? null,
      metaKeywords: data.metaKeywords ?? null,
      canonicalUrl: data.canonicalUrl ?? null,
      ogTitle: data.ogTitle ?? null,
      ogDescription: data.ogDescription ?? null,
      ogImageId: data.ogImageId ?? null,
      twitterTitle: data.twitterTitle ?? null,
      twitterDescription: data.twitterDescription ?? null,
      twitterImageId: data.twitterImageId ?? null,
      schemaMarkup: data.schemaMarkup ?? null,
    };

    createBlogMutation.mutate(requestData, {
      onError: (error: Error) => {
        if (error instanceof ApiError) {
          applyServerErrors(form, error.errors);
        }
      },
    });
  };

  return (
    <div className="max-w-4xl animate-fade-in">
      <BlogHeader
        title="Create Blog"
        description="Write a new blog post for your website."
      />

      <BlogForm form={form} onSubmit={onSubmit} submitLabel="Create Blog" />
    </div>
  );
}

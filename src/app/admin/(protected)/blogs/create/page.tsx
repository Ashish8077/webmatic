"use client";

import { BlogHeader, BlogForm } from "@/features/blog/components";
import { useCreateBlog } from "@/features/blog/hooks/use-create-blog";
import { useBlogForm } from "@/features/blog/hooks/use-blog-form";
import { ApiError } from "@/lib/api/errors";
import { applyServerErrors } from "@/shared/utils/form/apply-server-errors";

export default function CreateBlogPage() {
  const createBlogMutation = useCreateBlog();
  const form = useBlogForm();

  const onSubmit = async (data: any) => {
    createBlogMutation.mutate(data, {
      onError: (error: any) => {
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

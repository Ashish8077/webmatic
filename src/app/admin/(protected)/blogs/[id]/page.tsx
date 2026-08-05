"use client";

import { use, useMemo } from "react";
import { BlogHeader, BlogForm } from "@/features/blog/components";
import { useBlog } from "@/features/blog/hooks/use-blog";
import { useUpdateBlog } from "@/features/blog/hooks/use-update-blog";
import { useBlogForm } from "@/features/blog/hooks/use-blog-form";
import { ApiError } from "@/lib/api/errors";
import { applyServerErrors } from "@/shared/utils/form/apply-server-errors";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/ui/toast";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const blogId = parseInt(id);
  const router = useRouter();

  const { data: blogResponse, isLoading } = useBlog(blogId);
  const updateBlogMutation = useUpdateBlog(blogId);
  const blog = blogResponse?.data;

  const formValues = useMemo(() => {
    return blog
      ? {
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt ?? undefined,
          content: blog.content ?? undefined,
          featuredImageId: blog.featuredImageId ?? undefined,
          featuredImage: blog.featuredImage ?? undefined,
          status: blog.status,
          isFeatured: blog.isFeatured,
          categoryIds: blog.categories?.map((c: { id: number }) => c.id) || [],
          tagIds: blog.tags?.map((t: { id: number }) => t.id) || [],
          seoTitle: blog.seoTitle ?? undefined,
          metaDescription: blog.metaDescription ?? undefined,
          metaKeywords: blog.metaKeywords ?? undefined,
          canonicalUrl: blog.canonicalUrl ?? undefined,
          ogTitle: blog.ogTitle ?? undefined,
          ogDescription: blog.ogDescription ?? undefined,
          ogImageId: blog.ogImageId ?? undefined,
          ogImage: blog.ogImage ?? undefined,
          twitterTitle: blog.twitterTitle ?? undefined,
          twitterDescription: blog.twitterDescription ?? undefined,
          twitterImageId: blog.twitterImageId ?? undefined,
          twitterImage: blog.twitterImage ?? undefined,
          robotsIndex: blog.robotsIndex ?? true,
          robotsFollow: blog.robotsFollow ?? true,
        }
      : undefined;
  }, [blog]);

  const form = useBlogForm({ values: formValues });

  const onSubmit = async (data: any) => {
    try {
      await updateBlogMutation.mutateAsync(data);
      showToast("Blog updated successfully", "success");
      router.push("/admin/blogs");
    } catch (error) {
      if (error instanceof ApiError) {
        applyServerErrors(form, error.errors);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl space-y-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground mt-3">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-xl font-semibold mb-2">Blog not found</h2>
        <p className="text-muted-foreground text-sm">
          The blog you are looking for does not exist or has been deleted.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl animate-fade-in">
      <BlogHeader
        title="Edit Blog"
        description="Update your blog post details below."
      />

      <BlogForm form={form} onSubmit={onSubmit} submitLabel="Save Changes" />
    </div>
  );
}

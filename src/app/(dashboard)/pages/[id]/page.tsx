"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { PageForm, PageHeader } from "@/features/pages/components";
import { usePage } from "@/features/pages/hooks/use-page";
import { usePageForm } from "@/features/pages/hooks/use-page-form";
import { useUpdatePage } from "@/features/pages/hooks/use-update-page";
import { showToast } from "@/components/ui/toast";
import { ApiError } from "@/lib/api/errors";
import { applyServerErrors } from "@/shared/utils/form/apply-server-errors";
import type { CreatePageInput } from "@/features/pages/schemas/create-page.schema";

export default function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const pageId = Number(id);

  const { data, isPending, isError } = usePage(pageId);
  const updatePageMutation = useUpdatePage(pageId);
  const form = usePageForm();

  const page = data?.data;

  // Populate form when page data loads
  useEffect(() => {
    if (!page) return;

    form.reset({
      title: page.title,
      slug: page.slug,
      status: page.status ?? "draft",
      seoTitle: page.seoTitle ?? "",
      metaDescription: page.metaDescription ?? "",
      metaKeywords: page.metaKeywords ?? "",
      canonicalUrl: page.canonicalUrl ?? "",
      ogTitle: page.ogTitle ?? "",
      ogDescription: page.ogDescription ?? "",
      ogImageId: page.ogImageId ?? null,
      twitterTitle: page.twitterTitle ?? "",
      twitterDescription: page.twitterDescription ?? "",
      twitterImageId: page.twitterImageId ?? null,
      robotsIndex: page.robotsIndex ?? true,
      robotsFollow: page.robotsFollow ?? true,
    });
  }, [form, page]);

  const handleSubmit = async (pageData: CreatePageInput) => {
    try {
      console.log("submitted", pageData);
      await updatePageMutation.mutateAsync(pageData);
      showToast("Page updated successfully", "success");
    } catch (error) {
      if (error instanceof ApiError) {
        applyServerErrors(form, error.errors);
      }
    }
  };

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground mt-3">Loading page...</p>
      </div>
    );
  }

  if (isError || !page) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">Page not found</p>
        <Link
          href="/pages"
          className="text-accent text-sm mt-2 hover:underline"
        >
          Back to Pages
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-2xl">
      <PageHeader
        title="Edit Page"
        description={`Editing \u201c${page.title}\u201d`}
      >
        <Link
          href={`/pages/${page.id}/sections`}
          className="text-xs text-accent hover:text-accent-hover transition-colors px-2.5 py-1 rounded-lg bg-accent/10 border border-accent/20"
        >
          Manage Sections →
        </Link>
      </PageHeader>

      <PageForm
        form={form}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </div>
  );
}

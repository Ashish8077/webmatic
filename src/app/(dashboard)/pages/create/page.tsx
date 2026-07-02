"use client";

import { usePermissions } from "@/features/auth/api/use-has-permission";
import { Permission } from "@/features/auth/constants/permissions";
import { AccessDenied } from "@/features/auth/components/access-denied";
import { useCreatePage } from "@/features/pages/hooks/create-page";
import { PageForm, PageHeader } from "@/features/pages/components";
import type { CreatePageFormValues } from "@/features/pages/schemas/create-page.schema";
import { usePageForm } from "@/features/pages/hooks/use-page-form";
import { ApiError } from "@/lib/api/errors";

export default function CreatePagePage() {
  const createPageMutation = useCreatePage();
  const { has } = usePermissions();

  const form = usePageForm();

  if (!has(Permission.PAGE_CREATE)) {
    return <AccessDenied />;
  }

  const handleSubmit = async (pageData: CreatePageFormValues) => {
    try {
      await createPageMutation.mutateAsync(pageData);
    } catch (error: any) {
      console.log(error instanceof ApiError);
      if (error instanceof ApiError) {
        console.log("message:", error.message);
        console.log("status:", error.status);
        console.log("code:", error.code);
        console.log("errors:", error.errors);
      }
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl">
      <PageHeader
        title="Create Page"
        description="Add a new page to your website"
      />
      <PageForm form={form} onSubmit={handleSubmit} />
    </div>
  );
}

"use client";

import { usePermissions } from "@/features/auth/api/use-has-permission";
import { Permission } from "@/features/auth/constants/permissions";
import { AccessDenied } from "@/features/auth/components/access-denied";
import { useCreatePage } from "@/features/pages/hooks/create-page";
import { PageForm, PageHeader } from "@/features/pages/components";
import type { CreatePageInput } from "@/features/pages/schemas/create-page.schema";
import { usePageForm } from "@/features/pages/hooks/use-page-form";
import { ApiError } from "@/lib/api/errors";
import { applyServerErrors } from "@/shared/utils/form/apply-server-errors";

export default function CreatePagePage() {
  const createPageMutation = useCreatePage();
  const { has } = usePermissions();

  const form = usePageForm();

  if (!has(Permission.PAGE_CREATE)) {
    return <AccessDenied />;
  }

  const handleSubmit = async (pageData: CreatePageInput) => {
    try {
      await createPageMutation.mutateAsync(pageData);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        applyServerErrors(form, error.errors);
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

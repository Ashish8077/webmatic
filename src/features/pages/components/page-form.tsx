"use client";

import { useRouter } from "next/navigation";
import { Controller, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { usePageForm } from "@/features/pages/hooks/use-page-form";
import { PAGE_TEMPLATES } from "@/shared/constants/templates";
import SeoFields from "./seo-fields";
import type { CreatePageFormValues } from "@/features/pages/schemas/create-page.schema";

const STATUS_OPTIONS = [
  { label: "Draft", value: "draft" as const },
  { label: "Published", value: "published" as const },
];

interface PageFormProps {
  form: ReturnType<typeof usePageForm>;
  onSubmit: (data: CreatePageFormValues) => Promise<void>;
  submitLabel?: string;
  defaultValues?: Partial<CreatePageFormValues>;
}

function PageForm({
  form,
  onSubmit,
  submitLabel = "Create Page",
}: PageFormProps) {
  const router = useRouter();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Core Fields */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
        <Input
          label="Title"
          placeholder="Enter page title"
          autoComplete="off"
          autoFocus
          {...form.register("title")}
          error={form.formState.errors.title?.message}
        />

        <Input
          label="Slug"
          placeholder="page-url-slug"
          {...form.register("slug")}
          hint="URL path for this page"
          error={form.formState.errors.slug?.message}
        />

        <Select
          label="Template"
          {...form.register("template")}
          error={form.formState.errors.template?.message}
          hint="Layout template for this page"
          options={PAGE_TEMPLATES.map((t) => ({
            label: t.label,
            value: t.value,
          }))}
        />

        <Controller
          name="status"
          control={form.control}
          render={({ field }) => (
            <ToggleGroup
              label="Status"
              value={field.value}
              onChange={field.onChange}
              options={STATUS_OPTIONS}
              error={form.formState.errors.status?.message}
            />
          )}
        />
      </div>

      {/* SEO Section */}
      <SeoFields
        register={{
          seoTitle: form.register("seoTitle"),
          metaDescription: form.register("metaDescription"),
          canonicalUrl: form.register("canonicalUrl"),
        }}
        errors={form.formState.errors}
        warnings={form.seoWarnings}
      />

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          isLoading={form.formState.isSubmitting || form.formState.isLoading}
        >
          {submitLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default PageForm;

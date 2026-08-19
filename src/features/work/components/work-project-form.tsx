"use client";

import { useRouter } from "next/navigation";
import { Controller, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";

import { SeoFields } from "@/components/shared/seo";
import { RichTextEditor } from "@/components/shared/editor";
import { MediaPickerField } from "@/features/page-sections/components/fields";
import type { WorkProjectFormValues } from "../schemas/work-project.schema";
import { Star } from "lucide-react";
import clsx from "clsx";
import { usePermissions } from "@/features/auth/api/use-has-permission";
import { Permission } from "@/features/auth/constants/permissions";

import type { UseFormReturn } from "react-hook-form";

import { WORK_CATEGORIES } from "@/modules/work/constants/work.constants";

const STATUS_OPTIONS = [
  { label: "Draft", value: "draft" as const },
  { label: "Published", value: "published" as const },
];

interface WorkProjectFormProps {
  form: UseFormReturn<WorkProjectFormValues>;
  onSubmit: (data: WorkProjectFormValues) => Promise<void>;
  submitLabel?: string;
}

export default function WorkProjectForm({
  form,
  onSubmit,
  submitLabel = "Save Work Project",
}: WorkProjectFormProps) {
  const router = useRouter();
  const { has } = usePermissions();
  const canPublish = has(Permission.WORK_PUBLISH);

  return (
    <FormProvider {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-6"
      >
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Defines the work project and controls publishing.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-sm font-medium">Featured</span>
              <Controller
                name="isFeatured"
                control={form.control}
                render={({ field }) => (
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className={clsx(
                      "p-1.5 rounded-full transition-colors",
                      field.value
                        ? "text-yellow-400 bg-yellow-400/10"
                        : "text-muted-foreground hover:bg-surface-hover",
                    )}
                  >
                    <Star
                      className={clsx(field.value && "fill-current")}
                      size={20}
                    />
                  </button>
                )}
              />
            </label>
            <Controller
              name="status"
              control={form.control}
              render={({ field }) => (
                canPublish ? (
                  <ToggleGroup
                    value={field.value}
                    onChange={field.onChange}
                    options={STATUS_OPTIONS}
                    error={form.formState.errors.status?.message}
                  />
                ) : (
                  <div className="flex h-10 items-center justify-center rounded-lg border border-border bg-muted px-4 text-sm font-medium text-muted-foreground capitalize">
                    {field.value}
                  </div>
                )
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Work Project Title"
            placeholder="Enter work project title"
            autoComplete="off"
            autoFocus
            {...form.register("title")}
            error={form.formState.errors.title?.message}
          />

          <Input
            label="Slug"
            placeholder="work-project-url-slug"
            {...form.register("slug")}
            hint="URL path for this work project"
            error={form.formState.errors.slug?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Category
            </label>
            <select
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...form.register("category")}
            >
              <option value="">Select a category</option>
              {WORK_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {form.formState.errors.category?.message && (
                <p className="text-sm text-danger mt-1">
                  {form.formState.errors.category?.message}
                </p>
            )}
          </div>
          <Input
            label="Sort Order"
            type="number"
            placeholder="0"
            {...form.register("sortOrder", { valueAsNumber: true })}
            error={form.formState.errors.sortOrder?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Project URL"
            type="url"
            placeholder="https://..."
            {...form.register("projectUrl")}
            error={form.formState.errors.projectUrl?.message}
          />
        </div>
      </div>

      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Listing Information</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Displayed on the Homepage, Work Projects page, Related Work Projects, and
            other work project listings.
          </p>
        </div>

        <MediaPickerField
          name="featuredImageId"
          label="Featured Image"
          description="Used in work project cards and grid listings."
        />

        <Textarea
          label="Short Description"
          placeholder="Brief summary of the work project"
          {...form.register("shortDescription")}
          error={form.formState.errors.shortDescription?.message}
        />
      </div>

      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-8">
        <div>
          <h3 className="text-lg font-semibold">Detail Page</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Displayed on the individual work project page after the visitor opens the
            work project.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-card-border">
          <h4 className="font-medium text-foreground">Content</h4>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Detailed Description
            </label>
            <Controller
              name="description"
              control={form.control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={form.formState.errors.description?.message}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">SEO Settings</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Used by search engines and social platforms.
          </p>
        </div>
        <SeoFields
          register={{
            seoTitle: form.register("seoTitle"),
            metaDescription: form.register("metaDescription"),
            canonicalUrl: form.register("canonicalUrl"),
            metaKeywords: form.register("metaKeywords"),
            ogTitle: form.register("openGraphTitle"),
            ogDescription: form.register("openGraphDescription"),
            twitterTitle: form.register("twitterTitle"),
            twitterDescription: form.register("twitterDescription"),
            robotsIndex: form.register("robotsIndex" as unknown as "title"),
            robotsFollow: form.register("robotsFollow" as unknown as "title"),
          }}
          errors={form.formState.errors}
          warnings={[]}
          ogImageName="openGraphImageId"
          twitterImageName="twitterImageId"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 mt-8">
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={form.formState.isSubmitting || form.formState.isLoading}
        >
          {submitLabel}
        </Button>
      </div>
      </form>
    </FormProvider>
  );
}

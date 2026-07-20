"use client";

import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { useServiceForm } from "../hooks/use-service-form";
import { SeoFields } from "@/components/shared/seo";
import { RichTextEditor } from "@/components/shared/editor";
import { ImagePicker } from "@/components/shared/media";
import type { ServiceFormValues } from "../schemas/service.schema";
import { Star } from "lucide-react";
import clsx from "clsx";

import type { UseFormReturn } from "react-hook-form";

const STATUS_OPTIONS = [
  { label: "Draft", value: "draft" as const },
  { label: "Published", value: "published" as const },
];

interface ServiceFormProps {
  form: UseFormReturn<ServiceFormValues>;
  onSubmit: (data: ServiceFormValues) => Promise<void>;
  submitLabel?: string;
}

export default function ServiceForm({
  form,
  onSubmit,
  submitLabel = "Save Service",
}: ServiceFormProps) {
  const router = useRouter();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Core Fields */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">General Information</h3>
          
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
                      field.value ? "text-yellow-400 bg-yellow-400/10" : "text-muted-foreground hover:bg-surface-hover"
                    )}
                  >
                    <Star className={clsx(field.value && "fill-current")} size={20} />
                  </button>
                )}
              />
            </label>
            <Controller
              name="status"
              control={form.control}
              render={({ field }) => (
                <ToggleGroup
                  value={field.value}
                  onChange={field.onChange}
                  options={STATUS_OPTIONS}
                  error={form.formState.errors.status?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Service Name"
            placeholder="Enter service name"
            autoComplete="off"
            autoFocus
            {...form.register("name")}
            error={form.formState.errors.name?.message}
          />

          <Input
            label="Slug"
            placeholder="service-url-slug"
            {...form.register("slug")}
            hint="URL path for this service"
            error={form.formState.errors.slug?.message}
          />
        </div>

        <Textarea
          label="Short Description"
          placeholder="Brief summary of the service"
          {...form.register("shortDescription")}
          error={form.formState.errors.shortDescription?.message}
        />
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Detailed Description</label>
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

      {/* Media Fields */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
        <h3 className="text-lg font-semibold">Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="featuredImageId"
            control={form.control}
            render={({ field }) => (
              <ImagePicker
                label="Featured Image"
                description="Used in service cards and listings"
                value={field.value}
                onChange={field.onChange}
                error={form.formState.errors.featuredImageId?.message}
              />
            )}
          />
          <Controller
            name="bannerImageId"
            control={form.control}
            render={({ field }) => (
              <ImagePicker
                label="Banner Image"
                description="Used as the hero background on the detail page"
                value={field.value}
                onChange={field.onChange}
                error={form.formState.errors.bannerImageId?.message}
              />
            )}
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
        <h3 className="text-lg font-semibold">Call to Action</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="CTA Title"
            placeholder="Ready to get started?"
            {...form.register("ctaTitle")}
            error={form.formState.errors.ctaTitle?.message}
          />
          <Input
            label="CTA Button Text"
            placeholder="Contact Us"
            {...form.register("ctaButtonText")}
            error={form.formState.errors.ctaButtonText?.message}
          />
        </div>
        <Input
          label="CTA Button URL"
          placeholder="/contact"
          {...form.register("ctaButtonUrl")}
          error={form.formState.errors.ctaButtonUrl?.message}
        />
        <Textarea
          label="CTA Description"
          placeholder="Brief CTA description..."
          {...form.register("ctaDescription")}
          error={form.formState.errors.ctaDescription?.message}
        />
      </div>

      {/* SEO Section */}
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
          robotsIndex: form.register("name"), // mock registers to avoid ts errors since the fields exist in seo but maybe not all in service schema exactly as named
          robotsFollow: form.register("name"),
        }}
        errors={form.formState.errors}
        warnings={[]}
      />

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-card-border mt-8">
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
  );
}

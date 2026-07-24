"use client";

import { useRouter } from "next/navigation";
import { Controller, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";

import { SeoFields } from "@/components/shared/seo";
import { RichTextEditor } from "@/components/shared/editor";
import { ImagePicker } from "@/components/shared/media";
import type { ServiceFormValues } from "../schemas/service.schema";
import { Star, Plus, Trash2 } from "lucide-react";
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

// Helper component for string arrays (Key Features, Benefits)
function StringArrayField({
  value = [],
  onChange,
  label,
  placeholder,
}: {
  value?: string[] | null;
  onChange: (val: string[]) => void;
  label: string;
  placeholder: string;
}) {
  const items = value || [];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onChange([...items, ""])}
        >
          <Plus size={14} className="mr-1" /> Add
        </Button>
      </div>
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground py-2">No items added.</p>
      )}
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={item}
            placeholder={placeholder}
            onChange={(e) => {
              const newItems = [...items];
              newItems[index] = e.target.value;
              onChange(newItems);
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 shrink-0 text-muted-foreground hover:text-danger"
            onClick={() => {
              const newItems = items.filter((_, i) => i !== index);
              onChange(newItems);
            }}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ))}
    </div>
  );
}

export default function ServiceForm({
  form,
  onSubmit,
  submitLabel = "Save Service",
}: ServiceFormProps) {
  const router = useRouter();

  const faqField = useFieldArray({
    control: form.control,
    name: "faq",
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* ────────────────────────────────────────────────────────────────────────
          SECTION 1 — BASIC INFORMATION
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Defines the service and controls publishing.
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
                        : "text-muted-foreground hover:bg-surface-hover"
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Sort Order"
            type="number"
            placeholder="0"
            {...form.register("sortOrder", { valueAsNumber: true })}
            error={form.formState.errors.sortOrder?.message}
          />
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          SECTION 2 — LISTING INFORMATION
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Listing Information</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Displayed on the Homepage, Services page, Related Services, and other service listings.
          </p>
        </div>

        {/* Icon Selection */}
        <div className="space-y-4 border border-card-border p-4 rounded-xl bg-surface">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Service Icon</label>
            <Controller
              name="iconType"
              control={form.control}
              render={({ field }) => (
                <ToggleGroup
                  value={field.value || "library"}
                  onChange={field.onChange}
                  options={[
                    { label: "Library Icon", value: "library" },
                    { label: "Uploaded Image", value: "image" },
                  ]}
                  error={form.formState.errors.iconType?.message}
                />
              )}
            />
          </div>

          <div className="pt-2">
            {form.watch("iconType") === "image" ? (
              <Controller
                name="iconImageId"
                control={form.control}
                render={({ field }) => (
                  <ImagePicker
                    label="Icon Image"
                    description="Upload or select an image to use as the icon."
                    value={field.value}
                    onChange={field.onChange}
                    error={form.formState.errors.iconImageId?.message}
                  />
                )}
              />
            ) : (
              <Input
                label="Icon Name"
                placeholder="e.g. Activity, Code, Zap"
                {...form.register("iconName")}
                error={form.formState.errors.iconName?.message}
                hint="Enter the name of a Lucide React icon"
              />
            )}
          </div>
        </div>

        <Controller
          name="featuredImageId"
          control={form.control}
          render={({ field }) => (
            <ImagePicker
              label="Featured Image"
              description="Used in service cards and grid listings."
              value={field.value}
              onChange={field.onChange}
              error={form.formState.errors.featuredImageId?.message}
            />
          )}
        />

        <Textarea
          label="Short Description"
          placeholder="Brief summary of the service"
          {...form.register("shortDescription")}
          error={form.formState.errors.shortDescription?.message}
        />
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          SECTION 3 — DETAIL PAGE
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-8">
        <div>
          <h3 className="text-lg font-semibold">Detail Page</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Displayed on the individual service page after the visitor opens the service.
          </p>
        </div>

        {/* Banner */}
        <div className="space-y-4 pt-4 border-t border-card-border">
          <h4 className="font-medium text-foreground">Banner</h4>
          <Controller
            name="bannerImageId"
            control={form.control}
            render={({ field }) => (
              <ImagePicker
                description="Used as the hero background on the detail page."
                value={field.value}
                onChange={field.onChange}
                error={form.formState.errors.bannerImageId?.message}
              />
            )}
          />
        </div>

        {/* Content */}
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

        {/* Key Features & Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-card-border">
          <div>
            <h4 className="font-medium text-foreground mb-4">Key Features</h4>
            <Controller
              name="keyFeatures"
              control={form.control}
              render={({ field }) => (
                <StringArrayField
                  label="Features"
                  placeholder="e.g. 24/7 Support"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {form.formState.errors.keyFeatures?.message && (
              <p className="text-sm text-danger mt-1">
                {form.formState.errors.keyFeatures?.message as string}
              </p>
            )}
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-4">Benefits</h4>
            <Controller
              name="benefits"
              control={form.control}
              render={({ field }) => (
                <StringArrayField
                  label="Benefits"
                  placeholder="e.g. Increased ROI"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {form.formState.errors.benefits?.message && (
              <p className="text-sm text-danger mt-1">
                {form.formState.errors.benefits?.message as string}
              </p>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4 pt-4 border-t border-card-border">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">FAQ</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => faqField.append({ question: "", answer: "" })}
            >
              <Plus size={14} className="mr-1" /> Add FAQ
            </Button>
          </div>
          {faqField.fields.length === 0 && (
            <p className="text-sm text-muted-foreground py-2">
              No FAQs added.
            </p>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            {faqField.fields.map((field, index) => (
              <div
                key={field.id}
                className="space-y-3 p-4 border border-card-border rounded-xl bg-surface relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Item #{index + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 shrink-0 text-muted-foreground hover:text-danger"
                    onClick={() => faqField.remove(index)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <Input
                  label="Question"
                  placeholder="Enter question"
                  {...form.register(`faq.${index}.question` as const)}
                  error={
                    form.formState.errors.faq?.[index]?.question?.message
                  }
                />
                <Textarea
                  label="Answer"
                  placeholder="Enter answer"
                  {...form.register(`faq.${index}.answer` as const)}
                  error={form.formState.errors.faq?.[index]?.answer?.message}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Call To Action */}
        <div className="space-y-4 pt-4 border-t border-card-border">
          <h4 className="font-medium text-foreground mb-4">Call To Action</h4>
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
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          SECTION 4 — SEO SETTINGS
      ──────────────────────────────────────────────────────────────────────── */}
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
            robotsIndex: form.register("name"), // mock registers
            robotsFollow: form.register("name"),
          }}
          errors={form.formState.errors}
          warnings={[]}
        />
      </div>

      {/* Actions */}
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
  );
}

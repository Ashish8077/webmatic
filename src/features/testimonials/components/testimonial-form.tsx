"use client";

import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { MediaField } from "@/features/media/components/media-field/media-field";
import type { TestimonialFormValues } from "../schemas/testimonial.schema";
import type { UseFormReturn } from "react-hook-form";

const STATUS_OPTIONS = [
  { label: "Draft", value: "draft" as const },
  { label: "Published", value: "published" as const },
];

interface TestimonialFormProps {
  form: UseFormReturn<TestimonialFormValues>;
  onSubmit: (data: TestimonialFormValues) => Promise<void>;
  submitLabel?: string;
}

export default function TestimonialForm({
  form,
  onSubmit,
  submitLabel = "Save Testimonial",
}: TestimonialFormProps) {
  const router = useRouter();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Who provided this testimonial and their publication status.
            </p>
          </div>
          <div className="flex items-center gap-4">
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
            label="Client Name"
            placeholder="John Doe"
            autoComplete="off"
            autoFocus
            {...form.register("clientName")}
            error={form.formState.errors.clientName?.message}
          />
          <Input
            label="Designation"
            placeholder="CEO, Example Inc."
            {...form.register("designation")}
            error={form.formState.errors.designation?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Company Name"
            placeholder="Example Inc."
            {...form.register("companyName")}
            error={form.formState.errors.companyName?.message}
          />
          <Input
            label="Rating (1-5)"
            type="number"
            min={1}
            max={5}
            placeholder="5"
            {...form.register("rating", { valueAsNumber: true })}
            error={form.formState.errors.rating?.message}
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Content</h3>
          <p className="text-sm text-muted-foreground mt-1">
            The actual testimonial text and profile image.
          </p>
        </div>

        <Controller
          name="profileImage"
          control={form.control}
          render={({ field }) => (
            <div>
              <MediaField
                label="Profile Image"
                value={field.value}
                onMediaChange={(media) => {
                  field.onChange(media);
                  form.setValue("profileImageId", media?.id ?? null, {
                    shouldDirty: true,
                    shouldValidate: true,
                    shouldTouch: true,
                  });
                }}
              />
              <p className="mt-1.5 text-sm text-muted-foreground">
                Avatar of the person giving the testimonial (square aspect ratio recommended).
              </p>
              {form.formState.errors.profileImageId && (
                <p className="mt-1.5 text-sm font-medium text-danger">
                  {form.formState.errors.profileImageId.message}
                </p>
              )}
            </div>
          )}
        />

        <Input
          label="Testimonial Title"
          placeholder="Excellent service!"
          {...form.register("title")}
          error={form.formState.errors.title?.message}
        />

        <Textarea
          label="Description / Quote"
          placeholder="Write the testimonial content here..."
          rows={5}
          {...form.register("description")}
          error={form.formState.errors.description?.message}
        />
      </div>

      {/* Settings */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Settings</h3>
        </div>
        <div className="w-full md:w-1/2">
          <Input
            label="Sort Order"
            type="number"
            placeholder="0"
            hint="Lower numbers appear first"
            {...form.register("sortOrder", { valueAsNumber: true })}
            error={form.formState.errors.sortOrder?.message}
          />
        </div>
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


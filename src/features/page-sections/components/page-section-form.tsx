"use client";

import { useEffect } from "react";
import { Controller, useFormState, type UseFormReturn } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup } from "@/components/ui/toggle-group";

import { PageSectionFormValues } from "../schemas/page-section-form.schema";
import { PAGE_SECTION_TYPES } from "@/modules/pages-section/constants/page-section-types";

const STATUS_OPTIONS = [
  { label: "Draft", value: "draft" as const },
  { label: "Published", value: "published" as const },
];

interface PageSectionFormProps {
  form: UseFormReturn<PageSectionFormValues>;
  onSubmit: (data: PageSectionFormValues) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
  formId?: string;
  hideActions?: boolean;
  isLoading?: boolean;
  isSubmitting?: boolean;
  isEditing?: boolean;
}

export function PageSectionForm({
  form,
  onSubmit,
  onCancel,
  submitLabel,
  formId,
  hideActions = false,
  isLoading = false,
  isSubmitting = false,
  isEditing = false,
}: PageSectionFormProps) {
  const { errors } = useFormState({ control: form.control });

  useEffect(() => {
    if (isLoading) return;

    form.setFocus(isEditing ? "content" : "sectionType");
  }, [form, isEditing, isLoading]);

  if (isLoading) {
    return (
      <div className="flex min-h-75 flex-col items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-accent" />
        <p className="mt-3 text-sm text-muted-foreground">Loading section...</p>
      </div>
    );
  }

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {isEditing ? (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Section Type
          </label>
          <div className="flex h-10 items-center">
            <span className="inline-flex items-center rounded-md bg-accent/10 px-2 py-1 text-xs font-medium text-accent ring-1 ring-inset ring-accent/20">
              {form.getValues("sectionType")}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Section Type
          </label>
          <select
            className="flex h-10 w-full rounded-md border border-card-border bg-card-bg px-3 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
            {...form.register("sectionType")}
          >
            {PAGE_SECTION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.sectionType?.message && (
            <p className="text-xs text-danger">
              {errors.sectionType.message as string}
            </p>
          )}
        </div>
      )}

      <Textarea
        label="Content JSON"
        placeholder='{"heading": "Hello"}'
        disabled={isSubmitting}
        className="min-h-45 font-mono text-xs"
        {...form.register("content")}
        error={errors.content?.message}
      />

      <Textarea
        label="Settings JSON"
        placeholder='{"theme": "dark"}'
        disabled={isSubmitting}
        className="min-h-30 font-mono text-xs"
        {...form.register("settings")}
        error={errors.settings?.message}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Sort Order"
          type="number"
          min={0}
          disabled={isSubmitting}
          {...form.register("sortOrder", { valueAsNumber: true })}
          error={errors.sortOrder?.message}
        />

        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <ToggleGroup
              label="Status"
              value={field.value}
              onChange={field.onChange}
              options={STATUS_OPTIONS}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>

      {!hideActions && (
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isSubmitting}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" size="sm" isLoading={isSubmitting}>
            {submitLabel}
          </Button>
        </div>
      )}
    </form>
  );
}

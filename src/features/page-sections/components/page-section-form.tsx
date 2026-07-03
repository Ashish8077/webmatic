"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PageSectionFormValues } from "../schemas/page-section.schema";

interface PageSectionFormProps {
  form: UseFormReturn<PageSectionFormValues>;
  onSubmit: (data: PageSectionFormValues) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
  isLoading?: boolean;
  isSubmitting?: boolean;
}

export function PageSectionForm({
  form,
  onSubmit,
  onCancel,
  submitLabel,
  isLoading = false,
  isSubmitting = false,
}: PageSectionFormProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-accent" />
        <p className="mt-3 text-sm text-muted-foreground">Loading section...</p>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Section Name"
        placeholder="hero-banner"
        autoComplete="off"
        disabled={isSubmitting}
        {...form.register("sectionName")}
        error={form.formState.errors.sectionName?.message}
      />

      <Input
        label="Title"
        placeholder="Display title"
        disabled={isSubmitting}
        {...form.register("title")}
        error={form.formState.errors.title?.message}
      />

      <Textarea
        label="Content JSON"
        placeholder='{"heading": "Hello"}'
        disabled={isSubmitting}
        className="min-h-[180px] font-mono text-xs"
        {...form.register("content")}
        error={form.formState.errors.content?.message}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Sort Order"
          type="number"
          min={0}
          disabled={isSubmitting}
          {...form.register("sortOrder", { valueAsNumber: true })}
          error={form.formState.errors.sortOrder?.message}
        />

        <Controller
          name="isActive"
          control={form.control}
          render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Status
              </label>
              <button
                type="button"
                aria-pressed={field.value}
                disabled={isSubmitting}
                onClick={() => field.onChange(!field.value)}
                className={`
                  inline-flex h-10 w-[92px] items-center rounded-lg border px-2 transition-all
                  disabled:cursor-not-allowed disabled:opacity-50
                  ${
                    field.value
                      ? "border-success/30 bg-success/15"
                      : "border-card-border bg-surface"
                  }
                `}
              >
                <span
                  className={`
                    inline-block h-6 w-6 rounded-md shadow-sm transition-all duration-200
                    ${field.value ? "translate-x-12 bg-success" : "bg-muted-foreground"}
                  `}
                />
              </button>
              <p className="text-xs text-muted-foreground">
                {field.value ? "Active" : "Inactive"}
              </p>
            </div>
          )}
        />
      </div>

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
    </form>
  );
}

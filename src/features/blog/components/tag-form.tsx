"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  CreateTagInput,
  createTagSchema,
} from "@/features/blog/schemas/create-tag.schema";

interface TagFormProps {
  onSubmit: (data: CreateTagInput) => Promise<void>;
  defaultValues?: Partial<CreateTagInput>;
  submitLabel?: string;
  onCancel?: () => void;
}

export function TagForm({
  onSubmit,
  defaultValues,
  submitLabel = "Save Tag",
  onCancel,
}: TagFormProps) {
  const form = useForm<CreateTagInput>({
    resolver: zodResolver(
      createTagSchema,
    ) as unknown as Resolver<CreateTagInput>,
    defaultValues: {
      name: "",
      slug: "",
      ...defaultValues,
    },
  });

  const handleSubmit = async (data: CreateTagInput) => {
    try {
      await onSubmit(data);
      if (!defaultValues) {
        form.reset();
      }
    } catch (error: unknown) {
      const apiError = error as { status?: number };
      if (apiError?.status === 409) {
        form.setError("slug", {
          type: "manual",
          message: "This slug is already in use",
        });
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
      <Input
        label="Name"
        placeholder="Enter tag name"
        autoFocus
        {...form.register("name")}
        error={form.formState.errors.name?.message}
      />

      <Input
        label="Slug"
        placeholder="tag-slug"
        {...form.register("slug")}
        error={form.formState.errors.slug?.message}
      />

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          isLoading={form.formState.isSubmitting || form.formState.isLoading}
        >
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

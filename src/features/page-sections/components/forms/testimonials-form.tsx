"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_TESTIMONIALS_CONTENT,
  type TestimonialsContentValues,
  type TestimonialsSettingsValues,
} from "../../schemas/testimonials.schema";
import {
  TextField,
  TextareaField,
  ImageIdField,
  SectionHeadingFields,
  RepeaterField,
  SliderSettingsFields,
  NumberField,
} from "../fields";

import { parseSliderSettingsDefaults } from "../../schemas/common-settings.schema";
import { useFormContext } from "react-hook-form";

type FormShape = {
  content: TestimonialsContentValues;
  settings: TestimonialsSettingsValues;
};

export function parseTestimonialsContentDefaults(
  content: Record<string, unknown> | null | undefined,
): TestimonialsContentValues {
  const raw = (content || {}) as Partial<TestimonialsContentValues>;
  return {
    badge: (raw.badge as string) ?? DEFAULT_TESTIMONIALS_CONTENT.badge,
    heading: (raw.heading as string) ?? DEFAULT_TESTIMONIALS_CONTENT.heading,
    highlight:
      (raw.highlight as string) ?? DEFAULT_TESTIMONIALS_CONTENT.highlight,
    description:
      (raw.description as string) ?? DEFAULT_TESTIMONIALS_CONTENT.description,
    backgroundColor:
      (raw.backgroundColor as string) ?? DEFAULT_TESTIMONIALS_CONTENT.backgroundColor,
    backgroundImageId:
      (raw.backgroundImageId as number | null) ?? DEFAULT_TESTIMONIALS_CONTENT.backgroundImageId,
    testimonials:
      raw.testimonials?.map((t) => ({
        clientName: t.clientName ?? "",
        clientDesignation: t.clientDesignation ?? "",
        companyName: t.companyName ?? "",
        imageId: t.imageId ?? null,
        testimonialTitle: t.testimonialTitle ?? "",
        testimonialDescription: t.testimonialDescription ?? "",
        rating: t.rating ?? 5,
        sortOrder: t.sortOrder ?? 0,
        status: t.status ?? "published",
      })) ?? DEFAULT_TESTIMONIALS_CONTENT.testimonials,
  };
}

export const parseTestimonialsSettingsDefaults = parseSliderSettingsDefaults;

export function TestimonialsContentForm({ disabled }: { disabled?: boolean }) {
  const form = useFormContext<FormShape>();

  return (
    <div className="space-y-5">
      <SectionHeadingFields
        namePrefix="content"
        showDescription
        disabled={disabled}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          name="content.backgroundColor"
          label="Background Color (Optional)"
          disabled={disabled}
        />
        <ImageIdField
          name="content.backgroundImageId"
          label="Background Image (Optional)"
          disabled={disabled}
        />
      </div>

      <RepeaterField<FormShape>
        name="content.testimonials"
        label="Testimonials"
        defaultItem={DEFAULT_TESTIMONIALS_CONTENT.testimonials[0] ?? {
          clientName: "",
          clientDesignation: "",
          companyName: "",
          imageId: null,
          testimonialTitle: "",
          testimonialDescription: "",
          rating: 5,
          sortOrder: 0,
          status: "published",
        }}
        disabled={disabled}
        renderItem={(index) => (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <TextField
                name={`content.testimonials.${index}.clientName`}
                label="Client Name"
                disabled={disabled}
              />
              <TextField
                name={`content.testimonials.${index}.clientDesignation`}
                label="Designation"
                disabled={disabled}
              />
              <TextField
                name={`content.testimonials.${index}.companyName`}
                label="Company Name"
                disabled={disabled}
              />
            </div>
            
            <ImageIdField
              name={`content.testimonials.${index}.imageId`}
              label="Profile Image ID"
              disabled={disabled}
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                name={`content.testimonials.${index}.testimonialTitle`}
                label="Testimonial Title (Optional)"
                disabled={disabled}
              />
              <div className="grid gap-3 grid-cols-2">
                <NumberField
                  name={`content.testimonials.${index}.rating`}
                  label="Rating (1-5)"
                  disabled={disabled}
                />
                <NumberField
                  name={`content.testimonials.${index}.sortOrder`}
                  label="Sort Order"
                  disabled={disabled}
                />
              </div>
            </div>
            
            <TextareaField
              name={`content.testimonials.${index}.testimonialDescription`}
              label="Testimonial Description"
              disabled={disabled}
            />
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">Status</label>
              <select
                disabled={disabled}
                className="flex h-9 w-full rounded-md border border-slate-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue={form.getValues(`content.testimonials.${index}.status`)}
                onChange={(e) => {
                  form.setValue(`content.testimonials.${index}.status`, e.target.value as "published" | "draft", {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        )}
      />
    </div>
  );
}

export function TestimonialsSettingsForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <SliderSettingsFields namePrefix="settings" disabled={disabled} />
    </div>
  );
}

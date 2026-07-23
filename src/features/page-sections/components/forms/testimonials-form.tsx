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
} from "../fields";

import { parseSliderSettingsDefaults } from "../../schemas/common-settings.schema";

type FormShape = {
  content: TestimonialsContentValues;
  settings: TestimonialsSettingsValues;
};

export function parseTestimonialsContentDefaults(
  content: JsonObject | undefined | null,
): TestimonialsContentValues {
  const raw = (content ?? {}) as unknown as Partial<TestimonialsContentValues>;
  return {
    badge: (raw.badge as string) ?? DEFAULT_TESTIMONIALS_CONTENT.badge,
    heading: (raw.heading as string) ?? DEFAULT_TESTIMONIALS_CONTENT.heading,
    highlight:
      (raw.highlight as string) ?? DEFAULT_TESTIMONIALS_CONTENT.highlight,
    description:
      (raw.description as string) ?? DEFAULT_TESTIMONIALS_CONTENT.description,
    testimonials:
      raw.testimonials?.map((t) => ({
        title: t.title ?? "",
        description: t.description ?? "",
        authorName: t.authorName ?? "",
        authorDesignation: t.authorDesignation ?? "",
        authorImageId: t.authorImageId ?? null,
      })) ?? DEFAULT_TESTIMONIALS_CONTENT.testimonials,
  };
}

export const parseTestimonialsSettingsDefaults = parseSliderSettingsDefaults;

export function TestimonialsContentForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <SectionHeadingFields
        namePrefix="content"
        showDescription
        disabled={disabled}
      />

      <RepeaterField<FormShape>
        name="content.testimonials"
        label="Testimonials"
        defaultItem={DEFAULT_TESTIMONIALS_CONTENT.testimonials[0] ?? {
          title: "",
          description: "",
          authorName: "",
          authorDesignation: "",
          authorImageId: null,
        }}
        disabled={disabled}
        renderItem={(index) => (
          <div className="space-y-3">
            <TextField
              name={`content.testimonials.${index}.title`}
              label="Title"
              disabled={disabled}
            />
            <TextareaField
              name={`content.testimonials.${index}.description`}
              label="Testimonial / Quote"
              disabled={disabled}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                name={`content.testimonials.${index}.authorName`}
                label="Author Name"
                disabled={disabled}
              />
              <TextField
                name={`content.testimonials.${index}.authorDesignation`}
                label="Author Designation"
                disabled={disabled}
              />
            </div>
            <ImageIdField
              name={`content.testimonials.${index}.authorImageId`}
              label="Author Image ID"
              disabled={disabled}
            />
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

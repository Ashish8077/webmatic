"use client";

import {
  DEFAULT_TESTIMONIALS_CONTENT,
  type TestimonialsContentValues,
} from "../../schemas/testimonials.schema";
import {
  TextField,
  SectionHeadingFields,
  SliderSettingsFields,
  MediaPickerField,
} from "../fields";

import { parseSliderSettingsDefaults } from "../../schemas/common-settings.schema";

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

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          name="content.backgroundColor"
          label="Background Color (Optional)"
          disabled={disabled}
        />
        <MediaPickerField
          name="content.backgroundImageId"
          label="Background Image (Optional)"
          disabled={disabled}
        />
      </div>

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

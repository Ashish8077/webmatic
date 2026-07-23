"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_ABOUT_HERO_CONTENT,
  type AboutHeroContentValues,
} from "../../schemas/about-hero.schema";
import {
  TextField,
  TextareaField,
  MediaPickerField,
} from "../fields";

export function parseAboutHeroContentDefaults(
  content: JsonObject | undefined | null,
): AboutHeroContentValues {
  const raw = (content ?? {}) as unknown as Partial<AboutHeroContentValues>;
  return {
    badge: raw.badge ?? DEFAULT_ABOUT_HERO_CONTENT.badge,
    heading: raw.heading ?? DEFAULT_ABOUT_HERO_CONTENT.heading,
    highlight: raw.highlight ?? DEFAULT_ABOUT_HERO_CONTENT.highlight,
    description: raw.description ?? DEFAULT_ABOUT_HERO_CONTENT.description,
    ctaLabel: raw.ctaLabel ?? DEFAULT_ABOUT_HERO_CONTENT.ctaLabel,
    ctaTargetId: raw.ctaTargetId ?? DEFAULT_ABOUT_HERO_CONTENT.ctaTargetId,
    imageId: (raw.imageId as number | null) ?? DEFAULT_ABOUT_HERO_CONTENT.imageId,
  };
}

export function AboutHeroContentForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <TextField
        name="content.badge"
        label="Badge"
        placeholder="e.g., KNOW MORE ABOUT US"
        disabled={disabled}
      />
      <TextField
        name="content.heading"
        label="Heading"
        placeholder="e.g., Learn a little more about us."
        disabled={disabled}
      />
      <TextField
        name="content.highlight"
        label="Highlight Text (Optional)"
        placeholder="e.g., about Webmatic."
        disabled={disabled}
      />
      <TextareaField
        name="content.description"
        label="Description (Optional)"
        placeholder="e.g., Webmatic Technology is a Full-service Creative..."
        disabled={disabled}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          name="content.ctaLabel"
          label="CTA Label (Optional)"
          placeholder="e.g., Explore Our Story"
          disabled={disabled}
        />
        <TextField
          name="content.ctaTargetId"
          label="CTA Target Section (Optional)"
          placeholder="e.g., company-overview"
          disabled={disabled}
        />
      </div>
      
      <div className="pt-2">
        <MediaPickerField
          name="content.imageId"
          label="Hero Image"
          disabled={disabled}
        />
      </div>
    </div>
  );
}

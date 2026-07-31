"use client";

import type { JsonObject } from "@/shared/types/json";
import { hydrateMediaRelations } from "../../utils/media-utils";
import {
  DEFAULT_SERVICES_HERO_CONTENT,
  type ServicesHeroContentValues,
} from "../../schemas/services-hero.schema";
import {
  TextField,
  TextareaField,
  MediaPickerField,
} from "../fields";

export function parseServicesHeroContentDefaults(
  content: JsonObject | undefined | null,
): ServicesHeroContentValues {
  const raw = (content ?? {}) as unknown as Partial<ServicesHeroContentValues>;
  return {
    badge: raw.badge ?? DEFAULT_SERVICES_HERO_CONTENT.badge,
    heading: raw.heading ?? DEFAULT_SERVICES_HERO_CONTENT.heading,
    highlight: raw.highlight ?? DEFAULT_SERVICES_HERO_CONTENT.highlight,
    description: raw.description ?? DEFAULT_SERVICES_HERO_CONTENT.description,
    ctaLabel: raw.ctaLabel ?? DEFAULT_SERVICES_HERO_CONTENT.ctaLabel,
    ctaTargetId: raw.ctaTargetId ?? DEFAULT_SERVICES_HERO_CONTENT.ctaTargetId,
    secondaryCtaLabel: raw.secondaryCtaLabel ?? DEFAULT_SERVICES_HERO_CONTENT.secondaryCtaLabel,
    secondaryCtaTargetId: raw.secondaryCtaTargetId ?? DEFAULT_SERVICES_HERO_CONTENT.secondaryCtaTargetId,
    imageId: (raw.imageId as number | null) ?? DEFAULT_SERVICES_HERO_CONTENT.imageId,
  };
}

export function ServicesHeroContentForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <TextField
        name="content.badge"
        label="Badge"
        placeholder="e.g., OUR SERVICES"
        disabled={disabled}
      />
      <TextField
        name="content.heading"
        label="Heading"
        placeholder="e.g., Full-service Digital Marketing"
        disabled={disabled}
      />
      <TextField
        name="content.highlight"
        label="Highlight Text (Optional)"
        placeholder="e.g., Expert Solutions"
        disabled={disabled}
      />
      <TextareaField
        name="content.description"
        label="Description (Optional)"
        placeholder="Supporting text..."
        disabled={disabled}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          name="content.ctaLabel"
          label="CTA Label (Optional)"
          placeholder="e.g., Explore Our Services"
          disabled={disabled}
        />
        <TextField
          name="content.ctaTargetId"
          label="CTA Target Section (Optional)"
          placeholder="e.g., services"
          disabled={disabled}
        />
        <TextField
          name="content.secondaryCtaLabel"
          label="Secondary CTA Label (Optional)"
          placeholder="e.g., Contact Us"
          disabled={disabled}
        />
        <TextField
          name="content.secondaryCtaTargetId"
          label="Secondary CTA Target (Optional)"
          placeholder="e.g., contact"
          disabled={disabled}
        />
      </div>
      
      <div className="pt-2">
        <MediaPickerField
          name="content.imageId"
          label="Hero Image (Optional)"
          disabled={disabled}
        />
      </div>
    </div>
  );
}




"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_ABOUT_HERO_CONTENT,
  type AboutHeroContentValues,
} from "../../schemas/about-hero.schema";
import {
  TextField,
  TextareaField,
  ButtonFields,
  ImageIdField,
} from "../fields";

export function parseAboutHeroContentDefaults(
  content: JsonObject | undefined | null,
): AboutHeroContentValues {
  const raw = (content ?? {}) as unknown as Partial<AboutHeroContentValues>;
  return {
    badge: (raw.badge as string) ?? DEFAULT_ABOUT_HERO_CONTENT.badge,
    heading: (raw.heading as string) ?? DEFAULT_ABOUT_HERO_CONTENT.heading,
    highlight: (raw.highlight as string) ?? DEFAULT_ABOUT_HERO_CONTENT.highlight,
    description: (raw.description as string) ?? DEFAULT_ABOUT_HERO_CONTENT.description,
    button: {
      text: raw.button?.text ?? "",
      url: raw.button?.url ?? "",
    },
    imageId: (raw.imageId as number | null) ?? DEFAULT_ABOUT_HERO_CONTENT.imageId,
  };
}

export function AboutHeroContentForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <TextField
        name="content.badge"
        label="Badge"
        placeholder="Optional badge text"
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
        label="Highlight Text"
        placeholder="Optional text to highlight"
        disabled={disabled}
      />
      <TextareaField
        name="content.description"
        label="Description"
        placeholder="e.g., Webmatic Technology is a Full-service Creative and Strategic Digital Marketing serving"
        disabled={disabled}
      />
      
      <ButtonFields
        name="content.button"
        label="CTA Button"
        disabled={disabled}
      />
      
      <div className="pt-2">
        <ImageIdField
          name="content.imageId"
          label="Background Image"
          disabled={disabled}
        />
      </div>
    </div>
  );
}

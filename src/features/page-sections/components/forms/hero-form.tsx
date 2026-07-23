"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_HERO_CONTENT,
  type HeroContentValues,
  type HeroSettingsValues,
} from "../../schemas/hero.schema";
import {
  TextField,
  TextareaField,
  ButtonFields,
  MediaPickerField,
  RepeaterField,
  SliderSettingsFields,
} from "../fields";

import { parseSliderSettingsDefaults } from "../../schemas/common-settings.schema";

type FormShape = { content: HeroContentValues; settings: HeroSettingsValues };

export function parseHeroContentDefaults(
  content: JsonObject | undefined | null,
): HeroContentValues {
  const raw = (content ?? {}) as unknown as Partial<HeroContentValues>;
  return {
    slides:
      raw.slides?.map((slide) => ({
        badge: slide.badge ?? "",
        headline: slide.headline ?? "",
        highlight: slide.highlight ?? "",
        subheadline: slide.subheadline ?? "",
        primaryButton: {
          text: slide.primaryButton?.text ?? "",
          url: slide.primaryButton?.url ?? "",
        },
        secondaryButton: {
          text: slide.secondaryButton?.text ?? "",
          url: slide.secondaryButton?.url ?? "",
        },
        backgroundImageId: slide.backgroundImageId ?? null,
      })) ?? DEFAULT_HERO_CONTENT.slides,
  };
}

export const parseHeroSettingsDefaults = parseSliderSettingsDefaults;

export function HeroContentForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <RepeaterField<FormShape>
        name="content.slides"
        label="Slides"
        defaultItem={DEFAULT_HERO_CONTENT.slides[0]}
        disabled={disabled}
        renderItem={(index) => (
          <div className="space-y-3">
            <MediaPickerField
              name={`content.slides.${index}.backgroundImageId`}
              label="Background Image"
              disabled={disabled}
            />
            <TextField
              name={`content.slides.${index}.badge`}
              label="Badge"
              placeholder="e.g. New Launch"
              disabled={disabled}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                name={`content.slides.${index}.headline`}
                label="Headline"
                placeholder="Main heading"
                disabled={disabled}
              />
              <TextField
                name={`content.slides.${index}.highlight`}
                label="Highlight"
                placeholder="Highlighted text"
                disabled={disabled}
              />
            </div>
            <TextareaField
              name={`content.slides.${index}.subheadline`}
              label="Sub-headline"
              placeholder="Supporting text"
              disabled={disabled}
            />
            <ButtonFields
              name={`content.slides.${index}.primaryButton`}
              label="Primary Button"
              disabled={disabled}
            />
            <ButtonFields
              name={`content.slides.${index}.secondaryButton`}
              label="Secondary Button"
              disabled={disabled}
            />

          </div>
        )}
      />
    </div>
  );
}

export function HeroSettingsForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <SliderSettingsFields namePrefix="settings" disabled={disabled} />
    </div>
  );
}

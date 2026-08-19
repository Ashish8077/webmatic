"use client";

import type { JsonObject } from "@/shared/types/json";
import { hydrateMediaRelations } from "../../utils/media-utils";
import {
  DEFAULT_ABOUT_CONTENT,
  type AboutContentValues,
  DEFAULT_ABOUT_SETTINGS,
  type AboutSettingsValues,
} from "../../schemas/about.schema";
import {
  TextField,
  TextareaField,
  ButtonFields,
  MediaPickerField,
  SectionHeadingFields,
  RepeaterField,
} from "../fields";

type FormShape = { content: AboutContentValues; settings: AboutSettingsValues };

export function parseAboutContentDefaults(
  content: JsonObject | undefined | null,
): AboutContentValues {
  const raw = (content ?? {}) as unknown as Partial<AboutContentValues>;
  const parsed = {
    badge: (raw.badge as string) ?? DEFAULT_ABOUT_CONTENT.badge,
    heading: (raw.heading as string) ?? DEFAULT_ABOUT_CONTENT.heading,
    highlight: (raw.highlight as string) ?? DEFAULT_ABOUT_CONTENT.highlight,
    description:
      (raw.description as string) ?? DEFAULT_ABOUT_CONTENT.description,
    primaryButton: {
      text: raw.primaryButton?.text ?? "",
      url: raw.primaryButton?.url ?? "",
    },
    learnMoreButton: {
      text: raw.learnMoreButton?.text ?? "",
      url: raw.learnMoreButton?.url ?? "",
    },
    bottomText: (raw.bottomText as string) ?? DEFAULT_ABOUT_CONTENT.bottomText,
    cards:
      raw.cards?.map((card) => ({
        badge: card.badge ?? "",
        title: card.title ?? "",
        description: card.description ?? "",
        button: {
          text: card.button?.text ?? "",
          url: card.button?.url ?? "",
        },
        imageId: card.imageId ?? null,
      })) ?? DEFAULT_ABOUT_CONTENT.cards,
  };

  return hydrateMediaRelations((content ?? {}) as JsonObject, parsed);
}

export function parseAboutSettingsDefaults(): AboutSettingsValues {
  return DEFAULT_ABOUT_SETTINGS;
}

export function AboutContentForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <SectionHeadingFields
        namePrefix="content"
        showDescription
        disabled={disabled}
      />

      <ButtonFields
        name="content.primaryButton"
        label="Primary Button"
        disabled={disabled}
      />
      <ButtonFields
        name="content.learnMoreButton"
        label="Learn More Button"
        disabled={disabled}
      />

      <TextField
        name="content.bottomText"
        label="Bottom Text"
        placeholder="Text shown below cards"
        disabled={disabled}
      />

      <RepeaterField<FormShape>
        name="content.cards"
        label="Cards"
        defaultItem={DEFAULT_ABOUT_CONTENT.cards[0] ?? {
          badge: "",
          title: "",
          description: "",
          button: { text: "", url: "" },
          imageId: null,
        }}
        disabled={disabled}
        renderItem={(index) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                name={`content.cards.${index}.badge`}
                label="Badge"
                disabled={disabled}
              />
              <TextField
                name={`content.cards.${index}.title`}
                label="Title"
                disabled={disabled}
              />
            </div>
            <TextareaField
              name={`content.cards.${index}.description`}
              label="Description"
              disabled={disabled}
            />
            <ButtonFields
              name={`content.cards.${index}.button`}
              label="Button"
              disabled={disabled}
            />
            <MediaPickerField
              name={`content.cards.${index}.imageId`}
              disabled={disabled}
            />
          </div>
        )}
      />
    </div>
  );
}

export function AboutSettingsForm() {
  return (
    <div className="flex min-h-25 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
      <p className="text-sm text-muted-foreground">
        No settings available for this section.
      </p>
    </div>
  );
}

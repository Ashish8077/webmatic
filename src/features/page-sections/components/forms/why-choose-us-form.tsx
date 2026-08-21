"use client";

import type { JsonObject } from "@/shared/types/json";
import { hydrateMediaRelations } from "../../utils/media-utils";
import {
  DEFAULT_WHY_CHOOSE_US_CONTENT,
  type WhyChooseUsContentValues,
  DEFAULT_WHY_CHOOSE_US_SETTINGS,
  type WhyChooseUsSettingsValues,
} from "../../schemas/why-choose-us.schema";
import {
  TextField,
  TextareaField,
  ButtonFields,
  SectionHeadingFields,
  RepeaterField,
  VisualPickerField,
} from "../fields";

type FormShape = {
  content: WhyChooseUsContentValues;
  settings: WhyChooseUsSettingsValues;
};

export function parseWhyChooseUsContentDefaults(
  content: JsonObject | undefined | null,
): WhyChooseUsContentValues {
  const raw = (content ?? {}) as unknown as Partial<WhyChooseUsContentValues>;
  const parsed = {
    badge: (raw.badge as string) ?? DEFAULT_WHY_CHOOSE_US_CONTENT.badge,
    heading: (raw.heading as string) ?? DEFAULT_WHY_CHOOSE_US_CONTENT.heading,
    highlight:
      (raw.highlight as string) ?? DEFAULT_WHY_CHOOSE_US_CONTENT.highlight,
    description:
      (raw.description as string) ?? DEFAULT_WHY_CHOOSE_US_CONTENT.description,
    learnMoreButton: {
      text: raw.learnMoreButton?.text ?? "",
      url: raw.learnMoreButton?.url ?? "",
    },
    bottomText:
      (raw.bottomText as string) ?? DEFAULT_WHY_CHOOSE_US_CONTENT.bottomText,
    primaryButton: {
      text: raw.primaryButton?.text ?? "",
      url: raw.primaryButton?.url ?? "",
    },
    reasons:
      raw.reasons?.map((reason) => ({
        key: reason.key ?? "",
        title: reason.title ?? "",
        description: reason.description ?? "",
        visualType: reason.visualType ?? "none",
        iconName: reason.iconName ?? null,
        imageId: reason.imageId ?? null,
        button: {
          text: reason.button?.text ?? "",
          url: reason.button?.url ?? "",
        },
      })) ?? DEFAULT_WHY_CHOOSE_US_CONTENT.reasons,
  };

  return hydrateMediaRelations((content ?? {}) as JsonObject, parsed);
}

export function parseWhyChooseUsSettingsDefaults(): WhyChooseUsSettingsValues {
  return DEFAULT_WHY_CHOOSE_US_SETTINGS;
}

export function WhyChooseUsContentForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <SectionHeadingFields
        namePrefix="content"
        showDescription
        disabled={disabled}
      />

      <ButtonFields
        name="content.learnMoreButton"
        label="Learn More Button"
        disabled={disabled}
      />
      <ButtonFields
        name="content.primaryButton"
        label="Primary Button"
        disabled={disabled}
      />
      <TextField
        name="content.bottomText"
        label="Bottom Text"
        placeholder="Text shown below reasons"
        disabled={disabled}
      />

      <RepeaterField<FormShape>
        name="content.reasons"
        label="Reasons"
        defaultItem={DEFAULT_WHY_CHOOSE_US_CONTENT.reasons[0] ?? {
          key: "",
          title: "",
          description: "",
          visualType: "none",
          iconName: null,
          imageId: null,
          button: { text: "", url: "" },
        }}
        disabled={disabled}
        renderItem={(index) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                name={`content.reasons.${index}.key`}
                label="Key (Optional)"
                placeholder="e.g. fast-delivery"
                disabled={disabled}
              />
              <TextField
                name={`content.reasons.${index}.title`}
                label="Title"
                disabled={disabled}
              />
            </div>
            <TextareaField
              name={`content.reasons.${index}.description`}
              label="Description"
              disabled={disabled}
            />
            <ButtonFields
              name={`content.reasons.${index}.button`}
              label="Button"
              disabled={disabled}
            />
            <VisualPickerField
              name={`content.reasons.${index}`}
              label="Reason Visual"
              description="Select an icon or image for this reason."
            />
          </div>
        )}
      />
    </div>
  );
}

export function WhyChooseUsSettingsForm() {
  return (
    <div className="flex min-h-25 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
      <p className="text-sm text-muted-foreground">
        No settings available for this section.
      </p>
    </div>
  );
}




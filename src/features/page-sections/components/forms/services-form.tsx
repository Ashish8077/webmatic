"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_SERVICES_CONTENT,
  type ServicesContentValues,
  DEFAULT_SERVICES_SETTINGS,
  type ServicesSettingsValues,
} from "../../schemas/services.schema";
import {
  TextField,
  TextareaField,
  ButtonFields,
  MediaPickerField,
  SectionHeadingFields,
  RepeaterField,
} from "../fields";

type FormShape = {
  content: ServicesContentValues;
  settings: ServicesSettingsValues;
};

export function parseServicesContentDefaults(
  content: JsonObject | undefined | null,
): ServicesContentValues {
  const raw = (content ?? {}) as unknown as Partial<ServicesContentValues>;
  return {
    badge: (raw.badge as string) ?? DEFAULT_SERVICES_CONTENT.badge,
    heading: (raw.heading as string) ?? DEFAULT_SERVICES_CONTENT.heading,
    highlight: (raw.highlight as string) ?? DEFAULT_SERVICES_CONTENT.highlight,
    viewAllButton: {
      text: raw.viewAllButton?.text ?? "",
      url: raw.viewAllButton?.url ?? "",
    },
    bottomText:
      (raw.bottomText as string) ?? DEFAULT_SERVICES_CONTENT.bottomText,
    primaryButton: {
      text: raw.primaryButton?.text ?? "",
      url: raw.primaryButton?.url ?? "",
    },
    services:
      raw.services?.map((service) => ({
        key: service.key ?? "",
        title: service.title ?? "",
        description: service.description ?? "",
        button: {
          text: service.button?.text ?? "",
          url: service.button?.url ?? "",
        },
        imageId: service.imageId ?? null,
      })) ?? DEFAULT_SERVICES_CONTENT.services,
  };
}

export function parseServicesSettingsDefaults(): ServicesSettingsValues {
  return DEFAULT_SERVICES_SETTINGS;
}

export function ServicesContentForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <SectionHeadingFields namePrefix="content" disabled={disabled} />

      <ButtonFields
        name="content.viewAllButton"
        label="View All Button"
        disabled={disabled}
      />

      <TextField
        name="content.bottomText"
        label="Bottom Text"
        placeholder="Text shown below services"
        disabled={disabled}
      />
      <ButtonFields
        name="content.primaryButton"
        label="Primary Button"
        disabled={disabled}
      />

      <RepeaterField<FormShape>
        name="content.services"
        label="Services"
        defaultItem={DEFAULT_SERVICES_CONTENT.services[0] ?? {
          key: "",
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
                name={`content.services.${index}.key`}
                label="Key (Optional)"
                placeholder="e.g. web-dev"
                disabled={disabled}
              />
              <TextField
                name={`content.services.${index}.title`}
                label="Title"
                disabled={disabled}
              />
            </div>
            <TextareaField
              name={`content.services.${index}.description`}
              label="Description"
              disabled={disabled}
            />
            <ButtonFields
              name={`content.services.${index}.button`}
              label="Button"
              disabled={disabled}
            />
            <MediaPickerField
              name={`content.services.${index}.imageId`}
              disabled={disabled}
            />
          </div>
        )}
      />
    </div>
  );
}

export function ServicesSettingsForm() {
  return (
    <div className="flex min-h-[100px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
      <p className="text-sm text-muted-foreground">
        No settings available for this section.
      </p>
    </div>
  );
}

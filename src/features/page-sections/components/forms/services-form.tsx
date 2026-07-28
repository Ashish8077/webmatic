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
  ButtonFields,
  SectionHeadingFields,
} from "../fields";

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

"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_CONTACT_CTA_CONTENT,
  type ContactCtaContentValues,
  DEFAULT_CONTACT_CTA_SETTINGS,
  type ContactCtaSettingsValues,
} from "../../schemas/contact-cta.schema";
import {
  TextField,
  TextareaField,
  ButtonFields,
  ImageIdField,
  NumberField,
} from "../fields";

export function parseContactCtaContentDefaults(
  content: JsonObject | undefined | null,
): ContactCtaContentValues {
  const raw = (content ?? {}) as unknown as Partial<ContactCtaContentValues>;
  return {
    badge: (raw.badge as string) ?? DEFAULT_CONTACT_CTA_CONTENT.badge,
    heading: (raw.heading as string) ?? DEFAULT_CONTACT_CTA_CONTENT.heading,
    description:
      (raw.description as string) ?? DEFAULT_CONTACT_CTA_CONTENT.description,
    primaryButton: {
      text: raw.primaryButton?.text ?? "",
      url: raw.primaryButton?.url ?? "",
    },
    secondaryButton: {
      text: raw.secondaryButton?.text ?? "",
      url: raw.secondaryButton?.url ?? "",
    },
    backgroundImageId: raw.backgroundImageId ?? null,
  };
}

export function parseContactCtaSettingsDefaults(
  settings: JsonObject | undefined | null,
): ContactCtaSettingsValues {
  const raw = (settings ?? {}) as unknown as Partial<ContactCtaSettingsValues>;
  return {
    overlayOpacity:
      raw.overlayOpacity ?? DEFAULT_CONTACT_CTA_SETTINGS.overlayOpacity,
  };
}

export function ContactCtaContentForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <TextField
        name="content.badge"
        label="Badge (Optional)"
        placeholder="e.g. Get In Touch"
        disabled={disabled}
      />
      <TextField
        name="content.heading"
        label="Heading"
        placeholder="e.g. Ready to get started?"
        disabled={disabled}
      />
      <TextareaField
        name="content.description"
        label="Description"
        placeholder="Supporting text"
        disabled={disabled}
      />
      <ButtonFields
        name="content.primaryButton"
        label="Primary Button"
        disabled={disabled}
      />
      <ButtonFields
        name="content.secondaryButton"
        label="Secondary Button"
        disabled={disabled}
      />
      <ImageIdField
        name="content.backgroundImageId"
        label="Background Image ID"
        disabled={disabled}
      />
    </div>
  );
}

export function ContactCtaSettingsForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground border-b pb-2">
        Background Settings
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          name="settings.overlayOpacity"
          label="Overlay Opacity (%)"
          placeholder="e.g. 50"
          disabled={disabled}
        />
      </div>
    </div>
  );
}

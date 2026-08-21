"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_CONTACT_CTA_CONTENT,
  type ContactCtaContentValues,
  DEFAULT_CONTACT_CTA_SETTINGS,
  type ContactCtaSettingsValues,
} from "../../schemas/contact-cta.schema";
import { TextField, TextareaField } from "../fields";
import { SettingsForm } from "./settings-form";

export function parseContactCtaContentDefaults(
  content: JsonObject | undefined | null,
): ContactCtaContentValues {
  const raw = (content ?? {}) as unknown as Partial<ContactCtaContentValues>;
  return {
    badge: (raw.badge as string) ?? DEFAULT_CONTACT_CTA_CONTENT.badge,
    heading: (raw.heading as string) ?? DEFAULT_CONTACT_CTA_CONTENT.heading,
    description:
      (raw.description as string) ?? DEFAULT_CONTACT_CTA_CONTENT.description,
    buttonText:
      (raw.buttonText as string) ?? DEFAULT_CONTACT_CTA_CONTENT.buttonText,
    buttonUrl:
      (raw.buttonUrl as string) ?? DEFAULT_CONTACT_CTA_CONTENT.buttonUrl,
  };
}

export function parseContactCtaSettingsDefaults(
  settings: JsonObject | undefined | null,
): ContactCtaSettingsValues {
  const raw = (settings ?? {}) as unknown as Partial<ContactCtaSettingsValues>;
  return {
    container: raw.container ?? DEFAULT_CONTACT_CTA_SETTINGS.container,
    background: raw.background ?? DEFAULT_CONTACT_CTA_SETTINGS.background,
    paddingTop: raw.paddingTop ?? DEFAULT_CONTACT_CTA_SETTINGS.paddingTop,
    paddingBottom:
      raw.paddingBottom ?? DEFAULT_CONTACT_CTA_SETTINGS.paddingBottom,
  };
}

export function ContactCtaContentForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <TextField
        name="content.badge"
        label="Badge"
        placeholder="e.g. SUBMIT A REQUEST"
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
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          name="content.buttonText"
          label="Submit Button Text"
          placeholder="e.g. Send Message"
          disabled={disabled}
        />
        <TextField
          name="content.buttonUrl"
          label="Submit Button URL (Optional Redirect)"
          placeholder="e.g. /thank-you"
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export function ContactCtaSettingsForm({ disabled }: { disabled?: boolean }) {
  return <SettingsForm disabled={disabled} />;
}

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
    privacyNote:
      (raw.privacyNote as string) ?? DEFAULT_CONTACT_CTA_CONTENT.privacyNote,
    buttonText:
      (raw.buttonText as string) ?? DEFAULT_CONTACT_CTA_CONTENT.buttonText,
    successMessage:
      (raw.successMessage as string) ??
      DEFAULT_CONTACT_CTA_CONTENT.successMessage,
    buttonUrl:
      (raw.buttonUrl as string) ?? DEFAULT_CONTACT_CTA_CONTENT.buttonUrl,
    map: raw.map ?? DEFAULT_CONTACT_CTA_CONTENT.map,
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
      <TextareaField
        name="content.privacyNote"
        label="Privacy Note"
        placeholder="e.g. Your details are kept confidential."
        disabled={disabled}
      />
      <TextField
        name="content.successMessage"
        label="Success Message"
        placeholder="e.g. Thank you for getting in touch!"
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

      <div className="pt-4 border-t border-border">
        <TextField
          name="content.map.embedUrl"
          label="Google Map Embed URL"
          placeholder="e.g. https://www.google.com/maps/embed?..."
          disabled={disabled}
        />
        <div className="mt-2 text-xs text-muted-foreground">
          Paste the src URL from the Google Maps iframe embed code.
        </div>
      </div>
    </div>
  );
}

export function ContactCtaSettingsForm({ disabled }: { disabled?: boolean }) {
  return <SettingsForm disabled={disabled} />;
}

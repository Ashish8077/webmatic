"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_CONTACT_CTA_CONTENT,
  type ContactCtaContentValues,
} from "../../schemas/contact-cta.schema";
import {
  TextField,
  TextareaField,
} from "../fields";

export function parseContactCtaContentDefaults(
  content: JsonObject | undefined | null,
): ContactCtaContentValues {
  const raw = (content ?? {}) as unknown as Partial<ContactCtaContentValues>;
  return {
    heading: (raw.heading as string) ?? DEFAULT_CONTACT_CTA_CONTENT.heading,
    description: (raw.description as string) ?? DEFAULT_CONTACT_CTA_CONTENT.description,
    privacyNote: (raw.privacyNote as string) ?? DEFAULT_CONTACT_CTA_CONTENT.privacyNote,
    buttonText: (raw.buttonText as string) ?? DEFAULT_CONTACT_CTA_CONTENT.buttonText,
    buttonUrl: (raw.buttonUrl as string) ?? DEFAULT_CONTACT_CTA_CONTENT.buttonUrl,
  };
}

export function ContactCtaContentForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
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

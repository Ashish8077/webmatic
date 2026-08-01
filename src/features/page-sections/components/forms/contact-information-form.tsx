"use client";

import { useFormContext } from "react-hook-form";
import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_CONTACT_INFORMATION_CONTENT,
  type ContactInformationContentValues,
  DEFAULT_CONTACT_INFORMATION_SETTINGS,
  type ContactInformationSettingsValues,
} from "../../schemas/contact-information.schema";
import { TextField, SwitchField } from "../fields";
import { RepeaterField } from "../fields/repeater-field";
import { SettingsForm } from "./settings-form";

export function parseContactInformationContentDefaults(
  content: JsonObject | undefined | null,
): ContactInformationContentValues {
  const raw = (content ?? {}) as unknown as Partial<ContactInformationContentValues>;
  return {
    items: Array.isArray(raw.items)
      ? raw.items
      : DEFAULT_CONTACT_INFORMATION_CONTENT.items,
  };
}

export function parseContactInformationSettingsDefaults(
  settings: JsonObject | undefined | null,
): ContactInformationSettingsValues {
  const raw = (settings ?? {}) as unknown as Partial<ContactInformationSettingsValues>;
  return {
    container: raw.container ?? DEFAULT_CONTACT_INFORMATION_SETTINGS.container,
    background: raw.background ?? DEFAULT_CONTACT_INFORMATION_SETTINGS.background,
    paddingTop: raw.paddingTop ?? DEFAULT_CONTACT_INFORMATION_SETTINGS.paddingTop,
    paddingBottom: raw.paddingBottom ?? DEFAULT_CONTACT_INFORMATION_SETTINGS.paddingBottom,
  };
}

export function ContactInformationContentForm({ disabled }: { disabled?: boolean }) {
  const form = useFormContext<ContactInformationContentValues>();

  return (
    <div className="space-y-5">
      <RepeaterField
        name="content.items"
        label="Contact Information Items"
        disabled={disabled}
        defaultItem={{
          label: "",
          value: "",
          icon: { type: "lucide", value: "MapPin" },
          href: "",
          openInNewTab: false,
          order: 0, // In standard implementation, order is managed by the repeater or backend, but we'll include it here
        }}
        renderItem={(index) => (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                name={`content.items.${index}.label`}
                label="Label"
                placeholder="e.g. Office, Phone, Email"
                disabled={disabled}
              />
              <TextField
                name={`content.items.${index}.value`}
                label="Value"
                placeholder="e.g. 123 Main St, +1 234 567 8900"
                disabled={disabled}
              />
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                name={`content.items.${index}.icon.value`}
                label="Icon Name (Lucide)"
                placeholder="e.g. MapPin, Phone, Mail"
                disabled={disabled}
              />
              <TextField
                name={`content.items.${index}.href`}
                label="Link (Optional)"
                placeholder="e.g. tel:+12345678900 or mailto:info@example.com"
                disabled={disabled}
              />
            </div>

            <SwitchField
              name={`content.items.${index}.openInNewTab`}
              label="Open in new tab"
              disabled={disabled}
            />
          </div>
        )}
      />
    </div>
  );
}

export function ContactInformationSettingsForm({ disabled }: { disabled?: boolean }) {
  return <SettingsForm disabled={disabled} />;
}

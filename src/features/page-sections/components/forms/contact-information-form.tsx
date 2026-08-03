"use client";

import { useFormContext } from "react-hook-form";
import type { JsonObject } from "@/shared/types/json";
import { hydrateMediaRelations } from "../../utils/media-utils";
import {
  DEFAULT_CONTACT_INFORMATION_CONTENT,
  type ContactInformationContentValues,
  DEFAULT_CONTACT_INFORMATION_SETTINGS,
  type ContactInformationSettingsValues,
} from "../../schemas/contact-information.schema";
import { TextField, SwitchField, TextareaField, VisualPickerField } from "../fields";
import { RepeaterField } from "../fields/repeater-field";
import { SettingsForm } from "./settings-form";

export function parseContactInformationContentDefaults(
  content: JsonObject | undefined | null,
): ContactInformationContentValues {
  const raw = (content ?? {}) as unknown as Partial<ContactInformationContentValues>;
  const parsed = {
    items: Array.isArray(raw.items)
      ? raw.items.map(item => ({
          title: item.title ?? "",
          value: item.value ?? "",
          visualType: item.visualType ?? "none",
          iconName: item.iconName ?? null,
          imageId: typeof item.imageId === "number" ? item.imageId : null,
          image: item.image ?? null,
          href: item.href ?? "",
          openInNewTab: item.openInNewTab ?? false,
          sortOrder: item.sortOrder ?? 0,
        }))
      : DEFAULT_CONTACT_INFORMATION_CONTENT.items,
  };
  return hydrateMediaRelations((content ?? {}) as JsonObject, parsed);
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
          title: "",
          value: "",
          visualType: "none",
          iconName: null,
          imageId: null,
          image: null,
          href: "",
          openInNewTab: false,
          sortOrder: 0,
        }}
        renderItem={(index) => (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                name={`content.items.${index}.title`}
                label="Title"
                placeholder="e.g. Office, Phone, Email"
                disabled={disabled}
              />
              <TextField
                name={`content.items.${index}.href`}
                label="Link (Optional)"
                placeholder="e.g. tel:+12345678900 or mailto:info@example.com"
                disabled={disabled}
              />
            </div>

            <TextareaField
              name={`content.items.${index}.value`}
              label="Value"
              placeholder="e.g. 123 Main St, +1 234 567 8900"
              disabled={disabled}
            />
            
            <VisualPickerField
              name={`content.items.${index}`}
              label="Contact Icon/Image"
              description="Select an icon or image for this contact method."
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                name={`content.items.${index}.sortOrder`}
                label="Sort Order"
                type="number"
                placeholder="0"
                disabled={disabled}
              />
              <div className="pt-8">
                <SwitchField
                  name={`content.items.${index}.openInNewTab`}
                  label="Open in new tab"
                  disabled={disabled}
                />
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}

export function ContactInformationSettingsForm({ disabled }: { disabled?: boolean }) {
  return <SettingsForm disabled={disabled} />;
}

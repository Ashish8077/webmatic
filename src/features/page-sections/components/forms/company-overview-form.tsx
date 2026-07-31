"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_COMPANY_OVERVIEW_CONTENT,
  type CompanyOverviewContentValues,
} from "../../schemas/company-overview.schema";
import {
  TextField,
  TextareaField,
} from "../fields";

export function parseCompanyOverviewContentDefaults(
  content: JsonObject | undefined | null,
): CompanyOverviewContentValues {
  const raw = (content ?? {}) as unknown as Partial<CompanyOverviewContentValues>;
  return {
    badge: (raw.badge as string) ?? DEFAULT_COMPANY_OVERVIEW_CONTENT.badge,
    heading: (raw.heading as string) ?? DEFAULT_COMPANY_OVERVIEW_CONTENT.heading,
    description: (raw.description as string) ?? DEFAULT_COMPANY_OVERVIEW_CONTENT.description,
    primaryButton: raw.primaryButton
      ? {
          text: raw.primaryButton.text ?? "",
          url: raw.primaryButton.url ?? "",
        }
      : DEFAULT_COMPANY_OVERVIEW_CONTENT.primaryButton,
    bottomText: raw.bottomText
      ? {
          supportingText: raw.bottomText.supportingText ?? "",
          linkText: raw.bottomText.linkText ?? "",
          linkUrl: raw.bottomText.linkUrl ?? "",
        }
      : DEFAULT_COMPANY_OVERVIEW_CONTENT.bottomText,
  };
}

export function CompanyOverviewContentForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <TextField
        name="content.badge"
        label="Badge"
        placeholder="e.g., GET TO KNOW US BETTER"
        disabled={disabled}
      />
      <TextField
        name="content.heading"
        label="Heading"
        placeholder="e.g., Driven by a Passion to Bring New Ideas to Life"
        disabled={disabled}
      />
      <TextareaField
        name="content.description"
        label="Description"
        placeholder="Write your company overview here..."
        disabled={disabled}
      />

      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-sm font-semibold mb-3">Primary Button</h3>
        <div className="grid grid-cols-2 gap-3">
          <TextField
            name="content.primaryButton.text"
            label="Button Text"
            placeholder="e.g., Speak With An Expert"
            disabled={disabled}
          />
          <TextField
            name="content.primaryButton.url"
            label="Button URL"
            placeholder="e.g., /contact"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-sm font-semibold mb-3">Bottom Text area</h3>
        <TextField
          name="content.bottomText.supportingText"
          label="Supporting Text"
          placeholder="e.g., We Serve our Clients' Best Interests with the Best Marketing Solutions."
          disabled={disabled}
        />
        <div className="grid grid-cols-2 gap-3 mt-3">
          <TextField
            name="content.bottomText.linkText"
            label="Link Text"
            placeholder="e.g., Find Out More"
            disabled={disabled}
          />
          <TextField
            name="content.bottomText.linkUrl"
            label="Link URL"
            placeholder="e.g., /services"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}




"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_TEAM_MEMBERS_CONTENT,
  type TeamMembersContentValues,
} from "../../schemas/team-members.schema";
import {
  TextField,
  TextareaField,
  RepeaterField,
  ImageIdField,
  NumberField,
} from "../fields";

type FormShape = { content: TeamMembersContentValues };

export function parseTeamMembersContentDefaults(
  content: JsonObject | undefined | null,
): TeamMembersContentValues {
  const raw = (content ?? {}) as unknown as Partial<TeamMembersContentValues>;
  return {
    badge: raw.badge ?? DEFAULT_TEAM_MEMBERS_CONTENT.badge,
    heading: raw.heading ?? DEFAULT_TEAM_MEMBERS_CONTENT.heading,
    description: raw.description ?? DEFAULT_TEAM_MEMBERS_CONTENT.description,
    members:
      raw.members?.map((m) => ({
        name: m.name ?? "",
        designation: m.designation ?? "",
        description: m.description ?? "",
        imageId: m.imageId ?? null,
        sortOrder: m.sortOrder ?? 0,
      })) ?? DEFAULT_TEAM_MEMBERS_CONTENT.members,
  };
}

export function TeamMembersContentForm({
  disabled,
}: {
  disabled?: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          name="content.badge"
          label="Badge"
          placeholder="e.g., OUR TEAM"
          disabled={disabled}
        />
        <TextField
          name="content.heading"
          label="Heading"
          placeholder="e.g., Meet the People Behind the Brand"
          disabled={disabled}
        />
      </div>
      <TextareaField
        name="content.description"
        label="Description"
        placeholder="Optional supporting text..."
        disabled={disabled}
      />

      <RepeaterField<FormShape>
        name="content.members"
        label="Team Members"
        disabled={disabled}
        defaultItem={{
          name: "",
          designation: "",
          description: "",
          imageId: null,
          sortOrder: 0,
        }}
        renderItem={(index) => (
          <div className="grid gap-4 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                name={`content.members.${index}.name`}
                label="Name"
                placeholder="e.g., John Doe"
                disabled={disabled}
              />
              <TextField
                name={`content.members.${index}.designation`}
                label="Designation"
                placeholder="e.g., CEO & Founder"
                disabled={disabled}
              />
            </div>
            <TextareaField
              name={`content.members.${index}.description`}
              label="Short Description"
              placeholder="Brief bio..."
              disabled={disabled}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageIdField
                name={`content.members.${index}.imageId`}
                label="Profile Image"
                disabled={disabled}
              />
              <NumberField
                name={`content.members.${index}.sortOrder`}
                label="Sort Order"
                disabled={disabled}
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}

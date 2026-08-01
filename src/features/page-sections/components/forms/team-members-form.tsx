"use client";

import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { JsonObject } from "@/shared/types/json";
import { hydrateMediaRelations } from "../../utils/media-utils";
import {
  DEFAULT_TEAM_MEMBERS_CONTENT,
  type TeamMembersContentValues,
} from "../../schemas/team-members.schema";
import {
  TextField,
  TextareaField,
  RepeaterField,
  MediaPickerField,
  NumberField,
} from "../fields";

type FormShape = { content: TeamMembersContentValues };

function TeamMemberImageField({
  index,
  disabled,
}: {
  index: number;
  disabled?: boolean;
}) {
  const { control, register, setValue } = useFormContext<FormShape>();
  const imageIdName = `content.members.${index}.imageId` as const;
  const visualTypeName = `content.members.${index}.visualType` as const;
  const iconNameName = `content.members.${index}.iconName` as const;
  const imageId = useWatch({ control, name: imageIdName });

  useEffect(() => {
    register(visualTypeName);
    register(iconNameName);
  }, [iconNameName, register, visualTypeName]);

  useEffect(() => {
    setValue(visualTypeName, imageId ? "image" : "none", {
      shouldDirty: false,
      shouldValidate: true,
      shouldTouch: false,
    });
    setValue(iconNameName, null, {
      shouldDirty: false,
      shouldValidate: true,
      shouldTouch: false,
    });
  }, [iconNameName, imageId, setValue, visualTypeName]);

  return (
    <MediaPickerField
      name={imageIdName}
      label="Profile Image"
      description="Select a profile image for this member."
      disabled={disabled}
    />
  );
}

export function parseTeamMembersContentDefaults(
  content: JsonObject | undefined | null,
): TeamMembersContentValues {
  const raw = (content ?? {}) as unknown as Partial<TeamMembersContentValues>;
  const parsed = {
    badge: raw.badge ?? DEFAULT_TEAM_MEMBERS_CONTENT.badge,
    heading: raw.heading ?? DEFAULT_TEAM_MEMBERS_CONTENT.heading,
    description: raw.description ?? DEFAULT_TEAM_MEMBERS_CONTENT.description,
    members:
      raw.members?.map((m) => ({
        name: m.name ?? "",
        designation: m.designation ?? "",
        description: m.description ?? "",
        visualType: m.visualType ?? "none",
        iconName: m.iconName ?? null,
        imageId: m.imageId ?? null,
        sortOrder: m.sortOrder ?? 0,
      })) ?? DEFAULT_TEAM_MEMBERS_CONTENT.members,
  };

  return hydrateMediaRelations((content ?? {}) as JsonObject, parsed);
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
          visualType: "none",
          iconName: null,
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
              <TeamMemberImageField index={index} disabled={disabled} />
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




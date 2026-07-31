"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_MISSION_VISION_CONTENT,
  type MissionVisionContentValues,
} from "../../schemas/mission-vision.schema";
import { TextField, TextareaField } from "../fields";

export function parseMissionVisionContentDefaults(
  content: JsonObject | undefined | null,
): MissionVisionContentValues {
  const raw = (content ?? {}) as unknown as Partial<MissionVisionContentValues>;
  return {
    missionTitle:
      raw.missionTitle ?? DEFAULT_MISSION_VISION_CONTENT.missionTitle,
    missionDescription:
      raw.missionDescription ??
      DEFAULT_MISSION_VISION_CONTENT.missionDescription,
    visionTitle:
      raw.visionTitle ?? DEFAULT_MISSION_VISION_CONTENT.visionTitle,
    visionDescription:
      raw.visionDescription ??
      DEFAULT_MISSION_VISION_CONTENT.visionDescription,
  };
}

export function MissionVisionContentForm({
  disabled,
}: {
  disabled?: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="pt-2 border-t border-slate-100">
        <h3 className="text-sm font-semibold mb-3">Mission</h3>
        <div className="space-y-4">
          <TextField
            name="content.missionTitle"
            label="Mission Title"
            placeholder="e.g., Our Mission"
            disabled={disabled}
          />
          <TextareaField
            name="content.missionDescription"
            label="Mission Description"
            placeholder="Describe your company's mission..."
            disabled={disabled}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-sm font-semibold mb-3">Vision</h3>
        <div className="space-y-4">
          <TextField
            name="content.visionTitle"
            label="Vision Title"
            placeholder="e.g., Our Vision"
            disabled={disabled}
          />
          <TextareaField
            name="content.visionDescription"
            label="Vision Description"
            placeholder="Describe your company's vision..."
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}




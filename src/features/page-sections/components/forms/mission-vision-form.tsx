"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_MISSION_VISION_CONTENT,
  type MissionVisionContentValues,
} from "../../schemas/mission-vision.schema";
import { TextField, TextareaField, VisualPickerField } from "../fields";
import { hydrateMediaRelations } from "../../utils/media-utils";

export function parseMissionVisionContentDefaults(
  content: JsonObject | undefined | null,
): MissionVisionContentValues {
  const raw = (content ?? {}) as any;
  
  // Normalize legacy data into the current domain model in-memory
  const mission = raw.mission ?? {
    title: raw.missionTitle ?? DEFAULT_MISSION_VISION_CONTENT.mission.title,
    description: raw.missionDescription ?? DEFAULT_MISSION_VISION_CONTENT.mission.description,
    visual: DEFAULT_MISSION_VISION_CONTENT.mission.visual,
  };

  const vision = raw.vision ?? {
    title: raw.visionTitle ?? DEFAULT_MISSION_VISION_CONTENT.vision.title,
    description: raw.visionDescription ?? DEFAULT_MISSION_VISION_CONTENT.vision.description,
    visual: DEFAULT_MISSION_VISION_CONTENT.vision.visual,
  };

  const parsed = { mission, vision };
  
  // Hydrate to ensure existing image selections are populated for the visual fields
  return hydrateMediaRelations(raw as JsonObject, parsed);
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
            name="content.mission.title"
            label="Mission Title"
            placeholder="e.g., Our Mission"
            disabled={disabled}
          />
          <TextareaField
            name="content.mission.description"
            label="Mission Description"
            placeholder="Describe your company's mission..."
            disabled={disabled}
          />
          <VisualPickerField 
            name="content.mission.visual" 
            label="Mission Visual Asset" 
            disabled={disabled} 
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-sm font-semibold mb-3">Vision</h3>
        <div className="space-y-4">
          <TextField
            name="content.vision.title"
            label="Vision Title"
            placeholder="e.g., Our Vision"
            disabled={disabled}
          />
          <TextareaField
            name="content.vision.description"
            label="Vision Description"
            placeholder="Describe your company's vision..."
            disabled={disabled}
          />
          <VisualPickerField 
            name="content.vision.visual" 
            label="Vision Visual Asset" 
            disabled={disabled} 
          />
        </div>
      </div>
    </div>
  );
}

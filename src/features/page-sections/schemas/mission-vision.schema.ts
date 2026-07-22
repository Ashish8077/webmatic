import { z } from "zod";

export const missionVisionContentSchema = z.object({
  missionTitle: z.string().min(1, "Mission title is required"),
  missionDescription: z.string().min(1, "Mission description is required"),
  visionTitle: z.string().min(1, "Vision title is required"),
  visionDescription: z.string().min(1, "Vision description is required"),
});

export type MissionVisionContentValues = z.infer<
  typeof missionVisionContentSchema
>;

export const DEFAULT_MISSION_VISION_CONTENT: MissionVisionContentValues = {
  missionTitle: "Our Mission",
  missionDescription: "",
  visionTitle: "Our Vision",
  visionDescription: "",
};

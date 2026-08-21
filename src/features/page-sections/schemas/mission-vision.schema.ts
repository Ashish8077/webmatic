import { z } from "zod";
import { visualAssetSchema } from "@/shared/schemas/visual-asset.schema";

export const DEFAULT_MISSION_ICON = {
  visualType: "icon" as const,
  iconName: "Target",
  imageId: null,
  image: null,
};

export const DEFAULT_VISION_ICON = {
  visualType: "icon" as const,
  iconName: "Eye",
  imageId: null,
  image: null,
};

export const missionVisionContentSchema = z.object({
  mission: z.object({
    title: z.string().min(1, "Mission title is required"),
    description: z.string().min(1, "Mission description is required"),
    visual: visualAssetSchema.default(DEFAULT_MISSION_ICON),
  }),
  vision: z.object({
    title: z.string().min(1, "Vision title is required"),
    description: z.string().min(1, "Vision description is required"),
    visual: visualAssetSchema.default(DEFAULT_VISION_ICON),
  }),
});

export type MissionVisionContentValues = z.infer<
  typeof missionVisionContentSchema
>;

export const DEFAULT_MISSION_VISION_CONTENT: MissionVisionContentValues = {
  mission: {
    title: "Our Mission",
    description: "",
    visual: DEFAULT_MISSION_ICON,
  },
  vision: {
    title: "Our Vision",
    description: "",
    visual: DEFAULT_VISION_ICON,
  },
};

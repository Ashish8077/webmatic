import { z } from "zod";
import { visualAssetSchema } from "@/shared/schemas/visual-asset.schema";

export const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Designation is required"),
  description: z.string().optional().default(""),
  visualType: visualAssetSchema.shape.visualType,
  iconName: visualAssetSchema.shape.iconName,
  imageId: visualAssetSchema.shape.imageId,
  sortOrder: z.number().optional().default(0),
}).superRefine((data, ctx) => {
  if (data.visualType === "none" && (data.iconName !== null || data.imageId !== null)) {
    ctx.addIssue({ code: "custom", path: ["visualType"], message: "Invalid visual asset configuration." });
  }
  if (data.visualType === "icon" && (data.iconName === null || data.imageId !== null)) {
    ctx.addIssue({ code: "custom", path: ["visualType"], message: "Invalid visual asset configuration." });
  }
  if (data.visualType === "image" && (data.imageId === null || data.iconName !== null)) {
    ctx.addIssue({ code: "custom", path: ["visualType"], message: "Invalid visual asset configuration." });
  }
});

export const teamMembersContentSchema = z.object({
  badge: z.string().optional().default(""),
  heading: z.string().min(1, "Heading is required"),
  description: z.string().optional().default(""),
  members: z.array(teamMemberSchema).min(1, "At least one member is required"),
});

export type TeamMemberValues = z.infer<typeof teamMemberSchema>;
export type TeamMembersContentValues = z.infer<typeof teamMembersContentSchema>;

export const DEFAULT_TEAM_MEMBERS_CONTENT: TeamMembersContentValues = {
  badge: "OUR TEAM",
  heading: "Meet the People Behind the Brand",
  description: "",
  members: [
    {
      name: "",
      designation: "",
      description: "",
      visualType: "none",
      iconName: null,
      imageId: null,
      sortOrder: 0,
    },
  ],
};

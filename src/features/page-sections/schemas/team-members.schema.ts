import { z } from "zod";

export const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Designation is required"),
  description: z.string().optional().default(""),
  imageId: z.number().nullable().optional(),
  sortOrder: z.number().optional().default(0),
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
      imageId: null,
      sortOrder: 0,
    },
  ],
};

import { z } from "zod";

export const DESTINATION_TYPES = [
  "page",
  "service",
  "external",
  "group",
  "separator",
  "heading",
] as const;

export type DestinationType = (typeof DESTINATION_TYPES)[number];

export const menuItemFormSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").max(255),
    destinationType: z.enum(DESTINATION_TYPES),
    destinationId: z.number().nullable().optional(),
    destinationUrl: z.string().nullable().optional(),
    parentId: z.number().nullable().optional(),
    isActive: z.boolean().default(true),
  })
  .superRefine((data, ctx) => {
    if (data.destinationType === "page" || data.destinationType === "service") {
      if (!data.destinationId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Target ${data.destinationType} is required`,
          path: ["destinationId"],
        });
      }
    }

    if (data.destinationType === "external") {
      if (!data.destinationUrl) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "URL is required",
          path: ["destinationUrl"],
        });
      }
    }
  });

export type MenuItemFormValues = z.infer<typeof menuItemFormSchema>;

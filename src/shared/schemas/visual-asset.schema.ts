import { z } from "zod";
import { emptyStringToNull } from "../utils/validators/zod-helpers";

export const visualAssetSchema = z
  .object({
    visualType: z.enum(["none", "icon", "image"]).default("none"),
    iconName: emptyStringToNull(100).default(null),
    imageId: z.number().int().positive().nullable().default(null),
  })
  .refine(
    (data) => {
      if (data.visualType === "none") {
        return data.iconName === null && data.imageId === null;
      }
      if (data.visualType === "icon") {
        return data.iconName !== null && data.imageId === null;
      }
      if (data.visualType === "image") {
        return data.imageId !== null && data.iconName === null;
      }
      return false;
    },
    {
      message: "Invalid visual asset configuration.",
      path: ["visualType"],
    }
  );

export type VisualAssetDTO = z.infer<typeof visualAssetSchema>;

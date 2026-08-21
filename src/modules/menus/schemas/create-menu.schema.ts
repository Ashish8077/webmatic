import { z } from "zod";
import { MENU_LOCATIONS } from "../constants/menu.constants";

export const createMenuSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255),
  location: z.enum([MENU_LOCATIONS.HEADER, MENU_LOCATIONS.FOOTER] as const),
  isActive: z.boolean().default(true),
});

export type CreateMenuDTO = z.infer<typeof createMenuSchema>;

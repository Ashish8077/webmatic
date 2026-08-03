import { z } from "zod";
import { createMenuItemBaseSchema } from "./create-menu-item.schema";

export const updateMenuItemSchema = createMenuItemBaseSchema.partial();

export type UpdateMenuItemDTO = z.infer<typeof updateMenuItemSchema>;

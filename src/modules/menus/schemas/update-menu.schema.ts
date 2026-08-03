import { z } from "zod";
import { createMenuSchema } from "./create-menu.schema";

export const updateMenuSchema = createMenuSchema.partial();

export type UpdateMenuDTO = z.infer<typeof updateMenuSchema>;

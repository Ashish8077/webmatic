import { z } from "zod";
import { headerSettingsSchema } from "../schemas/header.schema";

export type HeaderSettings = z.infer<typeof headerSettingsSchema>;

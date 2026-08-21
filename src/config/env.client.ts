import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().default(""),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
});

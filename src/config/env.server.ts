import { loadEnvConfig } from "@next/env";
import { z } from "zod";

loadEnvConfig(process.cwd());

const envSchema = z.object({
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number(),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string().min(1),

  SUPER_ADMIN_FIRST_NAME: z.string().min(1),
  SUPER_ADMIN_LAST_NAME: z.string().min(1),
  SUPER_ADMIN_EMAIL: z.email(),
  SUPER_ADMIN_PASSWORD: z.string().min(8),

  JWT_ACCESS_SECRET: z.string().min(1),
  JWT_ACCESS_EXPIRES_IN: z.string().min(1),

  JWT_REFRESH_SECRET: z.string().min(1),
  JWT_REFRESH_EXPIRES_IN: z.string().min(1),
  REFRESH_TOKEN_DAYS: z.coerce.number(),
  NODE_ENV: z.enum(["development", "production"]),

  SMTP_HOST: z.string().default(""),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().default(""),
  SMTP_PASSWORD: z.string().default(""),
  SMTP_FROM: z.string().default(""),
  EMAIL_FROM_NAME: z.string().min(1).default("System"),
  EMAIL_REPLY_TO: z.string().optional(),
  ADMIN_EMAIL: z.string().default(""),

  RECAPTCHA_SECRET_KEY: z.string().default(""),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(5),
});

export const env = envSchema.parse(process.env);

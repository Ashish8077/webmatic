import { z } from "zod";
import {
  requiredString,
  optionalString,
} from "./common.schema";
import type { JsonObject } from "@/shared/types/json";

// ─── Portfolio content schema ─────────────────────────────────────────────────

export const portfolioContentSchema = z.object({
  badge: optionalString().catch(""),
  heading: requiredString("Heading"),
  highlight: optionalString(100).catch(""),
  description: optionalString(500).catch(""),
});

export type PortfolioContentValues = z.infer<typeof portfolioContentSchema>;

export const DEFAULT_PORTFOLIO_CONTENT: PortfolioContentValues = {
  badge: "Featured Work",
  heading: "Our Portfolio",
  highlight: "",
  description: "",
};

export function parsePortfolioContentDefaults(
  content: JsonObject | undefined | null,
): PortfolioContentValues {
  if (!content) return DEFAULT_PORTFOLIO_CONTENT;
  const parsed = portfolioContentSchema.safeParse(content);
  return parsed.success ? parsed.data : DEFAULT_PORTFOLIO_CONTENT;
}

// ─── Portfolio settings schema ────────────────────────────────────────────────

export const portfolioSettingsSchema = z.object({});

export type PortfolioSettingsValues = z.infer<typeof portfolioSettingsSchema>;

export const DEFAULT_PORTFOLIO_SETTINGS: PortfolioSettingsValues = {};

export function parsePortfolioSettingsDefaults(): PortfolioSettingsValues {
  return DEFAULT_PORTFOLIO_SETTINGS;
}

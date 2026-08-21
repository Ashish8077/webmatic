import { str } from "@/components/home/content-helpers";
import type { ContactCtaContent } from "./types";

export function normalizeContactCtaContent(
  raw: Record<string, unknown>,
): ContactCtaContent {
  const mapData = raw.map as Record<string, unknown> | undefined;
  
  return {
    badge: str(raw.badge, "SUBMIT A REQUEST"),
    heading: str(raw.heading, "Ready to start your next project?"),
    description: str(raw.description),
    buttonText: str(raw.buttonText, "Request a Demo"),
    buttonUrl: str(raw.buttonUrl),
    map: mapData?.embedUrl ? { embedUrl: String(mapData.embedUrl) } : null,
  };
}

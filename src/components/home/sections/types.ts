// ─── Shared types consumed by every section component ─────────────────────────

/**
 * Common props contract that SectionRenderer passes to each section component.
 * Every section component must accept this shape.
 */
export interface SectionProps {
  content: Record<string, unknown>;
  settings?: Record<string, unknown> | null;
  pageTitle?: string;
}

/**
 * Reusable CMS button shape stored in the database JSON.
 * Used across hero slides, about cards, and any future section that has
 * `{ text, url }` button entries in its CMS content.
 */
export interface RawCMSButton {
  text: string;
  url: string;
}

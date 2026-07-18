import type { RawCMSSlide, RawHeroContent, SlideType } from "./hero.types";

// ─── Normalizer ───────────────────────────────────────────────────────────────

/**
 * Transforms the raw CMS JSON stored in the database into the clean
 * `SlideType[]` that every hero sub-component consumes.
 *
 * This is the **single place** that maps the CMS schema to the UI contract.
 * If the CMS content shape changes, only this file needs updating.
 */

function normaliseSlide(raw: RawCMSSlide, index: number): SlideType {
  return {
    id: index + 1,
    label: raw.badge ?? "",
    heading: raw.headline ?? "",
    highlight: raw.highlight ?? "",
    subheadline: raw.subheadline ?? "",
    primaryButton: {
      text: raw.primaryButton?.text ?? "",
      to: raw.primaryButton?.url ?? "#",
    },
    secondaryButton: {
      text: raw.secondaryButton?.text ?? "",
      to: raw.secondaryButton?.url ?? "#",
    },
    backgroundImageId: raw.backgroundImageId ?? null,
  };
}

export function normaliseHeroSlides(
  content: Record<string, unknown>,
): SlideType[] {
  const raw = content as unknown as RawHeroContent;

  if (!raw?.slides || !Array.isArray(raw.slides)) {
    return [];
  }

  return raw.slides.map(normaliseSlide);
}

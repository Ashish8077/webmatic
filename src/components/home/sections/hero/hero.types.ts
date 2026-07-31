import type { RawCMSButton } from "../types";

// ─── UI-facing types (used by all hero sub-components) ────────────────────────

export interface SlideCTA {
  to: string;
  text: string;
}

export interface SlideType {
  id: number;
  label: string;
  heading: string;
  highlight: string;
  subheadline: string;
  primaryButton: SlideCTA;
  secondaryButton: SlideCTA;
  backgroundImageId: number | null;
  backgroundImage?: any | null;
}

// ─── Raw CMS types (match the JSON stored in the database) ────────────────────

export interface RawCMSSlide {
  badge: string;
  headline: string;
  highlight: string;
  subheadline: string;
  primaryButton: RawCMSButton;
  secondaryButton: RawCMSButton;
  backgroundImageId: number | null;
  backgroundImage?: any | null; // Using any or Media type depending on what frontend uses
}

export interface RawHeroContent {
  slides: RawCMSSlide[];
}


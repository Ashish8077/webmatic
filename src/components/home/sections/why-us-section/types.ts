import { RawCMSButton } from "../types";
import type { Media } from "@/features/media/types";

export interface RawWhyUsReason {
  key: string;
  title: string;
  description: string;
  button: RawCMSButton;
  visualType?: "none" | "icon" | "image";
  iconName?: string | null;
  imageId?: number | null;
  image?: Media | null;
}

export interface RawWhyUsContent {
  badge: string;
  heading: string;
  highlight: string;
  description: string;
  learnMoreButton: RawCMSButton;
  reasons: RawWhyUsReason[];
  bottomText: string;
  primaryButton: RawCMSButton;
}

export interface WhyUsReason {
  key: string;
  title: string;
  description: string;
  button: {
    to: string;
    text: string;
  };
  visualType?: "none" | "icon" | "image";
  iconName?: string | null;
  imageId?: number | null;
  image?: Media | null;
}

export interface WhyUsContent {
  badge: string;
  heading: string;
  highlight: string;
  description: string;
  learnMoreButton: {
    text: string;
    to: string;
  };
  reasons: WhyUsReason[];
  bottomText: string;
  primaryButton: {
    text: string;
    to: string;
  };
}

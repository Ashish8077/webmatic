import type { RawCMSButton } from "../types";
import type { Media } from "@/features/media/types";

export type CardItem = {
  badge: string;
  title: string;
  button: RawCMSButton;
  imageId: number | null;
  image?: Media | null;
  description: string;
};

export type AboutType = {
  badge: string;
  heading: string;
  highlight: string;
  description: string;
  bottomText: string;
  primaryButton: RawCMSButton;
  learnMoreButton: RawCMSButton;
  cards: CardItem[];
};
export interface RawAboutContent {
  badge: string;
  heading: string;
  highlight: string;
  description: string;
  primaryButton: RawCMSButton;
  learnMoreButton: RawCMSButton;
  bottomText: string;
  cards: CardItem[];
}

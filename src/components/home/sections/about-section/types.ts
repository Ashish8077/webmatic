import type { RawCMSButton } from "../types";

export type CardItem = {
  badge: string;
  title: string;
  button: RawCMSButton;
  imageId: number | null;
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

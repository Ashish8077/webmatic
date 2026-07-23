import { RawCMSButton } from "@/components/home/sections/types";

export interface CardItem {
  key: string;
  title: string;
  description: string;
  imageId: number | null;
  slug: string;
  ctaButtonText?: string | null;
}

export interface RawServiceContent {
  badge: string;
  heading: string;
  highlight: string;
  viewAllButton?: RawCMSButton;
  services: CardItem[];
  bottomText?: string;
  primaryButton?: RawCMSButton;
}

export interface ServiceButton {
  text: string;
  to: string;
}

export interface ServiceCard {
  key: string;
  title: string;
  description: string;
  imageId: number | null;
  slug: string;
  ctaButtonText?: string | null;
}

export interface ServiceContent {
  badge: string;
  heading: string;
  highlight: string;
  viewAllButton?: ServiceButton;
  services: ServiceCard[];
  bottomText?: string;
  primaryButton?: ServiceButton;
}

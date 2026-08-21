import { RawCMSButton } from "@/components/home/sections/types";

export interface RawServiceContent {
  badge: string;
  heading: string;
  highlight: string;
  viewAllButton?: RawCMSButton;
  bottomText?: string;
  primaryButton?: RawCMSButton;
}

export interface ServiceButton {
  text: string;
  to: string;
}

export interface ServiceContent {
  badge: string;
  heading: string;
  highlight: string;
  viewAllButton?: ServiceButton;
  bottomText?: string;
  primaryButton?: ServiceButton;
}

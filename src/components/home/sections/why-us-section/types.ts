import { RawCMSButton } from "../types";

export interface RawWhyUsReason {
  key: string;
  title: string;
  description: string;
  button: RawCMSButton;
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

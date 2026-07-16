export interface ButtonLink {
  text: string;
  to: string;
}

export interface RawFaqItem {
  question: string;
  answer: string;
}

export interface RawFaqContent {
  badge: string;
  heading: string;
  highlight: string;
  description: string;
  items: RawFaqItem[];
  bottomText: string;
  primaryButton: {
    text: string;
    url: string;
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  badge: string;
  heading: string;
  highlight: string;
  description: string;
  items: FaqItem[];
  bottomText: string;
  primaryButton: ButtonLink;
}

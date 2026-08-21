export interface ContactCtaContent {
  badge: string;
  heading: string;
  description?: string;
  buttonText: string;
  buttonUrl?: string;
  map?: { embedUrl: string } | null;
}

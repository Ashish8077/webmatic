export interface ContactCtaContent {
  badge: string;
  heading: string;
  description?: string;
  privacyNote?: string;
  successMessage: string;
  buttonText: string;
  buttonUrl?: string;
  map?: {
    embedUrl?: string;
  };
}

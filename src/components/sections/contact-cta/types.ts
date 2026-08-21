import type { ContactFormData } from "@/features/contact";

export interface ContactCtaProps {
  badge?: string;
  heading?: string;
  description?: string;
  privacyNote?: string;
  successMessage?: string;
  submitButtonText?: string;
  submitButtonUrl?: string;
  map?: {
    embedUrl?: string;
  };
  backgroundVariant?: "white" | "slate" | "green" | string;
  containerVariant?: "default" | "full" | string;
  paddingTop?: string;
  paddingBottom?: string;
  className?: string;
  showCompanyField?: boolean;
  showMessageField?: boolean;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

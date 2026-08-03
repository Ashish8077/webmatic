import type { ContactFormData } from "@/features/contact";

export interface ContactCtaProps {
  badge?: string;
  heading?: string;
  description?: string;
  privacyNote?: string;
  successMessage?: string;
  trustPoints?: string[];
  formTitle?: string;
  submitButtonText?: string;
  backgroundVariant?: "white" | "slate" | "green" | string;
  containerVariant?: "default" | "full" | string;
  paddingTop?: string;
  paddingBottom?: string;
  map?: {
    embedUrl?: string;
  };
  showBadge?: boolean;
  showCompanyField?: boolean;
  showMessageField?: boolean;
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

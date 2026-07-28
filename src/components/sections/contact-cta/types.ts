import type { ContactFormData } from "@/features/contact";

export interface ContactCtaProps {
  badge?: string;
  heading?: string;
  description?: string;
  privacyNote?: string;
  trustPoints?: string[];
  formTitle?: string;
  submitButtonText?: string;
  backgroundVariant?: "white" | "slate" | "green";
  showBadge?: boolean;
  showCompanyField?: boolean;
  showServiceField?: boolean;
  showMessageField?: boolean;
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

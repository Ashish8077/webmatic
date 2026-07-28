import { SectionProps } from "../types";
import {
  normaliseContactCtaContent,
} from "./mapper";
import { ContactCta } from "@/components/sections/contact-cta";

export function ContactCtaSection({ content }: SectionProps) {
  const data = normaliseContactCtaContent(content);

  return (
    <ContactCta
      heading={data.heading}
      description={data.description}
      privacyNote={data.privacyNote}
      submitButtonText={data.buttonText}
      backgroundVariant="slate"
      showCompanyField={true}
      showServiceField={true}
      showMessageField={true}
    />
  );
}

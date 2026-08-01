import { SectionProps } from "../types";
import {
  normaliseContactCtaContent,
} from "./mapper";
import { ContactCta } from "@/components/sections/contact-cta";

export function ContactCtaSection({ content, settings }: SectionProps) {
  const data = normaliseContactCtaContent(content);

  const paddingTop = typeof settings?.paddingTop === "string" ? settings.paddingTop : "xl";
  const paddingBottom = typeof settings?.paddingBottom === "string" ? settings.paddingBottom : "xl";
  const background = typeof settings?.background === "string" ? settings.background : "white";
  const container = typeof settings?.container === "string" ? settings.container : "default";

  return (
    <ContactCta
      badge={data.badge}
      heading={data.heading}
      description={data.description}
      privacyNote={data.privacyNote}
      successMessage={data.successMessage}
      submitButtonText={data.buttonText}
      map={data.map}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      backgroundVariant={background}
      containerVariant={container}
      showCompanyField={true}
      showMessageField={true}
    />
  );
}

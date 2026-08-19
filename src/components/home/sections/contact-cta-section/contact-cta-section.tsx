import { SectionProps } from "../types";
import { normalizeContactCtaContent } from "./mapper";
import { ContactCta } from "@/components/sections/contact-cta";
import { ContactMapCta } from "@/components/sections/contact-cta/contact-map-cta";
import { siteSettingsService } from "@/modules/site-settings/services/site-settings.service";

export async function ContactCtaSection({ content, settings }: SectionProps) {
  const data = normalizeContactCtaContent(content);
  const globalSettings = await siteSettingsService.getPublicContactSettings();

  const paddingTop = typeof settings?.paddingTop === "string" ? settings.paddingTop : "xl";
  const paddingBottom = typeof settings?.paddingBottom === "string" ? settings.paddingBottom : "xl";
  const background = typeof settings?.background === "string" ? settings.background : "white";
  const container = typeof settings?.container === "string" ? settings.container : "default";

  if (data.map?.embedUrl) {
    return (
      <ContactMapCta
        badge={data.badge}
        heading={data.heading}
        description={data.description}
        privacyNote={globalSettings.form.privacyNote}
        successMessage={globalSettings.form.successMessage}
        submitButtonText={data.buttonText}
        map={data.map}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        backgroundVariant={background}
        containerVariant={container}
        showCompanyField={false}
        showMessageField={true}
      />
    );
  }

  return (
    <ContactCta
      badge={data.badge}
      heading={data.heading}
      description={data.description}
      privacyNote={globalSettings.form.privacyNote}
      successMessage={globalSettings.form.successMessage}
      submitButtonText={data.buttonText}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      backgroundVariant={background}
      containerVariant={container}
      showCompanyField={false}
      showMessageField={true}
    />
  );
}

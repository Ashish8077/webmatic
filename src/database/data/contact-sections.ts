import { PageSectionType } from "@/modules/pages-section/constants/page-section-types";

export const contactSections: {
  sectionType: PageSectionType;
  sortOrder: number;
  content: Record<string, unknown>;
  settings: Record<string, unknown>;
}[] = [
  {
    sectionType: "about-hero",
    sortOrder: 0,
    content: {
      badge: "CONTACT US",
      heading: "Drop us a line and let's talk.",
      description: "Fill out this form and tell us a little about your business.\nWe'll get back to you within two business days.",
      imageId: null,
    },
    settings: {
      isVisible: true,
      container: "default",
      background: "slate",
    },
  },
  {
    sectionType: "contact-information",
    sortOrder: 1,
    content: {
      items: [
        {
          label: "Office 1",
          value: "1st Floor, C-164,\nSector-63,\nNoida-201301",
          icon: { type: "lucide", value: "MapPin" },
          href: "https://maps.google.com/?q=Sector+63+Noida",
          openInNewTab: true,
        },
        {
          label: "Office 2",
          value: "E-38,\nSector-63,\nNoida-201301",
          icon: { type: "lucide", value: "MapPin" },
          href: "https://maps.google.com/?q=Sector+63+Noida",
          openInNewTab: true,
        },
        {
          label: "Phone",
          value: "+91-9289960836",
          icon: { type: "lucide", value: "Phone" },
          href: "tel:+919289960836",
          openInNewTab: false,
        },
        {
          label: "Email",
          value: "info@webmatictechnology.com",
          icon: { type: "lucide", value: "Mail" },
          href: "mailto:info@webmatictechnology.com",
          openInNewTab: false,
        },
      ],
    },
    settings: {
      isVisible: true,
      container: "default",
      background: "white",
      paddingTop: "xl",
      paddingBottom: "xl",
    },
  },
  {
    sectionType: "contact-cta",
    sortOrder: 2,
    content: {
      badge: "SUBMIT A REQUEST",
      heading: "Give us a Call, send us an Email, or fill out the Form below.",
      description: "Tell us about your project and our team will contact you shortly.",
      successMessage: "Thank you for getting in touch! We will get back to you within two business days.",
      buttonText: "Send Message",
      map: {
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.384501633534!2d77.37894981112832!3d28.626888427771746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce545a90710cb%3A0xc6651ec3bd201dcc!2sSector%2063%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1707204592038!5m2!1sen!2sin",
      },
    },
    settings: {
      isVisible: true,
      container: "default",
      background: "white",
      paddingTop: "xl",
      paddingBottom: "xl",
    },
  },
];

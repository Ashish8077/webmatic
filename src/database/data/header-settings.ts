export const defaultHeaderSettings = {
  logo: {
    imageId: null,
    altText: "Webmatic Technology",
  },
  contactInfo: {
    phone: {
      number: "+91-9289351703",
      url: "tel:+919289351703",
    },
    email: {
      address: "info@webmatictechnology.com",
      url: "mailto:info@webmatictechnology.com",
    },
  },
  socialLinks: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/webmatictechnologyofficial",
      enabled: true,
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/webmatictechnology/",
      enabled: true,
    },
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/company/webmatic-technology-ltd",
      enabled: true,
    },
  ],
  cta: {
    label: "Get in Touch",
    destinationType: "page",
    referenceId: 5, // Contact page ID
    url: null,
  },
  visibility: {
    topBar: true,
    phone: true,
    email: true,
    social: true,
  },
};

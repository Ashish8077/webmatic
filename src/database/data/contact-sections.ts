export const contactSections = [
  {
    sectionType: "hero",
    sortOrder: 0,
    content: {
      headline: "",
      subheadline: "",
      backgroundImageId: null,
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "contact-information",
    sortOrder: 1,
    content: {
      heading: "",
      description: "",
      address: "",
      phone: "",
      email: "",
      workingHours: "",
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "contact-form",
    sortOrder: 2,
    content: {
      heading: "",
      description: "",
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "map",
    sortOrder: 3,
    content: {
      heading: "",
      embedUrl: "",
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "faq",
    sortOrder: 4,
    content: {
      heading: "",
      items: [],
    },
    settings: {
      isVisible: true,
    },
  },
] as const;

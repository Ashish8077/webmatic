export const homeSections = [
  {
    sectionType: "hero",
    sortOrder: 0,
    content: {
      headline: "",
      subheadline: "",
      primaryButtonText: "",
      primaryButtonUrl: "",
      secondaryButtonText: "",
      secondaryButtonUrl: "",
      backgroundImageId: null,
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "about",
    sortOrder: 1,
    content: {
      heading: "",
      subheading: "",
      description: "",
      imageId: null,
      buttonText: "",
      buttonUrl: "",
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "services",
    sortOrder: 2,
    content: {
      heading: "",
      subheading: "",
      description: "",
      buttonText: "",
      buttonUrl: "",
      featuredOnly: true,
      limit: 6,
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "why_choose_us",
    sortOrder: 3,
    content: {
      heading: "",
      subheading: "",
      description: "",
      items: [],
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "testimonials",
    sortOrder: 4,
    content: {
      heading: "",
      subheading: "",
      description: "",
      limit: 6,
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "faq",
    sortOrder: 5,
    content: {
      heading: "",
      subheading: "",
      description: "",
      items: [],
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "contact_cta",
    sortOrder: 6,
    content: {
      heading: "",
      description: "",
      primaryButtonText: "",
      primaryButtonUrl: "",
      secondaryButtonText: "",
      secondaryButtonUrl: "",
      backgroundImageId: null,
    },
    settings: {
      isVisible: true,
    },
  },
] as const;

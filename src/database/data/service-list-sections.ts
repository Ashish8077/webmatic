export const serviceListSections = [
  {
    sectionType: "services-hero",
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
    sectionType: "services",
    sortOrder: 2,
    content: {
      badge: "WHAT WE DO",
      heading: "We Believe in Building Strong Brands and",
      highlight: "Integrated Strategies.",
      viewAllButton: null,
      bottomText: null,
      primaryButton: null,
    },
    settings: null,
  },

  {
    sectionType: "testimonials",
    sortOrder: 3,
    content: {
      badge: "TESTIMONIALS",
      heading: "What Our Clients Say",
      description: "Don't just take our word for it.",
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "development-process",
    sortOrder: 4,
    content: {
      badge: "OUR DEVELOPMENT PROCESS",
      heading: "Focusing on the 3 key elements of any successful ",
      highlight: "marketing strategy.",
      steps: [
        {
          key: "creative",
          title: "1. Creative",
          description:
            "Create thumb-stopping ads that capture your prospects attention and get them interested in what you have to offer.",
          visualType: "icon",
          iconName: "PenTool",
          imageId: null,
        },
        {
          key: "targeting",
          title: "2. Targeting",
          description:
            "Find your customers online, drive them to your website & then bring them back again with well designed retargeting ads.",
          visualType: "icon",
          iconName: "Target",
          imageId: null,
        },
        {
          key: "optimisation",
          title: "3. Optimisation",
          description:
            "Our tech experts optimise every stage of your funnel to ensure that maximum ROI is being achieved.",
          visualType: "icon",
          iconName: "Settings",
          imageId: null,
        },
      ],
      bottomText:
        "We Serve our Clients' Best Interests with the Best Marketing Solutions.",
      primaryButton: { url: "/contact", text: "Find Out More" },
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "faq",
    sortOrder: 5,
    content: {
      badge: "Frequently Asked Questions",
      heading: "Everything You Need",
      highlight: "To Know",
      description: "Find answers to the most common questions about our services, process, pricing, and support.",
      bottomText: "Still have questions? We'd be happy to help.",
      primaryButton: { url: "/contact", text: "Contact Us" },
      items: [
        {
          question: "What services does Webmatic Technology provide?",
          answer: "We offer web development, mobile app development, digital marketing, branding, SEO, content writing, UI/UX design, and custom software solutions tailored to your business needs."
        },
        {
          question: "How long does a typical project take?",
          answer: "Project timelines depend on complexity and requirements. Most websites are completed within 4–8 weeks, while larger custom solutions may require additional time."
        },
        {
          question: "Do you provide support after project delivery?",
          answer: "Yes. We provide ongoing maintenance, technical support, security updates, and performance monitoring to ensure your solution continues to run smoothly."
        },
        {
          question: "Can you improve our existing website instead of building a new one?",
          answer: "Absolutely. We can redesign, optimize, improve performance, enhance SEO, and add new functionality to your existing website based on your business goals."
        },
        {
          question: "How do we get started with Webmatic Technology?",
          answer: "Simply contact us through our website or request a consultation. We'll discuss your requirements, understand your business objectives, and recommend the best solution."
        }
      ]
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "contact-cta",
    sortOrder: 6,
    content: {
      badge: "SUBMIT A REQUEST",
      heading: "Ready to Grow Your Business Online?",
      description: "From strategy and branding to web development, digital marketing, and custom software solutions, our team delivers the right digital services to help your business grow, perform, and stand out.",
      buttonText: "Request a Demo",
      buttonUrl: "/contact",
      backgroundImageId: null,
    },
    settings: {
      isVisible: true,
    },
  },
] as const;

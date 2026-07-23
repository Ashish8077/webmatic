export const homeSections = [
  {
    sectionType: "hero",
    sortOrder: 0,
    content: {
      slides: [
        {
          badge: "Winning  Digital Marketing Strategy",
          headline: "Take Your Brand Further with",
          highlight: "Expert Digital Marketing",
          subheadline: "Transforming your online presence, driving growth, and delivering real results through data-driven strategies.",
          primaryButton: { url: "/contact", text: "Get Started" },
          secondaryButton: { url: "/services", text: "Our Services" },
          backgroundImageId: null,
        },
        {
          badge: "Marketing Must Drive The Results",
          headline: "We Build Campaigns That",
          highlight: "Convert & Grow",
          subheadline: "Drive business growth with creativity, analytics, and a strategy built around your goals.",
          primaryButton: { url: "/work", text: "See Our Work" },
          secondaryButton: { url: "/about-us", text: "Learn More" },
          backgroundImageId: null,
        },
        {
          badge: "Ready to Grow Your Business?",
          headline: "Crafting Digital Experiences That",
          highlight: "Elevate Brands",
          subheadline: "From stunning web design to cohesive brand identities, we build the digital face of your business.",
          primaryButton: { url: "/work", text: "View Portfolio" },
          secondaryButton: { url: "/contact", text: "Contact Us" },
          backgroundImageId: null,
        }
      ]
    },
    settings: {
      loop: true,
      autoplay: true,
      autoplayDelay: 5000,
      showNavigation: true,
      showPagination: true
    },
  },
  {
    sectionType: "about",
    sortOrder: 1,
    content: {
      badge: "About Webmatic",
      heading: "Get to Know",
      highlight: "Us Better",
      description: "At Webmatic Technology, we've been dedicated to providing exceptional IT solutions and digital marketing services, evolving from a simple business plan to a globally recognised, award-winning agency.",
      bottomText: "We serve our clients' best interests with the best marketing solutions.",
      primaryButton: { url: "/contact", text: "Start a Project" },
      learnMoreButton: { url: "/about-us", text: "Learn more about us" },
      cards: [
        {
          badge: "Our Services",
          title: "How We Can Help?",
          description: "From SEO to paid ads, we offer end-to-end digital solutions tailored to your business goals.",
          button: { url: "/services", text: "View All Services" },
          imageId: null
        },
        {
          badge: "Our Expertise",
          title: "Why Choose Webmatic",
          description: "Award-winning strategies backed by data, creativity, and a team that treats your brand like their own.",
          button: { url: "/about-us", text: "What Makes Us Special" },
          imageId: null
        },
        {
          badge: "Success Stories",
          title: "Bring Innovative Thinking",
          description: "See how we've helped brands grow their online presence and achieve measurable, lasting results.",
          button: { url: "/work", text: "View Success Stories" },
          imageId: null
        }
      ]
    },
    settings: null,
  },
  {
    sectionType: "services",
    sortOrder: 2,
    content: {
      badge: "What We Provide",
      heading: "Building Powerful Brands with",
      highlight: "Integrated Strategies",
      bottomText: "Not sure which service fits your needs? Let's figure it out together.",
      primaryButton: { url: "/contact", text: "Talk to Us" },
      viewAllButton: { url: "/services", text: "View all services" },
      services: [
        {
          key: "brand-marketing",
          title: "Brand Marketing",
          description: "Focuses on conducting in-depth research on your customers, competitors, and search landscape to build a strong, memorable brand.",
          button: { url: "/contact", text: "Talk Brand Strategy" },
          imageId: null
        },
        {
          key: "web-development",
          title: "Web Development",
          description: "Future-proof your website with scalable, secure, and high-performance web solutions tailored to your business needs.",
          button: { url: "/contact", text: "Talk Web Development" },
          imageId: null
        },
        {
          key: "digital-marketing",
          title: "Digital Marketing",
          description: "Reach more customers through SEO, PPC, social media, and data-driven marketing strategies that deliver measurable growth.",
          button: { url: "/contact", text: "Talk Digital Marketing" },
          imageId: null
        },
        {
          key: "app-development",
          title: "App Development",
          description: "Build modern mobile and web applications with seamless user experiences and scalable architecture.",
          button: { url: "/contact", text: "Talk App Development" },
          imageId: null
        },
        {
          key: "content-writing",
          title: "Content Writing",
          description: "Create engaging, SEO-friendly content that attracts visitors, builds trust, and increases conversions.",
          button: { url: "/contact", text: "Talk Content Writing" },
          imageId: null
        },
        {
          key: "game-development",
          title: "Game App Development",
          description: "Design and develop immersive gaming experiences for mobile and web platforms with engaging gameplay.",
          button: { url: "/contact", text: "Talk Game App Development" },
          imageId: null
        }
      ]
    },
    settings: {
      columns: 1,
      showIcons: true
    },
  },
  {
    sectionType: "why-choose-us",
    sortOrder: 3,
    content: {
      badge: "Why Choose Us",
      heading: "3 Reasons Why Webmatic is Your",
      highlight: "Ideal Partner",
      description: "Three core commitments that set us apart from every other digital marketing agency.",
      bottomText: "Still not sure? Let's talk — no pressure, no commitment.",
      primaryButton: { url: "/contact", text: "Talk to Us" },
      learnMoreButton: { url: "/about-us", text: "Learn more about us" },
      reasons: [
        {
          key: "customers-first",
          title: "Customers First",
          description: "Webmatic Technology starts by fully understanding your business objectives. Every strategy we create is designed with your goals at the forefront, ensuring we drive the results that matter most to you.",
          button: { url: "/about-us", text: "Find Out More" },
        },
        {
          key: "exceptional-team",
          title: "Exceptional Team",
          description: "With our best in-house agency know-how, we can boast of having enterprise-level experience with a talented in-house team that definitely brings to the table when it comes to innovative digital marketing solutions.",
          button: { url: "/about-us", text: "Meet The Team" },
        },
        {
          key: "reliable-support",
          title: "Reliable Support",
          description: "We make communication easy. Our support is available 24/7; our average response time is simply ludicrous, so you're sure to have help when you might need it.",
          button: { url: "/contact", text: "Talk to Customer Support" },
        }
      ]
    },
    settings: null,
  },
  {
    sectionType: "testimonials",
    sortOrder: 4,
    content: {
      badge: "Client Testimonials",
      heading: "What Our",
      highlight: "Clients Say",
      description: "Real words from real clients who've grown with Webmatic Technology.",
      testimonials: [
        {
          testimonialTitle: "Creative and Flawless Execution",
          clientName: "Mrs. Linda",
          clientDesignation: "Group Head of Digital Communications",
          companyName: "",
          testimonialDescription: "Creative and flawless execution with a sense of urgency and focus on results is how I'd describe the Webmatic team.",
          imageId: null,
          rating: 5,
          sortOrder: 1,
          status: "published"
        },
        {
          testimonialTitle: "Webmatic Has Been Invaluable",
          clientName: "Pam Hurley",
          clientDesignation: "President",
          companyName: "Hurley Write Inc.",
          testimonialDescription: "Webmatic has been invaluable. They understand our brand and have given my ideas new life in a social media obsessed world.",
          imageId: null,
          rating: 5,
          sortOrder: 2,
          status: "published"
        }
      ]
    },
    settings: null,
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
    settings: null,
  },
  {
    sectionType: "contact-cta",
    sortOrder: 6,
    content: {
      badge: "Let's Work Together",
      heading: "Ready to Grow",
      description: "Whether you need a new website, digital marketing, branding, or a custom software solution, our team is ready to help you achieve your business goals.",
      primaryButton: { url: "/contact", text: "Start Your Project" },
      secondaryButton: { url: "/services", text: "View Our Services" },
      backgroundImageId: null
    },
    settings: {
      overlayOpacity: 0
    },
  }
] as const;

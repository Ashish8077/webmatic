import db from "../src/database/connection";

const pageId = 84;

async function run() {
  try {
    await db.query("DELETE FROM page_sections WHERE page_id = ?", [pageId]);

    const sections = [
      {
        section_type: "hero",
        title: "Hero Banner",
        sort_order: 1,
        content: {
          badge: "Trusted by 500+ Businesses",
          heading: "Build, Manage & Scale Your Digital Presence",
          subheading:
            "A modern enterprise CMS that empowers your team to create, manage, and publish content faster while maintaining security, performance, and SEO excellence.",
          primaryCta: {
            label: "Get Started",
            href: "#contact-cta",
          },
          secondaryCta: {
            label: "View Services",
            href: "#services",
          },
        },
      },
      {
        section_type: "about",
        title: "About Section",
        sort_order: 2,
        content: {
          heading: "Helping Businesses Grow Through Technology",
          body: "We build reliable, scalable, and user-friendly digital products that help organizations improve efficiency and achieve long-term success. From strategy and design to development and ongoing support, our experienced team delivers end-to-end digital solutions tailored to your business needs.",
          highlights: [
            { text: "Experienced development team" },
            { text: "Enterprise-grade security" },
            { text: "Scalable architecture" },
            { text: "Agile development process" },
          ],
        },
      },
      {
        section_type: "services",
        title: "Services Section",
        sort_order: 3,
        content: {
          heading: "Our Services",
          subheading:
            "Comprehensive digital services designed for startups, SMEs, and enterprises.",
          items: [
            {
              title: "Custom Web Development",
              description:
                "Modern, scalable web applications built with the latest technologies.",
            },
            {
              title: "CMS Development",
              description:
                "Flexible content management systems tailored to your business.",
            },
            {
              title: "UI/UX Design",
              description:
                "Beautiful, user-focused interfaces that improve engagement.",
            },
            {
              title: "Cloud Solutions",
              description:
                "Reliable cloud infrastructure with high availability and security.",
            },
          ],
        },
      },
      {
        section_type: "why-us",
        title: "Why Choose Us",
        sort_order: 4,
        content: {
          heading: "Why Businesses Choose Us",
          subheading:
            "We combine technical expertise with business understanding to deliver exceptional results.",
          features: [
            {
              title: "Experienced Team",
              description:
                "Skilled professionals with years of industry experience.",
            },
            {
              title: "Quality Assurance",
              description:
                "Rigorous testing ensures stable and reliable software.",
            },
            {
              title: "Transparent Communication",
              description:
                "Regular updates throughout every stage of the project.",
            },
            {
              title: "Ongoing Support",
              description:
                "Dedicated maintenance and technical assistance after launch.",
            },
          ],
        },
      },
      {
        section_type: "testimonials",
        title: "Testimonials",
        sort_order: 5,
        content: {
          heading: "What Our Clients Say",
          items: [
            {
              author: "John Smith",
              role: "CEO, TechNova",
              quote:
                "Outstanding team. They delivered our project on time with excellent quality.",
            },
            {
              author: "Sarah Johnson",
              role: "Marketing Director, GrowthHub",
              quote:
                "Professional communication and exceptional technical expertise.",
            },
          ],
        },
      },
      {
        section_type: "faq",
        title: "FAQ Section",
        sort_order: 6,
        content: {
          heading: "Frequently Asked Questions",
          items: [
            {
              question: "How long does a project take?",
              answer:
                "Project timelines depend on scope, but most projects are completed within 4–12 weeks.",
            },
            {
              question: "Do you provide maintenance?",
              answer:
                "Yes, we offer ongoing maintenance, monitoring, and feature enhancements.",
            },
            {
              question: "Can you redesign an existing website?",
              answer:
                "Absolutely. We can modernize your existing website while preserving your content and SEO.",
            },
          ],
        },
      },
      {
        section_type: "contact-cta",
        title: "Contact CTA",
        sort_order: 7,
        content: {
          heading: "Ready to Start Your Next Project?",
          body: "Let's discuss your goals and build a solution that drives business growth.",
          buttonText: "Contact Us",
          buttonUrl: "/contact",
        },
      },
      {
        section_type: "footer-cta",
        title: "Footer Content",
        sort_order: 8,
        content: {
          heading: "Your Company",
          subheading:
            "Delivering innovative digital solutions that help businesses succeed in the modern world.",
          buttonText: "Contact Support",
          buttonUrl: "mailto:info@yourcompany.com",
        },
      },
    ];

    for (const sec of sections) {
      await db.query(
        "INSERT INTO page_sections (page_id, section_type, title, content, sort_order, is_active, created_by, updated_by) VALUES (?, ?, ?, ?, ?, 1, 1, 1)",
        [
          pageId,
          sec.section_type,
          sec.title,
          JSON.stringify(sec.content),
          sec.sort_order,
        ],
      );
    }
    console.log("Sections restored successfully.");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

run();

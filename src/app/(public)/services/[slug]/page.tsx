import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/shared/page-hero/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { getPublicServiceBySlug } from "@/modules/services/services/get-public-service.service";
import { KeyFeaturesSection } from "@/components/sections/key-features";
import { BenefitsSection } from "@/components/sections/benefits";
import { FaqSection } from "@/components/sections/faq/faq-section";
import { ContactCta } from "@/components/sections/contact-cta";
import { serializeSchemaMarkup } from "@/lib/seo/build-page-metadata";
import { RichContent } from "@/components/shared/rich-content";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const service = await getPublicServiceBySlug(slug);
    
    // Parse comma-separated keywords into array
    const keywords = service.metaKeywords
      ? service.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean)
      : undefined;

    return {
      title: service.seoTitle || `${service.name} | Services`,
      description: service.metaDescription || service.shortDescription || undefined,
      ...(keywords && keywords.length > 0 && { keywords }),
      alternates: {
        canonical: service.canonicalUrl || undefined,
      },
      openGraph: {
        title: service.openGraphTitle || service.seoTitle || service.name,
        description: service.openGraphDescription || service.metaDescription || service.shortDescription || "",
        ...(service.openGraphImage?.url && {
          images: [{ url: service.openGraphImage.url }],
        }),
      },
      twitter: {
        card: service.twitterImage?.url ? "summary_large_image" : "summary",
        title: service.twitterTitle || service.openGraphTitle || service.seoTitle || service.name,
        description: service.twitterDescription || service.openGraphDescription || service.metaDescription || service.shortDescription || "",
        ...(service.twitterImage?.url && {
          images: [service.twitterImage.url],
        }),
      },
    };
  } catch {
    return {
      title: "Service Not Found",
      robots: { index: false, follow: false },
    };
  }
}

const serviceEditorialStyles = [
  // Remove default prose constraints where they conflict with our custom editorial design
  "!prose-p:m-0 !prose-headings:m-0",
  // Paragraphs
  "[&>p]:text-slate-600 [&>p]:leading-[1.8] [&>p]:mb-6",
  "[&>p]:text-[16px] sm:[&>p]:text-[17px]",
  // Intro Paragraph (First paragraph)
  "[&>p:first-of-type]:text-[19px] sm:[&>p:first-of-type]:text-[21px] [&>p:first-of-type]:text-slate-700 [&>p:first-of-type]:font-medium [&>p:first-of-type]:mb-10 [&>p:first-of-type]:leading-[1.7]",
  // H2
  "[&>h2]:text-navy [&>h2]:font-extrabold [&>h2]:text-[28px] sm:[&>h2]:text-[32px] [&>h2]:mt-16 [&>h2]:mb-8",
  "[&>h2]:relative [&>h2]:pb-5 [&>h2::after]:absolute [&>h2::after]:bottom-0 [&>h2::after]:left-0 [&>h2::after]:w-12 [&>h2::after]:h-1.5 [&>h2::after]:bg-orange-500 [&>h2::after]:rounded-full",
  // H3
  "[&>h3]:text-navy [&>h3]:font-bold [&>h3]:text-[22px] sm:[&>h3]:text-[24px] [&>h3]:mt-10 [&>h3]:mb-6",
  // Lists
  "[&>ul]:mt-6 [&>ul]:mb-8 [&>ul]:space-y-3 [&>ol]:mt-6 [&>ol]:mb-8 [&>ol]:space-y-3",
  "[&_li]:text-slate-600 [&_li]:leading-[1.8] [&_li]:text-[16px] sm:[&_li]:text-[17px]",
  "[&>ul>li]:marker:text-orange-500 [&>ol>li]:marker:text-navy [&>ol>li]:marker:font-bold",
  // Strong
  "[&_strong]:text-navy [&_strong]:font-bold",
  // Links
  "[&_a]:text-primary [&_a]:font-semibold [&_a]:underline [&_a]:decoration-primary/30 [&_a]:underline-offset-4 hover:[&_a]:decoration-primary [&_a]:transition-colors",
  // Blockquotes
  "[&>blockquote]:bg-slate-50/80 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:px-6 [&>blockquote]:py-5 [&>blockquote]:text-slate-700 [&>blockquote]:not-italic [&>blockquote]:rounded-r-xl [&>blockquote]:font-medium [&>blockquote]:my-10 [&>blockquote]:shadow-sm",
  // Images
  "[&_img]:rounded-2xl [&_img]:border [&_img]:border-slate-100 [&_img]:shadow-md [&_img]:my-10 [&_img]:w-full [&_img]:h-auto",
  // Horizontal Rule
  "[&>hr]:border-slate-200 [&>hr]:my-12",
].join(" ");

export default async function ServiceDetailsPage({ params }: ServicePageProps) {
  let service;
  
  try {
    const { slug } = await params;
    service = await getPublicServiceBySlug(slug);
  } catch {
    notFound();
  }

  const heroImage = service.bannerImage?.url
    ? service.bannerImage.url
    : service.featuredImage?.url
      ? service.featuredImage.url
      : null;

  const jsonLd = serializeSchemaMarkup(service.schemaMarkup as Record<string, unknown> | null);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <Header />
      <main className="pt-26">
        {/* 1. Hero Banner */}
        <PageHero
          title={service.name}
          description={service.shortDescription || ""}
          bannerImage={heroImage}
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: service.name },
              ]}
              theme="light"
            />
          }
          theme="light"
        />

        {/* 2. Service Description */}
        {service.description && (
          <section className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-5 sm:px-8">
              <RichContent html={service.description} className={serviceEditorialStyles} />
            </div>
          </section>
        )}

        {/* 3. Key Features */}
        {service.keyFeatures && service.keyFeatures.length > 0 && (
          <KeyFeaturesSection features={service.keyFeatures} />
        )}

        {/* 4. Benefits */}
        {service.benefits && service.benefits.length > 0 && (
          <BenefitsSection benefits={service.benefits} />
        )}

        {/* 5. FAQ */}
        {service.faq && Array.isArray(service.faq) && service.faq.length > 0 && (
          <FaqSection 
            content={{
              badge: "FAQ",
              heading: "Frequently Asked Questions",
              highlight: "",
              description: "Everything you need to know about this service.",
              items: service.faq,
            } as Record<string, unknown>}
          />
        )}

        {/* 6. Contact CTA */}
        <ContactCta
          heading={service.ctaTitle || "Ready to get started?"}
          description={service.ctaDescription || "Contact us today to learn more about how we can help your business grow."}
          submitButtonText={service.ctaButtonText || "Send Message"}
          backgroundVariant="slate"
          showCompanyField={true}
          showMessageField={true}
        />
      </main>
    </>
  );
}

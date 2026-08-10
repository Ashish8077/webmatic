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
  } catch (error) {
    console.error("Metadata Error:", error);
    return {
      title: "Service Not Found",
      robots: { index: false, follow: false },
    };
  }
}

export default async function ServiceDetailsPage({ params }: ServicePageProps) {
  let service;
  
  try {
    const { slug } = await params;
    service = await getPublicServiceBySlug(slug);
  } catch (error) {
    console.error("Page Error:", error);
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
          <section className="bg-white py-16">
            <div className="mx-auto max-w-[900px] px-5 sm:px-8">
              <RichContent html={service.description} className="prose" />
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

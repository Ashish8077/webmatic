import { ArrowRight } from "lucide-react";
import { str } from "../content-helpers";

interface SectionProps {
  content: Record<string, unknown>;
  title: string | null;
}

/**
 * Contact call-to-action banner.
 *
 * Expected content keys:
 * - heading     string   — Banner headline
 * - subheading  string   — Optional supporting text
 * - ctaLabel    string   — Button label
 * - ctaHref     string   — Button href
 */
export function ContactCtaSection({ content, title }: SectionProps) {
  const heading = str(content.heading, title ?? "Ready to Get Started?");
  const subheading = str(content.subheading);
  const ctaLabel = str(content.ctaLabel, "Contact Us");
  const ctaHref = str(content.ctaHref, "#contact");

  return (
    <section
      id="contact-cta"
      aria-labelledby="contact-cta-heading"
      className="py-28 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="relative overflow-hidden rounded-3xl p-12 sm:p-16 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(99,102,241,0.04) 50%, rgba(167,139,250,0.08) 100%)",
          }}
        >
          {/* Inner border */}
          <div
            className="absolute inset-0 rounded-3xl border border-accent/20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Background orb */}
          <div
            className="absolute top-0 right-0 w-72 h-72 opacity-20 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at top right, #6366f1 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 opacity-10 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at bottom left, #a78bfa 0%, transparent 65%)",
            }}
          />

          <h2
            id="contact-cta-heading"
            className="relative text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            {heading}
          </h2>

          {subheading && (
            <p className="relative text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {subheading}
            </p>
          )}

          <a
            href={ctaHref}
            className="relative inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-accent-hover transition-all duration-200 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-0.5"
          >
            {ctaLabel}
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

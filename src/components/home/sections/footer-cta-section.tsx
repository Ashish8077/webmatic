import { ArrowRight } from "lucide-react";
import { str } from "../content-helpers";

interface SectionProps {
  content: Record<string, unknown>;
  title: string | null;
}

/**
 * Footer CTA — the final section of the page.
 *
 * Expected content keys:
 * - heading     string   — Gradient headline
 * - subheading  string   — Optional supporting text
 * - ctaLabel    string   — Button label
 * - ctaHref     string   — Button href
 * - copyright   string   — Optional copyright line
 */
export function FooterCtaSection({ content, title }: SectionProps) {
  const heading = str(content.heading, title ?? "Let's Build Something Amazing");
  const subheading = str(content.subheading);
  const ctaLabel = str(content.ctaLabel, "Get Started Today");
  const ctaHref = str(content.ctaHref, "#hero");
  const copyright = str(content.copyright);

  return (
    <footer
      id="footer-cta"
      className="py-24 px-4 border-t border-card-border"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="gradient-text">{heading}</span>
        </h2>

        {subheading && (
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            {subheading}
          </p>
        )}

        <a
          href={ctaHref}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-accent-hover transition-all duration-200 shadow-lg shadow-accent/25 hover:-translate-y-0.5 mb-14"
        >
          {ctaLabel}
          <ArrowRight size={15} aria-hidden="true" />
        </a>

        {copyright && (
          <p className="text-muted-foreground/60 text-xs border-t border-card-border pt-8">
            {copyright}
          </p>
        )}
      </div>
    </footer>
  );
}

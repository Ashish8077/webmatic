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
  const heading = str(
    content.heading,
    title ?? "Let's Build Something Amazing",
  );
  const subheading = str(content.subheading);
  const ctaLabel = str(content.ctaLabel, "Get Started Today");
  const ctaHref = str(content.ctaHref, "#hero");
  const copyright = str(content.copyright);

  return (
    <footer id="footer-cta" className="py-20 px-4 border-t border-card-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-[28px] sm:text-[32px] font-bold mb-3">
          <span className="gradient-text">{heading}</span>
        </h2>

        {subheading && (
          <p className="text-muted-foreground text-[15px] mb-7 max-w-xl mx-auto leading-relaxed">
            {subheading}
          </p>
        )}

        <a
          href={ctaHref}
          className="inline-flex items-center gap-2 px-7 py-3 bg-accent text-white rounded-xl font-semibold text-[14px] hover:bg-accent-hover transition-all duration-200 shadow-md shadow-accent/25 hover:-translate-y-0.5 mb-12"
        >
          {ctaLabel}
          <ArrowRight size={14} aria-hidden="true" />
        </a>

        {copyright && (
          <p className="text-muted-foreground/60 text-[11px] border-t border-card-border pt-7">
            {copyright}
          </p>
        )}
      </div>
    </footer>
  );
}

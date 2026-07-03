import { ArrowRight, Sparkles } from "lucide-react";
import { str, arr, obj } from "../content-helpers";

interface SectionProps {
  content: Record<string, unknown>;
  title: string | null;
}

/**
 * Full-viewport hero section.
 *
 * Expected content keys:
 * - heading        string   — Main headline
 * - subheading     string   — Supporting text
 * - badge          string   — Optional pill label above the heading
 * - primaryCta     object   — { label: string; href: string }
 * - secondaryCta   object   — { label: string; href: string }
 */
export function HeroSection({ content, title }: SectionProps) {
  const heading = str(content.heading, title ?? "Welcome");
  const subheading = str(content.subheading);
  const badge = str(content.badge);
  const primaryCta = obj(content.primaryCta);
  const secondaryCta = obj(content.secondaryCta);

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden"
    >
      {/* Decorative background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.18]"
          style={{
            background:
              "radial-gradient(circle, #6366f1 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.12]"
          style={{
            background:
              "radial-gradient(circle, #818cf8 0%, transparent 65%)",
          }}
        />
        {/* Subtle dot-grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(99,102,241,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/20 text-sm text-accent font-medium mb-8">
            <Sparkles size={13} aria-hidden="true" />
            {badge}
          </div>
        )}

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08]">
          <span className="gradient-text">{heading}</span>
        </h1>

        {subheading && (
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {subheading}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {primaryCta && (
            <a
              href={str(primaryCta.href, "#contact-cta")}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-all duration-200 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5"
            >
              {str(primaryCta.label, "Get Started")}
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          )}
          {secondaryCta && (
            <a
              href={str(secondaryCta.href, "#about")}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-card-border text-foreground font-semibold text-sm hover:border-accent/40 hover:text-accent transition-all duration-200"
            >
              {str(secondaryCta.label, "Learn More")}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

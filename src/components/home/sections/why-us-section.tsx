import { str, arr } from "../content-helpers";

interface SectionProps {
  content: Record<string, unknown>;
  title: string | null;
}

interface ReasonItem {
  icon?: string;
  title: string;
  description: string;
}

/**
 * Why Choose Us — numbered card grid with a subtle glass treatment.
 *
 * Expected content keys:
 * - heading      string   — Section headline
 * - subheading   string   — Optional supporting text
 * - reasons      array    — [{ icon?: string; title: string; description: string }]
 */
export function WhyUsSection({ content, title }: SectionProps) {
  const heading = str(content.heading, title ?? "Why Choose Us");
  const subheading = str(content.subheading);
  const reasons = arr<ReasonItem>(content.reasons);

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="py-28 px-4 relative overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, #6366f1, transparent)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">
            Why Us
          </p>
          <h2
            id="why-us-heading"
            className="text-4xl font-bold text-foreground mb-4"
          >
            {heading}
          </h2>
          {subheading && (
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {subheading}
            </p>
          )}
        </div>

        {reasons.length > 0 && (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {reasons.map((reason, i) => (
              <li
                key={i}
                className="relative pt-8 pb-6 px-6 rounded-2xl glass border border-card-border hover:border-accent/25 transition-all duration-300"
              >
                {/* Numbered indicator */}
                <span
                  className="absolute -top-4 left-5 w-8 h-8 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-accent/40 tabular-nums"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {str(reason.icon) && (
                  <p className="text-3xl mb-4 leading-none" aria-hidden="true">
                    {reason.icon}
                  </p>
                )}

                <h3 className="text-base font-semibold text-foreground mb-2">
                  {str(reason.title)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {str(reason.description)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

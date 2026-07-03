import { str, arr } from "../content-helpers";

interface SectionProps {
  content: Record<string, unknown>;
  title: string | null;
}

interface ServiceItem {
  icon?: string;
  title: string;
  description: string;
}

/**
 * Responsive grid of service cards.
 *
 * Expected content keys:
 * - heading      string   — Section headline
 * - subheading   string   — Optional supporting text
 * - items        array    — [{ icon?: string; title: string; description: string }]
 */
export function ServicesSection({ content, title }: SectionProps) {
  const heading = str(content.heading, title ?? "Our Services");
  const subheading = str(content.subheading);
  const items = arr<ServiceItem>(content.items);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-28 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">
            Services
          </p>
          <h2
            id="services-heading"
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

        {/* Cards grid */}
        {items.length > 0 && (
          <ul
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
          >
            {items.map((item, i) => (
              <li
                key={i}
                className="group p-7 bg-card-bg border border-card-border rounded-2xl hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-0.5"
              >
                {/* Icon badge */}
                <div
                  className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-200"
                  aria-hidden="true"
                >
                  {str(item.icon) ? (
                    <span className="text-2xl leading-none">{item.icon}</span>
                  ) : (
                    <span className="text-xs font-bold text-accent tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-foreground mb-2">
                  {str(item.title)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {str(item.description)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

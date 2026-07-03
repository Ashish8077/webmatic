import { CheckCircle2 } from "lucide-react";
import { str, arr } from "../content-helpers";

interface SectionProps {
  content: Record<string, unknown>;
  title: string | null;
}

interface HighlightItem {
  icon?: string;
  text: string;
}

/**
 * Two-column About section.
 *
 * Expected content keys:
 * - heading       string   — Section headline
 * - body          string   — Descriptive paragraph
 * - highlights    array    — [{ icon?: string; text: string }]
 */
export function AboutSection({ content, title }: SectionProps) {
  const heading = str(content.heading, title ?? "About Us");
  const body = str(content.body);
  const highlights = arr<HighlightItem>(content.highlights);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-28 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">
              About Us
            </p>
            <h2
              id="about-heading"
              className="text-4xl font-bold text-foreground mb-6 leading-tight"
            >
              {heading}
            </h2>
            {body && (
              <p className="text-muted-foreground leading-relaxed text-lg">
                {body}
              </p>
            )}
          </div>

          {/* Right: highlights */}
          {highlights.length > 0 && (
            <ul className="space-y-4" role="list">
              {highlights.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 p-5 bg-card-bg border border-card-border rounded-2xl hover:border-accent/20 transition-colors duration-200"
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent"
                    aria-hidden="true"
                  >
                    {item.icon ? (
                      <span className="text-lg leading-none">{item.icon}</span>
                    ) : (
                      <CheckCircle2 size={18} />
                    )}
                  </div>
                  <p className="text-foreground mt-1 leading-snug">
                    {str(item.text)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

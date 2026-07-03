import { str, arr } from "../content-helpers";

interface SectionProps {
  content: Record<string, unknown>;
  title: string | null;
}

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQ accordion using native <details>/<summary> — zero JavaScript required.
 *
 * Expected content keys:
 * - heading   string   — Section headline
 * - items     array    — [{ question: string; answer: string }]
 */
export function FaqSection({ content, title }: SectionProps) {
  const heading = str(content.heading, title ?? "Frequently Asked Questions");
  const items = arr<FaqItem>(content.items);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-28 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="text-4xl font-bold text-foreground"
          >
            {heading}
          </h2>
        </div>

        {items.length > 0 && (
          <dl className="space-y-3">
            {items.map((item, i) => (
              <details
                key={i}
                className="group bg-card-bg border border-card-border open:border-accent/25 rounded-2xl overflow-hidden transition-colors duration-200"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer select-none list-none font-medium text-foreground hover:bg-surface-hover transition-colors duration-150">
                  <dt className="text-left">{str(item.question)}</dt>

                  {/* Chevron — rotates via group-open in Tailwind v4 */}
                  <span
                    className="ml-4 flex-shrink-0 w-7 h-7 rounded-full bg-surface-hover flex items-center justify-center text-muted-foreground group-open:text-accent group-open:bg-accent/10 group-open:rotate-180 transition-all duration-200"
                    aria-hidden="true"
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 3.5L5.5 7.5L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>

                <dd className="px-6 pb-6 pt-4 text-muted-foreground leading-relaxed border-t border-card-border/60 text-sm">
                  {str(item.answer)}
                </dd>
              </details>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

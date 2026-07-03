import { Quote } from "lucide-react";
import { str, arr } from "../content-helpers";

interface SectionProps {
  content: Record<string, unknown>;
  title: string | null;
}

interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
}

/**
 * Testimonials card grid.
 *
 * Expected content keys:
 * - heading   string   — Section headline
 * - items     array    — [{ quote: string; author: string; role?: string }]
 */
export function TestimonialsSection({ content, title }: SectionProps) {
  const heading = str(content.heading, title ?? "What Our Clients Say");
  const items = arr<TestimonialItem>(content.items);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-28 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="text-4xl font-bold text-foreground"
          >
            {heading}
          </h2>
        </div>

        {items.length > 0 && (
          <ul
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
          >
            {items.map((item, i) => (
              <li key={i}>
                <figure className="h-full flex flex-col gap-5 p-7 bg-card-bg border border-card-border rounded-2xl hover:border-accent/20 transition-colors duration-200">
                  <Quote
                    size={22}
                    className="text-accent/40 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <blockquote className="text-foreground leading-relaxed flex-1 text-[0.95rem]">
                    &ldquo;{str(item.quote)}&rdquo;
                  </blockquote>
                  <figcaption className="border-t border-card-border pt-4">
                    <p className="font-semibold text-foreground text-sm">
                      {str(item.author)}
                    </p>
                    {item.role && (
                      <p className="text-muted-foreground text-xs mt-0.5">
                        {str(item.role)}
                      </p>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

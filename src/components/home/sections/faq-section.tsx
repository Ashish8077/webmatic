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
      className="bg-white py-16"
    >
      <div className="mx-auto max-w-292.5 px-5 sm:px-8">
        <div className="text-center mb-12">
          <span className="inline-block mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="text-[28px] sm:text-[32px] font-bold text-[#081a4b]"
          >
            {heading}
          </h2>
        </div>

        {items.length > 0 && (
          <dl className="space-y-3 max-w-3xl mx-auto">
            {items.map((item, i) => (
              <details
                key={i}
                className="group bg-white border border-slate-200 open:border-orange-500/30 rounded-xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none list-none font-semibold text-[#081a4b] hover:bg-slate-50 transition-colors duration-150">
                  <dt className="text-left text-[14px] sm:text-[15px]">
                    {str(item.question)}
                  </dt>

                  {/* Chevron — rotates via group-open in Tailwind v4 */}
                  <span
                    className="ml-4 flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-open:text-orange-500 group-open:bg-orange-50 group-open:rotate-180 transition-all duration-200"
                    aria-hidden="true"
                  >
                    <svg
                      width="10"
                      height="10"
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

                <dd className="px-5 pb-5 pt-2 text-slate-500 leading-relaxed border-t border-slate-100 text-[13px]">
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

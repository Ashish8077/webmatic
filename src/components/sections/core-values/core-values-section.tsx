import Link from "next/link";
import { Users, Award, LifeBuoy } from "lucide-react";
import { type CoreValuesContentValues } from "@/features/page-sections/schemas/core-values.schema";

interface Props {
  content: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

/** Maps value index to a lucide icon for visual variety when no CMS image is set. */
const FALLBACK_ICONS = [Users, Award, LifeBuoy] as const;

export function CoreValuesSection({ content }: Props) {
  const data = content as unknown as CoreValuesContentValues;
  const values = data.values || [];

  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        {/* ── Section header ──────────────────────────────── */}
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-4">
            <span className="h-px w-8 bg-orange-500 rounded-full" />
            {data.badge}
          </span>
          <h2 className="text-[30px] lg:text-[36px] font-bold leading-[1.15] text-navy max-w-3xl mx-auto">
            {data.heading}
          </h2>
        </div>

        {/* ── Values grid ─────────────────────────────────── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((item, index) => {
            const Icon = FALLBACK_ICONS[index % FALLBACK_ICONS.length];

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-100 p-10 text-center shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center"
              >
                {/* Icon */}
                <div className="mb-6 w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-orange-500" strokeWidth={1.5} />
                </div>

                <h3 className="text-lg font-semibold text-navy mb-3">
                  {item.title}
                </h3>

                <p className="text-[14px] leading-[1.625] text-slate-500 mb-8 flex-grow">
                  {item.description}
                </p>

                {item.linkText && item.linkUrl && (
                  <Link
                    href={item.linkUrl}
                    className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-orange-500 hover:text-orange-600 transition-colors duration-200 group"
                  >
                    {item.linkText}
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { SectionProps } from "../types";
import { normaliseTestimonialContent } from "./mapper";
import type { RawTestimonialContent } from "./types";
import { TestimonialsSlider } from "./testimonials-slider";

export function TestimonialsSection({ content }: SectionProps) {
  const data = normaliseTestimonialContent(
    content as unknown as RawTestimonialContent,
  );

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        {/* ── Section header ──────────────────────────────── */}
        <div className="mb-14 text-center">
          <span className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
            {data.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-[#081a4b]">
            {data.heading}{" "}
            <span className="text-orange-500">{data.highlight}</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
            {data.description}
          </p>
        </div>

        {/* ── Testimonials slider (Client Component) ──────── */}
        <TestimonialsSlider items={data.testimonials} />
      </div>
    </section>
  );
}

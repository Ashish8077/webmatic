import { SectionProps } from "../types";
import { normaliseTestimonialContent } from "./mapper";
import type { RawTestimonialContent } from "./types";
import { TestimonialsSlider } from "./testimonials-slider";

export function TestimonialsSection({ content }: SectionProps) {
  const data = normaliseTestimonialContent(
    content as unknown as RawTestimonialContent,
  );

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        {/* ── Section header ──────────────────────────────── */}
        <div className="mb-14 text-center">
          <span className="inline-block mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-orange-500">
            {data.badge}
          </span>
          <h2 className="text-[30px] lg:text-[36px] font-bold leading-[1.15] text-navy">
            {data.heading}{" "}
            <span className="text-orange-500">{data.highlight}</span>
          </h2>
          <p className="mt-3 text-[16px] leading-[1.625] text-slate-500">
            {data.description}
          </p>
        </div>

        {/* ── Testimonials slider (Client Component) ──────── */}
        <TestimonialsSlider items={data.testimonials} />
      </div>
    </section>
  );
}

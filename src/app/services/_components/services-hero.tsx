import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F7FB] via-[#EDF7F9] to-[#D9F0F0] py-20 sm:py-32">
      {/* Subtle background decorations - refined and professional */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Geometric accent - top right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.03]">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#0EA5E9"
              d="M45.7,-57.8C58.9,-49.3,69.2,-36.5,73.8,-21.8C78.4,-7.1,77.3,9.5,70.7,23.8C64.1,38.1,52,50.1,38.2,57.4C24.4,64.7,9,67.3,-6.1,66.8C-21.2,66.3,-36,62.7,-48.3,54.2C-60.6,45.7,-70.4,32.3,-74.8,17.2C-79.2,2.1,-78.2,-14.7,-71.5,-29.2C-64.8,-43.7,-52.4,-55.9,-38.5,-64.2C-24.6,-72.5,-9.2,-76.9,4.7,-73.4C18.6,-69.9,32.5,-66.3,45.7,-57.8Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        
        {/* Geometric accent - bottom left */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.02]">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#F97316"
              d="M41.3,-55.5C53.7,-46.8,64.3,-35.2,68.8,-21.8C73.3,-8.4,71.7,6.8,65.9,20.1C60.1,33.4,50.1,44.8,38.1,52.8C26.1,60.8,12.1,65.4,-2.5,69.1C-17.1,72.8,-32.2,75.6,-44.6,69.9C-57,64.2,-66.7,50,-71.5,34.8C-76.3,19.6,-76.2,3.4,-72.1,-11.4C-68,-26.2,-60,-39.6,-48.8,-48.5C-37.6,-57.4,-23.2,-61.8,-8.8,-60.5C5.6,-59.2,28.9,-64.2,41.3,-55.5Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        {/* Subtle dot grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, #0EA5E9 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.03
        }} />
      </div>

      <div className="relative mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-6 animate-fade-in">
            <span className="h-px w-6 bg-orange-500 rounded-full" />
            Our Services
            <span className="h-px w-6 bg-orange-500 rounded-full" />
          </span>

          {/* Main Heading - Dark navy for contrast */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0A1F44] mb-6 leading-tight animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            Empowering Your Business with{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-orange-500">Expert Solutions</span>
              {/* Subtle underline accent */}
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-orange-500/10 -z-0" />
            </span>
          </h1>

          {/* Description - Readable dark gray */}
          <p
            className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            We provide comprehensive, end-to-end services designed to help you
            scale, optimize, and achieve your goals faster.
          </p>

          {/* Value propositions - 3 key benefits */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10 animate-fade-in"
            style={{ animationDelay: "250ms" }}
          >
            {[
              "Expert Team",
              "Proven Results",
              "Tailored Solutions"
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <CheckCircle2 size={16} className="text-teal-600 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold text-sm hover:bg-orange-600 transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore Our Services
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

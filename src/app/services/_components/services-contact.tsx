import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Premium Services Contact Section
 * 
 * Enterprise-grade "Get In Touch" CTA designed for maximum conversion.
 * Clean, focused design with strong hierarchy and premium feel.
 * 
 * Design Philosophy:
 * - Singular focus on conversion
 * - Strong visual hierarchy (heading → description → CTA)
 * - Premium whitespace usage
 * - Subtle trust indicators without clutter
 * - Matches homepage hero section quality
 */
export function ServicesContact() {
  return (
    <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
      {/* Minimal background accent - extremely subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-orange-500/[0.03] via-transparent to-teal-500/[0.02] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1170px] px-5 sm:px-8">
        {/* Main content container - centered for maximum impact */}
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow with refined spacing */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-orange-500 to-orange-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
              Get Started
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent via-orange-500 to-orange-500" />
          </div>

          {/* Headline - powerful and direct */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#081a4b] mb-8 leading-[1.1] tracking-tight">
            Let's Build Something{" "}
            <span className="text-orange-500">Great Together</span>
          </h2>

          {/* Supporting copy - clear value proposition */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-12 max-w-2xl mx-auto">
            Schedule a free consultation with our team. We'll discuss your goals, 
            answer your questions, and create a tailored strategy for your success.
          </p>

          {/* CTA - singular focus */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold text-base hover:bg-orange-600 transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
            >
              Schedule Free Consultation
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            
            <Link
              href="tel:+15551234567"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#081a4b] border-2 border-slate-200 rounded-xl font-semibold text-base hover:border-orange-300 hover:text-orange-600 hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
            >
              Call +1 (555) 123-4567
            </Link>
          </div>

          {/* Trust indicators - clean horizontal layout */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-12 border-t border-slate-100">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-teal-600">
                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium">Free consultation</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-teal-600">
                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium">No obligation</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-teal-600">
                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium">24-hour response</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-teal-600">
                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium">150+ projects delivered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

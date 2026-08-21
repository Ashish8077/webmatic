import { motion } from "motion/react";
import { str, arr } from "../content-helpers";
import { VisualRenderer } from "@/components/ui/visual-renderer";
import type { VisualAsset } from "@/shared/types/visual-asset.types";
import { getIconComponent } from "@/components/ui/icon-registry";
import React from "react";

interface SectionProps {
  content: Record<string, unknown>;
  title: string | null;
}

interface ReasonItem {
  visualType?: "none" | "icon" | "image";
  iconName?: string | null;
  imageId?: number | null;
  title: string;
  description: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/**
 * Why Choose Us — Modern, premium card grid with subtle hover animations and watermark numbering.
 */
export function WhyUsSection({ content, title }: SectionProps) {
  const heading = str(content.heading, title ?? "Why Choose Us");
  const subheading = str(content.subheading);
  const reasons = arr<ReasonItem>(content.reasons);

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50/50"
    >
      <div className="relative max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Why Us</span>
          </div>
          <h2
            id="why-us-heading"
            className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-navy mb-6 tracking-tight leading-[1.1]"
          >
            {heading}
          </h2>
          {subheading && (
            <p className="text-slate-500 max-w-2xl mx-auto text-[16px] sm:text-[18px] leading-[1.6]">
              {subheading}
            </p>
          )}
        </motion.div>

        {reasons.length > 0 && (
          <motion.ul 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" 
            role="list"
          >
            {reasons.map((reason, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="group relative pt-10 pb-10 px-8 rounded-3xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all duration-500 overflow-hidden"
              >
                {/* Decorative top border gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-slate-200 to-slate-200 group-hover:from-primary group-hover:to-orange-400 transition-all duration-500" />
                
                {/* Subtle watermark number with parallax-like hover effect */}
                <div className="absolute -right-2 -top-4 text-[140px] font-black text-slate-50/60 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-700 select-none pointer-events-none z-0 tracking-tighter">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Modern Icon Container (Soft primary default, solid primary hover) */}
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-sm">
                    {(() => {
                      if (reason.visualType === "icon" && reason.iconName) {
                        const IconComponent = getIconComponent(reason.iconName);
                        if (IconComponent) {
                          return React.createElement(IconComponent, { size: 28, strokeWidth: 1.5 });
                        }
                      }
                      if (reason.visualType === "image") {
                        return (
                          <VisualRenderer
                            asset={reason as VisualAsset}
                            className="w-full h-full rounded-2xl overflow-hidden"
                            imageClassName="transition-transform duration-700 group-hover:scale-[1.1]"
                          />
                        );
                      }
                      // Fallback
                      return <span className="text-[16px] font-bold currentColor">{String(i + 1).padStart(2, "0")}</span>;
                    })()}
                  </div>

                  <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-primary transition-colors duration-300">
                    {str(reason.title)}
                  </h3>
                  <p className="text-slate-500 text-[15px] leading-[1.7] flex-1">
                    {str(reason.description)}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}

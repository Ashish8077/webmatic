export interface ContactContentProps {
  heading?: string;
  description?: string;
  privacyNote?: string;
}

import { motion } from "motion/react";

export function ContactContent({ heading, description, privacyNote }: ContactContentProps) {
  const descriptionParagraphs =
    description
      ?.split("\n")
      .filter((paragraph) => paragraph.trim().length > 0) ?? [];

  const staggerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="mb-8 text-left">
        <motion.div 
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerVariants}
          className="mb-4"
        >
          <span className="text-[13px] font-bold text-orange-500 uppercase tracking-[0.15em]">
            Get In Touch
          </span>
        </motion.div>
        
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerVariants}
        >
          <h2 className="text-[32px] sm:text-[40px] font-bold text-navy leading-[1.1] tracking-tight mb-4">
            {heading || "Ready to Grow"}
          </h2>
          <div className="h-1 w-12 bg-orange-500 rounded-full mb-6"></div>
        </motion.div>
      </div>

      <motion.div 
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerVariants}
        className="text-[16px] leading-[1.7] text-slate-500 space-y-5 text-left font-normal"
      >
        {descriptionParagraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
        {(privacyNote || !description) && (
          <p className="text-[14px] text-slate-500 italic pt-4 mt-6 border-t border-slate-100">
            {privacyNote || "Note: Your details are kept strictly confidential as per our Privacy Policy."}
          </p>
        )}
      </motion.div>
    </div>
  );
}

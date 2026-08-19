"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ContactCtaProps } from "./types";
import { ContactContent } from "./contact-content";
import { ContactForm } from "./contact-form";
import { ContactSuccess } from "./contact-success";

export function ContactCta({
  heading,
  description,
  privacyNote,
  successMessage,
  submitButtonText = "Send",
  showCompanyField = false,
  showMessageField = true,
  className = "",
  onSubmit,
}: ContactCtaProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section className={`w-full bg-slate-50 py-16 lg:py-24 overflow-hidden ${className}`}>
      <div className="relative z-10 mx-auto max-w-[1170px] px-5 sm:px-8">
        <motion.div 
          variants={shouldReduceMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-200"
        >
          {/* Left Content Area (White) */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white">
            <ContactContent heading={heading} description={description} privacyNote={privacyNote} />
          </div>

          {/* Right Form Area (Light Grey) */}
          <div className="w-full lg:w-1/2 bg-slate-50 p-8 sm:p-12 lg:p-16 border-t lg:border-t-0 lg:border-l border-slate-100">
            {isSuccess ? (
              <ContactSuccess onReset={() => setIsSuccess(false)} successMessage={successMessage} />
            ) : (
              <ContactForm
                submitButtonText={submitButtonText}
                showCompanyField={showCompanyField}
                showMessageField={showMessageField}
                onSuccess={() => setIsSuccess(true)}
                onSubmitProp={onSubmit}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

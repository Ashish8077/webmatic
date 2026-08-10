"use client";

import { useState } from "react";
import type { ContactCtaProps } from "./types";
import { ContactContent } from "./contact-content";
import { ContactForm } from "./contact-form";
import { ContactSuccess } from "./contact-success";

export function ContactCta({
  heading,
  description,
  privacyNote,
  submitButtonText = "Send",
  showCompanyField = false,
  showMessageField = true,
  className = "",
  onSubmit,
}: ContactCtaProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <section className={`w-full bg-white py-16 ${className}`}>
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
          
          {/* Left Content Area */}
          <ContactContent heading={heading} description={description} privacyNote={privacyNote} />

          {/* Right Form Area */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 bg-slate-50">
            {isSuccess ? (
              <ContactSuccess onReset={() => setIsSuccess(false)} />
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
        </div>
      </div>
    </section>
  );
}

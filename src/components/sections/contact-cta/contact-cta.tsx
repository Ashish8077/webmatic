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
  showServiceField = true,
  showMessageField = true,
  className = "",
  onSubmit,
}: ContactCtaProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <section className={`w-full bg-white py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row min-h-[600px] border border-slate-200">
          
          {/* Left Content Area */}
          <ContactContent heading={heading} description={description} privacyNote={privacyNote} />

          {/* Right Form Area */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 bg-[#f4f5f7]">
            {isSuccess ? (
              <ContactSuccess onReset={() => setIsSuccess(false)} />
            ) : (
              <ContactForm
                submitButtonText={submitButtonText}
                showCompanyField={showCompanyField}
                showServiceField={showServiceField}
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

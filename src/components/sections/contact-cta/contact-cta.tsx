"use client";

import { useState } from "react";
import clsx from "clsx";
import type { ContactCtaProps } from "./types";
import { ContactForm } from "./contact-form";
import { ContactSuccess } from "./contact-success";

export function ContactCta({
  badge,
  heading,
  description,
  privacyNote,
  successMessage,
  submitButtonText = "Send",
  map,
  paddingTop = "xl",
  paddingBottom = "xl",
  backgroundVariant = "white",
  containerVariant = "default",
  showCompanyField = false,
  showMessageField = true,
  className = "",
  onSubmit,
}: ContactCtaProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const descriptionParagraphs =
    description
      ?.split("\n")
      .filter((paragraph) => paragraph.trim().length > 0) ?? [];

  const paddingClasses = clsx(
    paddingTop === "xl" && "pt-16 lg:pt-24",
    paddingBottom === "xl" && "pb-16 lg:pb-24",
    backgroundVariant === "slate" && "bg-slate-50",
    backgroundVariant === "white" && "bg-white",
    backgroundVariant === "green" && "bg-green-50"
  );

  return (
    <section className={clsx("w-full", paddingClasses, className)}>
      <div className={clsx("mx-auto px-5 sm:px-8", containerVariant === "default" ? "max-w-7xl" : "max-w-[1400px]")}>
        <div className="flex flex-col lg:flex-row min-h-[600px] border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
          
          {/* Left Area (Form & Content) - 60% */}
          <div className="w-full lg:w-[60%] p-8 sm:p-12 lg:p-16 flex flex-col bg-white">
            <div className="mb-10">
              {badge && (
                <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-orange-600 bg-orange-100 rounded-full">
                  {badge}
                </div>
              )}
              <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold text-[#1a233a] mb-4 leading-tight">
                {heading || "Request a Call Back"}
              </h2>
              {/* Orange Accent Line */}
              <div className="h-[3px] w-20 bg-orange-500 mb-6 rounded-full"></div>
              
              <div className="text-[16px] leading-[1.8] text-slate-600 space-y-4">
                {descriptionParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="flex-grow">
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
            
            {/* Privacy Note positioned at the bottom of the form */}
            {!isSuccess && (privacyNote || !description) && (
              <div className="mt-6 pt-6 border-t border-slate-100 text-[14px] text-slate-500">
                {privacyNote || "Note: Your details are kept strictly confidential as per our Privacy Policy."}
              </div>
            )}
          </div>

          {/* Right Area (Map) - 40% */}
          <div className="w-full lg:w-[40%] min-h-[400px] lg:min-h-full bg-slate-100 relative">
            {map?.embedUrl ? (
              <iframe
                src={map.embedUrl}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-slate-100">
                <svg className="w-16 h-16 mb-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>Location map will appear here</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}

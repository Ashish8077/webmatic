"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  contactFormSchema,
  useSubmitContact,
  type ContactFormData,
} from "@/features/contact";
import { CONTACT_ERROR_MESSAGES } from "@/features/contact/constants/error-messages";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState, useRef, useEffect } from "react";

export interface ContactFormProps {
  submitButtonText?: string;
  showCompanyField?: boolean;
  showMessageField?: boolean;
  successMessage?: string;
  errorMessage?: string;
  privacyText?: string;
  onSuccess?: () => void;
  onSubmitProp?: (data: ContactFormData) => Promise<void>;
}

export function ContactForm({
  submitButtonText = "Send",
  showCompanyField = false,
  showMessageField = true,
  successMessage = "Thank you! We have received your message and will get back to you shortly.",
  errorMessage = CONTACT_ERROR_MESSAGES.UNEXPECTED,
  privacyText,
  onSuccess,
  onSubmitProp,
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const { mutateAsync, isPending, isError, error, isSuccess, reset: resetMutation } = useSubmitContact();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaError, setRecaptchaError] = useState("");
  const successRef = useRef<HTMLDivElement>(null);
  
  // Focus success message on successful submission
  useEffect(() => {
    if (isSuccess && successRef.current) {
      successRef.current.focus();
    }
  }, [isSuccess]);

  const onSubmit = async (data: ContactFormData) => {
    setRecaptchaError("");
    resetMutation(); // Clear previous mutation state

    if (!executeRecaptcha) {
      setRecaptchaError("Security verification is still loading. Please try again in a moment.");
      return;
    }

    try {
      const token = await executeRecaptcha("contact_form_submit");
      
      const payload = { ...data, recaptchaToken: token };

      if (onSubmitProp) {
        // Typically this is only used if the parent completely overrides behavior,
        // but since we are migrating to API, we'll keep the prop intact.
        await onSubmitProp(data);
      } else {
        await mutateAsync(payload);
        reset(); // reset RHF
      }
      onSuccess?.();
    } catch (err) {
      console.error("Failed to submit contact form", err);
    }
  };

  // Clear success/error states when user starts editing again
  const handleInputInteraction = () => {
    if (isSuccess || isError || recaptchaError) {
      resetMutation();
      setRecaptchaError("");
    }
  };

  const inputClasses =
    "w-full bg-white border border-transparent focus:border-orange-500 focus:ring-0 px-4 py-3 text-[14px] text-slate-700 outline-none transition-colors shadow-sm placeholder-slate-300  rounded-lg ";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-busy={isPending} onChange={handleInputInteraction}>
      
      {isSuccess && (
        <div 
          ref={successRef}
          tabIndex={-1}
          aria-live="polite"
          className="p-4 bg-green-50 text-green-700 text-[14px] font-medium border border-green-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
        >
          {successMessage}
        </div>
      )}

      {isError && (
        <div aria-live="polite" className="p-3 bg-red-50 text-red-600 text-[14px] font-medium border border-red-100 rounded-lg">
          {error?.message || errorMessage}
        </div>
      )}

      {recaptchaError && (
        <div aria-live="polite" className="p-3 bg-yellow-50 text-yellow-700 text-[14px] font-medium border border-yellow-200 rounded-lg">
          {recaptchaError}
        </div>
      )}

      <div className="space-y-1.5">
        <label
          htmlFor="name"
          className="text-[14px] font-medium text-[#4a5568]"
        >
          Your Name *
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          placeholder="John Doe"
          disabled={isPending}
          className={`${inputClasses} ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>



      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="text-[14px] font-medium text-[#4a5568]"
        >
          Your Mail *
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          placeholder="Email *"
          disabled={isPending}
          className={`${inputClasses} ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="phone"
          className="text-[14px] font-medium text-[#4a5568]"
        >
          Your Phone Number *
        </label>
        <input
          {...register("phone")}
          id="phone"
          type="tel"
          placeholder="Phone *"
          disabled={isPending}
          className={`${inputClasses} ${errors.phone ? "border-red-500" : ""}`}
        />
        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      {showCompanyField && (
        <div className="space-y-1.5">
          <label
            htmlFor="company"
            className="text-[14px] font-medium text-[#4a5568]"
          >
            Company
          </label>
          <input
            {...register("company")}
            id="company"
            type="text"
            placeholder="Company Name"
            disabled={isPending}
            className={`${inputClasses} ${errors.company ? "border-red-500" : ""}`}
          />
          {errors.company && (
            <p className="text-xs text-red-500 mt-1">
              {errors.company.message}
            </p>
          )}
        </div>
      )}

      {showMessageField && (
        <div className="space-y-1.5">
          <label
            htmlFor="message"
            className="text-[14px] font-medium text-[#4a5568]"
          >
            Message
          </label>
          <textarea
            {...register("message")}
            id="message"
            placeholder="Message"
            rows={3}
            disabled={isPending}
            className={`${inputClasses} resize-none ${
              errors.message ? "border-red-500" : ""
            }`}
          />
          {errors.message && (
            <p className="text-xs text-red-500 mt-1">
              {errors.message.message}
            </p>
          )}
        </div>
      )}

      {privacyText && (
        <div className="text-[13px] text-gray-500 mt-4 leading-relaxed">
          {privacyText}
        </div>
      )}

      <div className="pt-2 text-left">
        <button
          type="submit"
          disabled={isPending || isSuccess}
          aria-disabled={isPending || isSuccess}
          className="bg-primary text-white px-10 py-3 text-[15px] flex items-center justify-center gap-2 font-semibold rounded-xl hover:bg-primary-hover transition-all duration-200 shadow-md shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
        >
          {isPending ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            submitButtonText
          )}
        </button>
      </div>
    </form>
  );
}

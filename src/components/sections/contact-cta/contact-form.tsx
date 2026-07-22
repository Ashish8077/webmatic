"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  contactFormSchema,
  serviceOptions,
  useSubmitContact,
  type ContactFormData,
} from "@/features/contact";

export interface ContactFormProps {
  submitButtonText?: string;
  showCompanyField?: boolean;
  showServiceField?: boolean;
  showMessageField?: boolean;
  onSuccess: () => void;
  onSubmitProp?: (data: ContactFormData) => Promise<void>;
}

export function ContactForm({
  submitButtonText = "Send",
  showCompanyField = false,
  showServiceField = true,
  showMessageField = true,
  onSuccess,
  onSubmitProp,
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      company: "",
      message: "",
    },
  });

  const { mutateAsync, isPending, isError } = useSubmitContact();

  const onSubmit = async (data: ContactFormData) => {
    try {
      if (onSubmitProp) {
        await onSubmitProp(data);
      } else {
        await mutateAsync(data);
      }
      onSuccess();
    } catch (error) {
      console.error("Failed to submit contact form", error);
    }
  };

  const inputClasses =
    "w-full bg-white border border-transparent focus:border-orange-500 focus:ring-0 px-4 py-3 text-[14px] text-slate-700 outline-none transition-colors shadow-sm placeholder-slate-300  rounded-lg ";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {isError && (
        <div className="p-3 bg-red-50 text-red-600 text-[14px] font-medium border border-red-100">
          Something went wrong. Please try again.
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

      {showServiceField && (
        <div className="space-y-1.5">
          <label
            htmlFor="service"
            className="text-[14px] font-medium text-[#4a5568]"
          >
            What services can we provide you?
          </label>
          <select
            {...register("service")}
            id="service"
            disabled={isPending}
            className={`font-semibold text-[#1a233a] appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%231a233a%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_1rem_center] ${inputClasses} ${
              errors.service ? "border-red-500" : ""
            }`}
          >
            <option value="">What services can we provide you?</option>
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-xs text-red-500 mt-1">
              {errors.service.message}
            </p>
          )}
        </div>
      )}

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

      <div className="pt-2 text-left">
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary text-white px-10 py-3 text-[15px] font-semibold rounded-xl hover:bg-primary-hover transition-all duration-200 shadow-md shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
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

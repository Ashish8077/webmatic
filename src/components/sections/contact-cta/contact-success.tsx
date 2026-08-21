import { Button } from "@/components/ui/button";

export interface ContactSuccessProps {
  onReset: () => void;
  successMessage?: string;
}

export function ContactSuccess({ onReset, successMessage }: ContactSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-8">
      <div className="h-16 w-16 bg-gradient-to-br from-green-100 to-green-50 text-green-600 rounded-full flex items-center justify-center mb-5 shadow-lg shadow-green-100">
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-[20px] font-bold text-navy mb-2">
        Message Sent Successfully!
      </h3>
      <p className="text-[15px] leading-[1.7] text-slate-600 mb-6 max-w-sm">
        {successMessage || "Thank you for reaching out. We'll get back to you shortly."}
      </p>
      <Button
        variant="primary"
        onClick={onReset}
        className="rounded-xl shadow-lg shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer px-7 py-3 text-[14px]"
      >
        Send another message
      </Button>
    </div>
  );
}

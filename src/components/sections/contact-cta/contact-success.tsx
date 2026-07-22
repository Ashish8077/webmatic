import { Button } from "@/components/ui/button";

export interface ContactSuccessProps {
  onReset: () => void;
}

export function ContactSuccess({ onReset }: ContactSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-[20px] font-bold text-[#1a233a] mb-2">
        Message Sent!
      </h3>
      <p className="text-[15px] text-slate-500 mb-6">
        We will get back to you shortly.
      </p>
      <Button
        variant="primary"
        onClick={onReset}
        className="rounded-xl shadow-md shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
      >
        Send another message
      </Button>
    </div>
  );
}

import { Plus, Minus } from "lucide-react";
import { FaqItem } from "./types";

interface FaqItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export function FaqItemComponent({ item, isOpen, onToggle, index }: FaqItemProps) {
  const contentId = `faq-content-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="group rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
      >
        <span className="text-lg font-semibold text-[#081a4b] group-hover:text-orange-500 transition-colors duration-200">
          {item.question}
        </span>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors duration-200">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-6 px-6 text-sm leading-relaxed text-slate-500">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Plus } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { FaqItem } from "./types";

interface FaqItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export function FaqItemComponent({ item, isOpen, onToggle, index }: FaqItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const contentId = `faq-content-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={`group relative rounded-xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "bg-slate-50 border-transparent shadow-sm"
          : "bg-white border-slate-200 hover:border-slate-300"
      }`}
    >
      {/* Active state left border accent */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 bg-primary transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        }`}
      />

      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <span
          className={`text-lg font-semibold transition-colors duration-200 ${
            isOpen ? "text-primary" : "text-[#081a4b] group-hover:text-primary"
          }`}
        >
          {item.question}
        </span>
        
        {/* Animated Icon (Plus to Cross) */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
            isOpen
              ? "bg-primary text-white"
              : "bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"
          }`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 300, damping: 20 }
            }
          >
            <Plus size={18} />
          </motion.div>
        </div>
      </button>

      {/* Accordion Content with layout-triggering height animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={buttonId}
            initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", stiffness: 300, damping: 25 },
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-6 pt-2 text-sm sm:text-base leading-relaxed text-slate-500">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

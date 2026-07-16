"use client";

import { useState } from "react";
import { FaqItem } from "./types";
import { FaqItemComponent } from "./faq-item";

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {items.map((item, index) => (
        <FaqItemComponent
          key={index}
          index={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}

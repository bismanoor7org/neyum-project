"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  columns?: 1 | 2;
}

export function FAQAccordion({ items, columns = 2 }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const half = Math.ceil(items.length / 2);
  const col1 = columns === 2 ? items.slice(0, half) : items;
  const col2 = columns === 2 ? items.slice(half) : [];

  function renderColumn(colItems: FAQItem[], offset: number) {
    return (
      <div className="divide-y divide-foreground/10">
        {colItems.map((item, i) => {
          const idx = offset + i;
          const isOpen = openIndex === idx;
          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="pr-4 text-navy">{item.question}</span>
                <Plus
                  className={`h-5 w-5 shrink-0 text-gold transition-transform ${isOpen ? "rotate-45" : ""}`}
                  strokeWidth={1.5}
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-foreground/70">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={columns === 2 ? "grid gap-8 md:grid-cols-2" : ""}>
      {renderColumn(col1, 0)}
      {columns === 2 && renderColumn(col2, half)}
    </div>
  );
}

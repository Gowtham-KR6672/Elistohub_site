"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <div
            key={item.q}
            className={cn(
              "rounded-3xl border transition-colors duration-300",
              isOpen ? "border-brand/25 bg-white shadow-[0_24px_50px_-36px_rgba(10,74,48,0.5)]" : "border-line bg-white/60 hover:bg-white",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 rounded-3xl px-6 py-5 text-left font-display text-[19px] font-bold text-deep sm:px-7 sm:py-6 sm:text-[21px]"
              >
                {item.q}
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300",
                    isOpen ? "rotate-45 bg-brand text-white" : "bg-tint text-brand",
                  )}
                >
                  <Icon name="plus" size={18} strokeWidth={2.5} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="max-w-3xl px-6 pb-6 leading-relaxed text-muted sm:px-7 sm:pb-7 sm:text-[17px]">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

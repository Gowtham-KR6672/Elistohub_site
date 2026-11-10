import type { CSSProperties } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/cn";

type Item = { label: string; highlight?: boolean; href?: string };

const pillClass = (item: Item) =>
  cn(
    "block rounded-full px-5 py-3 text-[15px] font-semibold whitespace-nowrap",
    item.highlight
      ? "bg-brand text-white"
      : "border border-line bg-white text-ink shadow-[0_6px_16px_-12px_rgba(10,74,48,0.4)]",
    item.href && "transition-colors hover:border-brand/40 hover:bg-tint hover:text-deep",
  );

function Pill({ item, hidden }: { item: Item; hidden?: boolean }) {
  if (item.href) {
    return (
      <Link to={item.href} className={pillClass(item)} tabIndex={hidden ? -1 : undefined}>
        {item.label}
      </Link>
    );
  }
  return <span className={pillClass(item)}>{item.label}</span>;
}

function Pills({ items, hidden }: { items: Item[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="animate-marquee flex shrink-0 gap-3 pr-3 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
    >
      {items.map((item) => (
        <li key={item.label}>
          <Pill item={item} hidden={hidden} />
        </li>
      ))}
    </ul>
  );
}

export function Marquee({
  items,
  reverse = false,
  duration = 45,
  label,
}: {
  items: Item[];
  reverse?: boolean;
  duration?: number;
  label: string;
}) {
  const style = {
    "--marquee-duration": `${duration}s`,
    "--marquee-direction": reverse ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <>
      {/* Animated version */}
      <div className="fade-x group flex overflow-hidden py-1 motion-reduce:hidden" style={style} role="region" aria-label={label}>
        <Pills items={items} />
        <Pills items={items} hidden />
      </div>
      {/* Static version for reduced motion */}
      <ul className="hidden flex-wrap justify-center gap-3 px-5 motion-reduce:flex" aria-label={label}>
        {items.map((item) => (
          <li key={item.label}>
            <Pill item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

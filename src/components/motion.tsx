import { useEffect, useRef, useState, type ReactNode } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Marks its subtree with data-inview so CSS can stagger `.inview-item` children.
 * Server HTML has no attribute, so content stays visible without JavaScript.
 */
export function InView({
  children,
  className,
  threshold = 0.3,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "false" | "true">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("true");
          io.disconnect();
        } else {
          setState((s) => (s === "idle" ? "false" : s));
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className} data-inview={state === "idle" ? undefined : state}>
      {children}
    </div>
  );
}

/** Counts up to `value` the first time it scrolls into view. Renders the final value on the server. */
export function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const run = { raf: 0, first: true };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (run.first) {
          run.first = false;
          // Already on screen when the page loaded: keep the final number.
          if (entry.isIntersecting) {
            io.disconnect();
            return;
          }
          setDisplay(0);
          return;
        }
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) run.raf = requestAnimationFrame(tick);
        };
        run.raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(run.raf);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

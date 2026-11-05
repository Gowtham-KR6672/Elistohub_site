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

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * The real number is shown until counting actually starts (so it is never stuck at 0 if the
 * observer or animation frames don't fire, e.g. during momentum scrolling on phones), and a
 * timer always finishes on the final value.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;

    const run = { raf: 0, timer: 0, started: false };

    const io = new IntersectionObserver(
      (entries) => {
        if (run.started || !entries.some((entry) => entry.isIntersecting)) return;
        run.started = true;
        io.disconnect();

        const startedAt = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, Math.max(0, (now - startedAt) / duration));
          setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) run.raf = requestAnimationFrame(tick);
        };
        setDisplay(0);
        run.raf = requestAnimationFrame(tick);
        // Safety net: land on the real number even if animation frames are paused or throttled.
        run.timer = window.setTimeout(() => {
          cancelAnimationFrame(run.raf);
          setDisplay(value);
        }, duration + 300);
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(run.raf);
      window.clearTimeout(run.timer);
      setDisplay(value);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

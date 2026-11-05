import { cn } from "@/lib/cn";

export function LogoMark({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const bg = tone === "light" ? "#0A4A30" : "#0E5A3B";
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="16" fill={bg} />
      <rect x="12" y="42" width="9" height="10" rx="3" fill="#139A55" />
      <rect x="27" y="36" width="9" height="16" rx="3" fill="#22B868" />
      <rect x="42" y="28" width="9" height="24" rx="3" fill="#3DD68C" />
      <path d="M9 44 C 24 42, 38 32, 51 13" fill="none" stroke={bg} strokeWidth="9" strokeLinecap="round" />
      <path d="M9 44 C 24 42, 38 32, 51 13" fill="none" stroke="#F5C518" strokeWidth="4.5" strokeLinecap="round" />
      <path
        d="M43 13 L52 11 L53 20"
        fill="none"
        stroke="#F5C518"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} className="size-9 shrink-0" />
      <span
        className={cn(
          "font-display text-[25px] font-extrabold leading-none tracking-[-0.045em]",
          tone === "light" ? "text-deep" : "text-white",
        )}
      >
        Elist<span className={tone === "light" ? "text-logo-yellow" : "text-sun"}>o</span>
        <span className={tone === "light" ? "text-brand" : "text-mint"}>hub</span>
      </span>
    </span>
  );
}

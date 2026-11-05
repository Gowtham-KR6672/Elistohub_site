import { Link } from "react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/icons";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("page-container", className)}>{children}</div>;
}

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.12em]",
        tone === "light" ? "border border-brand/15 bg-tint text-brand" : "border border-white/10 bg-white/5 text-sun",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", tone === "light" ? "bg-brand" : "bg-sun")} aria-hidden="true" />
      {children}
    </p>
  );
}

export function Highlight({ children, onLoad }: { children: ReactNode; onLoad?: boolean }) {
  return <span className={cn("highlight", onLoad && "highlight-load")}>{children}</span>;
}

export const headingXL =
  "font-display text-[clamp(2.25rem,4.4vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em]";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  tone = "light",
  className,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("reveal grid items-end gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-16", className)}>
      <div>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <Tag className={cn(headingXL, "mt-5", tone === "light" ? "text-deep" : "text-white")}>{title}</Tag>
      </div>
      {intro ? (
        <p className={cn("max-w-md text-lg leading-relaxed lg:pb-2", tone === "light" ? "text-muted" : "text-frost")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

const buttonBase =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.98]";

const buttonVariants = {
  primary:
    "bg-brand text-white shadow-[0_14px_30px_-12px_rgba(8,136,74,0.65)] hover:bg-deep hover:shadow-[0_18px_36px_-14px_rgba(10,74,48,0.7)]",
  yellow: "bg-sun text-deep shadow-[0_14px_30px_-14px_rgba(236,185,18,0.8)] hover:bg-logo-yellow",
  outline: "border border-line bg-white text-deep hover:border-brand/40 hover:bg-tint",
  light: "bg-white text-deep hover:bg-sun",
} as const;

const buttonSizes = {
  sm: "min-h-11 px-5 text-[15px]",
  md: "min-h-13 px-6 text-base",
  lg: "min-h-14 px-7 text-[17px]",
} as const;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...rest
}: Omit<ComponentProps<typeof Link>, "to"> & {
  href: string;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  arrow?: boolean;
}) {
  return (
    <Link to={href} className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)} {...rest}>
      {children}
      {arrow ? (
        <Icon name="arrow" size={18} strokeWidth={2.2} className="transition-transform duration-200 group-hover:translate-x-1" />
      ) : null}
    </Link>
  );
}

export function CheckItem({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <li className="flex items-start gap-3 font-medium">
      <span
        className={cn(
          "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full",
          tone === "light" ? "bg-tint text-brand" : "bg-white/10 text-sun",
        )}
      >
        <Icon name="check" size={14} strokeWidth={3} />
      </span>
      <span>{children}</span>
    </li>
  );
}

export function Pill({ children, active = false, className }: { children: ReactNode; active?: boolean; className?: string }) {
  return (
    <li
      className={cn(
        "rounded-full px-4 py-2 text-[15px] font-semibold transition-colors",
        active ? "bg-brand text-white" : "border border-line bg-white text-ink hover:border-brand/40 hover:bg-tint",
        className,
      )}
    >
      {children}
    </li>
  );
}

import { Link } from "react-router";
import { Accordion } from "@/components/accordion";
import { Icon, type IconName } from "@/components/icons";
import { CountUp } from "@/components/motion";
import { Container, Eyebrow, headingLG } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Outcome, QA, Stat } from "@/lib/pages";
import type { MarketplacePage } from "@/lib/site";

/** "Sound familiar?" list of problems the page solves. */
export function PainPoints({ items }: { items: string[] }) {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="pains-heading">
      <Container>
        <div className="reveal grid items-start gap-8 rounded-[32px] border border-line bg-white p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <h2 id="pains-heading" className={cn(headingLG, "text-deep")}>
            Sound familiar?
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl bg-sun-tint p-4 font-medium text-ink">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white text-gold">
                  <Icon name="close" size={13} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/** "What you get": a grid of 6 deliverables with icons. */
export function WhatYouGet({ items, heading = "What you get" }: { items: { icon: IconName; title: string; detail: string }[]; heading?: string }) {
  return (
    <section className="bg-off py-20 sm:py-24" aria-labelledby="gets-heading">
      <Container>
        <h2 id="gets-heading" className={cn(headingLG, "reveal text-deep")}>
          {heading}
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((item) => (
            <li
              key={item.title}
              className="reveal group rounded-[26px] border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_30px_60px_-34px_rgba(10,74,48,0.4)] sm:p-7"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-tint text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                <Icon name={item.icon} size={23} />
              </span>
              <h3 className="mt-5 font-display text-[21px] leading-snug font-bold text-deep">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Check-list version of "What you get", used on marketplace pages. */
export function TaskList({ heading, items }: { heading: string; items: string[] }) {
  return (
    <section className="bg-off py-20 sm:py-24" aria-labelledby="tasks-heading">
      <Container>
        <h2 id="tasks-heading" className={cn(headingLG, "reveal max-w-3xl text-deep")}>
          {heading}
        </h2>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item}
              className="reveal flex items-center gap-3.5 rounded-2xl border border-line bg-white p-5 font-semibold text-deep"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-tint text-brand">
                <Icon name="check" size={17} strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Deep-green results band: optional headline number plus three outcomes. */
export function OutcomesBand({ heading, stat, outcomes }: { heading: string; stat?: Stat; outcomes: Outcome[] }) {
  return (
    <section id="results" className="relative isolate overflow-hidden bg-deep py-20 text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_70%)]" />
        <div className="absolute -top-40 right-[-10%] size-[520px] rounded-full bg-brand/40 blur-[140px]" />
      </div>
      <Container>
        <h2 className={cn(headingLG, "reveal text-white")}>{heading}</h2>
        <div className={cn("mt-10 grid gap-4", stat ? "lg:grid-cols-[0.9fr_2fr]" : "")}>
          {stat ? (
            <div className="reveal flex flex-col justify-between rounded-[28px] bg-sun p-7 text-deep sm:p-8">
              <p className="font-display text-[clamp(3.5rem,6vw,5rem)] leading-none font-extrabold tracking-[-0.05em]">
                <CountUp value={stat.value} prefix="+" suffix="%" />
              </p>
              <div className="mt-6">
                <p className="text-lg font-bold">{stat.label}</p>
                <p className="mt-1 text-sm font-medium text-deep/70">Typical result for engagements like these</p>
              </div>
            </div>
          ) : null}
          <ul className="grid gap-4 md:grid-cols-3">
            {outcomes.map((o, i) => (
              <li key={o.title} className="reveal rounded-[28px] border border-white/10 bg-white/[0.05] p-7 backdrop-blur">
                <span className="font-display text-sm font-bold text-sun tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-[21px] leading-snug font-bold">{o.title}</h3>
                <p className="mt-2 leading-relaxed text-frost">{o.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/** "Questions? We’ve got answers." with an accordion. */
export function PageFaq({ items }: { items: QA[] }) {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="page-faq-heading">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="reveal">
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="page-faq-heading" className={cn(headingLG, "mt-5 text-deep")}>
            Questions? We’ve got answers.
          </h2>
        </div>
        <Accordion items={items} />
      </Container>
    </section>
  );
}

/** Grid of marketplace cards (code badge + name) linking to each marketplace page. */
export function MarketplaceGrid({ items, className }: { items: MarketplacePage[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {items.map((m) => (
        <li key={m.slug}>
          <Link
            to={m.path}
            className="group flex h-full items-center gap-3 rounded-2xl border border-line bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_20px_40px_-28px_rgba(10,74,48,0.5)]"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-deep font-display text-[14px] font-extrabold text-sun transition-colors group-hover:bg-brand group-hover:text-white">
              {m.code}
            </span>
            <span className="min-w-0 flex-1 font-semibold text-deep">{m.name}</span>
            <Icon name="arrow" size={16} className="shrink-0 text-brand transition-transform group-hover:translate-x-0.5" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

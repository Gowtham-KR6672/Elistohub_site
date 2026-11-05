import type { CSSProperties } from "react";
import { Icon } from "@/components/icons";
import { LogoMark } from "@/components/logo";
import { InView } from "@/components/motion";
import { Container, Eyebrow, Highlight, Pill, headingXL } from "@/components/ui";
import { cn } from "@/lib/cn";
import { commTools, reportingCadence, weeklyUpdate } from "@/lib/content";

const tagTone = {
  green: "bg-tint text-brand",
  yellow: "bg-sun-tint text-gold",
  outline: "border border-deep text-deep",
} as const;

function UpdateCard() {
  return (
    <InView className="relative mx-auto w-full max-w-[600px] lg:mr-0">
      <div className="absolute -inset-6 -z-10 rounded-[44px] bg-gradient-to-br from-mint/25 to-sun/25 blur-2xl" aria-hidden="true" />
      <div className="overflow-hidden rounded-[30px] border border-line bg-white shadow-[0_50px_100px_-44px_rgba(5,59,44,0.45)]">
        <div className="flex items-center justify-between gap-4 border-b border-line/70 px-5 py-4">
          <p className="font-bold text-deep"># weekly-updates</p>
          <p className="text-[13px] text-muted">Slack · ClickUp · email</p>
        </div>
        <div className="flex gap-4 p-5 sm:p-6">
          <LogoMark className="size-11 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[15px]">
              <strong className="text-deep">Elistohub team</strong>{" "}
              <span className="text-[13px] text-muted">· Weekly update</span>
            </p>
            <p className="mt-1.5 mb-4 font-semibold">Your week in 30 seconds</p>
            <ul className="flex flex-col gap-2.5 text-[14px]">
              {weeklyUpdate.map((row, i) => (
                <li
                  key={row.text}
                  className="inview-item flex items-center gap-3"
                  style={{ "--d": `${150 + i * 180}ms` } as CSSProperties}
                >
                  <span
                    className={cn(
                      "w-[84px] shrink-0 rounded-md py-1 text-center text-[11px] font-extrabold tracking-[0.06em] uppercase",
                      tagTone[row.tone],
                    )}
                  >
                    {row.tag}
                  </span>
                  <span className="min-w-0">{row.text}</span>
                </li>
              ))}
            </ul>
            <div
              className="inview-item mt-5 flex items-center gap-3 rounded-2xl border border-line p-3"
              style={{ "--d": "900ms" } as CSSProperties}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sun-tint text-gold">
                <Icon name="file" size={20} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Monthly report - October.pdf</p>
                <p className="text-xs text-muted">Sales · Ads · Inventory · Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InView>
  );
}

export function Reporting() {
  return (
    <section id="reporting" className="overflow-hidden bg-off py-24 sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal">
          <Eyebrow>Communication &amp; reporting</Eyebrow>
          <h2 className={cn(headingXL, "mt-5 text-deep")}>
            Slack? ClickUp? Email? <Highlight>We’ll plug right in.</Highlight>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            We work wherever you’re comfortable - no new apps, no extra logins, no chasing us for updates.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {commTools.map((tool) => (
              <Pill key={tool}>{tool}</Pill>
            ))}
            <Pill active>Whatever you like</Pill>
          </ul>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {reportingCadence.map((c) => (
              <div key={c.title} className="rounded-3xl border border-line bg-white p-6">
                <p
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-1 text-[11.5px] font-bold tracking-[0.08em] uppercase",
                    c.tone === "green" ? "bg-tint text-brand" : "bg-sun-tint text-gold",
                  )}
                >
                  {c.label}
                </p>
                <p className="mt-3 font-display text-[21px] font-bold text-deep">{c.title}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <UpdateCard />
      </Container>
    </section>
  );
}

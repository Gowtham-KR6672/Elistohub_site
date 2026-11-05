import type { CSSProperties } from "react";
import { Icon } from "@/components/icons";
import { LogoMark } from "@/components/logo";
import { InView } from "@/components/motion";
import { Container, Highlight, Pill, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/cn";
import { commTools, reportingCadence, techStack, weeklyUpdate } from "@/lib/content";

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

/** Tools + reporting, merged: "Your tools, your channels. We plug right in." (Our process page) */
export function ToolsAndReporting() {
  const rows = [
    ...techStack,
    { category: "Communication", tools: commTools, extra: "Whatever you like" },
  ];

  return (
    <section id="tools" className="overflow-hidden bg-off py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="Tools & how we work"
          title={
            <>
              Your tools, your channels. <Highlight>We plug right in.</Highlight>
            </>
          }
          intro="No learning curve on your dime and no new apps for you. We work inside the platforms you already run on, and talk to you wherever you’re comfortable."
        />

        <div className="mt-14 overflow-hidden rounded-[32px] border border-line bg-white">
          {rows.map((group, i) => (
            <div
              key={group.category}
              className="reveal grid gap-5 border-line p-6 transition-colors hover:bg-off sm:p-8 md:grid-cols-[280px_1fr] md:items-center [&:not(:first-child)]:border-t"
            >
              <div className="flex items-center gap-4">
                <span className="font-display text-sm font-bold text-brand tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-[20px] font-bold text-deep">{group.category}</h3>
                  <p className="text-sm text-muted">{group.tools.length} tools</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {group.tools.map((tool) => (
                  <Pill key={tool}>{tool}</Pill>
                ))}
                {group.extra ? <Pill active>{group.extra}</Pill> : null}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-5 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {reportingCadence.map((c) => (
              <div key={c.title} className="reveal rounded-3xl border border-line bg-white p-6 sm:p-7">
                <p
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-1 text-[11.5px] font-bold tracking-[0.08em] uppercase",
                    c.tone === "green" ? "bg-tint text-brand" : "bg-sun-tint text-gold",
                  )}
                >
                  {c.label}
                </p>
                <h3 className="mt-3 font-display text-[22px] font-bold text-deep">{c.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{c.detail}</p>
              </div>
            ))}
          </div>
          <UpdateCard />
        </div>
      </Container>
    </section>
  );
}

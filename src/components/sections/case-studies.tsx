import { CheckItem, Container, Highlight, SectionHeader } from "@/components/ui";
import { CountUp } from "@/components/motion";
import { cn } from "@/lib/cn";
import { caseStudies, type CaseStudy } from "@/lib/content";

const artBg: Record<CaseStudy["art"], string> = {
  ring: "bg-sun-tint",
  sofa: "bg-tint",
  hanger: "bg-deep",
};

function Art({ art }: { art: CaseStudy["art"] }) {
  if (art === "ring") {
    return (
      <svg width="110" height="110" viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="48" cy="58" r="24" fill="none" stroke="#7F5D00" strokeWidth="6" />
        <path d="M36 34 48 18 60 34 48 40Z" fill="#08884A" />
      </svg>
    );
  }
  if (art === "sofa") {
    return (
      <svg width="128" height="128" viewBox="0 0 96 96" aria-hidden="true">
        <rect x="22" y="30" width="52" height="20" rx="8" fill="#16A85C" />
        <rect x="14" y="44" width="68" height="20" rx="8" fill="#08884A" />
        <rect x="8" y="42" width="12" height="24" rx="5" fill="#0A4A30" />
        <rect x="76" y="42" width="12" height="24" rx="5" fill="#0A4A30" />
        <path d="M20 66v8M76 66v8" stroke="#0A4A30" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="128" height="128" viewBox="0 0 96 96" aria-hidden="true">
      <path
        d="M42 30a6 6 0 1 1 6 6v6L14 64h68L48 42"
        fill="none"
        stroke="#F5C518"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="bg-off py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="Case studies"
          title={
            <>
              Brands that stopped doing it <Highlight>all themselves.</Highlight>
            </>
          }
          intro="Client names stay confidential. Figures show typical results for engagements like these."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <article
              key={c.title}
              className="reveal group flex flex-col overflow-hidden rounded-[30px] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_80px_-44px_rgba(10,74,48,0.5)]"
            >
              <div className={cn("relative grid h-52 place-items-center overflow-hidden", artBg[c.art])}>
                {c.art === "hanger" ? (
                  <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
                ) : (
                  <div className="bg-dots absolute inset-0 opacity-60" aria-hidden="true" />
                )}
                <div className="relative transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                  <Art art={c.art} />
                </div>
                <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1.5 text-[13px] font-bold text-deep">
                  {c.platform}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-7">
                <p className="text-[12.5px] font-bold tracking-[0.1em] text-brand uppercase">{c.category}</p>
                <h3 className="font-display text-[24px] leading-[1.15] font-bold tracking-[-0.02em] text-deep">{c.title}</h3>
                <p className="text-muted">
                  <strong className="text-deep">The problem:</strong> {c.problem}
                </p>
                <ul className="flex flex-col gap-2.5 text-[15px]">
                  {c.work.map((w) => (
                    <CheckItem key={w}>{w}</CheckItem>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-end gap-x-3 gap-y-2 border-t border-line pt-5">
                  <span className="font-display text-[44px] leading-none font-extrabold tracking-[-0.05em] text-brand">
                    <CountUp value={c.metric} prefix="+" suffix="%" />
                  </span>
                  <span className="pb-1 text-sm text-muted">{c.metricLabel}</span>
                  <span className="ml-auto mb-1 rounded-full bg-tint px-2.5 py-1 text-xs font-bold text-brand">
                    Typical result
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

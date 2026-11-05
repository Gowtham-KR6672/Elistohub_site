import { Icon } from "@/components/icons";
import { CheckItem, Container, Highlight, SectionHeader } from "@/components/ui";
import { webPlatforms, webServices } from "@/lib/content";

function BrowserBuild() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_50px_-30px_rgba(10,74,48,0.45)]" aria-hidden="true">
      <div className="flex items-center gap-1.5 border-b border-line bg-off px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#F87171]" />
        <span className="size-2.5 rounded-full bg-sun" />
        <span className="size-2.5 rounded-full bg-fresh" />
        <span className="ml-3 h-5 flex-1 rounded-full bg-white ring-1 ring-line" />
      </div>
      <div className="grid gap-3 p-4">
        <div className="flex h-20 items-end rounded-xl bg-gradient-to-br from-deep to-brand p-3">
          <span className="h-2.5 w-1/3 rounded-full bg-sun" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="aspect-square rounded-lg bg-tint transition-colors duration-300 group-hover:bg-sun-tint" />
              <div className="h-2 w-3/4 rounded-full bg-line" />
              <div className="h-2 w-1/3 rounded-full bg-brand/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MaintainPanel() {
  const rows = [
    { w: "w-[92%]", tone: "bg-fresh" },
    { w: "w-[78%]", tone: "bg-mint" },
    { w: "w-[64%]", tone: "bg-sun" },
  ];
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_24px_50px_-30px_rgba(10,74,48,0.45)]" aria-hidden="true">
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 80 48" className="h-14 w-24">
          <path d="M8 44a32 32 0 0 1 64 0" fill="none" stroke="#E6EBE8" strokeWidth="8" strokeLinecap="round" />
          <path
            d="M8 44a32 32 0 0 1 64 0"
            fill="none"
            stroke="#22B868"
            strokeWidth="8"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="100"
            strokeDashoffset="12"
          />
        </svg>
        <div className="flex-1 space-y-2.5">
          {rows.map((r, i) => (
            <div key={i} className="h-2 rounded-full bg-off">
              <div className={`h-2 rounded-full ${r.w} ${r.tone} origin-left transition-transform duration-500 group-hover:scale-x-105`} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["bg-tint", "bg-sun-tint", "bg-tint"].map((c, i) => (
          <span key={i} className={`flex items-center gap-1.5 rounded-full ${c} px-2.5 py-1`}>
            <Icon name="check" size={12} strokeWidth={3} className="text-brand" />
            <span className="h-1.5 w-10 rounded-full bg-deep/20" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** `headerless`: hide the section headline when the page hero already shows it. */
export function Websites({ headerless = false }: { headerless?: boolean }) {
  return (
    <section id="websites" className="bg-off py-24 sm:py-32">
      <Container>
        {headerless ? null : (
          <SectionHeader
            className="mb-14"
            eyebrow="Ecommerce website development"
            title={
              <>
                Websites we build, fix &amp; <Highlight>lovingly babysit.</Highlight>
              </>
            }
            intro="New store, slow store or “can you just change this one thing” store - our web team has you covered."
          />
        )}

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {webPlatforms.map((p) => (
            <li
              key={p.name}
              className="reveal group flex items-center gap-4 rounded-3xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <Icon name="store" size={22} />
              </span>
              <div>
                <p className="font-display text-lg font-bold text-deep">{p.name}</p>
                <p className="text-sm text-muted">{p.detail}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {webServices.map((s, i) => (
            <article
              key={s.title}
              className="reveal group grid gap-8 rounded-[32px] border border-line bg-white p-7 transition-shadow duration-300 hover:shadow-[0_30px_60px_-36px_rgba(10,74,48,0.45)] sm:grid-cols-[1fr_0.9fr] sm:p-9 lg:grid-cols-1 xl:grid-cols-[1fr_0.85fr]"
            >
              <div>
                <p className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.12em] text-brand uppercase">
                  <Icon name={i === 0 ? "code" : "wrench"} size={16} />
                  {s.label}
                </p>
                <h3 className="mt-4 font-display text-[26px] leading-tight font-bold tracking-[-0.02em] text-deep">{s.title}</h3>
                <p className="mt-3 text-muted">{s.description}</p>
                <ul className="mt-6 flex flex-col gap-3 text-[15px] text-ink">
                  {s.points.map((p) => (
                    <CheckItem key={p}>{p}</CheckItem>
                  ))}
                </ul>
              </div>
              <div className="flex items-center">
                <div className="w-full rounded-3xl bg-gradient-to-br from-tint to-sun-tint p-4 sm:p-5">
                  {i === 0 ? <BrowserBuild /> : <MaintainPanel />}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Icon } from "@/components/icons";
import { CountUp } from "@/components/motion";
import { NumberedSteps } from "@/components/steps";
import { ButtonLink, CheckItem, Container, Eyebrow, Highlight, SectionHeader, headingXL } from "@/components/ui";
import { cn } from "@/lib/cn";
import { audiences, clientNotice, handOverSigns, homeResults, startSteps, whyItems } from "@/lib/content";

/** "Results first": three headline numbers. */
export function Results() {
  return (
    <section id="results" className="relative isolate overflow-hidden bg-deep py-24 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_70%)]" />
        <div className="absolute -top-40 left-[-10%] size-[560px] rounded-full bg-brand/40 blur-[140px]" />
        <div className="absolute right-[-10%] bottom-[-30%] size-[460px] rounded-full bg-sun/10 blur-[140px]" />
      </div>
      <Container>
        <SectionHeader
          tone="dark"
          eyebrow="Results first"
          title="What changes when we take over."
          intro="Typical results for engagements like these. Client names stay confidential."
        />
        <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:gap-5">
          {homeResults.map((r) => (
            <li
              key={r.label}
              className="reveal group rounded-[30px] border border-white/10 bg-white/[0.05] p-7 backdrop-blur transition-colors duration-300 hover:bg-white/[0.08] sm:p-9"
            >
              <p className="font-display text-[clamp(3.5rem,6vw,5.5rem)] leading-none font-extrabold tracking-[-0.05em] text-sun">
                <CountUp value={r.value} prefix="+" suffix="%" />
              </p>
              <p className="mt-5 font-display text-[22px] font-bold">{r.label}</p>
              <p className="mt-1.5 text-frost">{r.detail}</p>
            </li>
          ))}
        </ul>
        <ButtonLink href="/#work" variant="light" arrow className="reveal mt-10">
          Read the case studies
        </ButtonLink>
      </Container>
    </section>
  );
}

/** "Who we help": audiences plus the signs it's time to outsource. */
export function WhoWeHelp() {
  return (
    <section id="fit" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="Who we help"
          title={
            <>
              Built for brands that <Highlight>sell online.</Highlight>
            </>
          }
          intro="From your first marketplace to your tenth. If any of the signs below sound familiar, we should talk."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {audiences.map((a) => (
              <li
                key={a.title}
                className="reveal group rounded-[26px] border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_30px_60px_-34px_rgba(10,74,48,0.4)] sm:p-7"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon name={a.icon} size={23} />
                </span>
                <h3 className="mt-5 font-display text-[22px] font-bold text-deep">{a.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{a.detail}</p>
              </li>
            ))}
          </ul>
          <div className="reveal relative overflow-hidden rounded-[30px] bg-sun-tint p-7 sm:p-9">
            <div className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full bg-sun/40 blur-3xl" aria-hidden="true" />
            <h3 className="relative font-display text-[24px] leading-tight font-bold text-deep">Signs it’s time to hand it over</h3>
            <ul className="relative mt-6 flex flex-col gap-4 text-[16px] text-ink">
              {handOverSigns.map((sign) => (
                <CheckItem key={sign}>{sign}</CheckItem>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** "Why brands pick Elistohub". */
export function WhyUs() {
  return (
    <section id="why" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="Why brands pick Elistohub"
          title={
            <>
              Everything you’d ask an agency, <Highlight>answered up front.</Highlight>
            </>
          }
          intro="Who works on my store? How will I know what’s happening? What does it cost? Here’s how we work."
        />
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {whyItems.map((item, i) => (
            <li
              key={item.title}
              className={cn(
                "reveal group relative overflow-hidden rounded-[28px] p-7 transition-all duration-300 hover:-translate-y-1 sm:p-8",
                i < 2 ? "lg:col-span-3" : "lg:col-span-2",
                i === 0
                  ? "bg-deep text-white md:col-span-2 lg:col-span-3"
                  : "border border-line bg-white hover:border-brand/30 hover:shadow-[0_30px_60px_-34px_rgba(10,74,48,0.4)]",
              )}
            >
              {i === 0 ? (
                <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,black,transparent_70%)]" aria-hidden="true" />
              ) : null}
              <span
                className={cn(
                  "relative grid size-12 place-items-center rounded-2xl transition-colors",
                  i === 0 ? "bg-deep-2 text-sun" : "bg-tint text-brand group-hover:bg-brand group-hover:text-white",
                )}
              >
                <Icon name={item.icon} size={23} />
              </span>
              <h3 className={cn("relative mt-6 font-display text-[22px] leading-snug font-bold", i === 0 ? "text-white" : "text-deep")}>
                {item.title}
              </h3>
              <p className={cn("relative mt-2 leading-relaxed", i === 0 ? "text-frost" : "text-muted")}>{item.detail}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** "How we start": the first weeks in four steps. */
export function HowWeStart() {
  return (
    <section id="start" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="How we start"
          title={
            <>
              From first call to <Highlight>first results.</Highlight>
            </>
          }
          intro="No long onboarding. Here’s what the first weeks look like."
        />
        <NumberedSteps steps={startSteps} className="mt-14" />
        <ButtonLink href="/our-process" variant="outline" arrow className="reveal mt-10">
          See our full process and tools
        </ButtonLink>
      </Container>
    </section>
  );
}

/** "Working with us": what clients notice first. */
export function WorkingWithUs() {
  return (
    <section id="reviews" className="bg-tint py-24 sm:py-28">
      <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="reveal lg:sticky lg:top-28">
          <Eyebrow>Working with us</Eyebrow>
          <h2 className={cn(headingXL, "mt-5 text-deep")}>
            What clients <Highlight>notice first.</Highlight>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            The three things clients mention most once we’re running their store.
          </p>
        </div>
        <ul className="flex flex-col gap-4">
          {clientNotice.map((item, i) => (
            <li key={item.title} className="reveal flex gap-5 rounded-[26px] bg-white p-6 shadow-[0_20px_50px_-36px_rgba(10,74,48,0.5)] sm:p-8">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-deep text-sun">
                <Icon name={item.icon} size={22} strokeWidth={i === 0 ? 2.6 : 2} />
              </span>
              <div>
                <h3 className="font-display text-[22px] font-bold text-deep">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

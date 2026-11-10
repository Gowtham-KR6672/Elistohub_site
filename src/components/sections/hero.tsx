import { Link } from "react-router";
import type { CSSProperties } from "react";
import { Icon } from "@/components/icons";
import { ButtonLink, CheckItem, Container, Highlight } from "@/components/ui";
import { cn } from "@/lib/cn";
import { heroChecks, heroFeed } from "@/lib/content";

function ResultBadge() {
  return (
    <div className="absolute -top-10 -right-8 z-20 hidden size-[136px] sm:block" aria-hidden="true">
      <div className="relative grid size-full place-items-center rounded-full bg-sun shadow-[0_20px_40px_-16px_rgba(5,59,44,0.45)]">
        <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0 size-full text-deep">
          <defs>
            <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text className="fill-current text-[10px] font-bold uppercase">
            <textPath href="#badge-circle" textLength="286" lengthAdjust="spacing">
              More orders • More orders • More orders •
            </textPath>
          </text>
        </svg>
        <span className="font-display text-[32px] leading-none font-extrabold tracking-[-0.05em] text-deep">+40%</span>
      </div>
    </div>
  );
}

function ActivityCard() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] xl:mr-0 2xl:max-w-[580px]">
      <ResultBadge />
      <div
        className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-mint/30 via-white/0 to-sun/30 blur-2xl"
        aria-hidden="true"
      />
      <div className="relative rounded-[30px] border border-line/80 bg-white/90 p-5 shadow-[0_50px_100px_-40px_rgba(5,59,44,0.45)] backdrop-blur sm:p-6">
        <div className="flex items-center justify-between gap-4 border-b border-line/70 pb-4">
          <div>
            <p className="font-display text-[19px] font-bold text-deep">While you were sleeping</p>
            <p className="text-[13px] text-muted">Your Elistohub team, overnight</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1.5 text-xs font-bold text-brand">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-fresh opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-fresh" />
            </span>
            Live
          </span>
        </div>
        <ul className="divide-y divide-line/70">
          {heroFeed.map((item, i) => {
            const green = item.tone === "green";
            return (
              <li
                key={item.code}
                className="animate-feed-in flex items-center gap-3.5 py-3.5"
                style={{ animationDelay: `${450 + i * 140}ms` } as CSSProperties}
              >
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-xl text-[13px] font-bold",
                    green ? "bg-tint text-brand" : "bg-sun-tint text-gold",
                  )}
                >
                  {item.code}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-ink">{item.title}</p>
                  <p className="truncate text-[13px] text-muted">{item.detail}</p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-xs font-bold",
                    green ? "bg-tint text-brand" : "bg-sun-tint text-gold",
                  )}
                >
                  {item.status}
                </span>
              </li>
            );
          })}
        </ul>

        <div
          className="animate-feed-in relative mt-2 flex items-center gap-3.5 overflow-hidden rounded-2xl bg-deep px-4 py-3.5 text-white"
          style={{ animationDelay: `${450 + heroFeed.length * 140}ms` } as CSSProperties}
        >
          <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
          <span className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-sun">
            <Icon name="file" size={20} />
          </span>
          <div className="relative min-w-0 flex-1">
            <p className="text-[15px] leading-snug font-semibold">Weekly updates + monthly reports</p>
            <p className="truncate text-[13px] text-frost">Your week in 30 seconds</p>
          </div>
          <span className="relative hidden shrink-0 rounded-full bg-sun px-2.5 py-1 text-xs font-bold text-deep 2xl:inline-flex">
            Every week
          </span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate -mt-[72px] overflow-hidden pt-[72px]">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-32 right-[-8%] size-[560px] rounded-full bg-mint/25 blur-[120px]" />
        <div className="absolute top-[45%] left-[-12%] size-[440px] rounded-full bg-sun/20 blur-[120px]" />
      </div>

      <Container className="grid items-center gap-16 pt-12 pb-24 xl:grid-cols-[1.2fr_0.8fr] xl:gap-12 lg:pt-20 lg:pb-32">
        <div className="animate-fade-up">
          <Link
            to="/virtual-assistant"
            className="group inline-flex items-center gap-3 rounded-full border border-brand/15 bg-white/80 p-1 pr-4 text-sm font-semibold text-deep shadow-sm backdrop-blur transition-colors hover:border-brand/40"
          >
            <span className="rounded-full bg-brand px-2.5 py-1 text-xs tracking-wide text-white">NEW</span>
            Pay-as-you-go ecommerce VAs
            <Icon name="arrow" size={16} className="text-brand transition-transform group-hover:translate-x-0.5" />
          </Link>

          <h1 className="mt-7 font-display text-[clamp(2.5rem,5.4vw,5.4rem)] leading-[0.98] font-extrabold tracking-[-0.05em] text-deep">
            More sales on every channel. <Highlight onLoad>Less work on your plate.</Highlight>
          </h1>

          <p className="mt-7 max-w-[600px] text-lg leading-relaxed text-muted sm:text-[19px] 2xl:max-w-[660px] 2xl:text-[21px]">
            We run the day-to-day of your online store: marketplaces, listings, orders, ads, AI support, websites and
            marketing. You get more orders, cleaner operations and a team that owns the results.
          </p>

          <div className="mt-10 flex flex-wrap gap-3.5">
            <ButtonLink href="/#contact" size="lg" arrow>
              Book a free call
            </ButtonLink>
            <ButtonLink href="/#results" size="lg" variant="yellow">
              See our results
            </ButtonLink>
          </div>

          <ul className="mt-11 flex flex-wrap gap-x-7 gap-y-3 text-[15px] text-muted">
            {heroChecks.map((check) => (
              <CheckItem key={check}>{check}</CheckItem>
            ))}
          </ul>
        </div>

        <ActivityCard />
      </Container>
    </section>
  );
}

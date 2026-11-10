import type { ReactNode } from "react";
import { Link } from "react-router";
import { Icon } from "@/components/icons";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { cn } from "@/lib/cn";

export type Crumb = { label: string; href?: string };

/**
 * Short hero at the top of every inner page: breadcrumb, eyebrow, the page's single H1,
 * a one-paragraph intro, a "Book a free call" button (scrolls to the contact form) and an optional second link.
 */
export function PageHero({
  crumbs,
  eyebrow,
  badge,
  title,
  intro,
  ctaLabel = "Book a free call",
  secondary,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  /** Short code shown before the eyebrow, e.g. "AZ" on the Amazon page. */
  badge?: string;
  title: ReactNode;
  intro: string;
  /** Pass null to hide the button. */
  ctaLabel?: string | null;
  secondary?: { label: string; href: string; external?: boolean };
}) {
  return (
    <section className="relative isolate -mt-[72px] overflow-hidden pt-[72px]">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_30%_0%,black,transparent)]" />
        <div className="absolute -top-40 right-[-10%] size-[560px] rounded-full bg-mint/25 blur-[120px]" />
        <div className="absolute top-[40%] left-[-12%] size-[420px] rounded-full bg-sun/15 blur-[120px]" />
      </div>

      <Container className="pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pb-24">
        <nav aria-label="Breadcrumb" className="animate-fade-up">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-2">
                {i > 0 ? <Icon name="arrow" size={13} className="text-muted/50" /> : null}
                {crumb.href ? (
                  <Link to={crumb.href} className="font-medium transition-colors hover:text-brand">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-semibold text-deep">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="animate-fade-up [animation-delay:80ms]">
            <div className="flex flex-wrap items-center gap-3">
              {badge ? (
                <span className="grid h-10 min-w-10 place-items-center rounded-xl bg-deep px-2 font-display text-[15px] font-extrabold text-sun">
                  {badge}
                </span>
              ) : null}
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,5.4vw,5rem)] leading-[1] font-extrabold tracking-[-0.045em] text-deep">
              {title}
            </h1>
          </div>
          <div className="animate-fade-up [animation-delay:160ms] lg:pb-2">
            <p className="text-lg leading-relaxed text-muted">{intro}</p>
            {ctaLabel || secondary ? (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {ctaLabel ? (
                  <ButtonLink href="#contact" size="lg" arrow>
                    {ctaLabel}
                  </ButtonLink>
                ) : null}
                {secondary ? (
                  secondary.external ? (
                    <a
                      href={secondary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group inline-flex min-h-14 items-center gap-2 rounded-full border border-line bg-white px-7 text-[17px] font-semibold whitespace-nowrap text-deep transition-colors hover:border-brand/40 hover:bg-tint",
                      )}
                    >
                      {secondary.label}
                      <Icon name="arrowUpRight" size={17} strokeWidth={2.2} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <ButtonLink href={secondary.href} size="lg" variant="outline">
                      {secondary.label}
                    </ButtonLink>
                  )
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

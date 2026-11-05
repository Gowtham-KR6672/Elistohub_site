import type { ReactNode } from "react";
import { Link } from "react-router";
import { Icon } from "@/components/icons";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

type Crumb = { label: string; href?: string };

/**
 * Short hero at the top of every service page: breadcrumb, eyebrow, the page's single H1,
 * a one-paragraph intro and a "Book a call" button that scrolls to the contact form.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  ctaLabel = "Book a strategy call",
  aside,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  intro: string;
  ctaLabel?: string;
  aside?: ReactNode;
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
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,5.4vw,5rem)] leading-[1] font-extrabold tracking-[-0.045em] text-deep">
              {title}
            </h1>
          </div>
          <div className="animate-fade-up [animation-delay:160ms] lg:pb-2">
            <p className="text-lg leading-relaxed text-muted">{intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#contact" size="lg" arrow>
                {ctaLabel}
              </ButtonLink>
              <ButtonLink href="/#services" size="lg" variant="outline">
                All services
              </ButtonLink>
            </div>
            {aside}
          </div>
        </div>
      </Container>
    </section>
  );
}

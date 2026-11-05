import { Link } from "react-router";
import { Icon } from "@/components/icons";
import { LogoMark } from "@/components/logo";
import { Seo } from "@/components/seo";
import { ButtonLink, Container, Eyebrow, Highlight } from "@/components/ui";
import { comingSoonPages, type ComingSoonSlug } from "@/lib/site";

export function ComingSoon({ slug }: { slug: ComingSoonSlug }) {
  const page = comingSoonPages[slug];

  return (
    <section className="relative isolate -mt-[72px] flex min-h-[calc(100dvh-40px)] items-center overflow-hidden pt-[72px]">
      <Seo title={`${page.title} - Coming soon`} description={page.blurb} path={`/${slug}`} noindex />

      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,black,transparent)]" />
        <div className="absolute top-[10%] left-1/2 size-[620px] -translate-x-1/2 rounded-full bg-mint/25 blur-[130px]" />
        <div className="absolute right-[-10%] bottom-[-10%] size-[420px] rounded-full bg-sun/20 blur-[120px]" />
      </div>

      <Container className="flex flex-col items-center py-20 text-center sm:py-28">
        <div className="animate-fade-up relative grid size-28 place-items-center" aria-hidden="true">
          <svg viewBox="0 0 112 112" className="animate-spin-slow absolute inset-0 size-full text-brand/40">
            <circle cx="56" cy="56" r="52" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 10" strokeLinecap="round" />
          </svg>
          <span className="grid size-20 place-items-center rounded-[26px] bg-white shadow-[0_24px_50px_-20px_rgba(10,74,48,0.45)]">
            <LogoMark className="size-14" />
          </span>
        </div>

        <div className="animate-fade-up mt-9 flex flex-col items-center [animation-delay:120ms]">
          <Eyebrow>Coming soon</Eyebrow>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] font-extrabold tracking-[-0.05em] text-deep">
            {page.title}
            <br />
            <Highlight onLoad>is on its way.</Highlight>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">{page.blurb}</p>
          <p className="mt-2 max-w-xl text-[15px] text-muted/80">We’re putting the finishing touches on this page.</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3.5">
            <ButtonLink href="/contact" size="lg" arrow>
              Book a call
            </ButtonLink>
            {page.preview ? (
              <ButtonLink href={page.preview} size="lg" variant="outline">
                See it on the home page
              </ButtonLink>
            ) : (
              <ButtonLink href="/" size="lg" variant="outline">
                Back to home
              </ButtonLink>
            )}
          </div>

          {page.preview ? (
            <Link to="/" className="group mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-brand">
              <Icon name="arrow" size={16} className="rotate-180 transition-transform group-hover:-translate-x-0.5" />
              Back to home
            </Link>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

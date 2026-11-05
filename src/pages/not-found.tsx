import { Seo } from "@/components/seo";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export default function NotFoundPage() {
  return (
    <section className="relative isolate -mt-[72px] flex min-h-[calc(100dvh-40px)] items-center overflow-hidden pt-[72px]">
      <Seo title="Page not found" noindex />
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,black,transparent)]" />
        <div className="absolute top-[10%] left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-mint/20 blur-[130px]" />
      </div>
      <Container className="flex flex-col items-center py-24 text-center">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] font-extrabold tracking-[-0.05em] text-deep">
          This page doesn’t exist.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted">The link may be broken, or the page may have moved.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          <ButtonLink href="/" size="lg" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

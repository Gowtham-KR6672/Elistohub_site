import { Accordion } from "@/components/accordion";
import { ButtonLink, Container, Eyebrow, headingXL } from "@/components/ui";
import { cn } from "@/lib/cn";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="bg-off py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className={cn(headingXL, "mt-5 text-deep")}>The questions everyone asks us.</h2>
          <ButtonLink href="/contact" arrow className="mt-9">
            Book a free call
          </ButtonLink>
        </div>
        <Accordion items={faqs} />
      </Container>
    </section>
  );
}

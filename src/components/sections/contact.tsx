import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/icons";
import { CheckItem, Container } from "@/components/ui";
import { cn } from "@/lib/cn";
import { contactPerks } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function ContactSection({
  as: Heading = "h2",
  id = "contact",
  defaultNeed,
}: {
  as?: "h1" | "h2";
  id?: string;
  /** Preselects this option in "What can we take off your plate?" */
  defaultNeed?: string;
}) {
  return (
    <section id={id} className="py-16 sm:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[40px] bg-deep px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_65%)]" />
            <div className="absolute -top-32 -left-24 size-[480px] rounded-full bg-brand/50 blur-[120px]" />
            <div className="absolute -right-20 -bottom-40 size-[420px] rounded-full bg-sun/15 blur-[120px]" />
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div className="lg:sticky lg:top-28">
              <Heading
                className={cn(
                  "font-display text-[clamp(2.5rem,5.2vw,4.4rem)] leading-[0.98] font-extrabold tracking-[-0.045em]",
                )}
              >
                Ready to stop doing <span className="text-sun">all the things?</span>
              </Heading>
              <p className="mt-6 max-w-[460px] text-lg leading-relaxed text-frost">
                Book a free 30-minute call. We’ll look at your store and tell you honestly where we’d start.
              </p>
              <ul className="mt-9 flex flex-col gap-4 text-[16px]">
                {contactPerks.map((perk) => (
                  <CheckItem key={perk} tone="dark">
                    {perk}
                  </CheckItem>
                ))}
                <CheckItem tone="dark">
                  Or email{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-semibold text-sun underline decoration-sun/40 underline-offset-4 hover:decoration-sun"
                  >
                    {siteConfig.email}
                  </a>
                </CheckItem>
              </ul>
              <div className="mt-10 hidden items-center gap-3 text-sm text-frost/80 lg:flex">
                <Icon name="pin" size={18} className="text-mint" />
                {siteConfig.location} · Working across US, UK, EU &amp; IST hours
              </div>
            </div>

            <div className="w-full rounded-[30px] bg-white p-6 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)] sm:p-9 lg:ml-auto lg:max-w-[760px]">
              <ContactForm defaultNeed={defaultNeed} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

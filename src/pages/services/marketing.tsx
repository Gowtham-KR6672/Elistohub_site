import { ServiceCard } from "@/components/sections/services";
import { EmailMarketing } from "@/components/sections/support-email";
import { Container, Highlight, headingXL } from "@/components/ui";
import { cn } from "@/lib/cn";
import { socialService } from "@/lib/content";
import { ServiceLayout } from "./service-layout";

export default function MarketingPage() {
  return (
    <ServiceLayout
      slug="marketing"
      seoTitle="Marketing: Email, SMS & Social Media"
      description="Klaviyo email marketing, SMS campaigns, automated flows and Instagram and Facebook management, designed, written and run by our ecommerce team."
      eyebrow="Marketing"
      title={
        <>
          Emails people actually open. <Highlight onLoad>Wild, we know.</Highlight>
        </>
      }
      intro="Klaviyo email marketing, SMS campaigns and automated flows - designed, written, built and tested by our team, so your list makes money while you sleep."
    >
      <EmailMarketing headerless />
      <section className="py-20 sm:py-24" aria-labelledby="social-heading">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <h2 id="social-heading" className={cn(headingXL, "reveal text-deep")}>
            And social, <Highlight>while we’re at it.</Highlight>
          </h2>
          <ServiceCard service={socialService} />
        </Container>
      </section>
    </ServiceLayout>
  );
}

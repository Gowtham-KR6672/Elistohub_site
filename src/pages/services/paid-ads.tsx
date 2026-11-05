import { Accordion } from "@/components/accordion";
import { ServiceCard } from "@/components/sections/services";
import { Container, Highlight } from "@/components/ui";
import { faqs, ppcService } from "@/lib/content";
import { ServiceLayout } from "./service-layout";

const ppcFaq = faqs.filter((faq) => faq.q.includes("PPC"));

export default function PaidAdsPage() {
  return (
    <ServiceLayout
      slug="paid-ads"
      seoTitle="PPC & Paid Ads Management on Commission"
      description="Amazon PPC, Walmart Connect, Meta, Instagram and Google Shopping ads planned, launched and tuned every week. Commission-based: we earn when you do."
      eyebrow="PPC & paid ads"
      title={
        <>
          Ads that pay for themselves. <Highlight onLoad>We earn when you do.</Highlight>
        </>
      }
      intro="Amazon PPC, Walmart Connect, Meta, Instagram and Google Shopping, planned, launched and tuned every week. Commission-based."
    >
      <section className="bg-off py-20 sm:py-24" aria-labelledby="ppc-details">
        <Container className="grid items-start gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
          <h2 id="ppc-details" className="sr-only">
            How it works
          </h2>
          <ServiceCard service={ppcService} className="min-h-[340px]" />
          <Accordion items={ppcFaq} />
        </Container>
      </section>
    </ServiceLayout>
  );
}

import { MarketplaceGrid, OutcomesBand, PageFaq, PainPoints, WhatYouGet } from "@/components/page-blocks";
import { ButtonLink, Container, Eyebrow, Highlight, headingLG } from "@/components/ui";
import { cn } from "@/lib/cn";
import { servicePageContent } from "@/lib/pages";
import { marketplacePages, servicePageBySlug } from "@/lib/site";
import NotFoundPage from "@/pages/not-found";
import { ServiceLayout } from "./service-layout";

/** Extra sections on the Marketplace management page: marketplace picker and B2B wholesale. */
function MarketplaceExtras() {
  return (
    <>
      <section className="pb-4" aria-labelledby="pick-marketplace">
        <Container>
          <h2 id="pick-marketplace" className={cn(headingLG, "reveal text-deep")}>
            Pick your marketplace
          </h2>
          <MarketplaceGrid items={marketplacePages} className="reveal mt-8" />
        </Container>
      </section>
      <section className="pt-16 sm:pt-20" aria-labelledby="b2b-heading">
        <Container>
          <div className="reveal relative isolate overflow-hidden rounded-[32px] bg-sun-tint p-7 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-sun/40 blur-3xl" aria-hidden="true" />
            <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
              <div>
                <Eyebrow>B2B &amp; wholesale too</Eyebrow>
                <h2 id="b2b-heading" className={cn(headingLG, "mt-5 text-deep")}>
                  Selling to stores, not just shoppers? <Highlight>We do that too.</Highlight>
                </h2>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-ink/80">
                  Faire, wholesale portals and retailer catalogs: wholesale pricing, line sheets, retailer orders and
                  reorders, handled with the same care as your D2C channels.
                </p>
                <ButtonLink href="/marketplaces/faire" variant="primary" arrow className="mt-6">
                  See Faire management
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/** Builds a service page (hero, pain points, what you get, results, FAQ, contact) from lib/pages.ts. */
export default function ServicePage({ slug }: { slug: string }) {
  const page = servicePageBySlug[slug];
  const content = servicePageContent[slug];
  if (!page || !content) return <NotFoundPage />;

  return (
    <ServiceLayout
      path={page.path}
      crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/#services" }, { label: page.name }]}
      seoTitle={content.seoTitle}
      description={content.description}
      eyebrow={content.eyebrow}
      title={
        <>
          {content.title[0]} <Highlight onLoad>{content.title[1]}</Highlight>
        </>
      }
      intro={content.intro}
      need={page.need}
    >
      {slug === "marketplace-management" ? <MarketplaceExtras /> : null}
      <PainPoints items={content.pains} />
      <WhatYouGet items={content.gets} />
      <OutcomesBand heading="What changes when we take over" stat={content.stat} outcomes={content.outcomes} />
      <PageFaq items={content.faqs} />
    </ServiceLayout>
  );
}

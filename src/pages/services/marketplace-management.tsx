import { Marketplaces } from "@/components/sections/marketplaces";
import { ServiceGrid } from "@/components/sections/services";
import { Container, Highlight } from "@/components/ui";
import { marketplaceServices } from "@/lib/content";
import { ServiceLayout } from "./service-layout";

export default function MarketplaceManagementPage() {
  return (
    <ServiceLayout
      slug="marketplace-management"
      seoTitle="D2C & B2B Marketplace Management"
      description="Amazon, Walmart, Etsy, eBay and Wayfair for your shoppers, Faire and wholesale for your retailers. Listings, catalog and content handled across all of them."
      eyebrow="D2C & B2B marketplace management"
      title={
        <>
          Every marketplace, D2C or wholesale, <Highlight onLoad>run like one store.</Highlight>
        </>
      }
      intro="Amazon, Walmart, Etsy, eBay and Wayfair for your shoppers. Faire and wholesale channels for your retailers. Listings, catalog and content handled across all of them."
    >
      <section className="bg-off py-20 sm:py-24" aria-labelledby="marketplace-services">
        <Container>
          <h2 id="marketplace-services" className="sr-only">
            What’s included
          </h2>
          <ServiceGrid items={marketplaceServices} />
        </Container>
      </section>
      <Marketplaces />
    </ServiceLayout>
  );
}

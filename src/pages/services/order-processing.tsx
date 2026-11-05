import { ServiceGrid } from "@/components/sections/services";
import { Container, Highlight } from "@/components/ui";
import { orderServices } from "@/lib/content";
import { ServiceLayout } from "./service-layout";

export default function OrderProcessingPage() {
  return (
    <ServiceLayout
      slug="order-processing"
      seoTitle="Order Processing & Inventory Management"
      description="Order processing, 3PL coordination, returns, inventory forecasting and supplier follow-ups, handled by an ecommerce team before they turn into problems."
      eyebrow="Order processing"
      title={
        <>
          Orders that ship. <Highlight onLoad>Stock that matches.</Highlight>
        </>
      }
      intro="Order processing, 3PL coordination, returns, inventory forecasting and supplier follow-ups, handled before they turn into problems."
    >
      <section className="bg-off py-20 sm:py-24" aria-labelledby="order-services">
        <Container>
          <h2 id="order-services" className="sr-only">
            What’s included
          </h2>
          <ServiceGrid items={orderServices} />
        </Container>
      </section>
    </ServiceLayout>
  );
}

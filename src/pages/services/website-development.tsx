import { Websites } from "@/components/sections/websites";
import { Highlight } from "@/components/ui";
import { ServiceLayout } from "./service-layout";

export default function WebsiteDevelopmentPage() {
  return (
    <ServiceLayout
      slug="website-development"
      seoTitle="Website Design & Development"
      description="Shopify, WooCommerce, BigCommerce, Wix and Squarespace stores designed, built, sped up and maintained by an ecommerce web team."
      eyebrow="Ecommerce website development"
      title={
        <>
          Websites we build, fix &amp; <Highlight onLoad>lovingly babysit.</Highlight>
        </>
      }
      intro="New store, slow store or “can you just change this one thing” store - our web team has you covered."
    >
      <Websites headerless />
    </ServiceLayout>
  );
}

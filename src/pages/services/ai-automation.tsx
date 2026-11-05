import { AiSection } from "@/components/sections/ai";
import { AiImages } from "@/components/sections/ai-images";
import { CustomerService } from "@/components/sections/support-email";
import { Highlight } from "@/components/ui";
import { ServiceLayout } from "./service-layout";

export default function AiAutomationPage() {
  return (
    <ServiceLayout
      slug="ai-automation"
      seoTitle="AI Agents & Automation for Ecommerce"
      description="AI chat and email support, AI product images and workflow automations for ecommerce, set up, trained and managed by our team, plus human customer service."
      eyebrow="AI customer support & automation"
      title={
        <>
          AI that answers your customers at 3am. <Highlight onLoad>So you don’t have to.</Highlight>
        </>
      }
      intro="We set up, train and manage AI for ecommerce - chatbots, email support, automations and custom AI agents that take the repetitive work off your plate."
    >
      <AiSection headerless />
      <AiImages />
      <CustomerService />
    </ServiceLayout>
  );
}

import { AiSection } from "@/components/sections/ai";
import { AiImages } from "@/components/sections/ai-images";
import { CaseStudies } from "@/components/sections/case-studies";
import { ContactSection } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Marketplaces } from "@/components/sections/marketplaces";
import { Reporting } from "@/components/sections/reporting";
import { Services } from "@/components/sections/services";
import { CustomerService, EmailMarketing } from "@/components/sections/support-email";
import { TechStack } from "@/components/sections/tech-stack";
import { Websites } from "@/components/sections/websites";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marketplaces />
      <Services />
      <Websites />
      <AiSection />
      <AiImages />
      <CustomerService />
      <EmailMarketing />
      <TechStack />
      <Reporting />
      <CaseStudies />
      <Faq />
      <ContactSection />
    </>
  );
}

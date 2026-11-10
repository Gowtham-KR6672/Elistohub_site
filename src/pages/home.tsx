import { Seo } from "@/components/seo";
import { CaseStudies } from "@/components/sections/case-studies";
import { ContactSection } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowWeStart, Results, WhoWeHelp, WhyUs, WorkingWithUs } from "@/components/sections/home-sections";
import { Marketplaces } from "@/components/sections/marketplaces";
import { Services } from "@/components/sections/services";

export default function HomePage() {
  return (
    <>
      <Seo />
      <Hero />
      <Marketplaces />
      <Results />
      <WhoWeHelp />
      <Services />
      <WhyUs />
      <CaseStudies />
      <HowWeStart />
      <WorkingWithUs />
      <Faq />
      <ContactSection />
    </>
  );
}

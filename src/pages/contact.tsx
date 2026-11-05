import { Seo } from "@/components/seo";
import { ContactSection } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Book a free 30-minute call with Elistohub. We’ll look at your store and tell you honestly where we’d start."
        path="/contact"
      />
      <ContactSection as="h1" id="contact-form" />
      <Faq />
    </>
  );
}

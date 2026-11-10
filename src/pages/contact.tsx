import { Seo } from "@/components/seo";
import { ContactSection } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Get a free review of your store. Tell us where you sell and we’ll show you the quick wins we’d go after first and what it would cost."
        path="/contact"
      />
      <ContactSection as="h1" id="contact-form" />
      <Faq />
    </>
  );
}

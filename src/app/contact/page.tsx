import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free 30-minute call with Elistohub. We’ll look at your store and tell you honestly where we’d start.",
};

export default function ContactPage() {
  return (
    <>
      <ContactSection as="h1" id="contact-form" />
      <Faq />
    </>
  );
}

import type { ReactNode } from "react";
import { MoreServices } from "@/components/more-services";
import { PageHero } from "@/components/page-hero";
import { ContactSection } from "@/components/sections/contact";
import { Seo } from "@/components/seo";
import { servicePageBySlug } from "@/lib/site";

/**
 * Shared frame for service pages: meta tags, short hero with the page's H1 and
 * a "Book a call" button, the page content, links to other services, and the contact form.
 */
export function ServiceLayout({
  slug,
  path,
  crumb,
  seoTitle,
  description,
  eyebrow,
  title,
  intro,
  ctaLabel,
  children,
}: {
  /** A key of servicePages; omit for non-service pages such as Our process. */
  slug?: string;
  path?: string;
  crumb?: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  title: ReactNode;
  intro: string;
  ctaLabel?: string;
  children: ReactNode;
}) {
  const page = slug ? servicePageBySlug[slug] : undefined;
  const pagePath = page?.path ?? path ?? "/";
  const crumbs = page
    ? [{ label: "Home", href: "/" }, { label: "Services", href: "/#services" }, { label: page.name }]
    : [{ label: "Home", href: "/" }, { label: crumb ?? seoTitle }];

  return (
    <>
      <Seo title={seoTitle} description={description} path={pagePath} />
      <PageHero crumbs={crumbs} eyebrow={eyebrow} title={title} intro={intro} ctaLabel={ctaLabel} />
      {children}
      <div className="pt-16 sm:pt-24">
        <MoreServices current={slug} />
      </div>
      <ContactSection defaultNeed={page?.need} />
    </>
  );
}

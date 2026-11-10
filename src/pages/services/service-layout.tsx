import type { ReactNode } from "react";
import { PageHero, type Crumb } from "@/components/page-hero";
import { ContactSection } from "@/components/sections/contact";
import { Seo } from "@/components/seo";

/**
 * Shared frame for inner pages: meta tags, short hero with the page's single H1,
 * the page content, and the contact form at the bottom.
 */
export function ServiceLayout({
  path,
  crumbs,
  seoTitle,
  description,
  eyebrow,
  badge,
  title,
  intro,
  ctaLabel,
  secondary,
  need,
  children,
}: {
  path: string;
  crumbs: Crumb[];
  seoTitle: string;
  description: string;
  eyebrow: string;
  badge?: string;
  title: ReactNode;
  intro: string;
  ctaLabel?: string | null;
  secondary?: { label: string; href: string; external?: boolean };
  /** Preselected option in the contact form. */
  need?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Seo title={seoTitle} description={description} path={path} />
      <PageHero
        crumbs={crumbs}
        eyebrow={eyebrow}
        badge={badge}
        title={title}
        intro={intro}
        ctaLabel={ctaLabel}
        secondary={secondary}
      />
      {children}
      <ContactSection defaultNeed={need} />
    </>
  );
}

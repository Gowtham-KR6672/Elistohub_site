import { MarketplaceGrid, OutcomesBand, TaskList } from "@/components/page-blocks";
import { Container, Highlight, headingLG } from "@/components/ui";
import { cn } from "@/lib/cn";
import { marketplaceIntro, marketplacePageContent } from "@/lib/pages";
import { marketplacePages } from "@/lib/site";
import NotFoundPage from "@/pages/not-found";
import { ServiceLayout } from "@/pages/services/service-layout";

/** Builds one marketplace page (Amazon, Walmart, …) from lib/pages.ts. */
export default function MarketplacePage({ slug }: { slug: string }) {
  const market = marketplacePages.find((m) => m.slug === slug);
  const content = marketplacePageContent[slug];
  if (!market || !content) return <NotFoundPage />;

  const intro = marketplaceIntro(market.name);
  const others = marketplacePages.filter((m) => m.slug !== slug);

  return (
    <ServiceLayout
      path={market.path}
      crumbs={[{ label: "Home", href: "/" }, { label: "Marketplaces", href: "/marketplace-management" }, { label: market.name }]}
      seoTitle={`${market.name} Account Management`}
      description={intro}
      eyebrow={`${market.name} management`}
      badge={market.code}
      title={
        <>
          {content.title[0]} <Highlight onLoad>{content.title[1]}</Highlight>
        </>
      }
      intro={intro}
      secondary={{ label: `Visit ${market.name}`, href: content.visitUrl, external: true }}
      need="Marketplace management"
    >
      <TaskList heading={`What we take off your plate on ${market.name}`} items={content.tasks} />
      <OutcomesBand heading={`Results on ${market.name}`} stat={content.stat} outcomes={content.outcomes} />
      <section className="pt-20 sm:pt-24" aria-labelledby="other-marketplaces">
        <Container>
          <h2 id="other-marketplaces" className={cn(headingLG, "reveal max-w-3xl text-deep")}>
            Selling elsewhere too? <Highlight>Same. We run those too.</Highlight>
          </h2>
          <MarketplaceGrid items={others} className="reveal mt-8" />
        </Container>
      </section>
    </ServiceLayout>
  );
}

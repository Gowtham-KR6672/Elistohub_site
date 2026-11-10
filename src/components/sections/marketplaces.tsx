import { Marquee } from "@/components/marquee";
import { Container } from "@/components/ui";
import { marketplaces } from "@/lib/content";
import { marketplaceByName } from "@/lib/site";

export function Marketplaces() {
  const items = marketplaces.map((label) => ({ label, href: marketplaceByName[label]?.path }));
  const half = Math.ceil(items.length / 2);
  const rowOne = items.slice(0, half);
  const rowTwo = [...items.slice(half), { label: "+ your next one", highlight: true }];

  return (
    <section id="marketplaces" className="border-y border-line bg-off py-14 sm:py-16">
      <Container>
        <p className="reveal text-center font-display text-[22px] font-bold tracking-[-0.02em] text-deep sm:text-[26px]">
          Selling on any of these? We got you. <span className="text-brand">We run them all.</span>
        </p>
      </Container>
      <div className="mt-9 flex flex-col gap-3">
        <Marquee items={rowOne} duration={40} label="Marketplaces we manage" />
        <Marquee items={rowTwo} duration={46} reverse label="More marketplaces and stores we manage" />
      </div>
    </section>
  );
}

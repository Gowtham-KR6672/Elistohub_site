import { Marquee } from "@/components/marquee";
import { Container } from "@/components/ui";
import { marketplaces } from "@/lib/content";

export function Marketplaces() {
  const half = Math.ceil(marketplaces.length / 2);
  const rowOne = marketplaces.slice(0, half).map((label) => ({ label }));
  const rowTwo = [...marketplaces.slice(half).map((label) => ({ label })), { label: "+ your next one", highlight: true }];

  return (
    <section id="marketplaces" className="border-y border-line bg-off py-14 sm:py-16">
      <Container>
        <p className="reveal text-center font-display text-[22px] font-bold tracking-[-0.02em] text-deep sm:text-[26px]">
          Selling on all of these? Same. <span className="text-brand">We run them all.</span>
        </p>
      </Container>
      <div className="mt-9 flex flex-col gap-3">
        <Marquee items={rowOne} duration={40} label="Marketplaces we manage" />
        <Marquee items={rowTwo} duration={46} reverse label="More marketplaces and stores we manage" />
      </div>
    </section>
  );
}

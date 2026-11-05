import { BeforeAfter } from "@/components/before-after";
import { Container, Highlight, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/cn";
import { aiImageFeatures } from "@/lib/content";

export function AiImages() {
  return (
    <section id="ai-images" className="bg-off py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="AI product photography & image editing"
          title={
            <>
              Studio-quality product images. <Highlight>No studio required.</Highlight>
            </>
          }
          intro="From one plain product shot, we create AI lifestyle images, clean white-background photos, infographics and A+ content that meets Amazon, Walmart, Etsy and Shopify image requirements."
        />

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-8 2xl:grid-cols-[minmax(0,520px)_1fr]">
          <div className="reveal mx-auto w-full max-w-[460px] lg:sticky lg:top-28 lg:mx-0 lg:max-w-none">
            <BeforeAfter />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            {aiImageFeatures.map((f, i) => {
              const last = i === aiImageFeatures.length - 1;
              return (
                <li
                  key={f.title}
                  className={cn(
                    "reveal group rounded-[26px] p-6 transition-all duration-300 hover:-translate-y-0.5 sm:p-7",
                    last
                      ? "bg-deep text-white"
                      : "border border-line bg-white hover:border-brand/30 hover:shadow-[0_24px_50px_-34px_rgba(10,74,48,0.45)]",
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-sm font-bold tabular-nums",
                      last ? "text-sun" : "text-brand",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className={cn("mt-3 font-display text-[20px] font-bold", last ? "text-white" : "text-deep")}>
                    {f.title}
                  </p>
                  <p className={cn("mt-2 text-[15px] leading-relaxed", last ? "text-frost" : "text-muted")}>{f.detail}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

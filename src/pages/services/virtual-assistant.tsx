import { Icon } from "@/components/icons";
import { NumberedSteps } from "@/components/steps";
import { CheckItem, Container, Highlight, headingXL } from "@/components/ui";
import { cn } from "@/lib/cn";
import { vaPlans, vaSteps, vaTasks } from "@/lib/content";
import { servicePageBySlug } from "@/lib/site";
import { ServiceLayout } from "./service-layout";

const sectionHeading = cn(headingXL, "reveal text-deep");
const page = servicePageBySlug["virtual-assistant"];

export default function VirtualAssistantPage() {
  return (
    <ServiceLayout
      path={page.path}
      crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/#services" }, { label: page.name }]}
      need={page.need}
      seoTitle="Ecommerce Virtual Assistant, Pay As You Go"
      description="Book an ecommerce-trained virtual assistant by the hour. Pay as you go, buy monthly hours or get a dedicated VA. No long-term contract."
      eyebrow="Ecommerce virtual assistant"
      title={
        <>
          Extra hands when you need them. <Highlight onLoad>Pay only for the work.</Highlight>
        </>
      }
      intro="An ecommerce-trained assistant who already knows Shopify, Amazon and the marketplaces. Use them for a few hours this week, more next month, or none at all. No long-term contract."
    >
      {/* Plans */}
      <section className="bg-off py-20 sm:py-24" aria-labelledby="va-plans">
        <Container>
          <h2 id="va-plans" className={sectionHeading}>
            Pick how you <Highlight>pay.</Highlight>
          </h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {vaPlans.map((plan) => {
              const featured = Boolean(plan.featured);
              return (
                <article
                  key={plan.title}
                  className={cn(
                    "reveal relative flex flex-col overflow-hidden rounded-[30px] p-7 sm:p-8",
                    featured
                      ? "bg-deep text-white shadow-[0_40px_80px_-40px_rgba(10,74,48,0.8)] lg:-my-3 lg:py-11"
                      : "border border-line bg-white",
                  )}
                >
                  {featured ? (
                    <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
                  ) : null}
                  <p
                    className={cn(
                      "relative inline-flex self-start rounded-full px-3 py-1 text-[13px] font-bold",
                      featured ? "bg-sun text-deep" : "bg-tint text-brand",
                    )}
                  >
                    {plan.label}
                  </p>
                  <h3
                    className={cn(
                      "relative mt-6 font-display text-[28px] leading-tight font-bold tracking-[-0.02em]",
                      featured ? "text-white" : "text-deep",
                    )}
                  >
                    {plan.title}
                  </h3>
                  <p className={cn("relative mt-3 leading-relaxed", featured ? "text-frost" : "text-muted")}>
                    {plan.description}
                  </p>
                  <ul className="relative mt-6 flex flex-col gap-3 text-[15px]">
                    {plan.points.map((point) => (
                      <CheckItem key={point} tone={featured ? "dark" : "light"}>
                        {point}
                      </CheckItem>
                    ))}
                  </ul>
                  <div
                    className={cn(
                      "relative mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-6",
                      featured ? "mt-8 border-white/15" : "mt-8 border-line",
                    )}
                  >
                    <span className={cn("font-display text-xl font-bold", featured ? "text-white" : "text-deep")}>
                      Rates on request
                    </span>
                    <a
                      href="#contact"
                      className={cn(
                        "group inline-flex items-center gap-1.5 text-[15px] font-semibold",
                        featured ? "text-sun" : "text-brand",
                      )}
                    >
                      Get a quote
                      <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Tasks */}
      <section className="py-20 sm:py-24" aria-labelledby="va-tasks">
        <Container>
          <div className="reveal rounded-[34px] bg-tint p-7 sm:p-12">
            <h2 id="va-tasks" className={cn(headingXL, "max-w-3xl text-deep")}>
              What your VA can take <Highlight>off your plate.</Highlight>
            </h2>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {vaTasks.map((task) => (
                <li
                  key={task}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 font-medium text-ink shadow-[0_8px_20px_-16px_rgba(10,74,48,0.5)]"
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-tint text-brand">
                    <Icon name="check" size={14} strokeWidth={3} />
                  </span>
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="pb-4" aria-labelledby="va-how">
        <Container>
          <h2 id="va-how" className={sectionHeading}>
            How it <Highlight>works.</Highlight>
          </h2>
          <NumberedSteps steps={vaSteps} className="mt-12" />
        </Container>
      </section>
    </ServiceLayout>
  );
}

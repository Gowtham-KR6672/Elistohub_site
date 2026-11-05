import { Icon } from "@/components/icons";
import { Container, Highlight, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/cn";
import { services, type Service } from "@/lib/content";

function GrowthBars() {
  const bars = [28, 42, 36, 58, 50, 74, 88];
  return (
    <div className="flex h-28 items-end gap-2" aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-5 origin-bottom rounded-t-md bg-gradient-to-t from-fresh/50 to-mint transition-transform duration-500 group-hover:scale-y-110 sm:w-6"
          style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
        />
      ))}
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const dark = service.variant === "dark";
  const featured = service.variant === "featured";

  return (
    <article
      className={cn(
        "reveal group relative flex flex-col overflow-hidden rounded-[28px] p-7 transition-all duration-300 hover:-translate-y-1 sm:p-8",
        dark
          ? "bg-deep text-white hover:shadow-[0_30px_60px_-30px_rgba(10,74,48,0.8)] md:col-span-2 2xl:col-span-3"
          : "border border-line bg-white hover:border-brand/30 hover:shadow-[0_30px_60px_-34px_rgba(10,74,48,0.4)]",
        featured && "bg-gradient-to-br from-tint via-white to-white md:col-span-2",
        service.variant === "wide" && "md:col-span-2 lg:col-span-1",
      )}
    >
      {dark ? (
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,black,transparent_70%)]" aria-hidden="true" />
      ) : null}

      <div className="relative flex items-start justify-between gap-4">
        <span
          className={cn(
            "grid size-12 place-items-center rounded-2xl transition-colors duration-300",
            dark ? "bg-deep-2 text-sun" : "bg-tint text-brand group-hover:bg-brand group-hover:text-white",
          )}
        >
          <Icon name={service.icon} size={24} />
        </span>
        {service.badge ? (
          <span className="rounded-full bg-sun px-3 py-1 text-[13px] font-bold text-deep">{service.badge}</span>
        ) : (
          <span className="font-display text-sm font-bold text-muted/40 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className={cn("relative mt-auto", dark && "flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between")}>
        <div className={cn(dark && "max-w-lg")}>
          <h3
            className={cn(
              "mt-8 font-display font-bold tracking-[-0.02em]",
              featured || dark ? "text-[26px] leading-tight sm:text-[30px]" : "text-[22px] leading-snug",
              dark ? "text-white" : "text-deep",
            )}
          >
            {service.title}
          </h3>
          <p className={cn("mt-3 leading-relaxed", dark ? "text-frost" : "text-muted", featured && "max-w-xl text-[17px]")}>
            {service.description}
          </p>
          {service.tags ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-brand/15 bg-white px-3 py-1.5 text-[13px] font-semibold text-deep"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {dark ? <GrowthBars /> : null}
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="Ecommerce management services"
          title={
            <>
              Everything your store needs. <Highlight>Minus the headache.</Highlight>
            </>
          }
          intro="Pick one service or hand us the whole back office. Your dedicated team plugs in like an in-house crew, only faster."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 2xl:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

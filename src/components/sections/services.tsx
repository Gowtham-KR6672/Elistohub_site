import { Link } from "react-router";
import { Icon } from "@/components/icons";
import { Container, Highlight, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/cn";
import { homeServices, type HomeService, type Service } from "@/lib/content";
import { servicePageBySlug } from "@/lib/site";

function GrowthBars() {
  const bars = [28, 42, 36, 58, 50, 74, 88];
  return (
    <div className="flex h-24 items-end gap-2" aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-5 origin-bottom rounded-t-md bg-gradient-to-t from-fresh/50 to-mint transition-transform duration-500 group-hover:scale-y-110"
          style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
        />
      ))}
    </div>
  );
}

/* ---------- Home page: one card per service page ---------- */

const homeSpan: Record<string, string> = {
  "marketplace-management": "md:col-span-2",
  "virtual-assistant": "lg:col-span-2 2xl:col-span-1",
};

function HomeServiceCard({ service }: { service: HomeService }) {
  const page = servicePageBySlug[service.slug];
  const dark = service.tone === "dark";
  const sun = service.tone === "sun";
  const featured = service.slug === "marketplace-management";

  return (
    <Link
      to={page.path}
      className={cn(
        "reveal group relative flex flex-col overflow-hidden rounded-[28px] p-7 transition-all duration-300 hover:-translate-y-1 sm:p-8",
        dark
          ? "bg-deep text-white hover:shadow-[0_30px_60px_-30px_rgba(10,74,48,0.8)]"
          : sun
            ? "border border-sun/40 bg-sun-tint hover:shadow-[0_30px_60px_-34px_rgba(127,93,0,0.45)]"
            : "border border-line bg-white hover:border-brand/30 hover:shadow-[0_30px_60px_-34px_rgba(10,74,48,0.4)]",
        featured && "bg-gradient-to-br from-tint via-white to-white",
        homeSpan[service.slug],
      )}
    >
      {dark ? (
        <div
          className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,black,transparent_70%)]"
          aria-hidden="true"
        />
      ) : null}

      <div className="relative flex items-start justify-between gap-4">
        <span
          className={cn(
            "grid size-12 place-items-center rounded-2xl transition-colors duration-300",
            dark
              ? "bg-deep-2 text-sun"
              : sun
                ? "bg-white text-gold group-hover:bg-deep group-hover:text-sun"
                : "bg-tint text-brand group-hover:bg-brand group-hover:text-white",
          )}
        >
          <Icon name={page.icon} size={24} />
        </span>
        <span className="flex items-center gap-2">
          {service.badge ? (
            <span className={cn("rounded-full px-3 py-1 text-[13px] font-bold", dark ? "bg-sun text-deep" : "bg-deep text-sun")}>
              {service.badge}
            </span>
          ) : null}
          <span className={cn("font-display text-sm font-bold tabular-nums", dark ? "text-white/40" : "text-muted/40")}>
            {service.number}
          </span>
        </span>
      </div>

      <h3
        className={cn(
          "relative mt-8 font-display font-bold tracking-[-0.02em]",
          featured ? "text-[26px] leading-tight sm:text-[30px]" : "text-[22px] leading-snug",
          dark ? "text-white" : "text-deep",
        )}
      >
        {service.title}
      </h3>
      <p className={cn("relative mt-3 leading-relaxed", dark ? "text-frost" : "text-muted", featured && "max-w-xl text-[17px]")}>
        {service.description}
      </p>

      <ul className={cn("relative mt-5 flex flex-col gap-2 text-[15px] font-medium", featured && "sm:flex-row sm:flex-wrap sm:gap-x-6")}>
        {service.points.map((point) => (
          <li key={point} className="flex items-center gap-2.5">
            <Icon name="check" size={16} strokeWidth={3} className={dark ? "text-sun" : "text-brand"} />
            {point}
          </li>
        ))}
      </ul>

      <span
        className={cn(
          "relative mt-auto inline-flex items-center gap-2 pt-7 text-[15px] font-semibold",
          dark ? "text-sun" : sun ? "text-gold" : "text-brand",
        )}
      >
        {service.cta}
        <span className="sr-only">: {service.title}</span>
        <Icon name="arrow" size={17} strokeWidth={2.2} className="transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
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
          intro="Pick one service or hand us the whole back office. Each one has its own page with the details. Your dedicated team plugs in like an in-house crew, only faster."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 2xl:grid-cols-4">
          {homeServices.map((service) => (
            <HomeServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Service pages: detail cards ---------- */

export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  const dark = service.variant === "dark";

  return (
    <article
      className={cn(
        "reveal group relative flex flex-col overflow-hidden rounded-[28px] p-7 transition-all duration-300 hover:-translate-y-1 sm:p-8",
        dark
          ? "bg-deep text-white hover:shadow-[0_30px_60px_-30px_rgba(10,74,48,0.8)]"
          : "border border-line bg-white hover:border-brand/30 hover:shadow-[0_30px_60px_-34px_rgba(10,74,48,0.4)]",
        className,
      )}
    >
      {dark ? (
        <div
          className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,black,transparent_70%)]"
          aria-hidden="true"
        />
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
        ) : null}
      </div>

      <div className={cn("relative mt-auto", dark && "flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between")}>
        <div className={cn(dark && "max-w-lg")}>
          <h3
            className={cn(
              "mt-8 font-display font-bold tracking-[-0.02em]",
              dark ? "text-[26px] leading-tight text-white sm:text-[30px]" : "text-[22px] leading-snug text-deep",
            )}
          >
            {service.title}
          </h3>
          <p className={cn("mt-3 leading-relaxed", dark ? "text-frost" : "text-muted")}>{service.description}</p>
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

export function ServiceGrid({ items }: { items: Service[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {items.map((service) => (
        <ServiceCard key={service.title} service={service} />
      ))}
    </div>
  );
}

import { Link } from "react-router";
import { Icon } from "@/components/icons";
import { ButtonLink, Container } from "@/components/ui";
import { servicePages } from "@/lib/site";

/** "Need more than this?" strip with links to the other service pages. */
export function MoreServices({ current }: { current?: string }) {
  const others = servicePages.filter((page) => page.slug !== current);

  return (
    <section className="pb-4">
      <Container>
        <div className="reveal rounded-[32px] border border-line bg-white p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight font-bold tracking-[-0.02em] text-deep">
                Need more than this?
              </h2>
              <p className="mt-2 text-lg text-muted">Most clients hand us two or three services.</p>
            </div>
            <ButtonLink href="/#services" variant="outline" arrow>
              See all services
            </ButtonLink>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((page) => (
              <li key={page.slug}>
                <Link
                  to={page.path}
                  className="group flex h-full items-center gap-3.5 rounded-2xl border border-line bg-off p-4 transition-colors hover:border-brand/30 hover:bg-tint"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon name={page.icon} size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-deep">{page.name}</span>
                    <span className="block truncate text-sm text-muted">{page.short}</span>
                  </span>
                  <Icon
                    name="arrow"
                    size={17}
                    className="shrink-0 text-brand transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

import { CheckItem, Container, Eyebrow, Highlight, headingLG } from "@/components/ui";
import { cn } from "@/lib/cn";
import { about } from "@/lib/pages";
import { ServiceLayout } from "@/pages/services/service-layout";

export default function AboutPage() {
  return (
    <ServiceLayout
      path="/about"
      crumbs={[{ label: "Home", href: "/" }, { label: "About us" }]}
      seoTitle="About Us"
      description="Elistohub is a team of ecommerce professionals from India with over 20 years of experience, working with honest, kind founders all over the world."
      eyebrow="About Elistohub"
      title={
        <>
          Ecommerce nerds. <Highlight onLoad>Good humans.</Highlight>
        </>
      }
      intro={about.intro}
      ctaLabel={null}
    >
      {/* Quote */}
      <section className="pb-4" aria-label="What drives us">
        <Container>
          <figure className="reveal relative isolate overflow-hidden rounded-[34px] bg-deep p-8 text-white sm:p-12 lg:p-16">
            <div className="bg-grid-dark pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_70%)]" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-24 -bottom-32 -z-10 size-96 rounded-full bg-brand/50 blur-[120px]" aria-hidden="true" />
            <span className="font-display text-[90px] leading-[0.6] font-extrabold text-sun" aria-hidden="true">
              “
            </span>
            <blockquote className="mt-4 max-w-4xl font-display text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.12] font-bold tracking-[-0.03em]">
              {about.quote.replace(/^“|”$/g, "")}
            </blockquote>
            <figcaption className="mt-8 max-w-3xl text-lg leading-relaxed text-frost">{about.quoteBody}</figcaption>
          </figure>
        </Container>
      </section>

      {/* Beliefs */}
      <section className="py-20 sm:py-24" aria-labelledby="beliefs-heading">
        <Container>
          <h2 id="beliefs-heading" className={cn(headingLG, "reveal text-deep")}>
            What we <Highlight>believe.</Highlight>
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {about.beliefs.map((belief, i) => (
              <li
                key={belief.title}
                className="reveal rounded-[26px] border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_30px_60px_-34px_rgba(10,74,48,0.4)] sm:p-7"
              >
                <span className="font-display text-sm font-bold text-brand tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-[21px] leading-snug font-bold text-deep">{belief.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{belief.detail}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Who we are */}
      <section className="bg-off py-20 sm:py-24" aria-labelledby="who-heading">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="reveal">
            <Eyebrow>Who we are</Eyebrow>
            <h2 id="who-heading" className={cn(headingLG, "mt-5 text-deep")}>
              A team from India. <Highlight>Clients everywhere.</Highlight>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{about.whoWeAre}</p>
          </div>
          <ul className="reveal flex flex-col gap-4 rounded-[30px] border border-line bg-white p-7 text-[17px] text-ink sm:p-9">
            {about.whoWeArePoints.map((point) => (
              <CheckItem key={point}>{point}</CheckItem>
            ))}
          </ul>
        </Container>
      </section>

      {/* What we stand for */}
      <section className="py-20 sm:py-24" aria-labelledby="stand-heading">
        <Container>
          <div className="reveal grid items-center gap-6 rounded-[32px] bg-sun-tint p-7 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:p-12">
            <div>
              <Eyebrow>What we stand for</Eyebrow>
              <h2 id="stand-heading" className={cn(headingLG, "mt-5 text-deep")}>
                Women’s empowerment and minority communities.
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-ink/80">{about.standFor}</p>
          </div>
        </Container>
      </section>

      {/* Say hi */}
      <section className="pb-4" aria-labelledby="hi-heading">
        <Container>
          <div className="reveal mx-auto max-w-3xl text-center">
            <h2 id="hi-heading" className={cn(headingLG, "text-deep")}>
              Say hi <Highlight>from anywhere.</Highlight>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">{about.sayHi}</p>
          </div>
        </Container>
      </section>
    </ServiceLayout>
  );
}

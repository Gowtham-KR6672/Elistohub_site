import { Icon, type IconName } from "@/components/icons";
import { CheckItem, Container, Eyebrow, Highlight, headingXL } from "@/components/ui";
import { cn } from "@/lib/cn";
import { emailPlatforms, emailPoints, helpdesks, supportPoints } from "@/lib/content";

function PlatformPanel({
  title,
  items,
  icon,
  tone,
}: {
  title: string;
  items: string[];
  icon: IconName;
  tone: "green" | "yellow";
}) {
  return (
    <div
      className={cn(
        "reveal relative overflow-hidden rounded-[34px] p-6 sm:p-9",
        tone === "green" ? "bg-tint" : "bg-sun-tint",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -top-24 -right-24 size-64 rounded-full blur-3xl",
          tone === "green" ? "bg-mint/40" : "bg-sun/40",
        )}
        aria-hidden="true"
      />
      <div className="relative flex items-center gap-3">
        <span
          className={cn(
            "grid size-11 place-items-center rounded-2xl",
            tone === "green" ? "bg-brand text-white" : "bg-deep text-sun",
          )}
        >
          <Icon name={icon} size={22} />
        </span>
        <p className="font-display text-[21px] font-bold text-deep">{title}</p>
      </div>
      <ul className="relative mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 2xl:grid-cols-4">
        {items.map((item) => (
          <li
            key={item}
            className="grid min-h-16 place-items-center rounded-2xl bg-white px-3 py-4 text-center font-display text-[16px] font-bold text-deep shadow-[0_8px_20px_-16px_rgba(10,74,48,0.5)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CustomerService() {
  return (
    <section id="customer-service" className="py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="reveal">
          <Eyebrow>Customer service outsourcing</Eyebrow>
          <h2 className={cn(headingXL, "mt-5 text-deep")}>
            Happy customers. Five-star reviews. <Highlight>Zero inbox panic.</Highlight>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Our ecommerce customer support team answers email, live chat, marketplace buyer messages and social DMs -
            with or without AI - right inside the helpdesk you already use.
          </p>
          <ul className="mt-9 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {supportPoints.map((p) => (
              <CheckItem key={p}>{p}</CheckItem>
            ))}
          </ul>
        </div>
        <PlatformPanel title="Helpdesks we live in" items={helpdesks} icon="inbox" tone="green" />
      </Container>
    </section>
  );
}

export function EmailMarketing() {
  return (
    <section id="email" className="bg-off py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="reveal lg:order-2">
          <Eyebrow>Email &amp; SMS marketing</Eyebrow>
          <h2 className={cn(headingXL, "mt-5 text-deep")}>
            Emails people actually open. <Highlight>Wild, we know.</Highlight>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Klaviyo email marketing, SMS campaigns and automated flows - designed, written, built and tested by our
            team, so your list makes money while you sleep.
          </p>
          <ul className="mt-9 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {emailPoints.map((p) => (
              <CheckItem key={p}>{p}</CheckItem>
            ))}
          </ul>
        </div>
        <div className="lg:order-1">
          <PlatformPanel title="Email & SMS platforms we run" items={emailPlatforms} icon="mail" tone="yellow" />
        </div>
      </Container>
    </section>
  );
}

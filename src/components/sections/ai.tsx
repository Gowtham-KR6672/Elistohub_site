import type { CSSProperties } from "react";
import { Icon } from "@/components/icons";
import { InView } from "@/components/motion";
import { Container, Eyebrow, headingXL } from "@/components/ui";
import { cn } from "@/lib/cn";
import { aiChat, aiFeatures } from "@/lib/content";

function ChatDemo() {
  return (
    <InView className="relative mx-auto w-full max-w-[600px] lg:mr-0">
      <div className="absolute -inset-8 -z-10 rounded-[48px] bg-mint/20 blur-3xl" aria-hidden="true" />
      <figure className="overflow-hidden rounded-[30px] bg-white text-ink shadow-[0_50px_100px_-40px_rgba(0,0,0,0.6)]">
        <figcaption className="flex items-center justify-between gap-4 border-b border-line/70 px-5 py-4">
          <span className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-deep text-sun">
              <Icon name="bot" size={18} />
            </span>
            <span className="font-semibold text-deep">Chat with Your Brand</span>
          </span>
          <span className="inline-flex items-center gap-2 text-xs font-bold text-brand">
            <span className="size-2 rounded-full bg-fresh" />
            AI agent · online
          </span>
        </figcaption>

        <div className="flex flex-col gap-3 bg-off px-5 py-6">
          {aiChat.map((m, i) => (
            <p
              key={i}
              className={cn(
                "inview-item max-w-[85%] px-4 py-3 text-[14.5px] leading-relaxed",
                m.from === "customer"
                  ? "self-end rounded-[20px] rounded-br-md bg-brand text-white"
                  : "self-start rounded-[20px] rounded-bl-md border border-line bg-white",
              )}
              style={{ "--d": `${200 + i * 650}ms` } as CSSProperties}
            >
              <span className="sr-only">{m.from === "customer" ? "Customer: " : "AI agent: "}</span>
              {m.text}
            </p>
          ))}
          <p
            className="inview-item mt-1 self-center rounded-full bg-sun-tint px-3.5 py-1.5 text-xs font-bold text-gold"
            style={{ "--d": `${200 + aiChat.length * 650}ms` } as CSSProperties}
          >
            Handed to human team with full context
          </p>
        </div>

        <div className="flex items-center gap-2.5 border-t border-line/70 px-4 py-3.5" aria-hidden="true">
          <span className="flex min-h-11 flex-1 items-center rounded-full border border-line px-4 text-sm text-muted/70">
            Type a message…
          </span>
          <span className="grid size-11 place-items-center rounded-full bg-brand text-white">
            <Icon name="send" size={18} strokeWidth={2.2} />
          </span>
        </div>
      </figure>
    </InView>
  );
}

export function AiSection() {
  return (
    <section id="ai" className="relative isolate overflow-hidden bg-deep py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div className="absolute -top-40 right-[-10%] size-[600px] rounded-full bg-brand/40 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-10%] size-[460px] rounded-full bg-sun/10 blur-[140px]" />
      </div>

      <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal">
          <Eyebrow tone="dark">AI customer support &amp; automation</Eyebrow>
          <h2 className={cn(headingXL, "mt-5 text-white")}>
            AI that answers your customers at 3am. <span className="text-sun">So you don’t have to.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-frost">
            We set up, train and manage AI for ecommerce - chatbots, email support, automations and custom AI agents
            that take the repetitive work off your plate.
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {aiFeatures.map((f) => (
              <li
                key={f.title}
                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.08]"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-sun transition-colors group-hover:bg-sun group-hover:text-deep">
                  <Icon name={f.icon} size={20} />
                </span>
                <p className="mt-4 font-display text-[19px] font-bold">{f.title}</p>
                <p className="mt-1.5 text-sm text-frost">{f.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <ChatDemo />
      </Container>
    </section>
  );
}

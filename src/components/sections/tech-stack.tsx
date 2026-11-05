import { Container, Highlight, Pill, SectionHeader } from "@/components/ui";
import { techStack } from "@/lib/content";

export function TechStack() {
  return (
    <section id="tools" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="Tech stack"
          title={
            <>
              Your tools? <Highlight>We already speak them.</Highlight>
            </>
          }
          intro="No learning curve on your dime. Our team works inside the PIMs, ERPs and platforms leading brands run on."
        />

        <div className="mt-14 overflow-hidden rounded-[32px] border border-line bg-white">
          {techStack.map((group, i) => (
            <div
              key={group.category}
              className="reveal grid gap-5 border-line p-6 transition-colors hover:bg-off sm:p-8 md:grid-cols-[280px_1fr] md:items-center [&:not(:first-child)]:border-t"
            >
              <div className="flex items-center gap-4">
                <span className="font-display text-sm font-bold text-brand tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-[20px] font-bold text-deep">{group.category}</p>
                  <p className="text-sm text-muted">{group.tools.length} tools</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {group.tools.map((tool) => (
                  <Pill key={tool}>{tool}</Pill>
                ))}
                {group.extra ? <Pill active>{group.extra}</Pill> : null}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

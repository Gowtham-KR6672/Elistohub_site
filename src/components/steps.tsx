import { cn } from "@/lib/cn";

/** Numbered steps laid out left-to-right on wide screens, stacked on phones. */
export function NumberedSteps({ steps, className }: { steps: { title: string; detail: string }[]; className?: string }) {
  return (
    <ol
      className={cn(
        "grid gap-4 sm:grid-cols-2",
        steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {steps.map((step, i) => (
        <li key={step.title} className="reveal relative rounded-[26px] border border-line bg-white p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-deep font-display text-lg font-extrabold text-sun">
              {i + 1}
            </span>
            {i < steps.length - 1 ? (
              <span className="hidden h-px flex-1 bg-gradient-to-r from-brand/40 to-transparent lg:block" aria-hidden="true" />
            ) : null}
          </div>
          <h3 className="mt-5 font-display text-[21px] leading-snug font-bold text-deep">{step.title}</h3>
          <p className="mt-2 leading-relaxed text-muted">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}

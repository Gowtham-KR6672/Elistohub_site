import { useActionState, useState, type ReactNode } from "react";
import { submitContact, type ContactState } from "@/lib/contact-client";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { contactNeeds } from "@/lib/content";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-2xl border border-line bg-off px-4 text-[15px] text-ink outline-none transition-[border-color,box-shadow,background-color] placeholder:text-muted/60 hover:border-brand/30 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500/10";

function Field({
  id,
  label,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-deep">
        {label}
        {hint ? <span className="font-normal text-muted"> {hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Form({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    const firstName = state.name.split(/\s+/)[0];
    return (
      <div className="flex flex-col items-start gap-4 py-6" role="status">
        <span className="grid size-14 place-items-center rounded-2xl bg-tint text-brand">
          <Icon name="check" size={28} strokeWidth={2.6} />
        </span>
        <h3 className="font-display text-[28px] leading-tight font-bold tracking-[-0.02em] text-deep">
          Thanks{firstName ? `, ${firstName}` : ""}! Your message is in.
        </h3>
        <p className="text-muted">
          We’ll look at your store and get back to you soon to book your free 30-minute call.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-2 text-[15px] font-semibold text-brand underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const values = state.status === "error" ? state.values : undefined;
  const errors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form
      key={values ? JSON.stringify(values) : "empty"}
      action={formAction}
      className="flex flex-col gap-5"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Your name" error={errors?.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            defaultValue={values?.name}
            aria-invalid={errors?.name ? true : undefined}
            aria-describedby={errors?.name ? "contact-name-error" : undefined}
            className={cn(inputClass, "min-h-13")}
          />
        </Field>
        <Field id="contact-email" label="Work email" error={errors?.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            defaultValue={values?.email}
            aria-invalid={errors?.email ? true : undefined}
            aria-describedby={errors?.email ? "contact-email-error" : undefined}
            className={cn(inputClass, "min-h-13")}
          />
        </Field>
      </div>

      <Field id="contact-store" label="Store or brand URL">
        <input
          id="contact-store"
          name="store"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="https://"
          maxLength={300}
          defaultValue={values?.store}
          className={cn(inputClass, "min-h-13")}
        />
      </Field>

      <Field id="contact-need" label="What can we take off your plate?" error={errors?.need}>
        <div className="relative">
          <select
            id="contact-need"
            name="need"
            defaultValue={values?.need ?? contactNeeds[0]}
            aria-invalid={errors?.need ? true : undefined}
            className={cn(inputClass, "min-h-13 appearance-none pr-11")}
          >
            {contactNeeds.map((need) => (
              <option key={need} value={need}>
                {need}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-brand"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </Field>

      <Field id="contact-message" label="Anything else we should know?" hint="(optional)">
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          maxLength={3000}
          defaultValue={values?.message}
          className={cn(inputClass, "resize-y py-3.5")}
        />
      </Field>

      {/* Honeypot field for bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" ? (
        <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="group mt-1 inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-brand px-7 text-base font-bold text-white shadow-[0_14px_30px_-12px_rgba(8,136,74,0.65)] transition-all hover:bg-deep active:scale-[0.99] disabled:cursor-wait disabled:opacity-80"
      >
        {pending ? (
          <>
            <span className="size-5 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Book my free call
            <Icon name="arrow" size={18} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}

export function ContactForm() {
  const [formKey, setFormKey] = useState(0);
  return <Form key={formKey} onReset={() => setFormKey((k) => k + 1)} />;
}

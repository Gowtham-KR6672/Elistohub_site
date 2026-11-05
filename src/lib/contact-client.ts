import { contactNeeds } from "@/lib/content";
import { siteConfig } from "@/lib/site";

/** The PHP endpoint that sends enquiries through Brevo (public/api/contact.php). */
export const CONTACT_ENDPOINT = "/api/contact.php";

export type ContactValues = {
  name: string;
  email: string;
  store: string;
  need: string;
  message: string;
};

type FieldName = keyof ContactValues;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<FieldName, string>>;
      values: ContactValues;
    };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS: Record<FieldName, number> = { name: 120, email: 254, store: 300, need: 80, message: 3000 };

const read = (formData: FormData, field: FieldName) => {
  const raw = formData.get(field);
  return typeof raw === "string" ? raw.trim().slice(0, LIMITS[field]) : "";
};

/** Same rules as the PHP endpoint, so visitors get instant feedback. */
export function validateContact(values: ContactValues) {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!values.name) errors.name = "Please tell us your name.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please enter a valid email address.";
  if (!contactNeeds.includes(values.need)) errors.need = "Please pick an option.";
  return errors;
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values: ContactValues = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    store: read(formData, "store"),
    need: read(formData, "need"),
    message: read(formData, "message"),
  };

  const fieldErrors = validateContact(values);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const fallback = `Sorry, we couldn’t send your message. Please try again or email us at ${siteConfig.email}.`;

  try {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...values, company_website: formData.get("company_website") ?? "" }),
    });
    const data = (await res.json().catch(() => null)) as {
      ok?: boolean;
      message?: string;
      fieldErrors?: Partial<Record<FieldName, string>>;
    } | null;

    if (res.ok && data?.ok) return { status: "success", name: values.name };
    return { status: "error", message: data?.message || fallback, fieldErrors: data?.fieldErrors, values };
  } catch {
    return { status: "error", message: fallback, values };
  }
}

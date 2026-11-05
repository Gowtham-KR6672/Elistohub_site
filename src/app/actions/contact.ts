"use server";

import { sendTransactionalEmail, upsertContact } from "@/lib/brevo";
import { senderConfirmation, teamNotification, type ContactSubmission } from "@/lib/contact-emails";
import { contactNeeds } from "@/lib/content";
import { siteConfig } from "@/lib/site";

type FieldName = keyof ContactSubmission;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<FieldName, string>>;
      values: ContactSubmission;
    };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS: Record<FieldName, number> = {
  name: 120,
  email: 254,
  store: 300,
  need: 80,
  message: 3000,
};

function readField(formData: FormData, field: FieldName) {
  const raw = formData.get(field);
  return typeof raw === "string" ? raw.trim().slice(0, LIMITS[field]) : "";
}

function parseRecipients(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter((email) => EMAIL_PATTERN.test(email))
    .map((email) => ({ email }));
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values: ContactSubmission = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    store: readField(formData, "store"),
    need: readField(formData, "need"),
    message: readField(formData, "message"),
  };

  // Honeypot: real people never see or fill this field.
  const trap = formData.get("company_website");
  if (typeof trap === "string" && trap.length > 0) {
    return { status: "success", name: values.name };
  }

  const fieldErrors: Partial<Record<FieldName, string>> = {};
  if (!values.name) fieldErrors.name = "Please tell us your name.";
  if (!EMAIL_PATTERN.test(values.email)) fieldErrors.email = "Please enter a valid email address.";
  if (!contactNeeds.includes(values.need)) fieldErrors.need = "Please pick an option.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const recipients = parseRecipients(process.env.CONTACT_TO_EMAIL);
  const fromEmail = process.env.EMAIL_FROM_ADDRESS?.trim();

  if (!process.env.BREVO_API_KEY || !fromEmail || recipients.length === 0) {
    console.error(
      "[contact] Brevo is not configured. Set BREVO_API_KEY, EMAIL_FROM_ADDRESS and CONTACT_TO_EMAIL in your environment.",
    );
    return {
      status: "error",
      message: `Our contact form isn’t available right now. Please email us at ${siteConfig.email}.`,
      values,
    };
  }

  const sender = { email: fromEmail, name: process.env.EMAIL_FROM_NAME?.trim() || `${siteConfig.name} Website` };

  try {
    await sendTransactionalEmail({
      sender,
      to: recipients,
      replyTo: { email: values.email, name: values.name },
      tags: ["website-contact"],
      ...teamNotification(values),
    });
  } catch (error) {
    console.error("[contact] Failed to send enquiry email via Brevo", error);
    return {
      status: "error",
      message: `Sorry, we couldn’t send your message. Please try again or email us at ${siteConfig.email}.`,
      values,
    };
  }

  // Optional extras. The enquiry already reached the team, so failures here are only logged.
  const extras: Promise<unknown>[] = [];

  const listId = Number(process.env.BREVO_LIST_ID);
  if (Number.isInteger(listId) && listId > 0) {
    extras.push(upsertContact({ email: values.email, firstName: values.name.split(/\s+/)[0], listId }));
  }

  if (process.env.CONTACT_SEND_CONFIRMATION === "true") {
    extras.push(
      sendTransactionalEmail({
        sender,
        to: [{ email: values.email, name: values.name }],
        replyTo: recipients[0],
        tags: ["website-contact-confirmation"],
        ...senderConfirmation(values),
      }),
    );
  }

  const results = await Promise.allSettled(extras);
  for (const result of results) {
    if (result.status === "rejected") console.error("[contact] Optional Brevo step failed", result.reason);
  }

  return { status: "success", name: values.name };
}

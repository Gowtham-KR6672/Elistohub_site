/**
 * Minimal Brevo (formerly Sendinblue) REST client.
 * Docs: https://developers.brevo.com/reference/sendtransacemail
 * Server-only: reads BREVO_API_KEY from the environment.
 */

const BREVO_API_URL = "https://api.brevo.com/v3";

export type EmailAddress = { email: string; name?: string };

export class BrevoError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "BrevoError";
  }
}

async function brevoRequest(path: string, body: unknown) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new BrevoError("BREVO_API_KEY is not set");

  const res = await fetch(`${BREVO_API_URL}${path}`, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new BrevoError(`Brevo ${path} failed (${res.status}): ${detail.slice(0, 500)}`, res.status);
  }
  return res;
}

/** Sends one transactional email through Brevo. */
export async function sendTransactionalEmail(email: {
  sender: EmailAddress;
  to: EmailAddress[];
  replyTo?: EmailAddress;
  subject: string;
  htmlContent: string;
  textContent: string;
  tags?: string[];
}) {
  await brevoRequest("/smtp/email", email);
}

/** Creates the contact (or updates it if it already exists) and adds it to a Brevo list. */
export async function upsertContact(contact: { email: string; firstName?: string; listId: number }) {
  await brevoRequest("/contacts", {
    email: contact.email,
    attributes: contact.firstName ? { FIRSTNAME: contact.firstName } : undefined,
    listIds: [contact.listId],
    updateEnabled: true,
  });
}

// @ts-check
/**
 * Contact form handler for Node hosts (Render, Railway, a VPS…) and for `npm run dev`.
 * It follows the same rules as public/api/contact.php, which is used on PHP hosts like BigRock:
 * validate, block bots, rate-limit, then send the enquiry through the Brevo API.
 *
 * Settings come from environment variables:
 *   BREVO_API_KEY, EMAIL_FROM_ADDRESS, EMAIL_FROM_NAME, CONTACT_TO_EMAIL,
 *   BREVO_LIST_ID (optional), CONTACT_SEND_CONFIRMATION (optional), SITE_EMAIL (optional)
 */

export const CONTACT_NEEDS = [
  "Marketplace management",
  "Listings & catalog",
  "Inventory, orders & vendors",
  "Paid ads (commission-based)",
  "AI product images",
  "Social media",
  "Customer service",
  "Email & SMS marketing",
  "AI support & automation",
  "Website build or updates",
  "Honestly? All of it",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RATE_LIMIT_MAX = 5; // submissions...
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // ...per 10 minutes per IP address

/** @param {string} value */
const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** @param {string} title @param {string} inner */
const emailLayout = (title, inner) =>
  '<!doctype html><html><body style="margin:0;padding:24px;background:#FAFBF9;font-family:Inter,Arial,sans-serif;color:#0F1F1A">' +
  '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid #E6EBE8;border-radius:16px;overflow:hidden">' +
  '<tr><td style="background:#0A4A30;padding:22px 28px;font-size:22px;font-weight:800;letter-spacing:-0.5px;color:#FFFFFF">' +
  'Elist<span style="color:#F5C518">o</span><span style="color:#3DD68C">hub</span></td></tr>' +
  `<tr><td style="padding:28px"><h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#0A4A30">${title}</h1>` +
  `${inner}</td></tr></table></body></html>`;

/**
 * @typedef {{ status: number, body: { ok: boolean, message?: string, fieldErrors?: Record<string, string> } }} ContactResult
 * @typedef {{ info: (msg: string) => void, warn: (msg: string) => void, error: (msg: string) => void }} Logger
 */

/**
 * @param {Record<string, string | undefined>} env
 * @param {Logger} [log]
 */
export function createContactHandler(env, log = console) {
  /** @type {Map<string, number[]>} */
  const hits = new Map();

  /** @param {string} ip */
  function rateLimited(ip) {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => t > now - RATE_LIMIT_WINDOW_MS);
    const limited = recent.length >= RATE_LIMIT_MAX;
    if (!limited) recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 5000) hits.clear(); // keep memory bounded
    return limited;
  }

  /**
   * @param {string} apiKey @param {string} path @param {unknown} payload
   * @returns {Promise<{ ok: boolean, status: number, text: string }>}
   */
  async function brevo(apiKey, path, payload) {
    try {
      const res = await fetch(`https://api.brevo.com/v3${path}`, {
        method: "POST",
        headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20_000),
      });
      return { ok: res.ok, status: res.status, text: res.ok ? "" : (await res.text()).slice(0, 500) };
    } catch (error) {
      return { ok: false, status: 0, text: String(error) };
    }
  }

  /**
   * @param {{ body: string, ip?: string, origin?: string, host?: string }} request
   * @returns {Promise<ContactResult>}
   */
  return async function handleContact({ body, ip = "unknown", origin, host }) {
    const siteEmail = env.SITE_EMAIL || "hello@elistohub.com";

    // Only accept submissions coming from this website.
    if (origin && host) {
      let originHost = "";
      try {
        originHost = new URL(origin).hostname.toLowerCase();
      } catch {
        originHost = "";
      }
      if (originHost !== host.replace(/:\d+$/, "").toLowerCase()) {
        return { status: 403, body: { ok: false, message: "Forbidden." } };
      }
    }

    /** @type {Record<string, unknown>} */
    let input = {};
    try {
      const parsed = JSON.parse(body || "{}");
      if (parsed && typeof parsed === "object") input = parsed;
    } catch {
      input = {};
    }
    /** @param {string} key @param {number} max */
    const str = (key, max) => (typeof input[key] === "string" ? /** @type {string} */ (input[key]).trim().slice(0, max) : "");

    const v = {
      name: str("name", 120),
      email: str("email", 254),
      store: str("store", 300),
      need: str("need", 80),
      message: str("message", 3000),
    };

    // Honeypot: real visitors never fill this hidden field.
    if (str("company_website", 200)) return { status: 200, body: { ok: true } };

    /** @type {Record<string, string>} */
    const fieldErrors = {};
    if (!v.name) fieldErrors.name = "Please tell us your name.";
    if (!EMAIL_PATTERN.test(v.email)) fieldErrors.email = "Please enter a valid email address.";
    if (!CONTACT_NEEDS.includes(v.need)) fieldErrors.need = "Please pick an option.";
    if (Object.keys(fieldErrors).length > 0) {
      return { status: 422, body: { ok: false, message: "Please check the highlighted fields.", fieldErrors } };
    }

    if (rateLimited(ip)) {
      return {
        status: 429,
        body: { ok: false, message: "Too many messages in a short time. Please try again in a few minutes." },
      };
    }

    const apiKey = env.BREVO_API_KEY?.trim();
    const fromEmail = env.EMAIL_FROM_ADDRESS?.trim();
    const recipients = (env.CONTACT_TO_EMAIL ?? "")
      .split(",")
      .map((email) => email.trim())
      .filter((email) => EMAIL_PATTERN.test(email))
      .map((email) => ({ email }));

    if (!apiKey || !fromEmail || recipients.length === 0) {
      log.error("[contact] Not configured: set BREVO_API_KEY, EMAIL_FROM_ADDRESS and CONTACT_TO_EMAIL");
      return {
        status: 503,
        body: { ok: false, message: `Our contact form isn’t available right now. Please email us at ${siteEmail}.` },
      };
    }

    const sender = { email: fromEmail, name: env.EMAIL_FROM_NAME?.trim() || "Elistohub" };
    const storeHref = v.store && !/^https?:\/\//i.test(v.store) ? `https://${v.store}` : v.store;
    const rows = [
      ["Name", escapeHtml(v.name)],
      ["Email", `<a href="mailto:${escapeHtml(v.email)}" style="color:#08884A">${escapeHtml(v.email)}</a>`],
      [
        "Store / brand",
        v.store
          ? `<a href="${escapeHtml(storeHref)}" style="color:#08884A">${escapeHtml(v.store)}</a>`
          : '<em style="color:#4B5B55">Not provided</em>',
      ],
      ["Needs help with", escapeHtml(v.need)],
      ["Message", v.message ? escapeHtml(v.message).replace(/\n/g, "<br>") : '<em style="color:#4B5B55">No message</em>'],
    ];
    const table =
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:15px">' +
      rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:10px 12px 10px 0;border-top:1px solid #E6EBE8;color:#4B5B55;width:150px;vertical-align:top">${label}</td><td style="padding:10px 0;border-top:1px solid #E6EBE8;vertical-align:top">${value}</td></tr>`,
        )
        .join("") +
      `</table><p style="margin:20px 0 0;font-size:13px;color:#4B5B55">Reply to this email to answer ${escapeHtml(v.name)} directly.</p>`;

    const sent = await brevo(apiKey, "/smtp/email", {
      sender,
      to: recipients,
      replyTo: { email: v.email, name: v.name },
      subject: `New enquiry: ${v.need} - ${v.name}`,
      htmlContent: emailLayout("New enquiry from the website", table),
      textContent: [
        "New enquiry from the website",
        "",
        `Name: ${v.name}`,
        `Email: ${v.email}`,
        `Store / brand: ${v.store || "Not provided"}`,
        `Needs help with: ${v.need}`,
        "",
        "Message:",
        v.message || "No message",
      ].join("\n"),
      tags: ["website-contact"],
    });

    if (!sent.ok) {
      log.error(`[contact] Brevo send failed (${sent.status}): ${sent.text}`);
      return {
        status: 502,
        body: { ok: false, message: `Sorry, we couldn’t send your message. Please try again or email us at ${siteEmail}.` },
      };
    }

    // Optional extras: failures are only logged, the team already has the enquiry.
    const firstName = v.name.split(/\s+/)[0] || v.name;
    const listId = Number(env.BREVO_LIST_ID);
    if (Number.isInteger(listId) && listId > 0) {
      const saved = await brevo(apiKey, "/contacts", {
        email: v.email,
        attributes: { FIRSTNAME: firstName },
        listIds: [listId],
        updateEnabled: true,
      });
      if (!saved.ok) log.error(`[contact] Brevo contact save failed (${saved.status}): ${saved.text}`);
    }

    if ((env.CONTACT_SEND_CONFIRMATION ?? "").toLowerCase() === "true") {
      const inner =
        `<p style="margin:0 0 14px;font-size:16px;line-height:1.6">Hi ${escapeHtml(firstName)},</p>` +
        `<p style="margin:0 0 14px;font-size:16px;line-height:1.6">Thanks for reaching out. We’ve got your request about <strong>${escapeHtml(v.need)}</strong> and our team will get back to you to book your free 30-minute call.</p>` +
        '<p style="margin:0 0 14px;font-size:16px;line-height:1.6">Want to add anything? Just reply to this email.</p>' +
        '<p style="margin:24px 0 0;font-size:16px;line-height:1.6">- The Elistohub team</p>';
      const confirmed = await brevo(apiKey, "/smtp/email", {
        sender,
        to: [{ email: v.email, name: v.name }],
        replyTo: recipients[0],
        subject: "Thanks for reaching out to Elistohub",
        htmlContent: emailLayout("We’ve got your message", inner),
        textContent: `Hi ${firstName},\n\nThanks for reaching out. We've got your request about "${v.need}" and our team will get back to you to book your free 30-minute call.\n\nWant to add anything? Just reply to this email.\n\n- The Elistohub team`,
        tags: ["website-contact-confirmation"],
      });
      if (!confirmed.ok) log.error(`[contact] Brevo confirmation failed (${confirmed.status}): ${confirmed.text}`);
    }

    log.info("[contact] Enquiry sent via Brevo");
    return { status: 200, body: { ok: true } };
  };
}

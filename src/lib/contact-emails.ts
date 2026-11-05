import { siteConfig } from "@/lib/site";

export type ContactSubmission = {
  name: string;
  email: string;
  store: string;
  need: string;
  message: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const storeHref = (store: string) => (/^https?:\/\//i.test(store) ? store : `https://${store}`);

function layout(title: string, inner: string) {
  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#FAFBF9;font-family:Inter,Arial,sans-serif;color:#0F1F1A">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid #E6EBE8;border-radius:16px;overflow:hidden">
<tr><td style="background:#0A4A30;padding:22px 28px;font-size:22px;font-weight:800;letter-spacing:-0.5px;color:#FFFFFF">
Elist<span style="color:#F5C518">o</span><span style="color:#3DD68C">hub</span>
</td></tr>
<tr><td style="padding:28px">
<h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#0A4A30">${title}</h1>
${inner}
</td></tr>
</table>
</body></html>`;
}

/** Email sent to the Elistohub team for every new enquiry. */
export function teamNotification(s: ContactSubmission) {
  const rows: [string, string][] = [
    ["Name", escapeHtml(s.name)],
    ["Email", `<a href="mailto:${escapeHtml(s.email)}" style="color:#08884A">${escapeHtml(s.email)}</a>`],
    [
      "Store / brand",
      s.store
        ? `<a href="${escapeHtml(storeHref(s.store))}" style="color:#08884A">${escapeHtml(s.store)}</a>`
        : "<em style=\"color:#4B5B55\">Not provided</em>",
    ],
    ["Needs help with", escapeHtml(s.need)],
    [
      "Message",
      s.message
        ? escapeHtml(s.message).replace(/\n/g, "<br>")
        : "<em style=\"color:#4B5B55\">No message</em>",
    ],
  ];

  const table = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:15px">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:10px 12px 10px 0;border-top:1px solid #E6EBE8;color:#4B5B55;width:150px;vertical-align:top">${k}</td><td style="padding:10px 0;border-top:1px solid #E6EBE8;vertical-align:top">${v}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="margin:20px 0 0;font-size:13px;color:#4B5B55">Reply to this email to answer ${escapeHtml(s.name)} directly.</p>`;

  const text = [
    "New enquiry from the website",
    "",
    `Name: ${s.name}`,
    `Email: ${s.email}`,
    `Store / brand: ${s.store || "Not provided"}`,
    `Needs help with: ${s.need}`,
    "",
    "Message:",
    s.message || "No message",
  ].join("\n");

  return {
    subject: `New enquiry: ${s.need} - ${s.name}`,
    htmlContent: layout("New enquiry from the website", table),
    textContent: text,
  };
}

/** Optional confirmation sent to the person who filled in the form. */
export function senderConfirmation(s: ContactSubmission) {
  const firstName = escapeHtml(s.name.split(/\s+/)[0] ?? s.name);
  const inner = `<p style="margin:0 0 14px;font-size:16px;line-height:1.6">Hi ${firstName},</p>
<p style="margin:0 0 14px;font-size:16px;line-height:1.6">Thanks for reaching out. We’ve got your request about <strong>${escapeHtml(s.need)}</strong> and our team will get back to you to book your free 30-minute call.</p>
<p style="margin:0 0 14px;font-size:16px;line-height:1.6">Want to add anything? Just reply to this email.</p>
<p style="margin:24px 0 0;font-size:16px;line-height:1.6">- The ${siteConfig.name} team</p>`;

  const text = `Hi ${s.name.split(/\s+/)[0] ?? s.name},

Thanks for reaching out. We've got your request about "${s.need}" and our team will get back to you to book your free 30-minute call.

Want to add anything? Just reply to this email.

- The ${siteConfig.name} team`;

  return {
    subject: `Thanks for reaching out to ${siteConfig.name}`,
    htmlContent: layout("We’ve got your message", inner),
    textContent: text,
  };
}

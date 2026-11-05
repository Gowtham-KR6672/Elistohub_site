/**
 * Local development stand-in for public/api/contact.php.
 *
 * `npm run dev` can't run PHP, so this Vite middleware answers POST /api/contact.php
 * with the same rules and sends the enquiry through Brevo using the values in
 * .env.local. It is never part of the production build; on BigRock the real
 * PHP file handles the form.
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

export function devContactApi(env: Record<string, string>): Plugin {
  return {
    name: "elistohub-dev-contact-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/contact.php", async (req, res) => {
        if (req.method !== "POST") return send(res, 405, { ok: false, message: "Method not allowed." });

        let input: Record<string, unknown> = {};
        try {
          input = JSON.parse((await readBody(req)) || "{}");
        } catch {
          input = {};
        }
        const str = (key: string, max: number) => (typeof input[key] === "string" ? (input[key] as string).trim().slice(0, max) : "");
        const v = {
          name: str("name", 120),
          email: str("email", 254),
          store: str("store", 300),
          need: str("need", 80),
          message: str("message", 3000),
        };

        if (str("company_website", 200)) return send(res, 200, { ok: true });

        const fieldErrors: Record<string, string> = {};
        if (!v.name) fieldErrors.name = "Please tell us your name.";
        if (!EMAIL_PATTERN.test(v.email)) fieldErrors.email = "Please enter a valid email address.";
        if (!v.need) fieldErrors.need = "Please pick an option.";
        if (Object.keys(fieldErrors).length) {
          return send(res, 422, { ok: false, message: "Please check the highlighted fields.", fieldErrors });
        }

        const apiKey = env.BREVO_API_KEY;
        const from = env.EMAIL_FROM_ADDRESS;
        const to = (env.CONTACT_TO_EMAIL ?? "")
          .split(",")
          .map((email) => email.trim())
          .filter((email) => EMAIL_PATTERN.test(email))
          .map((email) => ({ email }));

        if (!apiKey || !from || to.length === 0) {
          server.config.logger.warn("[dev contact] Set BREVO_API_KEY, EMAIL_FROM_ADDRESS and CONTACT_TO_EMAIL in .env.local");
          return send(res, 503, {
            ok: false,
            message: "Our contact form isn’t available right now. Please email us at hello@elistohub.com.",
          });
        }

        const rows = [
          ["Name", escapeHtml(v.name)],
          ["Email", escapeHtml(v.email)],
          ["Store / brand", escapeHtml(v.store || "Not provided")],
          ["Needs help with", escapeHtml(v.need)],
          ["Message", escapeHtml(v.message || "No message").replace(/\n/g, "<br>")],
        ]
          .map(([k, val]) => `<tr><td style="padding:8px 12px 8px 0;color:#4B5B55">${k}</td><td style="padding:8px 0">${val}</td></tr>`)
          .join("");

        const brevo = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({
            sender: { email: from, name: env.EMAIL_FROM_NAME || "Elistohub" },
            to,
            replyTo: { email: v.email, name: v.name },
            subject: `New enquiry: ${v.need} - ${v.name} (local test)`,
            htmlContent: `<h2 style="color:#0A4A30">New enquiry from the website (local test)</h2><table>${rows}</table>`,
            textContent: `New enquiry (local test)\n\nName: ${v.name}\nEmail: ${v.email}\nStore: ${v.store || "Not provided"}\nNeeds: ${v.need}\n\n${v.message}`,
            tags: ["website-contact", "local-test"],
          }),
        }).catch((error: unknown) => {
          server.config.logger.error(`[dev contact] Brevo request failed: ${String(error)}`);
          return null;
        });

        if (!brevo || !brevo.ok) {
          if (brevo) server.config.logger.error(`[dev contact] Brevo ${brevo.status}: ${(await brevo.text()).slice(0, 300)}`);
          return send(res, 502, {
            ok: false,
            message: "Sorry, we couldn’t send your message. Please try again or email us at hello@elistohub.com.",
          });
        }

        server.config.logger.info(`[dev contact] Enquiry from ${v.email} sent via Brevo`);
        return send(res, 200, { ok: true });
      });
    },
  };
}
